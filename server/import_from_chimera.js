import fs from 'fs';
import http from 'http';
import mongoose from 'mongoose';

import program from 'commander';
import concat from 'concat-stream';
import S from 'string';
import sanitizeHtml from 'sanitize-html';

import config from './config';
import Program from './app/model/Program';
import Post from './app/model/Post';
import Broadcast from './app/model/Broadcast';
import Image from './app/model/Image';


const {MONGODB_URL} = config;
const {ObjectId} = mongoose.Types;

mongoose.connect(MONGODB_URL);

const db = mongoose.connection;

const CHIMERA_API_URL_PREFIX = 'http://dusken.no/radio/api';

const downloadAndParseJSON = function (url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res.setEncoding('utf8');
      res.on('error', reject);
      res.pipe(concat(resolve));
    });
  }).then(JSON.parse);
};

const downloadPrograms = downloadAndParseJSON.bind(undefined, `${CHIMERA_API_URL_PREFIX}/shows/?format=json`);

const run = async () => {
  const programs = await downloadPrograms();
  for (const p of programs) {

    let imageurl = "";
    let pimage = "";
    if(p.name == "Bankebrett"){
      imageurl = p.image;
      pimage = `/uploads/${p.image.substring(45).split(".170x170_q85_crop_upscale.jpg").join("").split(".170x170_q85_crop_upscale.png").join("")}.jpg`;
    }
    else{
      imageurl = `${p.image.replace("thumbs/", "").split(".170x170_q85_crop_upscale.jpg").join("").split(".170x170_q85_crop_upscale.png").join("")}`;
      pimage = `/uploads/${p.name.replace("/","")}_logo${p.image.substring(p.image.length - 4)}`;
    }

    const file = fs.createWriteStream(`.${pimage}`);

    http.get(imageurl, async (res) => {
      res.pipe(file);
      await Image.create({
        filepath: pimage
      });
    });

    const pdescription = sanitizeHtml(p.description,{
      allowedTags: [],
      allowedAttributes:[]
    });

    await Program.create({
      name: p.name,
      slug: S(p.name).slugify().s,
      digasShowID: p.showID,
      image: pimage,
      archived: p.is_old,
      createdBy: 'Radio Revolt',
      body: pdescription,
      lead: p.lead
    });

    const episodes = await downloadAndParseJSON(p.episodes);
    const program = await Program.findOne({digasShowID: p.showID});
    for(const e of episodes){

      const edescription = sanitizeHtml(e.lead,{
        allowedTags: [],
        allowedAttributes:[]
      });

      if(e.podcast_url != null && e.podcast_url != ""){
        await Broadcast.create({
          title: e.headline,
          digasBroadcastID: e.broadcastID ? e.broadcastID : '',
          digasShowID: p.showID,
          lead: edescription,
          program: new ObjectId(program.id),
          podcastURL: e.podcast_url,
        });
      } else {
        await Broadcast.create({
          title: e.headline,
          digasBroadcastID: e.broadcastID ? e.broadcastID : '',
          digasShowID: p.showID,
          lead: edescription,
          program: new ObjectId(program.id),
          podcastURL: '',
        });
      };
    };
  };

  console.log("Import from Chimera done!")
};

db.once('open', async () => {
  try {
    await run();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
});

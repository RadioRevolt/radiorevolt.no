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
import User from './app/model/User';


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
      pimage = `uploads/${p.image.substring(45).split(".170x170_q85_crop_upscale.jpg").join("").split(".170x170_q85_crop_upscale.png").join("")}.jpg`;
    }
    else{
      imageurl = `${p.image.replace("thumbs/", "").split(".170x170_q85_crop_upscale.jpg").join("").split(".170x170_q85_crop_upscale.png").join("")}`;
      pimage = `uploads/${p.image.substring(45).split(".170x170_q85_crop_upscale.jpg").join("").split(".170x170_q85_crop_upscale.png").join("")}`;
    }
    const file = fs.createWriteStream(`../frontend/build/${pimage}`);

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

    const pbody = JSON.stringify([
      {type:"image",
      data:
        {file:
          {url: pimage}}},
      {type:"text",
      data:
        {text:pdescription,
        format:"html"}}]);

    await Program.create({
      name: p.name,
      slug: S(p.name).slugify().s,
      programID: p.id ,
      body: pbody,
      lead: p.lead
    });

    const episodes = await downloadAndParseJSON(p.episodes);
    const program = await Program.findOne({programID: p.id});
    for(const e of episodes){

      const edescription = sanitizeHtml(e.lead,{
        allowedTags: [],
        allowedAttributes:[]
      });

      const ebody = JSON.stringify([
        {type:"text",
        data:
          {text:edescription,
          format:"html"}}]);

      if(e.podcast_url != null && e.podcast_url != ""){
        await Post.create({
          title: e.headline,
          author: '',
          date: e.public_from,
          program: new ObjectId(program.id),
          broadcast: await Broadcast.create({
            date: e.public_from,
            program: new ObjectId(program.id),
            podacstURL: e.podcast_url,
            onDemandAudioID: e.broadcastID
          }),
          lead: e.lead,
          body: edescription,
          isEpisode: true
        });
      }else{
         await Post.create({
          title: e.headline,
          author: '',
          date: e.public_from,
          program: new ObjectId(program.id),
          broadcast: await Broadcast.create({
            date: e.public_from,
            program: new ObjectId(program.id),
            onDemandAudioID: e.broadcastID
          }),
          lead: e.lead,
          body: ebody,
          isEpisode: true
        });
      };
    };
  };

  console.log("Import from Chimera done!")
};

const generateUsers = async () => {
  const userData = [
    {
      username: 'journalist',
      password: 'pannekake'
    },
    {
      username: 'desker',
      password: 'avengers'
    }
  ];

  for (const ud of userData) {
    try {
      await User.create(ud);
    } catch (e) {
      console.error(e);
    }
  }
}

const flushCollections = async () => {
  await Program.remove({});
  await Post.remove({});
  await Broadcast.remove({});
  await User.remove({});
  await Image.remove({});
};

db.once('open', async () => {
  try {
    await flushCollections();
    await generateUsers();
    await run();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
});
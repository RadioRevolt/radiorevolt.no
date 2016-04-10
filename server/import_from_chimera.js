import fs from 'fs';
import http from 'http';
import mongoose from 'mongoose';

import program from 'commander';
import concat from 'concat-stream';
import S from 'string';

import config from './config';
import Program from './app/model/Program';
import Post from './app/model/Post';
import Broadcast from './app/model/Broadcast';

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
    console.log(p.name)
    await Program.create({
      name: p.name,
      slug: S(p.name).slugify().s,
      programID: p.id ,
      body: `[{"type":"text","data":{"text":${p.description.replace("<p>","").replace("</p>","")},"format":"html"}}]`,
      lead: p.lead
    });
    const episodes = await downloadAndParseJSON(p.episodes);
    const program = await Program.findOne({programID: p.id});
    for(const e of episodes){
      if(e.podcast_url != null && e.podcast_url != ""){
        await Post.create({
          title: e.headline,
          author: '',
          date: e.public_from,
          program: new ObjectId(program.id),
          broadcast: await Broadcast.create({
            name: e.headline,
            date: e.public_from,
            author: '',
            program: new ObjectId(program.id),
            URL: e.podcast_url
          }),
          lead: e.lead,
          body: `[{"type":"text","data":{"text":${e.body}, "format": "html"}}]`
        });
      }
      else{
        await Post.create({
          title: e.headline,
          author: '',
          date: e.public_from,
          program: new ObjectId(program.id),
          lead: e.lead,
          body: `[{"type":"text","data":{"text":${e.body}, "format": "html"}}]`
        });
      };
    };
  };
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
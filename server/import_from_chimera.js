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

mongoose.connect(MONGODB_URL);

const db = mongoose.connection;

const CHIMERA_API_URL_PREFIX = 'http://dusken.no/radio/api';
const EPISODE_SLICE_SIZE = 5;

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

const run = async (episodeSliceSize) => {
  const programs = await downloadPrograms();  
  for (const p of programs) {
    console.log(p.name)
    await Program.create({
      name: p.name,
      slug: S(p.name).slugify().s,
      programID: p.id ,
      description: `{"type":"text","data":{"text":${p.description.replace("<p>","").replace("</p>","")}}}`,
      lead: p.lead
    });
    const episodes = await downloadAndParseJSON(p.episodes);
    
    

  }

};

program
  .option('-s, --slice <n>', parseInt)
  .option('-a --all')
  .parse(process.argv);


db.once('open', async () => {
  try {
    await Program.remove({});
    await Post.remove({});
    await Broadcast.remove({});
    if (program.all) {
      await run();
    } else {
      await run(program.slice || EPISODE_SLICE_SIZE);
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
});
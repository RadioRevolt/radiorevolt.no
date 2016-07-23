import fs from 'fs';
import http from 'http';
import mongoose from 'mongoose';

import concat from 'concat-stream';
import S from 'string';
import sanitizeHtml from 'sanitize-html';

import { MONGODB_URL } from './server/middlewares/config';
import Show from './server/middlewares//model/Show';
import Episode from './server/middlewares//model/Episode';
import Image from './server/middlewares//model/Image';

const { ObjectId } = mongoose.Types;

mongoose.connect(MONGODB_URL);

const db = mongoose.connection;

const CHIMERA_API_URL_PREFIX = 'http://dusken.no/radio/api';

const downloadAndParseJSON = (url) => new Promise((resolve, reject) => {
  http.get(url, (res) => {
    res.setEncoding('utf8');
    res.on('error', reject);
    res.pipe(concat(resolve));
  });
}).then(JSON.parse);

const downloadShows = downloadAndParseJSON.bind(undefined, `${CHIMERA_API_URL_PREFIX}/shows/?format=json`);

const run = async () => {
  const shows = await downloadShows();
  for (const s of shows) {
    let imageurl = '';
    let pimage = '';
    if (s.name === 'Bankebrett') {
      imageurl = s.image;
      pimage = `uploads/${s.image.substring(45)
        .split('.170x170_q85_crop_upscale.jpg')
        .join('')
        .split('.170x170_q85_crop_upscale.png')
        .join('')}.jpg`;
    } else {
      imageurl = `${s.image
        .replace('thumbs/', '')
        .split('.170x170_q85_crop_upscale.jpg')
        .join('')
        .split('.170x170_q85_crop_upscale.png')
        .join('')}`;
      pimage = `uploads/${s.name.replace('/', '')}_logo${s.image.substring(s.image.length - 4)}`;
    }
    const file = fs.createWriteStream(`../frontend/build/${pimage}`);

    http.get(imageurl, async (res) => {
      res.pipe(file);
      await Image.create({
        filepath: pimage,
      });
    });

    const pdescription = sanitizeHtml(s.description, {
      allowedTags: [],
      allowedAttributes: [],
    });

    await Show.create({
      name: s.name,
      createdBy: 'Radio Revolt',
      slug: S(s.name).slugify().s, // eslint-disable-line new-cap
      digasShowID: s.showID,
      archived: s.is_old,
      image: pimage,
      body: pdescription,
      lead: s.lead,
    });

    const episodes = await downloadAndParseJSON(s.episodes);
    const show = await Show.findOne({ digasShowID: s.showID });
    for (const e of episodes) {
      const edescription = sanitizeHtml(e.lead, {
        allowedTags: [],
        allowedAttributes: [],
      });

      if (e.podcast_url !== null && e.podcast_url !== '') {
        await Episode.create({
          title: e.headline,
          lead: edescription,
          createdAt: e.public_from,
          show: new ObjectId(show.id),
          digasBroadcastID: e.broadcastID,
          digasShowID: s.digasShowID,
          podacstURL: e.podcast_url,
        });
      } else {
        await Episode.create({
          title: e.headline,
          lead: edescription,
          createdAt: e.public_from,
          show: new ObjectId(show.id),
          digasBroadcastID: e.broadcastID,
          digasShowID: s.digasShowID,
          podacstURL: '',
        });
      }
    }
  }

  console.log('Import from Chimera done!'); // eslint-disable-line no-console
};

db.once('open', async () => {
  try {
    await run();
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  } finally {
    mongoose.disconnect();
  }
});

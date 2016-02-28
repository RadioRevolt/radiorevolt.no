import mongoose from 'mongoose';
import loremIpsum from 'lorem-ipsum';

import Show from './app/model/Show';
import Post from './app/model/Post';

const {ObjectId} = mongoose.Types;

const MONGOOSE_URL = 'mongodb://localhost/radiorevolt_test';

const DUMMY_POST_COUNT_PER_SHOW = 5;

mongoose.connect(MONGOOSE_URL);

const db = mongoose.connection;


const show_names = [
  'Reservebenken',
  'Garasjen',
  'Nerdeprat',
  'Reaktor',
  'Feber',
  'Helsebror'
];

const flushCollections = async () => {
  await Show.remove({});
  await Post.remove({});
};

const generateShows = async () => {
  for (const name of show_names) {
    await Show.create({
      name: name
    });
  }
};

const generatePosts = async (cb) => {
  for (const name of show_names) {
    const show = await Show.findOne({name: name});
    for (let i = 0; i < DUMMY_POST_COUNT_PER_SHOW; i++) {
      await Post.create({
        title: `Post number ${i+1}`,
        author: 'Team Rocket',
        show: new ObjectId(show.id)
      });
    }
  }
};

db.once('open', async () => {
  try {
    await flushCollections();
    await generateShows();
    await generatePosts();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
});
import mongoose from 'mongoose';
import loremIpsum from 'lorem-ipsum';


import config from './config';
import Program from './app/model/Program';
import Post from './app/model/Post';

const {ObjectId} = mongoose.Types;

const {MONGODB_URL} = config;

const DUMMY_POST_COUNT_PER_SHOW = 5;

mongoose.connect(MONGODB_URL);

const db = mongoose.connection;


const program_names = [
  'Reservebenken',
  'Garasjen',
  'Nerdeprat',
  'Reaktor',
  'Feber',
  'Helsebror'
];

const flushCollections = async () => {
  await Program.remove({});
  await Post.remove({});
};

const generatePrograms = async () => {
  for (const name of program_names) {
    await Program.create({
      name: name
    });
  }
};

const generatePosts = async (cb) => {
  for (const name of program_names) {
    const program = await Program.findOne({name: name});
    for (let i = 0; i < DUMMY_POST_COUNT_PER_SHOW; i++) {
      await Post.create({
        title: `Post number ${i+1}`,
        author: 'Team Rocket',
        program: new ObjectId(program.id)
      });
    }
  }
};

db.once('open', async () => {
  try {
    await flushCollections();
    await generatePrograms();
    await generatePosts();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
});
import mongoose from 'mongoose';
import loremIpsum from 'lorem-ipsum';


import config from './config';
import Program from './app/model/Program';
import Post from './app/model/Post';
import Broadcast from './app/model/Broadcast';

const {ObjectId} = mongoose.Types;

const {MONGODB_URL} = config;

const DUMMY_POST_COUNT_PER_SHOW = 5;
const DUMMY_POST_BROADCASTS_PER_SHOW = 3;

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
  await Broadcast.remove({});
};

const generatePrograms = async () => {
  let i = 1;
  for (const name of program_names) {
    await Program.create({
      name: name,
      programID: `100${i++}`,
      description: loremIpsum()
    });
  }
};

const generatePosts = async (cb) => {
  for (const name of program_names) {
    const program = await Program.findOne({name: name});
    for (let i = 0; i < DUMMY_POST_BROADCASTS_PER_SHOW; i++) {
      await Post.create({
        title: `Post number ${i+1}`,
        author: 'Team Rocket',
        program: new ObjectId(program.id),
        broadcast: await Broadcast.create({
          title: `Broadcast number ${i+1}`,
          author: 'Team Rocket',
          program: new ObjectId(program.id),
          URL: 'http://pappagorg.radiorevolt.no/somethingsomething'
        })
      });
    }
  }
};

const generatePostsWithoutBroadcast = async (cb) => {
  for (const name of program_names) {
    const program = await Program.findOne({name: name});
    for (let i = DUMMY_POST_BROADCASTS_PER_SHOW; i < DUMMY_POST_COUNT_PER_SHOW; i++) {
      await Post.create({
        title: `Post number ${i+1}`,
        author: 'Team Rocket',
        program: new ObjectId(program.id),
      });
    }
  }
};

db.once('open', async () => {
  try {
    await flushCollections();
    await generatePrograms();
    await generatePosts();
    await generatePostsWithoutBroadcast();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
});
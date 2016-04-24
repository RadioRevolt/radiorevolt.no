import mongoose from 'mongoose';
import loremIpsum from 'lorem-ipsum';
import S from 'string';

import config from './config';
import Program from './app/model/Program';
import Post from './app/model/Post';
import Broadcast from './app/model/Broadcast';
import User from './app/model/User';

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
  'Helsebror',
  'RevoltMorgen',
  'Skammekroken'
];

const flushCollections = async () => {
  await Program.remove({});
  await Post.remove({});
  await Broadcast.remove({});
  await User.remove({});
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


const generatePrograms = async () => {
  let i = 1;
  for (const name of program_names) {
    await Program.create({
      name: name,
      slug: S(name).slugify().s,
      programID: `100${i++}`,
      lead: 'Eksempel på lead for et program.',
      body: '[{"type":"text", "data":{"text":"Dette er et eksempel på et program laget med SirTrevor.js.\\n"}}]'
    });
  }
};

const generatePosts = async (cb) => {
  for (const name of program_names) {
    const program = await Program.findOne({name: name});
    for (let i = 0; i < DUMMY_POST_BROADCASTS_PER_SHOW; i++) {
      var lipsumArray = [];
      for (var j = 0; j < 4; j++) {
        lipsumArray.push("<p>" + loremIpsum({ count: 4, format: 'html' }) + "</p>")
      }
      var lipsum = lipsumArray.join("");
      await Post.create({
        title: `Post number ${i+1}`,
        author_username: '',
        author_text: 'Team Rocket',
        program: new ObjectId(program.id),
        broadcast: await Broadcast.create({
          onDemandAudioID: 3689,
          podcastAudioID: 3434
        }),
        lead: loremIpsum(),
        body: `[{"type": "heading", "data": {"text": "Example episode post ${i+1}", "format": "html"}}, {"type": "text", "data": {"text": "${lipsum}", "format": "html"}}]`
      });
    }
  }
};

const generatePostsWithoutBroadcast = async (cb) => {
  for (const name of program_names) {
    const program = await Program.findOne({name: name});
    for (let i = DUMMY_POST_BROADCASTS_PER_SHOW; i < DUMMY_POST_COUNT_PER_SHOW; i++) {
      var lipsumArray = [];
      for (var j = 0; j < 4; j++) {
        lipsumArray.push("<p>" + loremIpsum({ count: 4, format: 'html' }) + "</p>")
      }
      var lipsum = lipsumArray.join("");
      await Post.create({
        title: `Post number ${i+1}`,
        author_username: '',
        author_text: 'Team Rocket',
        program: new ObjectId(program.id),
        lead: loremIpsum(),
        body: `[{"type": "heading", "data": {"text": "Example post ${i+1}", "format": "html"}}, {"type": "text", "data": {"text": "${lipsum}", "format": "html"}}]`
      });
    }
  }
};

db.once('open', async () => {
  try {
    await flushCollections();
    await generateUsers();
    await generatePrograms();
    await generatePosts();
    await generatePostsWithoutBroadcast();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
});
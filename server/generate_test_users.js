import mongoose from 'mongoose';

import config from './config';
import User from './app/model/User';


const {MONGODB_URL} = config;
const {ObjectId} = mongoose.Types;

mongoose.connect(MONGODB_URL);

const db = mongoose.connection;


const generateUsers = async () => {
  const userData = [
    {
      username: 'journalist',
      password: 'pannekake',
      name: 'Journalist Pournalist'
    },
    {
      username: 'desker',
      password: 'avengers',
      name: 'Desker Fesker'
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

db.once('open', async () => {
  try {
    await generateUsers();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
});

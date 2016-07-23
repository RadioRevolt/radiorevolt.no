import mongoose from 'mongoose';

import { MONGODB_URL } from './server/middlewares/config';
import User from './server/middlewares/model/User';

mongoose.connect(MONGODB_URL);

const db = mongoose.connection;


const generateUsers = async () => {
  const userData = [
    {
      username: 'journalist',
      password: 'pannekake',
    },
    {
      username: 'desker',
      password: 'avengers',
    },
  ];

  for (const ud of userData) {
    try {
      await User.create(ud);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  }
};

db.once('open', async () => {
  try {
    await generateUsers();
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  } finally {
    mongoose.disconnect();
  }
});

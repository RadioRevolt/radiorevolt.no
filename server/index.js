import mongoose from 'mongoose';

import app from './app';

const MONGOOSE_URL = 'mongodb://localhost/radiorevolt_test';

mongoose.connect(MONGOOSE_URL);

const db = mongoose.connection;

db.once('open', () => {
  app.listen(3000, console.log.bind(console, 'Running on port 3000'));
});
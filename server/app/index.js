import express from 'express';
import mongoose from 'mongoose';


import config from '../config';

import apiRouter from './api';

// Assemble the routes
const app = express();
app.use('/api', apiRouter);

// Connect to MongoDB
const {MONGODB_URL} = config;
mongoose.connect(MONGODB_URL);

// Start the server when the connection is up
const SERVER_PORT = 3000;
mongoose.connection.db.once('open', () => {
  app.listen(SERVER_PORT, () => {
    // process.on('SIGINT')
    console.log(`Running server on port ${SERVER_PORT}`);
  });
});
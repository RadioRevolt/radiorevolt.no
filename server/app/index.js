import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import {Strategy} from 'passport-local';

import mongoStoreProvider from 'connect-mongo';
const MongoStore = mongoStoreProvider(session);


import User from './model/User';

import config from '../config';
import apiRouter from './api';

const jsonParser = bodyParser.json();

// Configure authentication
passport.use(new Strategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, {message: 'Incorrect username'});
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false, {message: 'Incorrect password'});
      }

      return done(null, user);
    });
  });
}));
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

const app = express();

// Configure middleware
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'thisisasecretchangethislater',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

// TODO: Change to properly resolve path
app.use(express.static('../frontend/build'));

// Configure auth routes
app.post('/login', jsonParser, passport.authenticate('local'), (req, res) => {
  res.json({
    username: req.user.username
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


// TODO: Change to get info from config instead, to ease deployment
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
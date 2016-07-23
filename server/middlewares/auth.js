const passport = require('passport');
const { Strategy } = require('passport-local');
const { connection } = require('mongoose');
const mongoStoreProvider = require('connect-mongo');
const expressSession = require('express-session');

const User = require('./model/User');

const MongoStore = mongoStoreProvider(expressSession);

// Setting up session
const session = expressSession({
  store: new MongoStore({ mongooseConnection: connection }),
  secret: 'thisisasecretchangethislater',
  resave: false,
  saveUninitialized: true,
  unset: 'destroy',
});

// Configure authentication
passport.use(new Strategy((username, password, done) => {
  User.findOne({ username }, (findErr, user) => {
    if (findErr) return done(findErr);
    if (!user) return done(null, false, { message: 'Incorrect username' });
    return user.comparePassword(password, (compErr, isMatch) => {
      if (compErr) return done(compErr);
      if (!isMatch) return done(null, false, { message: 'Incorrect password' });
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

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(401);
};

module.exports = {
  ensureAuthenticated,
  passport,
  session,
};

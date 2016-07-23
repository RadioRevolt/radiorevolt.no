import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import crypto from 'crypto';
import http from 'http';

import Show from './model/Show';
import Post from './model/Post';
import Episode from './model/Episode';
import User from './model/User';
import Image from './model/Image';


import {ensureAuthenticated} from './auth';

const {ObjectId} = mongoose.Types;

const router = express.Router();
const jsonParser = bodyParser.json();

const IMAGE_UPLOAD_FOLDER = '../frontend/build/uploads/';
const DEFAULT_PAGE_SIZE = 10;

const upload = multer({
  storage: multer.diskStorage({
    destination: IMAGE_UPLOAD_FOLDER,
    filename(req, file, cb) {
      crypto.pseudoRandomBytes(10, (err, raw) => {
        const hex = raw.toString('hex');
        const [name, ext] = file.originalname.split('.');
        cb(err, err ? undefined : `${name}-${hex}.${ext}`);
      });
    }
  })
});

// TODO: Remove these if possible. These should only be added to APIs known to be used externally, which should also be protected or verified in some way
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const partialListQueryHandler = async function(model, req, res) {
  let {limit, page, page_size} = req.query;

  // Passing both limit and page parameters is not supported
  if ((limit !== undefined) && (page !== undefined)) {
    return res.sendStatus(400);
  }

  const docsQuery = model.find({}).sort('-date');

  if (limit) {
    limit = Number(limit);
    return res.json(await docsQuery.limit(limit));
  } else if (page) {
    page_size = page_size || DEFAULT_PAGE_SIZE;
    const offset = (page - 1) * page_size;
    return res.json(await docsQuery.skip(offset).limit(page_size));
  } else {
    return res.json(await docsQuery);
  }
};


router.get('/show', async (req, res) => {
  res.json(await Show.find({}).sort('name'));
});

router.get('/show/:show_id', async (req, res) => {
  const show = await Show.findById(req.params.show_id);
  const posts = await Post.find({
    show: show.id
  });
  res.json({
    show,
    posts
  });
});

router.post('/show', ensureAuthenticated, jsonParser, (req, res) => {
  const show = new Show(req.body);
  show.save((err) => {
    if (err)
      return res.send(err);
    res.json({message: 'Show added.', data: show});
  });
});

router.put('/show/:show_id', ensureAuthenticated, jsonParser, async (req, res) => {
  const show = await Show.findById(req.params.show_id);
  show.update(
  req.body,
  (err, raw) => {
    if (err)
      return res.send(err);
    res.json({message: 'Show updated.'});
  });
});

router.get('/post', partialListQueryHandler.bind(undefined, Post));

router.get('/post/:post_id', async (req, res) => {
  const post = await Post.findById(req.params.post_id);
  res.json(post);
});

router.post('/post', ensureAuthenticated, jsonParser, (req, res) => {
  const post = new Post(req.body);
  post.save((err) => {
    if (err) return res.send(err);
    res.json({message: 'Post added.', data: post});
  });
});

router.put('/post/:post_id', ensureAuthenticated, jsonParser, async (req, res) => {
  const post = await Post.findById(req.params.post_id);
  post.update(
  req.body,
  (err, raw) => {
    if (err) return res.send(err);
    res.json({message: 'Post updated.'});
  });
});

router.get('/episode', partialListQueryHandler.bind(undefined, Episode));

router.get('/episode/:episode_id', async (req, res) => {
  const episode = await Episode.findById(req.params.episode_id);
  res.json(episode);
});

router.post('/episode', ensureAuthenticated, jsonParser, (req, res) => {
  const episode = new Episode(req.body);
  episode.save((err) => {
    if (err) return res.send(err);
    res.json({message: 'Episode added.', data: episode});
  });
});

router.put('/episode/:episode_id', ensureAuthenticated, jsonParser, async (req, res) => {
  const episode = await Episode.findById(req.params.episode_id);
  episode.update(
  req.body,
  (err, raw) => {
    if (err) return res.send(err);
    res.json({message: 'Episode updated.'});
  });
});

router.post('/image', ensureAuthenticated, upload.single('attachment[file]'), async (req, res) => {
  res.json({
    file: {
      url: req.file.path
    }
  });
  await Image.create({
    filepath: req.file.path
  });
});

router.get('/user', ensureAuthenticated, async (req, res) => {
  res.json(await User.find({}, 'username').sort('username'));
});

var getRadioApiPath = function(path, callback, errorCallback) {
  http.get({
    host: 'pappagorg.radiorevolt.no',
    path: path,
    headers: {
      'Content-Type': 'application/json'
    }
  }, (innerRes) => {
    var output = '';
    innerRes.setEncoding('utf8');
    innerRes.on('data', (c) => {
      output += c;
    });
    innerRes.on('end', () => {
      var results = JSON.parse(output);
      callback(results);
    });
  }).on('error', (err) => { errorCallback(err); });
}

router.get('/ondemand', ensureAuthenticated, async (req, res) => {
  getRadioApiPath('/v1/lyd/ondemand/', (results) => {
    res.json(results);
  }, (err) => {
    res.json([]);
  });
});

router.get('/ondemand/:showId', ensureAuthenticated, async (req, res) => {
  getRadioApiPath('/v1/lyd/ondemand/' + req.params.showId, (results) => {
    res.json(results);
  }, (err) => {
    res.json([]);
  });
});

router.get('/ondemand/:showId/:onDemandId', async (req, res) => {
  getRadioApiPath('/v1/lyd/ondemand/' + req.params.showId + '/' + req.params.onDemandId, (results) => {
    res.json(results);
  }, (err) => {
    res.json([]);
  });
});

router.get('/podcast', ensureAuthenticated, async (req, res) => {
  getRadioApiPath('/v1/lyd/podcast/', (results) => {
    res.json(results);
  }, (err) => {
    res.json([]);
  });
});

router.get('/podcast/:showId', ensureAuthenticated, async (req, res) => {
  getRadioApiPath('/v1/lyd/podcast/' + req.params.showId, (results) => {
    res.json(results);
  }, (err) => {
    res.json([]);
  });
});

router.get('/podcast/:showId/:podcastId', async (req, res) => {
  getRadioApiPath('/v1/lyd/podcast/' + req.params.showId + '/' + req.params.podcastId, (results) => {
    res.json(results);
  }, (err) => {
    res.json([]);
  });
});

export default router;

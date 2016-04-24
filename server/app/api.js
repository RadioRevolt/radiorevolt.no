import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import crypto from 'crypto';
import http from 'http';

import Program from './model/Program';
import Post from './model/Post';
import Broadcast from './model/Broadcast';
import User from './model/User';

import {ensureAuthenticated} from './auth';

const {ObjectId} = mongoose.Types;

const router = express.Router();
const jsonParser = bodyParser.json();

const IMAGE_UPLOAD_FOLDER = 'uploads/';
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


router.get('/program', async (req, res) => {
  res.json(await Program.find({}).sort('name'));
});

router.get('/program/:program_id', async (req, res) => {
  const program = await Program.findById(req.params.program_id);
  const posts = await Post.find({
    program: program.id
  });
  res.json({
    program,
    posts: posts
  });
});

router.post('/program', ensureAuthenticated, jsonParser, (req, res) => {
  const program = new Program(req.body);
  program.save((err) => {
    if (err)
      return res.send(err);
    res.json({message: 'Program added.', data: program});
  });
});

router.put('/program/:program_id', ensureAuthenticated, jsonParser, async (req, res) => {
  const program = await Program.findById(req.params.program_id);
  program.update(
  req.body,
  (err, raw) => {
    if (err)
      return res.send(err);
    res.json({message: 'Program updated.'});
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
    if (err)
      console.log(err)
      return res.send(err);
    res.json({message: 'Post added.', data: post});
    console.log("added");
  });
});

router.put('/post/:post_id', ensureAuthenticated, jsonParser, async (req, res) => {
  const post = await Post.findById(req.params.post_id).populate('broadcast');
  post.update(
  req.body,
  (err, raw) => {
    if (err)
      console.log(err);
      return res.send(err);
    res.json({message: 'Post updated.'});
    console.log("updated");
  });
});

router.get('/broadcast', partialListQueryHandler.bind(undefined, Broadcast));

router.get('/broadcast/:broadcast_id', async (req, res) => {
  const broadcast = await Broadcast.findById(req.params.broadcast_id);
  res.json(broadcast);
});

router.post('/broadcast', ensureAuthenticated, jsonParser, (req, res) => {
  const broadcast = new Broadcast(req.body);
  broadcast.save((err) => {
    if (err)
      return res.send(err);
    res.json({message: 'Broadcast added.', data: broadcast});
  });
});

router.put('/broadcast/:broadcast_id', ensureAuthenticated, jsonParser, async (req, res) => {
  const broadcast = await Broadcast.findById(req.params.broadcast_id);
  broadcast.update(
  req.body,
  (err, raw) => {
    if (err)
      return res.send(err);
    res.json({message: 'Broadcast updated.'});
  });
});

router.post('/image', ensureAuthenticated, upload.single('attachment[file]'), (req, res) => {
  res.json({
    file: {
      url: req.file.path
    }
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

router.get('/ondemand/:programId', ensureAuthenticated, async (req, res) => {
  getRadioApiPath('/v1/lyd/ondemand/' + req.params.programId, (results) => {
    res.json(results);
  }, (err) => {
    res.json([]);
  });
});

router.get('/ondemand/:programId/:onDemandId', async (req, res) => {
  getRadioApiPath('/v1/lyd/ondemand/' + req.params.programId + '/' + req.params.onDemandId, (results) => {
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

router.get('/podcast/:programId', ensureAuthenticated, async (req, res) => {
  getRadioApiPath('/v1/lyd/podcast/' + req.params.programId, (results) => {
    res.json(results);
  }, (err) => {
    res.json([]);
  });
});

router.get('/podcast/:programId/:podcastId', async (req, res) => {
  getRadioApiPath('/v1/lyd/podcast/' + req.params.programId + '/' + req.params.podcastId, (results) => {
    res.json(results);
  }, (err) => {
    res.json([]);
  });
});

export default router;

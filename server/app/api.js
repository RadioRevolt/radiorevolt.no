import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import crypto from 'crypto';

import Program from './model/Program';
import Post from './model/Post';
import Broadcast from './model/Broadcast';

const {ObjectId} = mongoose.Types;

const router = express.Router();
const jsonParser = bodyParser.json();

const IMAGE_UPLOAD_FOLDER = 'uploads/';

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

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

router.get('/program', async (req, res) => {
  const programs = await Program.find({});
  res.json(programs);
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

router.post('/program', jsonParser, (req, res) => {
  const program = new Program(req.body);
  program.save((err) => {
    if (err)
      return res.send(err);
    res.json({message: 'Program added.', data: program});
  });
});

router.put('/program/:program_id', jsonParser, async (req, res) => {
  const program = await Program.findById(req.params.program_id);
  program.update(
  req.body,
  (err, raw) => {
    if (err)
      return res.send(err);
    res.json({message: 'Program updated.'});
  });
});

router.get('/post', async (req, res) => {
  res.json(await Post.find({}));
});

router.get('/post/:post_id', async (req, res) => {
  const post = await Post.findById(req.params.post_id);
  res.json(post);
});

router.post('/post', jsonParser, (req, res) => {
  const post = new Post(req.body);
  post.save((err) => {
    if (err)
      return res.send(err);
    res.json({message: 'Post added.', data: post});
  });
});

router.put('/post/:post_id', jsonParser, async (req, res) => {
  const post = await Post.findById(req.params.post_id);
  post.update(
  req.body,
  (err, raw) => {
    if (err)
      return res.send(err);
    res.json({message: 'Post updated.'});
  });
});

router.get('/broadcast', async (req, res) => {
  try {
    res.json(await Broadcast.find({}).sort('-date'));
  }
  catch (e) {
     console.log("error");
  }
});

router.get('/broadcast/:broadcast_id', async (req, res) => {
  const broadcast = await Broadcast.findById(req.params.broadcast_id);
  res.json(broadcast);
});

router.post('/broadcast', jsonParser, (req, res) => {
  const broadcast = new Broadcast(req.body);
  broadcast.save((err) => {
    if (err)
      return res.send(err);
    res.json({message: 'Broadcast added.', data: broadcast});
  });
});

router.put('/broadcast/:broadcast_id', jsonParser, async (req, res) => {
  const broadcast = await Broadcast.findById(req.params.broadcast_id);
  broadcast.update(
  req.body,
  (err, raw) => {
    if (err)
      return res.send(err);
    res.json({message: 'Broadcast updated.'});
  });
});

router.post('/image', upload.single('attachment[file]'), (req, res) => {
  res.json({
    file: {
      url: req.file.path
    }
  });
});

export default router;

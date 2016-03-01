import express from 'express';
import mongoose from 'mongoose';

import Program from './model/Program';
import Post from './model/Post';
import Broadcast from './model/Broadcast';

const {ObjectId} = mongoose.Types;

const router = express.Router();

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

router.get('/post', async (req, res) => {
  res.json(await Post.find({}));
});

router.get('/broadcast', async (req, res) => {
  res.json(await Broadcast.find({}));
});

export default router;
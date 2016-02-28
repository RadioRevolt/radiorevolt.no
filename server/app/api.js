import express from 'express';
import mongoose from 'mongoose';

import Program from './model/Program';
import Post from './model/Post';

const {ObjectId} = mongoose.Types;

const router = express.Router();


router.get('/program/:program_name', async (req, res) => {
  const program = await Program.findByName(req.params.program_name);
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


export default router;
import express from 'express';
import mongoose from 'mongoose';

import Show from './model/Show';
import Post from './model/Post';

const {ObjectId} = mongoose.Types;

const router = express.Router();


router.get('/show/:show_name', async (req, res) => {
  const show = await Show.findByName(req.params.show_name);
  const posts = await Post.find({
    show: show.id
  });
  res.json({
    show,
    posts: posts
  });
});

router.get('/post', async (req, res) => {
  res.json(await Post.find({}));
});


export default router;
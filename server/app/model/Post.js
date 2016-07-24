import mongoose from 'mongoose';

import shortid from 'shortid';

const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  publishAt: {
    type: Date,
    default: Date.now
  },
  createdBy: String,
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  program: ObjectId,
  body: String,
  lead: String
});

const Post = mongoose.model('Post', postSchema);
export default Post;

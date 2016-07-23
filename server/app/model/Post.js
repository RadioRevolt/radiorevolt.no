import mongoose from 'mongoose';

import shortid from 'shortid';

const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  publishAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: String,
  title: String,
  slug: String,
  show: ObjectId,
  body: String,
  lead: String
});

const Post = mongoose.model('Post', postSchema);
export default Post;

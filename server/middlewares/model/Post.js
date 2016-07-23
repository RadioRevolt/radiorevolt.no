const mongoose = require('mongoose');
const shortid = require('shortid');

const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  publishAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: String,
  title: String,
  slug: String,
  show: ObjectId,
  body: String,
  lead: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

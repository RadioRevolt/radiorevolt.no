import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: String,
  date: {
    type: Date,
    default: Date.now
  },
  author: String,
  program: ObjectId,
  broadcast: {
    type: ObjectId,
    default: null
  },
  body: String,
  lead: String
});

const Post = mongoose.model('Post', postSchema);
export default Post;
import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: String,
  date: Date,
  author: String,
  show: ObjectId
});

const Post = mongoose.model('Post', postSchema);
export default Post;
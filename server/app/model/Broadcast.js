import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;

const broadcastSchema = new mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now
  },
  author: String,
  program: ObjectId,
  URL: String
});


const Broadcast = mongoose.model('Broadcast', broadcastSchema);
export default Broadcast;
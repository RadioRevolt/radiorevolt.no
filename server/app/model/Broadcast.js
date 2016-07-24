import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;

const broadcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  digasBroadcastID: {
    type: String,
    required: true
  },
  digasShowID: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lead: String,
  program: ObjectId,
  podcastURL: String
});


const Broadcast = mongoose.model('Broadcast', broadcastSchema);
export default Broadcast;

import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;

const broadcastSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: String,
  lead: String,
  show: ObjectId,
  digasBroadcastID: String,
  digasShowID: String,
  podcastURL: String
});


const Broadcast = mongoose.model('Broadcast', broadcastSchema);
export default Broadcast;

import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;

const broadcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  digasBroadcastID: String,
  digasShowID: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lead: String,
  program: ObjectId,
  programName: String,
  programSlug: String,
  podcastURL: String
});


const Broadcast = mongoose.model('Broadcast', broadcastSchema);
export default Broadcast;

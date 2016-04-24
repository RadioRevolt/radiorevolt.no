import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;

const broadcastSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  onDemandAudioID: String,
  podcastAudioID: String
});


const Broadcast = mongoose.model('Broadcast', broadcastSchema);
export default Broadcast;
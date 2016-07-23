const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const broadcastSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: String,
  lead: String,
  show: ObjectId,
  digasBroadcastID: String,
  digasShowID: String,
  podcastURL: String,
});


const Broadcast = mongoose.model('Broadcast', broadcastSchema);

module.exports = Broadcast;

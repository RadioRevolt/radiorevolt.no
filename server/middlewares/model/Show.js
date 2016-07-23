const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  digasShowID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  body: String,
  lead: String,
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;

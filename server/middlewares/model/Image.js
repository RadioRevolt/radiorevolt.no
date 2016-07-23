const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filepath: String,
});


const Image = mongoose.model('Image', imageSchema);

module.exports = Image;

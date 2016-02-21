import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  name: String
});

showSchema.statics.findByName = function(name, cb) {
  return this.find({
    name: new RegExp(name, 'i')
  }, cb);
};

const Show = mongoose.model('Show', showSchema);
export default Show;
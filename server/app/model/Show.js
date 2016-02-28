import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  name: String
});

showSchema.statics.findByName = function(name) {
  return this.findOne({
    name: new RegExp(name, 'i')
  });
};




const Show = mongoose.model('Show', showSchema);
export default Show;
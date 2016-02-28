import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  name: String
});

programSchema.statics.findByName = function(name) {
  return this.findOne({
    name: new RegExp(name, 'i')
  });
};




const Program = mongoose.model('Program', programSchema);
export default Program;
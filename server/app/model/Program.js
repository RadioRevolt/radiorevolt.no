import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  name: String
});

const Program = mongoose.model('Program', programSchema);
export default Program;
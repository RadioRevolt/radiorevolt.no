import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  programID: {
    type: String,
    required: true
  },
  description: String
});

const Program = mongoose.model('Program', programSchema);
export default Program;
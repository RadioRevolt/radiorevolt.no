import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;

const imageSchema = new mongoose.Schema({
	filepath: String
});


const Image = mongoose.model('Image', imageSchema);
export default Image;
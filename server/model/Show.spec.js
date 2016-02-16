import mongoose from 'mongoose';
import {Show} from './Show';


describe('Model Show', () => {
  let db;
  
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/test');
    db = mongoose.connection;
    db.once('open', done);
  });
  
  afterAll((done) => {
    Show.remove({}).then(() => {
      mongoose.disconnect(done);
    });
  });
  
});
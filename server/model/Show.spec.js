import mongoose from 'mongoose';

import Show from './Show';

import should from 'should';

should();


describe('Model Show', () => {
  before((done) => {
    if (typeof mongoose.connection.db !== 'undefined') {
      return done();
    }

    mongoose.connect('mongodb://localhost/test');
    mongoose.connection.db.once('open', done);
  });

  after((done) => {
    Show.remove({}).then(() => {
      mongoose.disconnect(done);
    });
  });

  it('Should work here!', function () {
  });

});
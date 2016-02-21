import mongoose from 'mongoose';
import async from 'async';

import Show from './app/model/Show';

const MONGOOSE_URL = 'mongodb://localhost/radiorevolt_test';

mongoose.connect(MONGOOSE_URL);

const db = mongoose.connection;


const show_names = [
  'Reservebenken',
  'Garasjen',
  'Nerdeprat',
  'Reaktor',
  'Feber',
  'Helsebror'
];

db.once('open', () => {
  Show.remove({}).then(() => {
    let save_callbacks = show_names.map((name) => {
      return (cb) => {
        new Show({name: name}).save(cb);
      };
    });

    async.series(save_callbacks, (err, results) => {
      console.log(results);
      mongoose.disconnect();
    });
  });
});
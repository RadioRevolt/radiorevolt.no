import express from 'express';

import Show from './model/Show';

const router = express.Router();

router.get('/show', (req, res) => {
  Show.find({}).then((shows) => {
    res.json(shows);
  });
});

export default router;
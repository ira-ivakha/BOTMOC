const express = require('express');
const router = express.Router();
const download = require('../download');
const db = require('../../db');

router.get('/', async (req, res, next) => {
  await download.download(req);
  res.download('./files/botmoc.fig');
});

router.get('/all', async (req, res, next) => {
  db.User.findAll().then((users) => {
    res.send(users);
  });
});

module.exports = router;

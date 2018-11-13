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

router.get('/reset', async (req, res, next) => {
  db.User.drop().then(() => {
    res.send('DB_USERS DROPPED');
  });
});

router.get('/create', async (req, res, next) => {
  db.User.create().then(() => {
    res.send('DB_USERS CREATED');
  });
});
router;

module.exports = router;

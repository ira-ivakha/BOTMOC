const express = require('express');
const router = express.Router();
const pino = require('pino');
const logger = pino({ prettyPrint: { colorize: true }, level: process.env.LOG_LEVEL || 'info', name: 'index' });
const download = require('../download');
const db = require('../../db');

router.get('/', async (req, res, next) => {
  await download.download(req);
  res.download('./files/botmoc.fig');
});

router.get('/all', async (req, res, next) => {
  db.User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      logger.error('Error find the users ', err);
    });
});

router.get('/count', async (req, res, next) => {
  db.User.findAndCountAll()
    .then((count) => {
      res.send(count);
    })
    .catch((err) => {
      logger.error('Error counting all users ', err);
    });
});

module.exports = router;

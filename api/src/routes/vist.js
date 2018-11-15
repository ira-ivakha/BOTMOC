const express = require('express');
const router = express.Router();
const pino = require('pino');
const logger = pino({ prettyPrint: { colorize: true }, level: process.env.LOG_LEVEL || 'info', name: 'index' });
const vist = require('../visit');
const db = require('../../db');

router.get('/', async (req, res, next) => {
  vist.vists(req);
  res.send('vist');
});

// router.get('/all', async (req, res, next) => {
//   db.Vist.findAll()
//     .then((vists) => {
//       res.send(vists);
//     })
//     .catch((err) => {
//       logger.error('Error find the visitors', err);
//     });
// });

router.get('/count', async (req, res, next) => {
  let countData = await db.Vist.findAndCountAll().catch((err) => {
    logger.error('Error counting all visitors ', err);
  });
  res.send(countData);
});

module.exports = router;

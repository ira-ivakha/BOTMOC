const express = require('express');
const router = express.Router();
const pino = require('pino');
const logger = pino({ prettyPrint: { colorize: true }, level: process.env.LOG_LEVEL || 'info', name: 'index' });
const vist = require('../visit');
const db = require('../../db');

router.get('/', async (req, res, next) => {
  vist.vists();
});

router.get('/count', async (req, res, next) => {
  let countData = await db.User.findAndCountAll().catch((err) => {
    logger.error('Error counting all users ', err);
  });
  // res.send(JSON.stringify(countData.count));
  res.send(countData);
});

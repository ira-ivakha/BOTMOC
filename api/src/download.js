require('dotenv').config();
const pino = require('pino');
const logger = pino({ prettyPrint: { colorize: true }, level: process.env.LOG_LEVEL || 'info', name: 'index' });
const db = require('../db');

function download(req) {
  logger.info(req.connection.remoteAddress);
  logger.info(req);
}

module.exports.download = download;

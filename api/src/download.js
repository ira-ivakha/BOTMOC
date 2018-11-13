require('dotenv').config();
const pino = require('pino');
const logger = pino({ prettyPrint: { colorize: true }, level: process.env.LOG_LEVEL || 'info', name: 'index' });
const db = require('../db');
const requestIp = require('request-ip');
const iplocation = require('iplocation').default;
async function download(req) {
  let clientIp = requestIp.getClientIp(req);

  let locationData = await iplocation(clientIp).catch((err) => {
    logger.error('Error looking up ip address ', err);
  });

  let userData = await db.User.create({
    // ip: req.connection.remoteAddress,
    ip: clientIp,
    locationData: locationData,
    //prettier-ignore
    userAgent: req.headers["user-agent"],
    //prettier-ignore
    acceptLanguage: req.headers["accept-language"]
  }).catch((err) => {
    logger.error('Error writing user to db', err);
  });
  logger.info(JSON.stringify(userData));
}

module.exports.download = download;

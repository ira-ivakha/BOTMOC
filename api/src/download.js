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

async function formattedLocationData() {
  let userData = await db.User.findAll().catch((err) => {
    logger.error('Error find the users ', err);
  });

  let locationData = [];

  for (let location of userData) {
    let singleLocation = [];

    singleLocation.push(location.locationData.city);
    let longAndLat = `${location.locationData.latitude}, ${location.locationData.longitude}`;
    singleLocation.push(longAndLat);

    locationData.push(singleLocation);
  }

  return locationData;
}

module.exports.download = download;
module.exports.formattedLocationData = formattedLocationData;

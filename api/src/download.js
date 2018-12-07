require('dotenv').config();
const pino = require('pino');
const logger = pino({ prettyPrint: { colorize: true }, level: process.env.LOG_LEVEL || 'info', name: 'index' });
const db = require('../db');
const requestIp = require('request-ip');
const axios = require('axios');

async function download(req) {
  let clientIp = requestIp.getClientIp(req);

  axios
    .get(`https://ipapi.co/${clientIp}/json`)
    .then(function(response) {
      db.User.create({
        locationData: response.data,
        //prettier-ignore
        userAgent: req.headers["user-agent"],
        //prettier-ignore
        acceptLanguage: req.headers["accept-language"]
      })
        .then((data) => {
          logger.info(JSON.stringify(data));
        })
        .catch((err) => {
          logger.error('Error writing user to db', err);
        });
    })
    .catch(function(err) {
      logger.error('Error looking up the ip', err);
    });
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

require('dotenv').config();
const pino = require('pino');
const logger = pino({ prettyPrint: { colorize: true }, level: process.env.LOG_LEVEL || 'info', name: 'index' });
const db = require('../db');
const requestIp = require('request-ip');
const axios = require('axios');

async function vists(req) {
  let clientIp = await requestIp.getClientIp(req);

  axios
    .get(`https://ipapi.co/${clientIp}/json`)
    .then(function(response) {
      db.Vist.create({
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
      logger.error('Error looking up IP', err);
    });
}

module.exports.vists = vists;

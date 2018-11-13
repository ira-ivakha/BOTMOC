const express = require('express');
const router = express.Router();
const download = require('../download');

router.get('/', async (req, res, next) => {
  download.download(req);
  res.download('./files/botmoc.fig');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const api = require('./ApiRouter');

router.use('/api/app', api)
module.exports = router;

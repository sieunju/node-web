const express = require('express');
const router = express.Router();
const api = require('./ApiRouter');

router.use('/api/dummy', api)
module.exports = router;

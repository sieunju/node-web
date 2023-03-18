const express = require('express');
const router = express.Router();
const api = require('./ApiRouter');
const view = require('./ViewRouter');

router.use('/api/dummy', api)
router.use('/view/dummy',view)
module.exports = router;

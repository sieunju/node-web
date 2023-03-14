const express = require('express');
const router = express.Router();
const api = require('./ApiRouter');
const view = require('./ViewRouter');

router.use('/api/android', api)
router.use('/view/android', view);
module.exports = router;

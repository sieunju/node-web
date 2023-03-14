const express = require('express');
const router = express.Router();
const api = require('./ApiRouter');
const view = require('./ViewRouter');

router.use('/api/file', api)
router.use('/view/file', view);
module.exports = router;

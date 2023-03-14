const express = require('express');
const router = express.Router();
const api = require('./ApiRouter');
const view = require('./ViewRouter');

router.use('/api/memo_upload', api)
router.use('/view/memo_upload', view);
module.exports = router;

const express = require('express');
const router = express.Router();
const api = require('./ApiRouter');
const view = require('./ViewRouter');

router.use('/api/memo', api)
router.use('/view/memo', view);
module.exports = router;

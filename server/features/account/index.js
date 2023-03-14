const express = require('express');
const router = express.Router();
const api = require('./ApiRouter');
const view = require('./ViewRouter');

router.use('/api/account', api)
router.use('/view/account', view);
module.exports = router;

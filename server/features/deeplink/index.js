const express = require('express');
const router = express.Router();
const api = require('./ApiRouter');
const view = require('./ViewRouter');

router.use('/api/deeplink', api)
router.use('/view/deeplink', view);
module.exports = router;

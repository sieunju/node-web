const express = require('express');
const router = express.Router();
const api = require('./ApiRouter');
const view = require('./ViewRouter');

router.use('/api/java', api)
router.use('/view/java', view);
module.exports = router;

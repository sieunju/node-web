const express = require('express');
const router = express.Router();
const authApi = require('./auth/ApiRouter');
const errorHandlingApi = require('./error_handling/ApiRouter');
const goodsApi = require('./goods/ApiRouter');
const jsendApi = require('./jsend/ApiRouter');

router.use('/api/til/auth', authApi);
router.use('/api/til/error', errorHandlingApi);
router.use('/api/til/goods', goodsApi);
router.use('/api/til/jsend', jsendApi);

module.exports = router;

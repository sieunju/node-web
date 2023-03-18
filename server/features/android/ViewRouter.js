/**
 * BaseEndPoint /view/android/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const repository = require('./Repository');
const utils = require('../../utils/commandUtil');
const router = express.Router();
const PREFIX = 'android/'

/**
 * EndPoint: /view/android
 */
router.get('/', (req, res) => {
    res.render(PREFIX + 'androidMemo.html');
    res.end();
})

/**
 * EndPoint: /view/android/add
 */
router.get('/add', (req, res) => {
    res.render(PREFIX + 'androidAddMemo.html');
    res.end();
})

module.exports = router
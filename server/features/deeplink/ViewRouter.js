/**
 * BaseEndPoint /view/deeplink/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const router = express.Router();
const utils = require('../../utils/commandUtil')
const PREFIX = 'deeplink_bot/'

/**
 * EndPoint: /view/deeplink
 */
router.get('/', (req, res) => {
    res.render(PREFIX + 'deepLink.html')
    res.end()
})


/**
 * EndPoint: /view/deeplink/add
 */
router.get('/add', (req, res) => {
    res.render(PREFIX + 'addDeepLink.html')
    res.end()
})


/**
 * EndPoint: /view/deeplink/privacy
 */
router.get('/privacy', (req, res) => {
    res.render(PREFIX + 'deeplinkbot-privacy.html')
    res.end()
})

module.exports = router

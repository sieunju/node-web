/**
 * BaseEndPoint /api/deeplink/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const router = express.Router();
const repository = require('./Repository');
const utils = require('../../utils/commandUtil')

/**
 * EndPoint: /api/deeplink
 */
router.post('/', (req, res) => {
    try {
        repository.addDeepLink(req.body, function onMessage(err, rows) {
            if (err) {
                res.status(404).end()
            } else {
                console.log("DB Success " + rows)
                res.redirect('/view/deepLink')
            }
        })
    } catch (err) {
        res.status(404).end()
    }
})

/**
 * EndPoint: /api/deeplink
 */
router.get('/', (req, res) => {
    try {
        repository.fetchDeepLink(function onMessage(err, rows) {
            if (err) {
                res.status(404).end()
            } else {
                res.status(200).send({
                    status: true,
                    list: rows
                }).end()
            }
        })
    } catch (err) {
        res.status(404).end()
    }
})

module.exports = router

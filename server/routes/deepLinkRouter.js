const express = require('express');
const router = express.Router();
const dataModel = require('../models/deepLinkModel');
const utils = require('../utils/commandUtil');

router.get('/deepLink', (req, res) => {
    res.render('deepLink.html')
    res.end()
})

router.get('/addDeepLink', (req, res) => {
    res.render('addDeepLink.html')
    res.end()
})

router.post('/api/deepLink', (req, res) => {
    try {
        dataModel.addDeepLink(req.body, function onMessage(err, rows) {
            if (err) {
                res.status(404).end()
            } else {
                console.log("DB Success " + rows)
                res.redirect('/deepLink')
            }
        })
    } catch (err) {
        res.status(404).end()
    }
})

router.get('/api/deepLink', (req,res) => {
    try{
        dataModel.fetchDeepLink(function onMessage(err, rows) {
            if (err) {
                res.status(404).end()
            } else {
                res.status(200).send({
                    status : true,
                    list : rows
                }).end()
            }
        })
    } catch(err) {
        res.status(404).end()
    }
})

router.get('/deeplink/privacy', (req, res) => {
    res.render('deeplinkbot-privacy.html')
    res.end()
})

module.exports = router
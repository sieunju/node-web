/**
 * BaseEndPoint /api/android/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const router = express.Router();
const repository = require('./Repository');
const utils = require('../../utils/commandUtil');

/**
 * EndPoint: /api/android/
 */
router.get('/', (req, res) => {
    try {
        repository.fetch(function onMessage(err, rows) {
            if (err) {
                console.log(req.method + + req.path + " Error " + err)
                res.status(416).send({
                    status: false,
                    errMsg: err
                }).end();
            } else {
                // console.log(req)
                res.status(200).send({
                    status: true,
                    list: rows
                }).end()
            }
        })
    } catch (err) {
        console.log('FetchMemo Error ' + err);
        res.status(416).send({
            status: false,
            errMsg: err
        }).end();
    }
})

/**
 * 안드로이드 기본 개념 관련 메모 추가.
 * EndPoint: /api/android/
 */
router.post('/', (req, res) => {
    try {
        console.log(req.body)
        repository.post(req.body, function onMessage(err, rows) {
            if (err) {
                console.log(req.method + + req.path + " Error " + err)
                res.status(416).send({
                    status: false,
                    errMsg: err
                }).end();
            } else {
                console.log("DB Success " + rows)
                res.redirect('/view/android')
            }
        })

    } catch (err) {
        console.log('AddMemo Error ' + err);
        res.status(416).send({
            status: false,
            errMsg: err
        }).end();
    }
})

module.exports = router
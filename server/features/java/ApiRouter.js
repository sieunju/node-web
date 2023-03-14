/**
 * BaseEndPoint /api/java/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const router = express.Router();
const repository = require('./Repository');
const utils = require('../../utils/commandUtil');

/**
 * Java 기본 개념 추가 하기
 * EndPoint: /api/memo/contents/java
 */
router.post('/', (req, res) => {
    try {
        console.log(req.body)
        repository.post(req.body, function onMessage(err, rows) {
            if (err) {
                console.log("POST /api/java/memo Error " + err)
                res.status(416).send({
                    status: false,
                    errMsg: err
                }).end();
            } else {
                console.log("DB Success " + rows)
                res.redirect('/java')
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

/**
 * EndPoint: /api/java
 */
router.get('/', (req, res) => {
    try {
        repository.fetch(function onMessage(err, rows) {
            if (err) {
                console.log("GET /api/java Error " + err)
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

module.exports = router
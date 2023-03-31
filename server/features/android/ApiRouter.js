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
 * @swagger
 *
 * /api/android:
 *  get:
 *    summary: "안드로이드 기본 지식을 조회 합니다."
 *    description: "지금까지 안드로이드 지식들을 정리한 데이터를 조회하는 API 입니다."
 *    tags: [android]
 * 
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: true
 *                  list:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              TITLE:
 *                                  type: string
 *                                  description: 제목
 *                                  example: 안드로이드 4대 컴포넌트
 *                              CONTENTS:
 *                                  type: string
 *                                  description: 내용
 *                                  example: Activity, Service, BroadCast Receiver, ContentProvider
 *                          
 *                      
 *      416:
 *          description: DB 조회 에러
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: boolean
 *                              example: false
 *                          errMsg:
 *                              type: string
 *                              example: Error
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
 * @swagger
 *
 * /api/android:
 *  post:
 *    summary: "안드로이드 기본 개념 관련 메모 추가"
 *    tags: [android]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                  type: string
 *                  example: 안드로이드 4대 컴포넌트
 *              contents:
 *                  type: string
 *                  example: Activity, Service, BroadCast Receiver, ContentProvider
 *    responses:
 *      200:
 *        content:
 *          text/html:
 *              schema:
 *                  type: link
 *                  example: /view/android
 *                          
 *                      
 *      416:
 *          description: DB 조회 에러
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: boolean
 *                              example: false
 *                          errMsg:
 *                              type: string
 *                              example: Error
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
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
 * @swagger
 *
 * /api/java:
 *  post:
 *    summary: "자바 기본 개념 관련 메모 추가"
 *    tags: [java]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                  type: string
 *                  example: Java란?
 *              contents:
 *                  type: string
 *                  example: 제임스 고슬링이 만든 언어입니다.
 *    responses:
 *      200:
 *        content:
 *          text/html:
 *              schema:
 *                  type: link
 *                  example: /view/java
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
                console.log("POST /api/java Error " + err)
                res.status(416).send({
                    status: false,
                    errMsg: err
                }).end();
            } else {
                console.log("DB Success " + rows)
                res.redirect('/view/java')
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
 * @swagger
 *
 * /api/java:
 *  get:
 *    summary: "자바 기본 지식을 조회 합니다."
 *    description: "지금까지 자바 지식들을 정리한 데이터를 조회하는 API 입니다."
 *    tags: [java]
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
 *                                  example: Java란?
 *                              CONTENTS:
 *                                  type: string
 *                                  description: 내용
 *                                  example: 제임스 고슬링이 만든 언어입니다.
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
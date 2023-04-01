const express = require('express');
const router = express.Router();
const utils = require('../../utils/commandUtil');


/**
 * @swagger
 *
 * /api/dummy/test:
 *  get:
 *    summary: "API 테스트입니다."
 *    description: "1.5 초뒤에 데이터를 랜덤으로 리턴하는 API 입니다."
 *    tags: [dummy]
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
 *                  name:
 *                      type: string
 *                      example: "Mr.Ju or {No Field}"
 *                  test:
 *                      type: string
 *                      example: "{dddd} or {No Field}"
 *                  age:
 *                      type: int
 *                      example: 30
 */
router.get('/test', (req, res) => {
    try {
        setTimeout(function () {
            let ran = Math.floor(Math.random() * 10)
            if (ran < 5) {
                res.status(200).send({
                    status: true,
                    name: "Mr.Ju",
                    age: 30
                }).end()
            } else {
                res.status(201).send({
                    status: true,
                    test: "dddd",
                    age: 30
                }).end()
            }
        }, 1500)
    } catch (err) {
        console.log("Error " + err)
    }
})

/**
 * @swagger
 *
 * /api/dummy/test:
 *  post:
 *    summary: "API 테스트입니다."
 *    description: "데이터를 랜덤으로 리턴하는 API 입니다."
 *    tags: [dummy]
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
 *                  test:
 *                      type: string
 *                      example: dddd
 *                  age:
 *                      type: int
 *                      example: 30
 *      403:
 *          description: "랜덤 에러입니다."
 */
router.post('/test', (req, res) => {
    try {
        let ranBoolean = Math.random() < 0.7
        if (ranBoolean) {
            res.status(200).send({
                status: true,
                test: "dddd",
                age: 30
            }).end()
        } else {
            res.status(403).end()
        }
    } catch (err) {
        console.log("Error " + err)
    }
})

/**
 * @swagger
 *
 * /api/dummy/test/{cnt}:
 *  get:
 *    summary: "API 테스트입니다."
 *    description: "데이터를 랜덤으로 리턴하는 API 입니다."
 *    tags: [dummy]
 *    parameters:
 *        - in: path
 *          name: cnt
 *          description: 랜덤 카운트
 *          schema:
 *              type: int
 *              example: 1
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
 *                  test:
 *                      type: string
 *                      example: dddd
 *                  age:
 *                      type: int
 *                      example: 30
 *      503:
 *          description: "랜덤 에러입니다."
 */
router.get('/test/:cnt', (req, res) => {
    try {
        let cnt = req.params.cnt

        if (cnt > 2) {
            res.status(200).send({
                status: true,
                test: "dddd",
                age: cnt
            }).end()
        } else {
            res.status(503).end()
        }
    } catch (err) {
        console.log("Error " + err)
    }
})

module.exports = router
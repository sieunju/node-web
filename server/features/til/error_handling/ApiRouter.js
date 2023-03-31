/**
 * 에러 관련 코드 라우터
 */
const express = require('express');
const router = express.Router();
const utils = require('../../../utils/commandUtil')

/**
 * @swagger
 *
 * /api/til/error/505:
 *  get:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "HTTP 505 에러 입니다."
 *    tags: [TIL_ERROR]
 *    responses:
 *      505:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: false
 *                  message:
 *                      type: string
 *                      example: 505 Get 방식의 Error 입니다.
 * 
 */
router.get('/505', (req, res) => {
    res.status(505).send({
        status: false,
        message: "505 Get 방식의 Error 입니다."
    }).end()
})

/**
 * @swagger
 *
 * /api/til/error/505:
 *  post:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "HTTP 505 에러 입니다."
 *    tags: [TIL_ERROR]
 *    responses:
 *      505:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: false
 *                  message:
 *                      type: string
 *                      example: 505 Post 방식의 Error 입니다.
 * 
 */
router.post('/505', (req, res) => {
    res.status(505).send({
        status: false,
        message: "505 Post 방식의 Error 입니다."
    }).end()
})

/**
 * @swagger
 *
 * /api/til/error/404:
 *  post:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "HTTP 505 에러 입니다."
 *    tags: [TIL_ERROR]
 *    responses:
 *      505:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: false
 *                  message:
 *                      type: string
 *                      example: 404 Post 방식의 Error 입니다.
 * 
 */
router.post('/404', (req, res) => {
    res.status(404).send({
        status: false,
        message: "404 Post 방식의 Error 입니다."
    }).end()
})

/**
 * @swagger
 *
 * /api/til/error/404:
 *  get:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "HTTP 404 에러 입니다."
 *    tags: [TIL_ERROR]
 *    responses:
 *      404:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: false
 *                  message:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Hello
 *                          contents:
 *                              type: string
 *                              example: Error Contents
 * 
 */
router.get('/404', (req, res) => {
    const erroMsg = {
        "name": "Hello",
        "contents": "Error Contents"
    }

    res.status(404).send({
        status: false,
        message: erroMsg
    }).end()
})

module.exports = router

/**
 * 사용자 인증 라우터
 */
const express = require('express');
const router = express.Router();
const utils = require('../../../utils/commandUtil')

/**
 * @swagger
 *
 * /api/til/auth/refresh:
 *  post:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "Auth Token 갱신"
 *    tags: [TIL]
 *    parameters:
 *        - in: header
 *          name: Token
 *          description: 토큰
 *          schema:
 *              type: string
 *              example: randomtoken
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
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *                                      example: Token Migane Koda Dewdy
 */
router.post('/refresh', (req, res) => {
    // Refresh Token..
    var token = req.header('Token')
    console.log("TOKEEE " + token)
    var refreshToken = "Token Migane Koda Dewdy"
    res.status(200).send({
        status: true,
        data: {
            payload: {
                token: refreshToken
            }
        }
    }).end()
})

/**
 * @swagger
 *
 * /api/til/auth/expired:
 *  post:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "만료되는 토큰 발급 받기 입니다."
 *    tags: [TIL]
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
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *                                      example: Token Expired 112123123123
 */
router.post('/expired', (req, res) => {
    var expiredToken = 'Token Expired ' + new Date().getTime()
    console.log('Expired Token ' + expiredToken)
    res.status(200).send({
        status: true,
        data: {
            payload: {
                token: expiredToken
            }
        }
    }).end()
})

/**
 * @swagger
 *
 * /api/til/auth/test:
 *  get:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "만료되는 토큰 발급 받기 입니다."
 *    tags: [TIL]
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
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  integer:
 *                                      type: date-time
 *                                      example: 112123123123
 *                                  str:
 *                                      type: string
 *                                      example: 그대와 처음 만난 이곳 모든날 모든 순간 좋았다.
 */
router.get('/test', (req, res) => {
    res.status(200).send({
        status: true,
        data: {
            payload: {
                integer: new Date().getTime(),
                str: utils.randomMessage()
            }
        }
    }).end()
})

module.exports = router
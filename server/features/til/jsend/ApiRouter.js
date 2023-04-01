/**
 * JSON jsend 규칙 관련 라우터
 */
const express = require('express');
const router = express.Router();
const utils = require('../../../utils/commandUtil')

/**
 * @swagger
 *
 * /api/til/jsend:
 *  get:
 *    summary: TIL 전용 API 테스트 입니다.
 *    description: JSend 형식으로 리턴합니다.
 *    tags: [TIL_JSEND]
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
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: long
 *                                      example: 1680268354291
 *                          
 */
router.get('/', (req, res) => {
    res.status(200).send({
        status: true,
        data: {
            payload: {
                id: new Date().getTime()
            }
        }
    }).end()
})

/**
 * @swagger
 *
 * /api/til/jsend/meta:
 *  get:
 *    summary: TIL 전용 API 테스트 입니다.
 *    description: JSend 형식으로 리턴합니다.
 *    tags: [TIL_JSEND]
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
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: long
 *                                      example: 1680268354291
 *                          meta:
 *                              type: object
 *                              properties:
 *                                  metaSize:
 *                                      type: int
 *                                      example: 1234
 *                          
 */
router.get('/meta', (req, res) => {
    res.status(200).send({
        status: true,
        data: {
            payload: {
                id: new Date().getTime()
            },
            meta: {
                metaSize: utils.randomInt()
            }
        }
    }).end()
})

/**
 * @swagger
 *
 * /api/til/jsend/list:
 *  get:
 *    summary: TIL 전용 API 테스트 입니다.
 *    description: JSend 형식으로 리턴합니다.
 *    tags: [TIL_JSEND]
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
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  example: aaa
 *                          
 */
router.get('/list', (req, res) => {
    res.status(200).send({
        status: true,
        data: {
            payload: [
                "aaa", "bbb"
            ]
        }
    }).end()
})

/**
 * @swagger
 *
 * /api/til/jsend/list/meta:
 *  get:
 *    summary: TIL 전용 API 테스트 입니다.
 *    description: JSend 형식으로 리턴합니다.
 *    tags: [TIL_JSEND]
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
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  example: aaa
 *                          meta:
 *                              type: object
 *                              properties:
 *                                  metaSize:
 *                                      type: int
 *                                      example: 1234
 *                          
 */
router.get('/list/meta', (req, res) => {
    const ran = Math.random() < 0.5
    if(ran == true) {
        res.status(200).send({
            status: true,
            data: {
                payload: [
                    "aaa", "bbb"
                ],
                meta: {
                    metaSize: utils.randomInt()
                }
            }
        }).end()
    } else {
        res.status(404).end();
    }
})

/**
 * @swagger
 *
 * /api/til/jsend/error/test:
 *  get:
 *    summary: TIL 전용 API 테스트 입니다.
 *    description: 랜덤 에러를 리턴합니다.
 *    tags: [TIL_JSEND]
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
 *                  message:
 *                      type: string
 *                      example: Data is Null
 *      
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
 *                      type: string
 *                      example: 에러 헨들링 테스트 입니다.
 * 
 *      500:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: false
 *                  data:
 *                      type: object
 *                      properties:
 *                          meta:
 *                              type: object
 *                              properties:
 *                                  notice:
 *                                      type: string
 *                                      example: 서버가 꺼져 있습니다.
 *                          
 */
router.get('/error/test',(req, res) => {
    const ran = Math.random()
    if(ran < 0.3) {
        res.status(200).send({
            status: true,
            message: "Data is Null"
        }).end()
    } else if (ran < 0.7) {
        res.status(404).send({
            status: false,
            message: "에러 헨들링 테스트 입니다."
        }).end()
    } else {
        res.status(500).send({
            status: false,
            data : {
                meta: {
                    notice: "서버가 꺼져 있습니다."
                }
            }
        }).end()
   } 
})

module.exports = router
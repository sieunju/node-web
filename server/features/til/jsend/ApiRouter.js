/**
 * JSON jsend 규칙 관련 라우터
 */
const express = require('express');
const router = express.Router();
const utils = require('../../../utils/commandUtil')

/**
 * GET
 * EndPoint: /api/til/jsend
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
 * GET
 * EndPoint: /api/til/jsend/meta
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
 * GET
 * EndPoint: /api/til/jsend/list
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
 * GET
 * EndPoint: /api/til/jsend/list/meta
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
 * GET
 * EndPoint: /api/til/jsend/error/test
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
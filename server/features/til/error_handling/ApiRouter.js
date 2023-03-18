/**
 * 에러 관련 코드 라우터
 */
const express = require('express');
const router = express.Router();
const utils = require('../../../utils/commandUtil')

/**
 * GET
 * EndPoint: /api/til/error/505
 */
router.get('/505', (req, res) => {
    res.status(505).send({
        status: false,
        message: "505 Get 방식의 Error 입니다."
    }).end()
})

/**
 * POST
 * EndPoint: /api/til/error/505
 */
router.post('/505', (req, res) => {
    res.status(505).send({
        status: false,
        message: "505 Post 방식의 Error 입니다."
    }).end()
})

/**
 * POST
 * EndPoint: /api/til/error/404
 */
router.post('/404', (req, res) => {
    res.status(404).send({
        status: false,
        message: "404 Post 방식의 Error 입니다."
    }).end()
})

/**
 * GET
 * EndPoint: /api/til/error/404
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

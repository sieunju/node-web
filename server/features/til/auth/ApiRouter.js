/**
 * 사용자 인증 라우터
 */
const express = require('express');
const router = express.Router();
const utils = require('../../../utils/commandUtil')

/**
 * EndPoint: /api/til/auth/refresh
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
 * 만료되는 토큰 발급 받기
 * EndPoint: /api/til/auth/expired
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
 * EndPoint: /api/til/auth/test
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
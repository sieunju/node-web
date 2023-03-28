/**
 * BaseEndPoint /api/account/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const router = express.Router();
const repository = require('./Repository');
const utils = require('../../utils/commandUtil');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - user_id
 *         - user_pw
 *       properties:
 *         user_id:
 *           type: string
 *           description: 사용자 아이디
 *         user_pw:
 *           type: string
 *           description: 사용자 비번
 *       example:
 *         user_id: test
 *         user_pw: 1234d
 */

/**
 * @swagger
 *
 * /api/account/signUp:
 *  post:
 *    summary: "회원 가입"
 *    description: "사용자 가입"
 *    tags: [account]
 *    requestBody:
 *      description: "아이디와 비밀번호를 입력하세요."
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *                description: "회원가입할 사용자 아이디"
 *              user_pw:
 *                type: string
 *                description: "회원가입할 사용자 비번"
 *    responses:
 *      200:
 *        description: 성공!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                msg:
 *                  type: string
 *                  example:
 *                    [
 *                      { "status": true, "msg": "SUCC" }
 *                    ]
 *      500:
 *          description: 서버 꺼짐
 */
router.post('/signUp', (req, res) => {
    const body = req.body;
    console.log("BODY " + JSON.stringify(body))
    console.log("Sign Up ID\t" + body.user_id);
    console.log("Sign Up Pw\t" + body.user_pw);
    repository.post(body);
    res.status(200).json({
        status: true,
        data: body
    })
});

/**
 * ACCOUNT SIGN_IN: POST
 * EndPoint: /api/account/signIn
 * BODY SAMPLE: 
 * {
 *  "user_id": "test",
 *  "user_pw": "1234"
 * }
 * or 
 * HEADER 
 * {
 *  "login_key" : unique Token
 * }
 * ERROR CODE:
 *  400
 */

/**
 * @swagger
 *
 * /api/account/signIn:
 *  post:
 *    summary: "로그인"
 *    description: "로그인을 시도합니다."
 *    tags: [account]
 *    requestBody:
 *      description: "아이디와 비밀번호를 입력하세요."
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *                description: "사용자 아이디"
 *              user_pw:
 *                type: string
 *                description: "사용자 비번"
 *    responses:
 *      200:
 *        description: 성공!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                msg:
 *                  type: string
 *                  example:
 *                    [
 *                      { "status": true, "msg": "SUCC" }
 *                    ]
 *      500:
 *          description: 서버 꺼짐
 */
router.post('/signIn', (req, res) => {
    try {
        const loginKey = utils.reqInfo(req).loginKey
        console.log("/api/account/signIn " + JSON.stringify(req.body))
        repository.fetch(loginKey, req.body, function onMessage(err, rows) {
            if (err) {
                res.status(400).send({
                    status: false,
                    errMsg: err
                }).end()
            } else {
                if (rows[0] != null) {
                    const json = new Object()
                    json.status = true
                    json.user_nm = rows[0].USER_NM
                    json.res_path = rows[0].RES_PATH
                    if (rows[0].LOGIN_KEY != null) {
                        json.login_key = rows[0].LOGIN_KEY
                    }

                    // 앱인경우.
                    if (utils.isApp(utils.reqInfo(req))) {
                        res.status(200).send(json).end()
                    }
                    // 웹인경우.
                    else {
                        res.cookie('loginKey', json.login_key)
                        res.redirect('/view/memo');
                    }
                } else {
                    res.status(400).send({
                        status: false,
                        erroMsg: '유효하지 않은 값입니다.'
                    }).end()
                }
            }
        })
    } catch (err) {
        console.log("여길 탄다고? " + err)
        res.status(400).send({
            status: false,
            errMsg: err
        }).end()
    }
})

/**
 * EndPoint: /api/account/timeout
 */
router.get("/timeout", (req, res) => {
    console.log("Api Time Out")
    setTimeout(function(){

    }, 10_000)
})

module.exports = router
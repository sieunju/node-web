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
 * ACCOUNT SIGN UP POST
 * EndPoint: /api/account/signUp
 * BODY SAMPLE: 
 * {
 *  "user_nm": "테스트",
 *  "user_id": "test",
 *  "user_pw": "1234"
 * }
 */
router.post('/signUp', (req, res) => {
    const body = req.body;
    console.log("Sign Up ID\t" + body.user_id);
    console.log("Sign Up Pw\t" + body.user_pw);
    repository.post(body);
    res.status(200);
    res.write('Account Register Success');
    res.end();
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
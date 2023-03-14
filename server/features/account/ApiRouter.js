/**
 * BaseEndPoint /api/account/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const repository = require('./Repository');
const utils = require('../../utils/commandUtil');
const router = express.Router();

/**
 * ACCOUNT SIGN UP POST
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
    repository.postUser(body);
    res.status(200);
    res.write('Account Register Success');
    res.end();
});

/**
 * ACCOUNT SIGN_IN: POST
 * 
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
        repository.fetchUser(loginKey, req.body, function onMessage(err, rows) {
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
                        res.redirect('/memoList');
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
        res.status(400).send({
            status: false,
            errMsg: err
        }).end()
    }
})

router.get("/timeout", (req, res) => {
    console.log("Api Time Out")
    setTimeout(function(){

    }, 10_000)
})


module.exports = router
/**
 * 사용자 정보에 대한 정의 클래스
 * Created by hmju
 * BaseEndPoint /view/account/{...}
 */
const express = require('express');
const repository = require('./Repository');
const utils = require('../../utils/commandUtil');
const router = express.Router();
const WEB_VIEW_PREFIX = 'account/'
// 어짜피 나만 쓸거니까 회원가입 따윈 PASSSSSSSSS

router.get('/', (req, res) => {
    console.log("Login Page Enter " + req.path)
    res.render(WEB_VIEW_PREFIX + 'login.html');
    res.end();
});

router.get('/main.do', (req, res) => {
    console.log("Login Page Enter " + req.path)
    res.render(WEB_VIEW_PREFIX + 'login.html');
    res.end();
});

router.get("/hoethoet", (req, res) => {
    console.log("Page " + req.path)
    res.render(WEB_VIEW_PREFIX + 'demo.html');
    res.end();
})

router.get('/login', (req, res) => {
    console.log("Login Page Enter " + req.path)
    res.render(WEB_VIEW_PREFIX + 'login.html');
    res.end()
});

router.get('/signUp', (req, res) => {
    res.render(WEB_VIEW_PREFIX + 'signUp.html');
    res.end();
});

module.exports = router
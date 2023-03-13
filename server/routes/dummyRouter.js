const express = require('express');
const router = express.Router();
const utils = require('../utils/commandUtil');


// [S] TEST
router.get('/api/test',(req, res) => {
    try {
        setTimeout(function () {
            let ran = Math.floor(Math.random() * 10)
            if(ran < 5) {
                res.status(200).send({
                    status : true,
                    name : "Mr.Ju",
                    age : 30
                }).end()
            } else {
                res.status(200).send({
                    status : true,
                    test : "dddd",
                    age : 30
                }).end()
            }
        },1500)
    } catch(err) {
        console.log("Error " + err)
    }
})

router.post('/api/test',(req,res) => {
    try {
        let ranBoolean = Math.random() < 0.7
        if(ranBoolean) {
            res.status(200).send({
                status : true,
                test : "dddd",
                age : 30
            })
            .end()
        } else {
            res.status(403).end()
        }        
    } catch(err) {
        console.log("Error " + err)
    }
})

router.get('/api/test/:cnt',(req,res) => {
    try {
        let cnt = req.params.cnt

        if(cnt > 2) {
            res.status(200).send({
                status : true,
                test : "dddd",
                age : 30
            })
            .end()
        } else {
            res.status(503).end()
        }
    } catch(err) {
        console.log("Error " + err)
    }
})

router.get('/daum/local',(req,res) => {
    try {
        res.render('demo.html')
        res.end()
    } catch(err) {
        console.log("Error " + err)
    }
})

// [E] TEST

module.exports = router
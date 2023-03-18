const express = require('express');
const router = express.Router();
const utils = require('../../utils/commandUtil');

/**
 * EndPoint: /view/dummy/daum/local
 */
router.get('/daum/local',(req,res) => {
    try {
        res.render('dummy/demo.html')
        res.end()
    } catch(err) {
        console.log("Error " + err)
    }
})

module.exports = router
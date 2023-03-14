/**
 * BaseEndPoint /view/java/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const utils = require('../../utils/commandUtil');
const router = express.Router();
const PREFIX = 'java/'

// /view/java/
router.get('/', (req, res) => {
    res.render(PREFIX + 'javaMemo.html');
    res.end();
})

// /view/java/add
router.get('/add', (req, res) => {
    res.render(PREFIX + 'javaAddMemo.html');
    res.end();
})

module.exports = router
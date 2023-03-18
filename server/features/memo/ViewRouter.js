/**
 * /view/memo
 * 
 * Created by hmju
 */
const express = require('express');
const repository = require('./Repository');
const utils = require('../../utils/commandUtil');
const router = express.Router();
const PREFIX = 'memo/'

/**
 * EndPoint: /view/memo
 */
router.get('/', (req, res) => {
    utils.logD("Enter" + req.url);
    res.render(PREFIX + 'memoList.html');
    res.end();
});

/**
 * EndPoint: /view/memo/add
 */
router.get('/add', (req, res) => {
    utils.logD("Enter" + req.url);
    res.render(PREFIX + 'addMemo.html');
})

/**
 * EndPoint: /view/memo/youtube
 */
router.get('/youtube', (req, res) => {
    var videoId = req.query.id
    if (videoId != null) {
        res.render(PREFIX + 'youtubePlayer.html', { videoId: videoId });
    } else {
        res.render(PREFIX + 'youtubePlayer.html');
    }
    res.end();
})

module.exports = router
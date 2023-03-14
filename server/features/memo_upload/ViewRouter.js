/**
 * 파일 업로드 관련 라우터
 * Visual Studio 줄 정렬 -> Shift + Option + F
 * EndPath: /view/memo_upload/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const router = express.Router();
const PREFIX = 'memo_upload/'
router.get('/', (req, res) => {
    res.render(PREFIX + 'dummyUpload.html');
    res.end;
})

module.exports = router

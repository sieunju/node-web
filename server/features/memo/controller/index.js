const express = require('express');
const router = express.Router();
const account = require('./accountRouter');
const contents = require('./contentsRouter');
const mobileApp = require('./appMobileRouter');
const upload = require('./uploadRouter');
const dummy = require('./dummyRouter');
const deeplink = require('./deepLinkRouter')

router.use('/account',account)
router.use('/contents', contents);       // 콘텐츠 (메모) 데이터 추가 및 리스트 페이지 관련 Router
router.use('/mobile', mobileApp);      // 모바일 앱 관련 Router
router.use('/upload', upload);         // 파일 업로드 관련 
router.use('/test', dummy);     // 파일 업로드 테스트.
router.use('/deeplink', deeplink);

module.exports = router;
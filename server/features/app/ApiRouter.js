/**
 * BaseEndPoint /api/app/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const router = express.Router();
const repository = require('./Repository');
const utils = require('../../utils/commandUtil');

/**
 * EndPoint: /api/app/version
 */
router.get('/version', (req, res) => {
    try {
        const appInfo = utils.reqInfo(req);
        console.log(JSON.stringify(appInfo))
        repository.versionCheck(appInfo, function onMessage(err, rows) {
            if (err) {
                console.log(req.url, "Error " + err);
                res.status(416).send({
                    error: err
                })
            } else {
                console.log("DB " + rows);
                const reqVersionCd = req.query.versionCd; // 1
                const dbData = rows[0]
                if (dbData == undefined) {
                    res.status(416).send({
                        error: "DataBase Null"
                    })
                } else {
                    const currentVersion = dbData.CURRENT_VERSION_CD; // 1
                    const lateVersion = dbData.LATE_VERSION_CD; // 2

                    let updateCheck = 'P' // 통과
                    // 최소 버전보다는 같거나 크고, 최신 버전보단 낮은경우. 
                    // 선택 업데이트
                    if (currentVersion <= reqVersionCd && reqVersionCd < lateVersion) {
                        updateCheck = 'S'
                    } else if (currentVersion == lateVersion && lateVersion > reqVersionCd) {
                        // 강제
                        updateCheck = 'Y'
                    }
                    console.log("Current v" + currentVersion + "Latest v" + lateVersion)
                    res.status(200).send({
                        resCode: 200,
                        resMsg: 'Success',
                        updateCheck: updateCheck
                    })
                }

            }
        })
    } catch (err) {
        console.log('VersionCheck Error' + err)
        res.status(416).send({
            error: err
        })
    }
});

router.get('/error', (req, res) => {
    res.status(500).send({
        error: 'Error'
    })
})

module.exports = router
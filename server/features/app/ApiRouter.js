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
 * @swagger
 *
 * /api/app/version:
 *  get:
 *    summary: "앱 버전을 체크합니다."
 *    tags: [version]
 *    parameters:
 *       - in: header
 *         name: j-req-type
 *         required: true
 *         description: 요청하는 타입이 뭔지 설정합니다. ex.) AND, iOS
 *         schema:
 *           type: string
 *           enum: [AND, iOS]
 *           example: AND
 *       - in: query
 *         name: versionCd
 *         required: true
 *         description: 버전 코드
 *         schema:
 *           type: string
 *           example: 1
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: true
 *                  updateCheck:
 *                      type: string
 *                      example: S(선택 업데이트), Y(강제 업데이트)
 *                          
 *                      
 *      416:
 *          description: DB 조회 에러
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: boolean
 *                              example: false
 *                          error:
 *                              type: string
 *                              example: Error
 */
router.get('/version', (req, res) => {
    try {
        const appInfo = utils.reqInfo(req);
        console.log(JSON.stringify(appInfo))
        repository.versionCheck(appInfo, function onMessage(err, rows) {
            if (err) {
                console.log(req.url, "Error " + err);
                res.status(416).send({
                    status: false,
                    error: err
                })
            } else {
                console.log("DB " + rows);
                const reqVersionCd = req.query.versionCd; // 1
                const dbData = rows[0]
                if (dbData == undefined) {
                    res.status(416).send({
                        status: false,
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
                        status: true,
                        updateCheck: updateCheck
                    })
                }

            }
        })
    } catch (err) {
        console.log('VersionCheck Error' + err)
        res.status(416).send({
            status: false,
            error: err
        })
    }
});

/**
 * @swagger
 *
 * /api/app/error:
 *  get:
 *    summary: "테스트용 에러 입니다."
 *    tags: [version]
 *    responses:
 *      500:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: true
 *                  error:
 *                      type: string
 *                      example: Error
 */
router.get('/error', (req, res) => {
    res.status(500).send({
        status: false,
        error: 'Error'
    })
})

module.exports = router
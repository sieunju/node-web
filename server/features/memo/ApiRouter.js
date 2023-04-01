/**
 * BaseEndPoint /api/memo/{...}
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
 * /api/memo:
 *  post:
 *    summary: "메모 추가"
 *    description: 우선순위 Tag (1~7) 을 지정해서 메모를 추가합니다.
 *    tags: [memo]
 *    parameters:
 *       - in: header
 *         name: j-req-type
 *         required: true
 *         description: 요청하는 타입이 뭔지 설정합니다. ex.) AND, iOS
 *         schema:
 *           type: string
 *           enum: [AND, iOS]
 *           example: AND
 *       - in: header
 *         name: j-req-login-key
 *         required: true
 *         description: 로그인 키값
 *         schema:
 *           type: string
 *           example: login_token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              tag:
 *                  type: int
 *                  example: 1
 *              title:
 *                  type: string
 *                  example: 메모 추가
 *              contents:
 *                  type: string
 *                  example: 메모 내용
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: boolean
 *                          example: true
 *                      manageNo:
 *                          type: string
 *                          example: 3
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
 *                          errMsg:
 *                              type: string
 *                              example: Error
 */
router.post('/', (req, res) => {
    try {
        // 쿠키값 파싱.
        console.log(req.body)
        const cmmInfo = utils.reqInfo(req);
        console.log('AddMemo LoginKey: ' + cmmInfo.loginKey)
        repository.post(cmmInfo.loginKey, req.body, function onMessage(err, rows) {
            if (err) {
                console.log('Sql Error ' + err)
                res.status(416).send({
                    status: false,
                    errMsg: err
                }).end()
            } else {
                // 앱인경우.
                if (utils.isApp(cmmInfo)) {
                    // insertId -> Memo Id이므로 전달.
                    res.status(200).send({
                        status: true,
                        manageNo: rows.insertId
                    }).end();
                }
                // 웹인경우.
                else {
                    res.redirect('/view/memo');
                }
            }
        });
    } catch (err) {
        console.log('AddMemo Error ' + err);
        res.status(416).send({
            status: false,
            errMsg: err
        }).end();

    }
});

/**
 * @swagger
 *
 * /api/memo:
 *  get:
 *    summary: "메모 조회"
 *    tags: [memo]
 *    parameters:
 *       - in: header
 *         name: j-req-type
 *         required: true
 *         description: 요청하는 타입이 뭔지 설정합니다. ex.) AND, iOS
 *         schema:
 *           type: string
 *           enum: [AND, iOS]
 *           example: AND
 * 
 *       - in: header
 *         name: j-req-login-key
 *         required: true
 *         description: 로그인 키값
 *         schema:
 *           type: string
 *           example: login_token
 * 
 *       - in: query
 *         name: pageNo
 *         required: false
 *         description: 페이지 Index
 *         schema:
 *           type: int
 *           example: 1
 * 
 *       - in: query
 *         name: sortOpt
 *         required: false
 *         description: 정렬 옵션
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           example: ASC
 * 
 *       - in: query
 *         name: filterTag
 *         required: false
 *         description: 필터 옵션
 *         schema:
 *           type: int
 *           enum: [100,101,102,103,104,105,106]
 *           example: 100
 * 
 *       - in: query
 *         name: keyword
 *         required: false
 *         description: 검색어
 *         schema:
 *           type: string
 *           example: 메모
 * 
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: boolean
 *                          example: true
 *                      dataList:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  manageNo:
 *                                      type: int
 *                                      example: 1
 *                                  tag:
 *                                      type: int
 *                                      example: 3
 *                                  title:
 *                                      type: string
 *                                      example: 메모 제목
 *                                  contents:
 *                                      type: string
 *                                      example: 메모 내용
 *                                  fileList:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              manageNo:
 *                                                  type: int
 *                                                  example: 2
 *                                              path:
 *                                                  type: string
 *                                                  example: /resource/img/1.png
 *                                  regDtm:
 *                                      type: date-time
 *                                      example: 2023-03-31 16:05:35 (YYYY-MM-DD HH:mm:ss)
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
 *                          errMsg:
 *                              type: string
 *                              example: Error
 */
router.get('/', (req, res) => {
    try {
        // 로그인 키값 get
        const loginKey = utils.reqInfo(req).loginKey;
        let currentPage;

        // PageNo Null 인경우 기본값  1로 세팅.
        if (req.query.pageNo == null) {
            req.query.pageNo = 1;
            currentPage = 1;
        } else {
            currentPage = Number(req.query.pageNo);
        }

        repository.fetch(loginKey, req.query, function onMessage(err, rows) {
            if (err) {
                console.log('GetMemo Sql Error LoginKey: ' + loginKey + '\t' + err)

                res.status(416).send({
                    status: false,
                    errMsg: err
                }).end()
            }
            // Query 정상 동작 한경우.
            else {

                console.log('GetMemo Success LoginKey: ' + loginKey + '\t Path' + req.url)
                // 옵션 세팅
                // let options = {
                //     "pageNo" : ++pageNo,
                //     "sortOpt" : sortOpt,
                // }

                try {
                    const map = new Map()
                    rows.forEach(e => {
                        const key = e.MEMO_ID
                        if (map.has(e.MEMO_ID)) {
                            map.get(e.MEMO_ID).fileList.push({
                                manageNo: e.UID,
                                path: e.RESOURCE_PATH
                            })
                        } else {
                            let item = {
                                manageNo: e.MEMO_ID,
                                tag: e.TAG,
                                title: e.TITLE,
                                contents: e.CONTENTS,
                                fileList: (e.RESOURCE_PATH == null) ? [] : [
                                    {
                                        manageNo: e.UID,
                                        path: e.RESOURCE_PATH
                                    }
                                ],
                                regDtm: e.REGISTER_DATE
                            }

                            map.set(e.MEMO_ID, item)
                        }
                    })

                    let hasMore = true
                    if (map.size < 20) {
                        hasMore = false
                    }

                    res.status(200).send({
                        status: true,
                        dataList: Array.from(map.values()),
                        pageNo: currentPage,
                        hasMore: hasMore
                    }).end()

                } catch (err) {
                    console.log(' LoginKey: ' + loginKey + '\t' + err);
                    res.status(416).send({
                        status: false,
                        errMsg: 'Error ' + err
                    }).end();
                }
            }
        })
    } catch (err) {
        console.log('FetchMemo Error LoginKey: ' + loginKey + '\t' + err);
        res.status(416).send({
            status: false,
            errMsg: 'Error ' + err
        }).end();
    }
});

/**
 * @swagger
 *
 * /api/memo:
 *  put:
 *    summary: 메모 수정
 *    description: 메모를 수정합니다.
 *    tags: [memo]
 *    parameters:
 *       - in: header
 *         name: j-req-type
 *         required: true
 *         description: 요청하는 타입이 뭔지 설정합니다. ex.) AND, iOS
 *         schema:
 *           type: string
 *           enum: [AND, iOS]
 *           example: AND
 *       - in: header
 *         name: j-req-login-key
 *         required: true
 *         description: 로그인 키값
 *         schema:
 *           type: string
 *           example: login_token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              memoId:
 *                  type: int
 *                  example: 3
 *              tag:
 *                  type: int
 *                  example: 1
 *              title:
 *                  type: string
 *                  example: 메모 추가
 *              contents:
 *                  type: string
 *                  example: 메모 내용
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: boolean
 *                          example: true
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
 *                          errMsg:
 *                              type: string
 *                              example: Error
 */
router.put('/', (req, res) => {
    try {
        const cmmInfo = utils.reqInfo(req)
        repository.update(cmmInfo.loginKey, req.body, function onMessage(err) {
            if (err) {
                utils.logE('Update Memo SQL Fail LoginKey: ' + cmmInfo.loginKey + '\t ' + err)
                // 앱인경우
                if (utils.isApp(cmmInfo)) {
                    res.status(416).send({
                        status: false,
                        errMsg: err
                    }).end()
                }
                // 웹인경우.
                else {
                    res.status(404).send({
                        status: false,
                        errMsg: err
                    }).end()
                }
            } else {
                utils.logD('UpDate Memo Success LoginKey: ' + cmmInfo.loginKey)
                res.status(200).send({
                    status: true
                }).end();
            }
        });
    } catch (err) {
        utils.logE('Update Memo Fail LoginKey: ' + cmmInfo.loginKey + '\t ' + err)
        res.status(416).send({
            status: false,
            errMsg: err
        }).end();
    }
});

/**
 * @swagger
 *
 * /api/memo/{id}:
 *  delete:
 *    summary: 메모 삭제
 *    description: 메모를 수정합니다.
 *    tags: [memo]
 *    parameters:
 *       - in: header
 *         name: j-req-type
 *         required: true
 *         description: 요청하는 타입이 뭔지 설정합니다. ex.) AND, iOS
 *         schema:
 *           type: string
 *           enum: [AND, iOS]
 *           example: AND
 *       - in: header
 *         name: j-req-login-key
 *         required: true
 *         description: 로그인 키값
 *         schema:
 *           type: string
 *           example: login_token
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 메모 아이디
 * 
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: boolean
 *                          example: true
 *                      msg:
 *                          type: string
 *                          example: 메모가 정상적으로 삭제 되었습니다.
 *                          
 *      400:
 *          description: DB 조회 에러
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: boolean
 *                              example: false
 *                          errMsg:
 *                              type: string
 *                              example: Error
 */
router.delete('/:id', (req, res) => {
    try {
        const cmmInfo = utils.reqInfo(req)
        repository.delete(cmmInfo.loginKey, req, function onMessage(err, rows) {
            if (err) {
                // 앱인경우
                if (utils.isApp(cmmInfo)) {
                    res.status(400).send({
                        status: false,
                        errMsg: err
                    }).end()
                }
                // 웹인경우.
                else {
                    res.status(404).send({
                        status: false,
                        errMsg: err
                    }).end()
                }
            } else {
                res.status(200).send({
                    status: true,
                    msg: '메모가 정상적으로 삭제 되었습니다.'
                }).end();
            }
        })
    } catch (err) {
        res.status(400).send({
            status: false,
            errMsg: err
        }).end();
    }
})

module.exports = router
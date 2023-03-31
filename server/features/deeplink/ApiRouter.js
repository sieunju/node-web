/**
 * BaseEndPoint /api/deeplink/{...}
 * 
 * Created by hmju
 */
const express = require('express');
const router = express.Router();
const repository = require('./Repository');
const utils = require('../../utils/commandUtil')

/**
 * @swagger
 *
 * /api/deeplink:
 *  post:
 *    summary: "딥링크 추가합니다."
 *    tags: [deeplink]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: "딥링크 제목"
 *              link:
 *                type: string
 *                description: "딥링크 URL"
 *    responses:
 *      200:
 *        content:
 *          text/html:
 *              schema:
 *                  type: link
 *                  example: /view/deepLink
 *      404:
 *          description: Error
 */
router.post('/', (req, res) => {
    try {
        repository.addDeepLink(req.body, function onMessage(err, rows) {
            if (err) {
                res.status(404).end()
            } else {
                console.log("DB Success " + rows)
                res.redirect('/view/deepLink')
            }
        })
    } catch (err) {
        res.status(404).end()
    }
})

/**
 * @swagger
 *
 * /api/deeplink:
 *  get:
 *    summary: "딥링크 조회합니다."
 *    tags: [deeplink]
 * 
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
 *                  list:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              TITLE:
 *                                  type: string
 *                                  description: 딥링크
 *                                  example: 네이버 이동
 *                              LINK:
 *                                  type: string
 *                                  description: URL
 *                                  example: https://www.naver.com
 *      404:
 *          description: Error
 */
router.get('/', (req, res) => {
    try {
        repository.fetchDeepLink(function onMessage(err, rows) {
            if (err) {
                res.status(404).end()
            } else {
                res.status(200).send({
                    status: true,
                    list: rows
                }).end()
            }
        })
    } catch (err) {
        res.status(404).end()
    }
})

module.exports = router

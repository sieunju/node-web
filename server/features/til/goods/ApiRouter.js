/**
 * 랜덤 상품 데이터 호출 라우터 
 */
const express = require('express');
const router = express.Router();
const utils = require('../../../utils/commandUtil')

/**
 * @swagger
 *
 * /api/til/goods:
 *  get:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "랜덤 상품 목록 조회 합니다."
 *    tags: [TIL_GOODS]
 *    parameters:
 *      - in: query
 *        name: pageNo
 *        description: 페이지 번호
 *        schema:
 *          type: int
 *          example: 1
 * 
 *      - in: query
 *        name: pageSize
 *        required: false
 *        description: 페이지 사이즈
 *        schema:
 *          type: int
 *          example: 25
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
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: int
 *                                          example: 1
 *                                      title:
 *                                          type: string
 *                                          example: 나는야 날으는 돼지
 *                                      message:
 *                                          type: string
 *                                          example: 8만 구독자의 와인디렉터 양갱 이 알려주는 초보자를 위한 세상에서 가장 쉬운 와인 입문서
 *                                      imagePath:
 *                                          type: string
 *                                          example: https://node.qtzz.synology.me/resource/img/1.jpg
 *                          meta:
 *                              type: object
 *                              properties:
 *                                  limitSize:
 *                                      type: int
 *                                      example: 5
 *                          
 */
router.get('/', (req, res) => {
    const pageNo = req.query.pageNo
    const pageSize = req.query.pageSize
    // 강제로 페이지 제한 처리
    if (pageNo == 5) {
        res.status(200).send({
            status: true,
            data: {
                payload: []
            }
        }).end()
    } else {
        var limitPageNo = null
        if (pageNo == 1) {
            limitPageNo = Math.floor((Math.random() * 10) + 4)
        }

        const list = []

        // 걍... 25 부터 처리 귀찮다..
        var startIdx = pageNo * pageSize
        for (var idx = 0; idx < pageSize; idx++) {
            list.push({
                id: startIdx,
                title: utils.randomTitle(),
                message: utils.randomMessage(),
                imagePath: utils.randomImage()
            })
            startIdx++
        }

        res.status(200).send({
            status: true,
            data: {
                payload: list,
                meta: {
                    limitSize: limitPageNo
                }
            }
        }).end()
    }
})

/**
 * @swagger
 *
 * /api/til/goods/like:
 *  post:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "상품 좋아요 추가 입니다."
 *    tags: [TIL_GOODS]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: int
 *                example: 3
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: MethodType POST
 *                data:
 *                  type: object
 *                  properties:
 *                      payload:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: int
 *                                  example: 3
 */
router.post('/like', (req, res) => {
    res.status(200).send({
        status: true,
        message: "MethodType POST",
        data: {
            payload: {
                id: req.body.id
            }
        }
    }).end()
})

/**
 * @swagger
 *
 * /api/til/goods/like/{id}:
 *  delete:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "상품 좋아요 삭제 입니다."
 *    tags: [TIL_GOODS]
 *    parameters:
 *       - in: path
 *         name: id
 *         description: 상품 아이디
 *         schema:
 *           type: int
 *           example: 1
 * 
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: MethodType DELETE
 *                data:
 *                  type: object
 *                  properties:
 *                      payload:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: int
 *                                  example: 3
 */
router.delete('/like/:id', (req, res) => {
    res.status(200).send({
        status: true,
        message: "MethodType DELETE",
        data: {
            payload: {
                id: req.params.id
            }
        }
    }).end()
})

/**
 * @swagger
 *
 * /api/til/goods/put/test:
 *  put:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "PUT 테스트 입니다."
 *    tags: [TIL_GOODS]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *                example: test
 *              user_pw:
 *                type: string
 *                example: test_password
 * 
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: MethodType PUT
 *                data:
 *                  type: object
 *                  properties:
 *                      payload:
 *                          type: object
 */
router.put('/put/test', (req, res) => {
    res.status(200).send({
        status: true,
        message: "MethodType PUT",
        data: {
            payload: req.body
        }
    }).end()
})

module.exports = router

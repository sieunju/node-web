/**
 * 랜덤 상품 데이터 호출 라우터 
 */
const express = require('express');
const router = express.Router();
const utils = require('../../../utils/commandUtil')

/**
 * GET
 * EndPoint: /api/til/goods
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
 * POST
 * EndPoint: /api/til/goods/like
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
 * DELETE
 * EndPoint: /api/til/goods/like/{id}
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
 * PUT
 * EndPoint: /api/til/goods/put/test
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
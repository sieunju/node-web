const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const utils = require('../../utils/commandUtil')

/**
 * 파일 필터링
 * @param {Http Request}}} req 
 * @param {File Struct} file 
 * @param {File Listener} callback 
 */
const filter = (req, file, callback) => {
    const type = file.mimetype
    if (type.startsWith('image') ||
        type.startsWith('video') ||
        type.startsWith('text') ||
        type.startsWith('application') || 
        type.startsWith('audio')) {
        callback(null, true);
    } else {
        callback('Uploadable files are img, video, text, audio, and application.', false);
    }
}

/**
 * 현재 날짜 기준 디렉토리 생성 처리 함수
 * 있으면 바로 리턴
 * @param {File Directory Path} path 
 * @param {File Listener} callback 
 */
const dateDir = (path, callback) => {
    utils.checkDir(fs, path, function (isSuccess, msg) {
        if (isSuccess) {
            callback(null, path)
        }
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // 폴더 경로 설정
        const currDate = utils.getCurrentDate()
        const type = file.mimetype
        if (type.startsWith('image')) {
            dateDir(process.env.UPLOAD_IMG + '/' + currDate, callback)
        } else if (type.startsWith('video')) {
            dateDir(process.env.UPLOAD_VIDEO + '/' + currDate, callback)
        } else if (type.startsWith('text')) {
            dateDir(process.env.UPLOAD_TXT + '/' + currDate, callback)
        } else if(type.startsWith('audio')) {
            dateDir(process.env.UPLOAD_AUDIO + '/' + currDate, callback)
        } else {
            // 이외 케이스
            dateDir(process.env.UPLOAD_ETC + '/' + currDate, callback)
        }
    },
    filename: function (req, file, callback) {
        // 파일명 설정
        let extension = path.extname(file.originalname);
        const ranDomName = Math.random().toString(36).substr(2, 11);
        // ${현재 시간 TimeMilles}${랜덤 이름}.${확장자 포멧}
        callback(null, Date.now() + ranDomName + extension);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: filter
})

const router = express.Router();
const repository = require('./Repository')

/**
 * @swagger
 *
 * /api/uploads:
 *  post:
 *    summary: "파일 업로드"
 *    tags: [UPLOADS]
 *    requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      files:
 *                          type: array
 *                          items:
 *                              type: string
 *                              format: binary
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
 *                pathList:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: int
 *                              example: 3
 *                          path:
 *                              type: string
 *                              example: /resource/img/33.jpg
 *      416:
 *          description: DB 에러
 */
router.post('/', upload.array('files'), (req, res) => {
    try {
        let filePathList = new Array()
        const fileSize = req.files.length
        let callBackCnt = 0
        req.files.forEach(e => {
            repository.addFile(e, function onMessage(err, rows) {
                callBackCnt++
                // Sql Error
                if (err) {
                    console.log("DB Error " + err)
                } else {
                    console.log("DB Success " + rows)
                    filePathList.push({
                        id: rows.insertId,
                        path: e.path
                    })

                    // Add Batch Binary File
                    repository.batchAddBinary(rows.insertId, e.path)
                }

                // 모든 CallBack 완료 했다면.
                if (callBackCnt == fileSize) {
                    console.log(filePathList)
                    res.status(200).send({
                        status: true,
                        pathList: filePathList
                    }).end()
                }
            })
        })
    } catch (err) {
        console.log('Add File Error ' + err)
        res.status(416).send({
            status: false,
            errMsg: err
        }).end()
    }
})

/**
 * 파일 지우기
 * EndPoint /api/uploads
 * QueryParameter: deleteIds[]
 * 
 */
router.delete('/', (req, res) => {
    try {
        let deleteIds
        if (Array.isArray(req.query.deleteIds)) {
            deleteIds = req.query.deleteIds
        } else {
            deleteIds = new Array(req.query.deleteIds)
        }

        // DB Query 실행 기준은 File Id 리스트 기준.
        const callBackLength = deleteIds.length
        let callBackCnt = 0
        try {
            for (let i = 0; i < callBackLength; i++) {
                repository.batchDeleteAddFile(deleteIds[i], function onMessage(err, rows, imgPath) {
                    callBackCnt++
                    // Sql Error 
                    if (err) {
                        console.log(err)
                    }
                    // 실제로 파일 삭제 하는 로직은 정기적으로 배치돌리는걸로 처리
                    // try {
                    //     console.log('Delete Path ' + imgPath)
                    //     fs.unlinkSync(imgPath)
                    // } catch (err) {
                    //     console.log('File Delete Error')
                    //     console.log(err)
                    // }

                    // 모든 CallBack 완료 했다면.
                    if (callBackCnt == callBackLength) {
                        res.status(200).send({
                            status: true,
                            msg: '파일이 정상적으로 삭제 되었습니다.'
                        }).end()
                    }
                })
            }
        } catch (err) {
            callBackCnt++
        }
    } catch (err) {
        console.log('Delete File Error ' + err)
        res.status(416).send({
            status: false,
            errMsg: err
        }).end()
    }
})

/**
 * 베치 파일? (사실 나도 잘 모름 예전에 뭔가 했던거 같은데 까먹음)
 * EndPoint: /api/uploads/batchFiles
 * Headers: authKey
 * 
 */
router.delete('/batchFiles', (req, res) => {
    try {
        utils.checkAuth(req.header('authKey'), function (isAuth) {
            if (isAuth) {
                repository.batchDeleteFiles(function onMessage(err, rows) {
                    if (err) {
                        console.log(err)
                        console.log("111111111111111111111111111111111")
                    } else {
                        console.log("ERROROROROR")
                        rows.forEach(e => {
                            try {
                                console.log("Delete Path " + e.PATH)
                                // repository.deleteFile(e.ID)
                                // fs.unlinkSync(e.PATH)
                            } catch (err) {
                                console.log(err)
                            }
                        })

                        res.status(200).end()
                    }
                })
            } else {
                console.log("??111111111111111111111")
                res.status(401).send({
                    status: false,
                    errMsg: 'Authentication Failed..'
                }).end()
            }
        })
    } catch (err) {
        console.log("EEE ?")
        res.status(401).send({
            status: false,
            errMsg: 'Authentication Failed..'
        }).end()
    }
})

/**
 * 배치 돌려서 바이너리형태로 디비에 저장하려던거 같은데 잘 모르겠다..
 * EndPoint: /api/uploads/batchBinary 
 */
router.put('/batchBinary', (req, res) => {
    try {
        repository.batchFetchBinary(function onMessage(err, rows) {
            rows.forEach(e => {

            })
        })
    } catch (err) {
        console.log(err)
    }
})
// [e] API End

module.exports = router

const localService = require('../../service/file_service');
const utils = require('../../utils/commandUtil');
const StringBuffer = require('stringbuffer');
const fs = require('fs');

const repository = {

    /**
     * FILE_TB 파일 추가 처리 함수
     * @param {Multer.File} file 
     * @param {DB Callback} callback 
     */
    addFile: function (file, callback) {
        const query = 'INSERT INTO FILE_TB (ORG_NAME,PATH,MIME_TYPE) VALUES (?,?,?)'
        const params = [file.originalname,file.path,file.mimetype]
        localService.query(query, params, callback)
    },
    /**
     * FILE_TB 파일 삭제 처리 함수
     * @param {파일 아이디 (PK)}} fileId 
     */
    deleteFile : function(fileId) {
        try {
            const query = 'DELETE FROM FILE_TB WHERE ID=?'
            const params = [fileId]
            localService.query(query,params,function onMessage(err,rows) {
                console.log(rows)
            })
        } catch(err) {

        }
    },
    /**
     * 삭제할 파일들 배치 테이블의 추가 처리함수.
     * @param {파일 아이디 (PK)} fileId 
     * @param {DB Callback} callback 
     */
    batchDeleteAddFile: function (fileId, callback) {
        const query = 'INSERT INTO DEL_FILE_TB (FILE_ID) VALUES (?)'
        const params = [fileId]
        localService.query(query,params,callback)
        
        // let query = 'SELECT PATH FROM FILE_TB WHERE ID=?'
        // let params = [fileId]
        // let imgPath = ''
        // db.query(query, params, function (selectErr, selectRows) {
        //     try {
        //         if (selectErr) {
        //             callback(selectErr, selectRows, null)
        //         } else {
        //             imgPath = selectRows[0].PATH
        //             query = 'DELETE FROM FILE_TB WHERE ID=?'
        //             db.query(query, params, function (err, rows) {
        //                 callback(err, rows, imgPath)
        //             })
        //         }
        //     } catch (err) {
        //         callback(err,null,null)
        //     }
        // })
    },
    /**
     * 현재 날짜 기준으로 삭제할 파일들 조회 처리 함수
     * @param {DB Callback} callback 
     */
    batchDeleteFiles : function(callback) {
        const query = 'SELECT * FROM DEL_FILE_TB WHERE DATE < SUBDATE(NOW(),INTERVAL 24 HOUR)'
        localService.query(query,null,function (err,rows) {
            try {
                const sb = new StringBuilder('SELECT ID,PATH FROM FILE_TB WHERE (ID) IN ')
                sb.append('(')
                for(let i =0; i<rows.length; i++) {
                    const row = rows[i]
                    sb.append(row.FILE_ID)
                    if(i != rows.length - 1) {
                        sb.append(',')
                    }
                }
                sb.append(') AND IS_LOCK=FALSE')
                db.query(sb.toString(),null,callback)
            } catch(err) {
                console.log("여길탐?????")
                callback(err,null)
            }
        })
    },
    /**
     * 바이너리 배치 테이블에 추가 정보들 추가 하는 함수
     * 특정 시간에 /resource 폴더에 있는 파일들을 FILE_TB -> OBJ 에 넣기 위함
     * @param {파일 아이디 (PK)} fileId 
     * @param {파일 리소스 경로} filePath 
     */
    batchAddBinary : function(fileId,filePath) {
        const query = 'INSERT INTO BUF_FILE_TB (FILE_ID,PATH) VALUES (?,?)'
        const params = [fileId,filePath]
        localService.query(query,params,function(err,rows) {
            console.log(rows)
        })
    },
    /**
     * 바이너리 데이터 추가할 테이블 조회
     * @param {DB Callback} callback 
     */
    batchFetchBinary : function(callback) {
        const query = 'SELECT * FROM BUF_FILE_TB'
        localService.query(query,null,callback)
    },
    /**
     * FILE_TB에 바이너리 Update 처리 함수
     * @param {파일 아이디 (PK)} fileId 
     * @param {파일 바이너리} buffer 
     */
    updateAddFileBinary : function(fileId,buffer) {
        const query = 'UPDATE FILE_TB SET OBJ=? WHERE=ID=?'
        const params = [buffer,fileId]
        db.query(query,params,function onMessage(err,rows) {
            console.log(rows)
        })
    }
};

module.exports = repository;
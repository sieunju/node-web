const db = require('mysql')
require('dotenv').config()
const config = {
    host: process.env.FILE_DB_HOST,
    port: process.env.FILE_DB_PORT,
    user: process.env.FILE_DB_USER,
    password: process.env.FILE_DB_PW,
    database: process.env.FILE_DB_NAME,
    connectionLimit: 10,
    dateStrings: 'date'
}
const pool = db.createPool(config)
module.exports = (function () {
    return {
        init: function () {
            pool.getConnection(function (err, con) {
                if (err) {
                    console.log("FileDB Error " + err)
                    throw err;
                }
                console.log("File DB Connected!");
                let sqlQuery;

                /**
                 * TableName FILE_TB
                 * ID PK
                 * ORG_NAME 원본 이름
                 * PATH 파일 경로
                 * OBJ 파일 바이너리 Deprecated
                 * IS_LOCK 관리자가 직접 삭제 유무에 대한 flag 값
                 * MIME_TYPE 파일 포멧 형식
                 * REG_DATE 등록한 시간
                 */
                // sqlQuery = "CREATE TABLE FILE_TB (" +
                //     "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
                //     "ORG_NAME TEXT, " +
                //     "PATH VARCHAR(80) NOT NULL, " +
                //     "OBJ LONGBLOB NULL, " +
                //     "IS_LOCK BOOLEAN DEFAULT false, " +
                //     "MIME_TYPE VARCHAR(80), " +
                //     "REG_DATE DATETIME DEFAULT current_timestamp" +
                //     ")";
                // con.query(sqlQuery, function (err, result) {
                //     if (err) {
                //         console.log("FILE_TB Create Error " + err);
                //     } else {
                //         console.log("FILE_TB Created");
                //     }
                // });

                /**
                 * TableName AUTH_TB
                 * ID PK
                 * AUTH_KEY 인증키
                 */
                // sqlQuery = "CREATE TABLE AUTH_TB (" +
                //     "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
                //     "AUTH_KEY VARCHAR(100) NOT NULL" +
                //     ");"
                // con.query(sqlQuery, function (err, result) {
                //     if (err) {
                //         console.log("AUTH_TB Error " + err);
                //     } else {
                //         console.log("AUTH_TB Created");
                //     }
                // });

                /**
                 * TableName BUF_FILE_TB
                 * FILE_ID FK -> FILE_TB (ID)
                 * PATH 파일 경로
                 * 
                 */
                // sqlQuery = "CREATE TABLE BUF_FILE_TB (" +
                //     "FILE_ID INT NOT NULL, " +
                //     "PATH VARCHAR(80) NOT NULL, " +
                //     "FOREIGN KEY(FILE_ID) REFERENCES FILE_TB(ID) ON DELETE CASCADE ON UPDATE RESTRICT" +
                //     ")"
                // con.query(sqlQuery, function (err, result) {
                //     if (err) {
                //         console.log("BUF_FILE_TB Error " + err);
                //     } else {
                //         console.log("BUF_FILE_TB Created");
                //     }
                // });

                /**
                 * TableName DEL_FILE_TB
                 * FILE_ID FK -> FILE_TB (ID)
                 * IS_LOCK 관리자가 직접 삭제 해야 하는 리소스인지 유무 Flag
                 * DATE 삭제 요청한 날짜
                 */
                // sqlQuery = "CREATE TABLE DEL_FILE_TB (" +
                //     "FILE_ID INT NOT NULL, " +
                //     "IS_LOCK BOOLEAN DEFAULT false, " +
                //     "DATE DATETIME DEFAULT current_timestamp, " +
                //     "FOREIGN KEY(FILE_ID) REFERENCES FILE_TB(ID) ON DELETE CASCADE ON UPDATE RESTRICT" +
                //     ")"
                // con.query(sqlQuery, function (err, result) {
                //     if (err) {
                //         console.log("DEL_FILE_TB Error " + err);
                //     } else {
                //         console.log("DEL_FILE_TB Created");
                //     }
                // });


                con.release()
                setInterval(keepAlive, 60 * 60 * 1000);
            })
        },

        /**
         * Query 문 처리하는 함수.
         * 파라미터가 존재하는 타입.
         * @param {String} query    DB Query
         * @param {String []} params  Parameter ex.) '?'
         * @param {bool,rows} callback  Query Callbakc Listener
         */
        query: function (query, params, callback) {
            if (params == null) {
                pool.getConnection(function (err, con) {
                    if (err) {
                        callback(err, "DataBase Connection Error")
                        con.release()
                    } else {
                        con.query(query, function (err, rows) {
                            callback(err, rows)
                            // Pool에 Connection을 반납 
                            con.release();
                        })
                    }
                })
            } else {
                pool.getConnection(function (err, con) {
                    if (err) {
                        callback(err, "DataBase Connection Error")
                        con.release();
                    } else {
                        con.query(query, params, function (err, rows) {
                            callback(err, rows);
                            // Pool에 Connection을 반납 
                            con.release();
                        })
                    }
                })
            }
        }
    }
})()

// Mysql 특성상 8시간 지나면 자동으로 연결을 해제하는 이슈가 있음.
// 한시간 단위로 연결을 유지하도록 하는 함수.
function keepAlive() {
    pool.getConnection(function (err, con) {
        if (err) { return; }
        console.log('Ping!!');
        con.ping();
        // Pool에 Connection을 반납 
        con.release();
    });
    // redis client 사용중이라면 여기서 client.ping(); 하여 연결을 유지한다.
}
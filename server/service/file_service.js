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
                    console.log("MariaDB Connection Error " + err)
                    throw err;
                }
                console.log("MariaDB Database Connected!");

                /**
                 * Table Spec
                 *  FILE_TB
                    ID (int) NOT NULL Auto Increment
                    PATH (varchar 80) NOT NULL 파일 경로
                    OBJ (longblob) NULL 파일 바이너리
                    IS_LOCK (tintyint or boolean) 0 관리자가 직접 삭제 유무에 대한 Flag
                    REG_DATE (date) current timestamp 파일 저장된 시간

                    DEL_FILE_TB 정기적으로 삭제할 파일들에 대한 테이블 (FK FILE_TB > ID)
                    FILE (int) 삭제할 파일 ID값
                    IS_LOCK (tintyint or boolean) 0 관리자가 직접 삭제 유무에 대한 Flag
                    DATE (date) current timestamp 삭제를 요청한 날짜
                 */

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
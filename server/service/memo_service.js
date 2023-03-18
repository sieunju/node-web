const mysql = require('mysql')
require('dotenv').config()
const config = {
    host: process.env.MEMO_DB_HOST,
    port: process.env.MEMO_DB_PORT,
    user: process.env.MEMO_DB_USER,
    password: process.env.MEMO_DB_PW,
    database: process.env.MEMO_DB_NAME,
    connectionLimit: 10,
    dateStrings: 'date'
}

const pool = mysql.createPool(config);
module.exports = (function () {
    return {
        init: function () {
            pool.getConnection(function (err, con) {
                if (err) {
                    console.log("MemoDB Error " + err)
                    throw err;
                }
                console.log("Memo DB Connected!");
                let sqlQuery;
                // randomMemo(con);

                // DB 연결 완료후 Table 생성.
                /**
                 * USER_NM          -> 사용자 이름
                 * USER_ID          -> 사용자 아이디 PK
                 * LOGIN_KEY        -> 사용자 식별 (암호화)
                 * USER_PW          -> 사용자 비밀 번호
                 * RES_PATH         -> 프로필 사진 경로
                 * REGISTER_DATE    -> 사용자 등록 날짜 
                 */
                // sqlQuery = "CREATE TABLE ACT_USERS_TB (" +
                //     "USER_NM VARCHAR(30)," + 
                //     "USER_ID VARCHAR(30) PRIMARY KEY," +
                //     "LOGIN_KEY VARCHAR(200) NOT NULL," +
                //     "USER_PW VARCHAR(40)," +
                //     "RES_PATH VARCHAR(80)," +
                //     "REGISTER_DATE DATETIME" +
                //     ")";
                // // Account Table Create
                // con.query(sqlQuery, function (err, rows) {
                //     if (err) {
                //         console.log("Create Account Table Error " + err);
                //     } else {
                //         console.log("Account Table Created");
                //     }
                // });

                /**
                 * USER_ID          -> 사용자 아이디
                 * MEMO_ID          -> 메모 아이디 (AUTO_INCREMENT)
                 * TAG              -> 우선 순위에 대한 테그
                 * INDEX            -> 같은 태그에서도 순서를 정하기 위한 값(추후 값 세팅할 예정)
                 * TITLE            -> 제목
                 * CONTENTS         -> 내용
                 * REGISTER_DATE    -> 등록 날짜 DATETIME
                 */
                // sqlQuery = "CREATE TABLE MEMO_TB (" +
                //     "USER_ID VARCHAR(30) NOT NULL," +
                //     "MEMO_ID SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
                //     "TAG SMALLINT," +
                //     "NUM SMALLINT," +
                //     "TITLE VARCHAR(200) NOT NULL," +
                //     "CONTENTS VARCHAR(800) NOT NULL," +
                //     "REGISTER_DATE DATETIME" +
                //     ")";
                // // Memo Table Create
                // con.query(sqlQuery, function (err, result) {
                //     if (err) {
                //         console.log("Create Memo Table Error " + err);
                //     } else {
                //         console.log("Memo Table Created");
                //     }
                // });

                /**
                 * OS_TYPE              -> APP OS 정보
                 * CURRENT_VERSION_NM   -> 현재 버전 (이름)
                 * CURRENT_VERSION_CD   -> 현재 버전 (코드)
                 * LATE_VERSION_NM      -> 최신 버전 (이름)
                 * LATE_VERSION_CD      -> 최신 버전 (코드)
                 */
                // sqlQuery = "CREATE TABLE APP_VERSION_TB (" +
                //     "OS_TYPE VARCHAR(10) NOT NULL," +
                //     "CURRENT_VERSION_NM VARCHAR(20)," +
                //     "CURRENT_VERSION_CD SMALLINT," +
                //     "LATE_VERSION_NM VARChAR(20)," +
                //     "LATE_VERSION_CD SMALLINT" +
                //     ")";
                // con.query(sqlQuery, function (err, result) {
                //     if (err) {
                //         console.log("Create App Version Table Error " + err)
                //     } else {
                //         console.log("App Version Created")
                //     }
                // });

                /**
                * MEMO_ID              -> FK( MEMO_TB MEMO_ID )
                * UID                  -> PK ( A.I )
                * RES_URL              -> 이미지 / 파일 경로
                * REGISTER_DATE      -> 등록 날짜
                */
                // sqlQuery = "CREATE TABLE MEMO_FILE_TB ( " +
                //     "MEMO_ID SMALLINT NOT NULL, " +
                //     "UID SMALLINT NOT NULL AUTO_INCREMENT, " +
                //     "RES_URL VARCHAR(80), " +
                //     "REGISTER_DATE DATETIME, " +
                //     "PRIMARY KEY (UID)," +
                //     "FOREIGN KEY (MEMO_ID) REFERENCES MEMO_TB(MEMO_ID)" +
                //     ")";
                // con.query(sqlQuery, function (err, result) {
                //     if (err) {
                //         console.log("Create MEMO File Table Error " + err)
                //     } else {
                //         console.log("MEMO File Created")
                //     }
                // })

                // Dump Data START TEST 용
                // randomMemo(con)
                // randomFile(con)
                // Dump Data END TEST 용

                /**
                 * 데이터 베이스 기본 언어 변경
                 */
                // sqlQuery = "ALTER DATABASE DB_MEMO DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
                // // Database 언어 변경
                // con.query(sqlQuery,function(err,result){
                //     if (err) {
                //         console.log("Database Alter Error " + err);
                //     } else {
                //         console.log("Database Alter Success");
                //     }
                // });

                // Android 기본 개념 DB
                /**
                 * ID          -> 메모 아이디 (AUTO_INCREMENT)
                 * TITLE            -> 제목
                 * CONTENTS         -> 내용
                 * REGISTER_DATE    -> 등록 날짜 DATETIME
                 */
                // sqlQuery = "CREATE TABLE AND_MEMO_TB (" +
                //     "ID SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
                //     "TITLE VARCHAR(800) NOT NULL," +
                //     "CONTENTS VARCHAR(2000) NOT NULL," +
                //     "REGISTER_DATE DATETIME" +
                //     ")";
                // // Memo Table Create
                // con.query(sqlQuery, function (err, result) {
                //     if (err) {
                //         console.log("Create Memo Table Error " + err);
                //     } else {
                //         console.log("Memo Table Created");
                //     }
                // });

                // Android 기본 개념 DB
                /**
                 * ID          -> 메모 아이디 (AUTO_INCREMENT)
                 * TITLE            -> 제목
                 * CONTENTS         -> 내용
                 * REGISTER_DATE    -> 등록 날짜 DATETIME
                 */
                sqlQuery = "CREATE TABLE JAVA_MEMO_TB (" +
                    "ID SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
                    "TITLE VARCHAR(800) NOT NULL," +
                    "CONTENTS VARCHAR(2000) NOT NULL," +
                    "REGISTER_DATE DATETIME" +
                    ")";
                // Memo Table Create
                con.query(sqlQuery, function (err, result) {
                    if (err) {
                        console.log("Create Memo Table Error " + err);
                    } else {
                        console.log("Memo Table Created");
                    }
                });

                // Pool에 Connection을 반납 
                con.release();
                // 1시간 단위로 Ping 떄림.
                setInterval(keepAlive, 60 * 60 * 1000);
            });
        },

        // /**
        //  * Query 문 처리하는 함수.
        //  * 파라미터가 존재하지 않는 타입.
        //  * @param {String} query  DB Query
        //  * @param {bool,rows} callBack Query Callbakc Listener
        //  */
        // fetchQuery: function (query, callBack) {
        //     pool.getConnection(function (err, con) {
        //         con.query(query, function (err, rows) {
        //             callBack(err, rows);
        //             // Pool에 Connection을 반납 
        //             con.release();
        //         })
        //     })
        // },

        /**
         * Query 문 처리하는 함수.
         * 파라미터가 존재하는 타입.
         * @param {String} query    DB Query
         * @param {String []} params  Parameter ex.) '?'
         * @param {bool,rows} callBack  Query Callbakc Listener
         */
        fetch: function (query, params, callBack) {
            if (params == null) {
                pool.getConnection(function (err, con) {
                    if (err) {
                        callBack(err, "DataBase Connection Error")
                        con.release();
                    } else {
                        con.query(query, function (err, rows) {
                            callBack(err, rows);
                            // Pool에 Connection을 반납 
                            con.release();
                        })
                    }
                })
            } else {
                pool.getConnection(function (err, con) {
                    if (err) {
                        callBack(err, "DataBase Connection Error")
                        con.release();
                    } else {
                        con.query(query, params, function (err, rows) {
                            callBack(err, rows);
                            // Pool에 Connection을 반납 
                            con.release();
                        })
                    }
                })
            }
        }
    }
})();

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

/// [S] TEST CODE ====================================================================================
function randomMemo(con) {
    const sqlQuery = 'INSERT INTO MEMO_TB (USER_ID,TAG,TITLE,CONTENTS,REGISTER_DATE)' +
        'VALUES (?,?,?,?,?)';
    for (let i = 0; i < 100; i++) {
        const params = ['test',
            (Math.random() * 7 + 1),
            makeid(),
            'Message\t' + makeid(),
            makeImage(),
            new Date()];
        con.query(sqlQuery, params, function (err, rows) {
            if (err) {
                console.log('Dump Err' + err);
            } else {
                console.log('Dump Success ' + rows.insertId);
            }
        })
    }
}

function randomFile(con) {
    const arr = []
    arr.push("IMG_1594645069528uibrhjcizvf.jpeg")
    arr.push("IMG_1594645115336nywr85bdph.jpeg")
    arr.push("IMG_1595895721787p0rnmvea02i.jpeg")
    arr.push("IMG_1595897676051afk1j1b40cc.jpeg")
    arr.push("IMG_15946450230737kkbsc1gw6f.jpeg")
    arr.push("IMG_15946451114253y84tk1t2cu.jpeg")
    arr.push("IMG_15947989553665us6sahoh98.jpeg")

    const sqlQuery = 'INSERT INTO MEMO_FILE_TB ' +
        '(MEMO_ID, RES_URL, REGISTER_DATE)' +
        'VALUES (?,?,?)'

    for (let i = 0; i < 100; i++) {
        const params = [(Math.random() * 100 + 52),
        arr[getRanRange(arr.length - 1)],
        new Date()]

        con.query(sqlQuery, params, function (err, rows) {
            if (err) {
                console.log('Dump Err' + err);
            } else {
                console.log('Dump Success ' + rows.insertId);
            }
        })
    }
}

function makeImage() {
    let text = "";
    const ran = Math.floor(Math.random() * 100)

    if (ran % 2 == 0) {
        return null
    } else {
        const arr = [];
        arr.push("IMG_1594645069528uibrhjcizvf.jpeg")
        arr.push("IMG_1594645115336nywr85bdph.jpeg")
        arr.push("IMG_1595895721787p0rnmvea02i.jpeg")
        arr.push("IMG_1595897676051afk1j1b40cc.jpeg")
        arr.push("IMG_15946450230737kkbsc1gw6f.jpeg")
        arr.push("IMG_15946451114253y84tk1t2cu.jpeg")
        arr.push("IMG_15947989553665us6sahoh98.jpeg")

        const tmpArr = [];

        for (let i = 0; i < getRanRange(3, false); i++) {
            tmpArr.push(arr[getRanRange(arr.length)])
        }

        console.log(JSON.stringify(tmpArr))
        return JSON.stringify(tmpArr)
    }
}

function getRanRange(range) {
    return getRanRange(range, true)
}

function getRanRange(range, isZero) {
    if (isZero) {
        return Math.floor(Math.random() * range)
    } else {
        return Math.floor(Math.random() * range + 1)
    }
}

function makeid() {
    let text = "";
    const possible = "가나다라보미디뱌추퍼즐거운바람의나라뿌잉뼈뺑뺭뿅주홍민박민진";

    for (let i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        if (i % 5 == 0) {
            text += '\n';
        }
    }

    return text;
}
/// [E] TEST CODE ====================================================================================

const localService = require('../../../service/memo_service');
const utils = require('../../../utils/commandUtil');
const StringBuffer = require('stringbuffer');
const fs = require('fs');

/**
 * 메모 Module
 */
const Memo = {

    /**
     * 메모 추가
     * @param {String} loginKey 사용자 로그인 키 값.
     * @param {Ojbect} body     tag, num, title, contents, images
     */
    addMemo: function (loginKey, body, callBack) {
        // 로그인 키로 사용자 아이디 값 복호화.
        const userId = utils.dec(loginKey);
        const contents = body.contents.replace(/(?:\r\n|\r|\n)/g, '<br />');
        const currentDate = new Date()

        const sql = 'INSERT INTO MEMO_TB (USER_ID, TAG, TITLE, CONTENTS, REGISTER_DATE)' +
            'VALUES(?,?,?,?,?)';
        const params = [userId, body.tag, body.title, contents, currentDate];
        localService.fetch(sql, params, callBack)
    },

    postAndroidMemo: function (body, callBack) {
        const title = body.title
        const contents = body.contents
        const date = new Date()
        const sql = 'INSERT INTO AND_MEMO_TB (TITLE, CONTENTS, REGISTER_DATE)' +
            'VALUES(?,?,?)';
        const params = [title, contents, date]
        localService.fetch(sql, params, callBack)
    },

    postJavaMemo: function (body, callBack) {
        const title = body.title
        const contents = body.contents
        const date = new Date()
        const sql = 'INSERT INTO JAVA_MEMO_TB (TITLE, CONTENTS, REGISTER_DATE)' +
            'VALUES(?,?,?)';
        const params = [title, contents, date]
        localService.fetch(sql, params, callBack)
    },

    fetchAndroidMemo: function (callBack) {
        const sql = 'SELECT TITLE, CONTENTS FROM AND_MEMO_TB ORDER BY ID ASC'
        localService.fetch(sql, null, callBack)
    },

    fetchJavaMemo: function (callBack) {
        const sql = 'SELECT TITLE, CONTENTS FROM JAVA_MEMO_TB ORDER BY ID ASC'
        localService.fetch(sql, null, callBack)
    },

    /**
     * 사용자에 맞는 메모 리스트 가져오기
     * @param {String} loginKey  사용자 로그인 키값. 
     * @param {Object} query     필터 옶션, 정렬 및 검색
     * sortOpt -> 정렬 옵션 (기본값 TAG,TITLE ASC)
     * filterTag -> 보여주고 싶은 태그 
     * keyWord -> 타이틀 기준 해당 문자열을 포함한 (Like)
     * 
     * @param {Listener} callBack DB Query 호출후 Listener
     * @author hmju
     * @example 
     * SELECT M.USER_ID, M.TAG, M.MEMO_ID, M.TITLE, M.CONTENTS, F.RES_URL, M.REGISTER_DATE
     * FROM (
     * SELECT USER_ID, TAG, MEMO_ID, TITLE, CONTENTS, REGISTER_DATE 
     * FROM MEMO_TB
     * WHERE USER_ID='test' AND TAG=3 AND TITLE LIKE '%추%'
     * ORDER BY TAG, TITLE ASC LIMIT 0,20)
     * AS M
     * LEFT JOIN MEMO_FILE_TB AS F ON (M.MEMO_ID = F.MEMO_ID)
    */
    fetchMemo: function (loginKey, query, callBack) {
        const userId = utils.dec(loginKey);
        const pageSize = 20; // 한번 불러올 데이터 양 고정

        // PageIndex 계산 ex.) 0, 20, 40, 60...
        let pageIndex = (query.pageNo - 1) * pageSize;

        // [s] SQL Query
        const queryBuf = new StringBuffer();
        const paramsArr = new Array();

        queryBuf.append('SELECT M.MEMO_ID, M.TAG, M.TITLE, M.CONTENTS, ')
        queryBuf.append('F.UID, F.RESOURCE_PATH, M.REGISTER_DATE ')
        queryBuf.append('FROM (')
        queryBuf.append('SELECT TAG, MEMO_ID, TITLE, CONTENTS, REGISTER_DATE ')
        queryBuf.append('FROM MEMO_TB WHERE USER_ID=? ')

        paramsArr.push(userId);

        // 필터 옵션이 있는 경우
        if (utils.isValidInt(query.filterTag)) {
            let filterTag = -1
            switch (query.filterTag) {
                case 100: // 빨강 우선순위 1
                    filterTag = 1
                    break
                case 101: // 주황 우선순위 2
                    filterTag = 2
                    break
                case 102: // 노랑 우선순위 3
                    filterTag = 3
                    break
                case 103: // 초록 우선순위 4
                    filterTag = 4
                    break
                case 104: // 파랑 우선순위 5
                    filterTag = 5
                    break;
                case 105: // 보라 우선순위 6
                    filterTag = 6
                    break;
                case 106: // 회색 우선 순위 7
                    filterTag = 7
                    break;

            }
            if (filterTag != -1) {
                queryBuf.append('AND TAG=? ')
                paramsArr.push(utils.decode_utf8(filterTag))
            }
            console.log("Filter Opt " + utils.decode_utf8(filterTag));
        }

        // 검색어가 있는 경우.
        if (utils.isValidString(query.keyWord)) {
            queryBuf.append('AND TITLE LIKE ? ');
            paramsArr.push('%' + utils.decode_utf8(query.keyWord) + '%');
        }

        // 정렬 옵션이 있는 경우
        if (utils.isValidString(query.sortOpt)) {
            console.log("Sort Opt " + utils.decode_utf8(query.sortOpt));
        } else {
            // ASC 오름 차순 오른쪽으로 갈수록 커진다.
            queryBuf.append('ORDER BY TAG ASC ');
        }

        // 범위 설정
        queryBuf.append('LIMIT ?,? )');
        paramsArr.push(pageIndex);
        paramsArr.push(pageSize);

        queryBuf.append('AS M ')
        queryBuf.append('LEFT JOIN MEMO_FILE_TB AS F ON (M.MEMO_ID = F.MEMO_ID)')
        // [e] SQL Query
        // console.log('Query ' + queryBuf.toString())
        // console.log('QUery Params ' + paramsArr)
        localService.fetch(queryBuf.toString(), paramsArr, callBack);
    },

    /**
     * 메모값 수정
     * @param {String} loginKey 사용자 로그인 키값.
     * @param {Object} body memo_id, tag, title, contents 
     * @param {Listener} callBack DB Query 호출후 Listener
     * @author hmju
     */
    updateMemo: function (loginKey, body, callBack) {
        // 데이터 유효성 검사.
        if (body.memo_id == null) return;

        const contents = body.contents.replace(/(?:\r\n|\r|\n)/g, '<br />');

        const sql = 'UPDATE MEMO_TB SET TAG=?, TITLE=?, CONTENTS=?, REGISTER_DATE=? WHERE MEMO_ID=?';
        const params = [body.tag, body.title, contents, new Date(), body.memo_id];
        localService.fetch(sql, params, callBack);
    },

    /**
     * 메모장 삭제.
     * @param {loginKey} loginKey 
     * @param {Query} Query  memo_id
     * @param {listener} callBack DB Query 호출후 Listener
     */
    deleteMemo: function (loginKey, query, callBack) {
        // 데이터 유효성 검사.
        if (query.memo_id == null) return
        const userId = utils.dec(loginKey);

        const sql = 'DELETE FROM MEMO_TB WHERE MEMO_ID=? AND USER_ID=?'
        const paramsArr = new Array();
        paramsArr.push(query.memo_id)
        paramsArr.push(userId)
        localService.fetch(sql, paramsArr, callBack)
    },

    /**
     * 검색 키워드 썸네일 값
     * @param {String} loginKey 사용자 로그인 키값. 
     * @param {Object} query  KeyWord
     * @param {listener} callBack DB Query 호출후 Listener
     * @author hmju
     */
    getKeyWord: function (loginKey, query, callBack) {
        const userId = utils.dec(loginKey);
    }
};

module.exports = Memo;

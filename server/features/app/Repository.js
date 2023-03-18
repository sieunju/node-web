const localService = require('../../service/memo_service');
const utils = require('../../utils/commandUtil');
const StringBuffer = require('stringbuffer');

const repository = {

    /**
     * 
     * @param {App Info} appInfo 
     * @param {listener} callBack  Query 문 수행후 콜백 하는 리스너.
     */
    versionCheck: function (appInfo, callBack) {

        // [s] SQL Query
        const queryBuf = new StringBuffer();
        const paramsArr = new Array();
        queryBuf.append('SELECT * FROM APP_VERSION_TB WHERE OS_TYPE=?')

        // 안드로이드 or iOS 인경우
        if (appInfo.osType == 'AND' || appInfo.osType == 'iOS') {
            paramsArr.push(appInfo.osType);
        }
        // 유효하지 않은 타입인경우.
        else {
            callBack.onMessage('유효하지 않은 OS 입니다.', null)
            return
        }
        localService.fetch(queryBuf.toString(), paramsArr, callBack);
    }
};

module.exports = repository;


const localService = require('../../service/memo_service');
const utils = require('../../utils/commandUtil');
const StringBuffer = require('stringbuffer');
const fs = require('fs');
const repository = {
    addDeepLink: function (body, callBack) {
        const sql = 'INSERT INTO DEEP_LINK_TB (TITLE, LINK) VALUES(?,?)'
        const params = [body.title, body.link]
        localService.fetch(sql, params, callBack)
    },

    fetchDeepLink: function (callBack) {
        const sql = 'SELECT TITLE, LINK FROM DEEP_LINK_TB ORDER BY ID DESC'
        localService.fetch(sql, null, callBack)
    }
}

module.exports = repository
const db = require('../features/memo/db_config');
const utils = require('../utils/commandUtil');
const StringBuffer = require('stringbuffer');
const fs = require('fs');

/**
 * 대충 링크
 */
const DeepLink = {
    addDeepLink: function (body, callBack) {
        const sql = 'INSERT INTO DEEP_LINK_TB (TITLE, LINK) VALUES(?,?)'
        const params = [body.title, body.link]
        db.fetch(sql, params, callBack)
    },

    fetchDeepLink : function(callBack) {
        const sql = 'SELECT TITLE, LINK FROM DEEP_LINK_TB ORDER BY ID DESC'
        db.fetch(sql,null,callBack)
    }
}

module.exports = DeepLink
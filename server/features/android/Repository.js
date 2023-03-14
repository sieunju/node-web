const localService = require('../../service/memo_service');
const utils = require('../../utils/commandUtil');
const StringBuffer = require('stringbuffer');
const fs = require('fs');
const repository = {

    post: function (body, callBack) {
        const title = body.title
        const contents = body.contents
        const date = new Date()
        const sql = 'INSERT INTO AND_MEMO_TB (TITLE, CONTENTS, REGISTER_DATE)' +
            'VALUES(?,?,?)';
        const params = [title, contents, date]
        localService.fetch(sql, params, callBack)
    },

    fetch: function (callBack) {
        const sql = 'SELECT TITLE, CONTENTS FROM AND_MEMO_TB ORDER BY ID ASC'
        localService.fetch(sql, null, callBack)
    }
};

module.exports = repository;

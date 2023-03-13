const db = require('../features/memo/db_config');
const utils = require('../utils/commandUtil');
const StringBuffer = require('stringbuffer');
const fs = require('fs');

const Upload = {

    addBlob : function (fileArr,callBack){
        // BLOB_DATA_1, BLOB_DATA_2
        const sql = 'INSERT INTO TEST_TB (REGISTER_DATE,BLOB_DATA_1,BLOB_DATA_2) VALUES(?,?,?)';

        console.log('Start File Read');
        let buffers = new Array(fileArr.length);
        for(let i=0; i< buffers.length; i++){
            buffers[i] = fs.readFileSync(fileArr[i].path);
        }
        console.log('Success File Read Size ' + buffers[0].length + "\t" + buffers[1].length);
        const params = [new Date(),buffers[0],buffers[1]];
        db.fetch(sql,params,callBack);
    },

    fetchBlobArr : function(query,callBack){
        const sql = 'SELECT BLOB_DATA_1, BLOB_DATA_2 FROM TEST_TB WHERE BLOB_ID=?';
        const params = [query.id];
        db.fetch(sql, params, callBack); 
    }
};

module.exports = Upload;
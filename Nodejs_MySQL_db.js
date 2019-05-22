var mysql = require('mysql');
var db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    multipleStatements:true
});
db.connect();
module.exports=db;

//버전 관리에 올리는 파일은 MySQL에 아무 정보도 없는 더미 파일을 올린다.
//이 파일은 따로 관리한다.
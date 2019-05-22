Nodejs - MySQL
====================================================

## 1) Nodejs MySQL 모듈의 기본 사용방법
Nodejs의 기본모듈에는 MySQL에 관한 모듈이 없으므로 다른 사람이 구현한 MySQL모듈을 찾아본다.
```
npm install mysql
```

**[추천 검색어]**
```
nodejs mysql
```

### (1) mysql모듈 사용예제
```
//mysql 모듈을 가져온다.
var mysql = require('mysql');

var connection = mysql.createConnection({
    host        :'localhost',
    user        :'root',
    password    :'1234',
    database    :'opentutorials'
});

//DB Server에 접속한다.
connection.connect();

//SQL문을 DB Server에게 보낸다. callback은 결과를 받아서 처리하는 함수가 적용된다.
connection.query('SELECT 1 + AS solution', function(error, results, fields){
    if(error) throw error;
    console.log('The solution is : ', results[0].solution);
});

connection.end();
```

### (2) server에 접속이 안될때 해결방법
mysql에 새로운 user를 만들어서 접속 가능하게한다.ㄴ
```
//table 보기
mysql> SELECT Host,User FROM mysql.user;
+-----------+------------------+
| Host      | User             |
+-----------+------------------+
| localhost | debian-sys-maint |
| localhost | mysql.session    |
| localhost | mysql.sys        |
| localhost | root             |
+-----------+------------------+
5 rows in set (0.00 sec)

//mysql에 user를 추가한다.
mysql> CREATE USER 'nodejs'@'%' IDENTIFIED BY 'password';
Query OK, 0 rows affected (0.00 sec)

//그 user에게 권한을 준다.
mysql> GRANT ALL PRIVILEGES ON opentutorials.* TO 'nodejs'@'%';
Query OK, 0 rows affected (0.00 sec)

//적용되게 하는 명령어
mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.00 sec)

```

## 2) 홈페이지 구현

**[추천 검색어]**
```
//DB에 insert하는 방법
mysql nodejs insert id
```

## 18) 보안 - SQL Injection
외부에서 입력되는 정보를 반드시 오염되었다고 생각하고 처리를 해주어야한다.

URL에 이렇게 SQL문을 추가하여 전송할 수 있다.

<img src="./image/34.png" height="400">

이 sql을 적용하는 code에 받은 query string문을 적용하면 
```sql
SELECT * 
FROM topic 
LEFT JOIN author ON topic.author_id=author.id 
WHERE topic.id=1;DROP TABLE topic;
```
이런 sql문이 구성되어 실행된다.

<img src="./image/35.png">

[해결방법]
1) 전송되는 id의 값을 **`''`**으로 감싸면 문자열로 인식하여 query문으로써 실행되지 않는다.
```sql
SELECT * 
FROM topic 
LEFT JOIN author ON topic.author_id=author.id 
WHERE topic.id='1;DROP TABLE topic';
```

단 이렇게 multipleStatements를 true로 한다면 여러개의 sql문을 적용하는 것이 가능하다.
<img src="./image/36.png">

2)  db모듈의 escape함수를 사용한다.

<img src="./image/37.png">

이렇게 적용된다.

```sql
SELECT * 
FROM topic
LEFT JOIN author ON topic.author_id=author.id 
WHERE topic.id='1;DROP TABLE topic'
```

## 19) 보안 - Escaping (XSS 공격기법 방어)
POST로 입력될때 악성코드가 입력되거나 출력되는 내용이 악용될 수 있는 정보일 때 처리를 해줘야한다.

nodejs 강의에서와 같이 sanitize-html을 사용한다.

## 20) 수업을 마치며

**[추천 검색어]**
(1) 검색 기능
form tag로 검색어를 get방식으로 전송한다.

정보가 많다면 검색을 하려면 index(색인)기능을 검색한다.

(2) 정렬 기능
```
SELECT * FROM topic ORDER BY id DESC
```

(3) 페이지 기능
```
SELECT * FROM topic LIMIT 0 OFFSET 20
```

(4) NOSQL
sql을 사용하지 않는 다른 대안의 sql이다.
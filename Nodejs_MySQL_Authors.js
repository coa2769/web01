var db = require('./Nodejs_MySQL_db.js');
var template = require('./Nodejs_MySQL_template.js');
var qs = require('querystring');

//authors || authors/update
exports.home = function(request, response)
{
    db.query(`SELECT * FROM topic`, function(error, topics){
        db.query(`SELECT * FROM author`, function(error2, authors){
        
        var title = 'Author List';
        var description = template.authorBoby(authors);
    
        var list = template.list(topics);
        var html = template.HTML(title, list,
            `<h2>${title}</h2>
            ${description}
            <style>
                table{
                    border-collapse: collapse;
                }
                td{
                    border:1px solid black;
                }
            </style>

            <form action="/author/create_process" method="post">
            <p><input type="text" name="name" placeholder="name"></p>
            <p>
                <textarea name="profile" placeholder="profile"></textarea>
            </p>
            <p>
                <input type="submit" value="create">
            </p>
            </form>`,
            '');
    
            response.writeHead(200);
            response.end(html);
        });
    });
}

exprots.update = function(request, response, id)
{
    db.query(`SELECT * FROM topic`, function(error, topics){
        db.query(`SELECT * FROM author`, function(error2, authors){
            db.query(`SELECT * FROM author WHERE id=?`, [id],function(error3, author){
                
                var title = 'Author List';
                var description = template.authorBoby(authors);
            
                var list = template.list(topics);
                var html = template.HTML(title, list,
                    `<h2>${title}</h2>
                    ${description}
                    
                    <style>
                    table{
                        border-collapse: collapse;
                    }
                    td{
                        border:1px solid black;
                    }
                    </style>

                    <form action="/author/update_process" method="post">
                    <input type="hidden" name="id" value="${author[0].id}">
                    <p><input type="text" name="name" placeholder="name" value="${author[0].name}"></p>
                    <p>
                        <textarea name="profile" placeholder="profile">${author[0].profile}</textarea>
                    </p>
                    <p>
                        <input type="submit" value="update">
                    </p>
                    </form>`,
                    '');
            
                    response.writeHead(200);
                    response.end(html);
            });
        });
    });
}

exports.create_process = function(request, response)
{
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`INSERT INTO author (name, profile) VALUES(?, ?);`,
        [post.name, post.profile],
        function(error, result){
          if(error){
            throw error;
          }
          response.writeHead(302, {Location:`/author`});
          response.end();
        });
    });
}

exports.update_process = function(request, response)
{
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        //여러 colum을 수정 하려면 ','로 구분한다.
        db.query(`UPDATE author SET name=?, profile=? WHERE id=?;`,
        [post.name, post.profile, post.id],
        function(error, result){
          if(error){
            throw error;
          }
          response.writeHead(302, {Location:'/author'});
          response.end();
          });
    });
}

exports.delete_process = function(request, response)
{
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`DELETE FROM author WHERE id=?`,
        [post.id],function(error, result){
          if(error){
            throw error;
          }

          response.writeHead(302, {Location: `/author`});
          response.end();
        });
    });
}
var qs = require('querystring');
var url = require('url');
var db = require('./Nodejs_MySQL_db.js');
var template = require('./Nodejs_MySQL_template.js');
var sanitizeHtml = require('sanitize-html');

exports.home=function(request, response){
  db.query(`SELECT * FROM topic`, function(error, topics){
      var title = 'Welcome';
      var description = 'Hello, Node.js';
      var list = template.list(topics);
      var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create"> create </a>`
          );

          response.writeHead(200);
          response.end(html);
  });
}

exports.page = function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, function(error, topics){
      if(error){
          throw error;
      }
      //db.query(`SELECT * FROM topic WHERE id=${queryData.id}`, function(error2, topic){
      //위 문법은 client의 값을 직접 입력받는데 매우 위험하다. 하지만 밑은 입력값을 확인하여 확인해준다.
      //query함수의 option없이 sql문을 입력할 때 여러 sql문을 실행하려고 하면 거부된다.
      db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=${db.escape(queryData.id)}`, function(error2, topic){
          if(error2){
              throw error2;
          }
          var list = template.list(topics);
          var html = template.HTML(topic[0].title, list,
            //js code 등의 악성코드가 입력되면 출력되지 않도록 걸러준다.
              `<h2>${sanitizeHtml(topic[0].title)}</h2>
              ${sanitizeHtml(topic[0].description)}
              <p> by ${sanitizeHtml(topic[0].name)} </p>`,
              `<a href="/create"> create </a>
              <a href="/update?id=${queryData.id}">update</a>
                  
              <form action="/delete_process" method="POST">
                  <input type="hidden" name="id" value="${queryData.id}">
                  <input type="submit" value="delete">
              </form>
              `);

              response.writeHead(200);
              response.end(html);
      });
  });
}

exports.create=function(request, response){
  db.query(`SELECT * FROM topic`, function(error, topics){
      db.query(`SELECT * FROM author`, function(error2, authors){
        var title = 'Create';
        var list = template.list(topics);
        var html = template.HTML(title, list,
          `<form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              ${template.authorSelect(authors)}
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `, 
        `<a href="/create">create</a>`
        );

        response.writeHead(200);
        response.end(html);
      });
  });
}

exports.create_process=function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      db.query(`INSERT INTO topic (title, description, created, author_id) 
      VALUES(?, ?, NOW(), ?);`,
      [post.title, post.description, post.author_id],
      function(error, result){
        if(error){
          throw error;
        }
        response.writeHead(302, {Location:`/?id=${result.insertId}`});
        response.end();
      });
  });
}

exports.update = function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;

  db.query(`SELECT * FROM topic`, function(error, topics){
    if(error){
        throw error;
    }
    db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function(error2, topic){
      if(error2){
        throw error2;
      }
      db.query(`SELECT * FROM author`, function(error3, authors){
          //목록
          var list = template.list(topics);
          var html = template.HTML(topic[0].title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
              <p>
                <textarea name="description" placeholder="description">${topic[0].description}</textarea>
              </p>
              <p>
              ${template.authorSelect(authors)}
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
          );

          response.writeHead(200);
          response.end(html);
      });
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
      db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?;`,
      [post.title, post.description,post.author_id, post.id],
      function(error, result){
        if(error){
          throw error;
        }
        response.writeHead(302, {Location:`/?id=${post.id}`});
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
        db.query(`DELETE FROM topic WHERE id=?`,
        [post.id],function(error, result){
          if(error){
            throw error;
          }

          response.writeHead(302, {Location: `/`});
          response.end();
        });
    });
}

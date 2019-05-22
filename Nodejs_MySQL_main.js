var http = require('http');
var url = require('url');
var topic = require('./Nodejs_MySQL_topic.js');
var author = require('./Nodejs_MySQL_Authors.js')

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    //본문 출력
    if(pathname === '/')
    {
        //home page
      if(queryData.id === undefined)
      {
        //table의 목록을 가져오는 sql
        topic.home(request, response);
      } 
      //id에 맞는 row으로 page를 생성하여 전송
      else 
      {
          //table의 목록을 가져오는 sql
          topic.page(request, response);
      }
    } 
    //글생성 page
    else if(pathname === '/create'){
        topic.create(request, response);
    }
    //생성할 page를 입력받는다. 
    else if(pathname === '/create_process'){
        topic.create_process(request, response);
    }
    //글수정 page 
    else if(pathname === '/update')
    {
        topic.update(request, response);
    } 
    else if(pathname === '/update_process')
    {
        topic.update_process(request, response);
    } 
    else if(pathname === '/delete_process')
    {
        topic.delete_process(request, response);
    } 
    //저자편집 page
    else if(pathname === '/author')
    {
        author.home(request, response);
    }
    else if(pathname === '/author/create_process')
    {
        author.create_process(request, response);
    }
    else if(pathname === '/author/update')
    {
        author.update(request, response, queryData.id);
    }
    else if(pathname === '/author/update_process')
    {
        author.update_process(request, response);
    }
    else if( pathname === '/author/delete_process')
    {
        author.delete_process(request, response);
    }
    else 
    {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);

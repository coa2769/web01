var http = require('http');
var url = require('url');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    //본문 출력
    if(pathname === '/')
    {
        //main page

        //작성된 글

        //그 외
        
    }
    else if(pathname === '/create')
    {   

    }
    else if(pathname === '/create_process')
    {

    }   
    else if(pathname === '/update')
    {

    } 
    else if(pathname === '/update_process')
    {

    }
    else if(pathname === '/delete_process')
    {

    }

});
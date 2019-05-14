//require() => 영어로 요구하다라는 뜻으로 우리가 만든 웹 애플리케이션에 필요한 모듈을 반환해준다.
//모듈이란? nodeJS가 가지고 있는 기능들을 파일(그룹) 단위로 묶은 것이다.

var http = require('http');
var fs = require('fs');     //file systemp 모듈
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    //parse() : 받은 url에서 query string부분을 파싱하여 객체화해주는 기능이다.
    var queryData = url.parse(_url, true).query;
    //pathname : query string을 제외한 실제 파일 경로
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;

    //실제 파일 경로에 '/'있다면 id에 따라 출력할 페이지 판별
    if(pathname === '/')
    {
        //query string의 id가 파일이름이다.
        fs.readFile(`data/${title}`,'utf8',function(err, data){
            //본문 파일을 읽어서 추가.
            //편집한 본문의 내용을 수정한 후에는 nodeJS를 다시 실행할 필요없이 바로 적용가능하다.
            //(nodeJS는 main.js를 직접 실행하고 있으므로 이 파일에 변견이 일어나면 그때는 nodeJS를 다시 실행해야한다.)
            var description = data;
            //출력될 본문, id에 따라 제복이 바뀐다.
            var template = `
            <!doctype html>
                <html>
                    <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/"> WEB </a></h1>
                        <ol>
                            <li><a href="/?id=HTML"> HTML </a></li>
                            <li><a href="/?id=CSS"> CSS </a></li>
                            <li><a href="/?id=JavaScript"> JavaScript </a></li>
                        </ol>
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </body>
                </html>`;
            title = 'Welcom';

            response.writeHead(200);
            //알맞는 페이지를 보내주는 기능
            response.end(template);
        });
    }
    //그외의 URL은 잘못된 요청이다.
    else
    {
        response.writeHead(404);
        response.end();
    }

});

app.listen(3000);
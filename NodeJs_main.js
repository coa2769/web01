//require() => 영어로 요구하다라는 뜻으로 우리가 만든 웹 애플리케이션에 필요한 모듈을 반환해준다.
//모듈이란? nodeJS가 가지고 있는 기능들을 파일(그룹) 단위로 묶은 것이다.

var http = require('http');
var fs = require('fs');     //file systemp 모듈
var url = require('url');
var qs = require('querystring');
var template = require('./Nodejs_Template.js');

var app = http.createServer(function(request,response){
    var _url = request.url;
    //parse() : 받은 url에서 query string부분을 파싱하여 객체화해주는 기능이다.
    var queryData = url.parse(_url, true).query;
    //pathname : query string을 제외한 실제 파일 경로
    var pathname = url.parse(_url,true).pathname;

    //실제 파일 경로에 '/'있다면 id에 따라 출력할 페이지 판별
    if(pathname === '/')
    {
        //(WEB을 눌렀을 때)id가 없다면 그에 따른 본문과 제목 처리
        if(queryData.id === undefined)
        {

            //폴더의 파일 목록을 읽어들인다.
            fs.readdir('./data',function(err, fileList){
                var title = 'Welcom';
                var description = 'Hello, Node.js';
                var list = template.makeList(fileList)
                var template = templat.makeHTML(title, list, 
                    `<h2>${title}</h2><p>${description}</p>`,
                    //WEB 페이지에서는 페이지 생성만 가능하다.
                    '<a href="/create">create</a>');
    
                response.writeHead(200);
                //알맞는 페이지를 보내주는 기능
                response.end(template);
            });
        }
        //WEB 외의 URL을 눌러서 id값을 전송 했을때
        else
        {
            //폴더의 파일 목록을 읽어들인다.
            fs.readdir('./data',function(err, fileList){
                //query string의 id가 파일이름이다.
                fs.readFile(`data/${queryData.id}`,'utf8',function(err, description){
                
                    //파일에 따라 목록을 나타내는 code자동 생성
                    var list = template.makeList(fileList);
                    //본문 파일을 읽어서 추가.
                    //편집한 본문의 내용을 수정한 후에는 nodeJS를 다시 실행할 필요없이 바로 적용가능하다.
                    //(nodeJS는 main.js를 직접 실행하고 있으므로 이 파일에 변경이 일어나면 그때는 nodeJS를 다시 실행해야한다.)
                    
                    //출력될 본문, id에 따라 제목이 바뀐다.
                    var template = templat.makeHTML(queryData.id, list, 
                        `<h2>${queryData.id}</h2><p>${description}</p>`,
                        //WEB페이지 외에서는 페이지 생성과 수정, 삭제 모두 가능하다.
                        //<a>는 get방식 전송을 한다.
                        //삭제를 get방식으로 전송한다면 다른 사용자가 같은 URL을 사용하는 것으로 삭제를 하면 안되는 파일을 삭제할 수 있다.
                        //그러므로 <form>을 사용하여 post방식으로 데이터를 전송해야한다.
                        `<a href="/create">create</a> 
                        <a href="/update?id=${queryData.id}">update</a>
                        
                        <form action="/delete_process" method="POST">
                            <input type="hidden" name="id" value="${queryData.id}">
                            <input type="submit" value="delete">
                        </form>
                        `);
                    
                    response.writeHead(200);
                    //알맞는 페이지를 보내주는 기능
                    response.end(template);
                });
            });
        }
    }
    //http://192.168.0.81:3000/create을 처리하는 부분이다.
    //페이지 생성을 할때 
    else if(pathname === '/create')
    {
        fs.readdir('./data',function(err, fileList){
            var title = 'WEB - create';
            var list = template.makeList(fileList);
            //작성하여 전송하는 부분
            //웹브라우저는 자동으로 http를 붙여 주지만 여기서는 http프로토콜을 사용한다고 명시해야 한다.)
            //path만 적는다면 자동으로 앞부분을 붙여준다.
            var template = templat.makeHTML(title, list,`
                <form action="http://192.168.0.81:3000/create_process" method="POST">
                    <p><input type="text" name="title"></p>
                    <p>
                        <textarea name="description"></textarea>
                    </p>
                    <p><input type="submit"></p>
                </form>
            `);

            response.writeHead(200);
            response.end(template);
        })
    }
    else if(pathname === '/create_process')
    {
        var body = '';

        //'data' : 조각조각의 data를 신수할 때 마다 callback함수 호출. data라는 매개변수로 수신할 정보를 callback에 입력.
        //이런 방식을 사용하는 이유는 너무 큰 데이터를 한번에 받으면 서버에 무리가 갈 수 있기 때문이다.
        request.on('data', function(data){
            body = body + data;
        });

        //'end' : 그렇게 데이터를 수신하다가 더이상 데이터가 없다면 callback함수를 호출한다.(정보 수신 끝)
        request.on('end', function(){
            //title=temp&description=nodejs+is.... 이렇게 받은 데이터를 parse()함수가 객체화하여 반환해 준다.
            var post = qs.parse(body);

            //post의 form data에 title과 description에 대한 데이터가 들어 있다.
            var title = post.title;
            var description = post.description;

            //파일 생성하고 안에 내용을 추가한다. write할 때 파일이 없다면 자동으로 생성한다.
            fs.writeFile(`./data/${post.title}`,`${post.description}`,'utf8',function(err){
                //301 : 앞으로 새 URL로 영원히 접근해야한다.
                //302 : 지금만 이 URL로 이동한다.
                response.writeHead(302, {Location:`/?id=${title}`});
                response.end();
            });
        });
    }
    //선택한 페이지 수정할 때
    else if(pathname === '/update')
    {
        fs.readdir('./data', function(err, fileList){
            fs.readFile(`./data/${queryData.id}`, 'utf8', function(err, description){
                var title = 'WEB - update';
                var list = template.makeList(fileList);
                //편집 UI에 파일의 내용을 넣어주어야한다.
                //input의 hidden는 수정 필요없이 form data로 전송하고 싶은 데이터를 넣어둔다.
                //input은 value로 textarea은 <textarea>내용</textarea> 이렇게 넣어준다.
                var template = templat.makeHTML(title, list,`
                    <form action="http://192.168.0.81:3000/update_process" method="POST">
                        <p><input type="hidden" name="id" value="${queryData.id}"></p>
                        <p><input type="text" name="title" placeholder="title" value="${queryData.id}"></p>
                        <p>
                            <textarea name="description" placeholder="description">${description}</textarea>
                        </p>
                        <p><input type="submit"></p>
                    </form>
                `, '');

                response.writeHead(200);
                response.end(template);
            });
        });
    }
    //수정 내용을 받아서 파일을 수정한다.
    else if(pathname === '/update_process')
    {
        var body = '';

        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);

            //id와 title이 다르면 파일 이름이 변경된다.
            fs.rename(`./data/${post.id}`, `./data/${post.title}`, function(err){
                //파일 내용 수정
                fs.writeFile(`./data/${post.title}`, `${post.description}`, 'utf8', function(err){
                    response.writeHead(302, {Location:`/?id=${post.title}`});
                    response.end();
                });
            });
        });
    }
    //삭제 요청이 왔을 때의 URL이다.
    else if(pathname === '/delete_process')
    {
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });

        request.on('end', function(){
            var post = qs.parse(body);

            //파일 삭제
            fs.unlink(`./data/${post.id}`, function(err){
                //파일 삭제 후 WEB 페이지로 리다이렉트 한다.
                response.writehead(302, {Location:'/'});
                response.end();
            });
        })
    }
    //그외의 URL은 잘못된 요청이다.
    else
    {
        response.writeHead(404);
        response.end();
    }

});

app.listen(3000);
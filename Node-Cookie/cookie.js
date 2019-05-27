var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response){
    var cookies = {};
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie);
    }
    console.log(cookies.yummy_cookie);
    response.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco', 
            'tasty_cookie=strawberry',
            'SecureOption=TRUE; Secure',
            'HttpOnlyOption=TRUE; HttpOnly',
            'Path=Path; Path=/cookie'
    ]
    });
    response.end('Cookie!!');
}).listen(3000);


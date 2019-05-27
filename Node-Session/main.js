const express = require('express')
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');

var helmet = require('helmet');
app.use(helmet());
//Session 모듈을 여기서 등록
var session = require('express-session');
//Session값을 파일에 저장해주는 모듈
var FileStore = require('session-file-store')(session)

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.get('*', function(request, response, next){
    fs.readdir('./data', function(error, filelist){
        request.list = filelist;
        next(); 
    });
});
//Session미들웨어를 사용하기 위해 초기화
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
}));

var indexRouter = require('./routes/index.js');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth.js');

app.use('/topic',topicRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use(function(request, response){
    response.status(404).send('Sorry cant find that!');
});

app.use(function(err, request, response){
    console.error(err.stack);
    response.status(500).send('Something brocke!');
});

app.listen(3000, function(){ 
  console.log('Example app listening on port 3000!')
});


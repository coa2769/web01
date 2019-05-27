var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');

//로그인을 위해 비교하는 값을 객체로 생성한 것이다.
//이 정보는 절대로 code내에 두면 안된다. 다른 파일이나 DB에 저장해두고 변수로 초기화해서 사용해야한다.
var authData = {
    email:'egoing777@gmail.com',
    password:'111111',
    nickname:'egoing'
}

router.get('/login', function(request, response){
    var title = 'WEB - create';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="pwd" placeholder="password"> </p>
        <p>
          <input type="submit" value="login">
        </p>
      </form>
    `, '');

    //express에서는 send로 전송해야 html code가 웹브라우저에서 적용된다.
    response.send(html);
  });

  router.post('/login_process', function(request, response){
    var post = request.body;
    var email = post.email;
    var password = post.pwd;
    //로그인 가능
    if(email === authData.email && password === authData.password)
    {
        //success!(session data가 생성된다.)
        request.session.is_logined = true;            //로그인 됨.
        request.session.nickname = authData.nickname; //닉네임이 저장된다.
        //save함수는 지금 당장 저장소에 저장해주는 함수로 저장이 모두 끝면 callback을 호출한다.
        request.session.save(function(){
            //session 값 저장이 느려져 로그인 처리가 느려지는 상황에서 홈으로 리다이렉트 되면 안되기 때문에 
            //callback에 넣어서 처리한다.
            response.redirect(`/`);
        });
    }
    //로그인 불가
    else
    {
        response.send('Who?');
    }
  });

  router.get('/logout', function(request, response){
        //로그 아웃되면 폴더에 저장된 sesion파일을 삭제해주는 함수. 
        request.session.destroy(function(err){    
            //리다이렉트되면서 새로운 session파일이 생성된다.
            response.redirect('/');
        });
  });

module.exports = router;
Ajax
=================================================
한 HTML page에서 사용자의 작용에 따라 부분적으로 변경하는 기술이다. 이런 Web page를 Single-page application이라고 한다.

## 1) 실습환경

## 2) fetch API
fetch('파일 이름') <br>
이 함수는 client가 server에게 매개변수로 넣은 `파일이름` 과 일치하는 파일을 전송해 달라고 요청한다.
응답으로 server에서 파일이 전송될 것이다.
>  ```
>  fetch('html');
>  ```

fetch('파일 이름').**`then(함수)`** <br>
fetch api 함수이다. 서버가 응답할 때까지 웹브라우저가 따른 일을 하기위해 호출된다. 서버에게 응답이 오면 then의 매개변수로 넣은 함수를 호출하도록(call back)등록하는 함수이다. 비동기(Asynchronous) 작동을 위한 함수이다.
then의 매개변수인 함수에는 **`response객체`** 를 넘겨주기로 되어 있으므로 매개변수 하나를 선언하자.
response객체에는 응답받은 데이터에 대한 내용이 있는데 이 중 status는 통신의 상태를 알려준다. http에서 200은 통신의 완료를 뜻한다. 찾는 파일이 없다면 status는 404이다.
>```
> function callbackme(response){
>     //console 창에 log가 출력된다.
>     console.log('response end');
> }
> fetch('html').then(callbackme);
> //위 함수는 서버의 응답을 기다리지 않고 반환하여 밑의 code를 실행한다.(비동기) 
> console.log(1);
> console.log(2);
>```

함수를 객체나 변수 처럼 선언하거나 매개변수로 넣을 수 있다.
>```
> function callbackme(){
>     console.log('response end');
> }
> 
> //객체나 변수 선언 처럼
> callbackme = function(){
>     console.log('response end');
> }
>
> //선언을 매개변수 안에
> fetch('html').then(function(response){
>       console.log('response end');    
> });
>```

## 3) Ajax 적용

## 4) 초기 페이지 구현

## 5) 글목록 Ajax로 구현

## 6) fetch API polyfill

Vue.js
========================================================================
SPA(Single Page Application) 웹페이지를 구현하기 위한 framework이다.
최신 기술이며 Angular와 React.js의 장점을 가지고 있다.

## 1. 특징
1) 전체 아키텍처를 새롭게 구성할 필요 없다.
2) Router기능을 지원.
3) MVVM패턴 (애플리케이션 로직과 UI 분리)
```
[View (유저 인터페이스)]
    │          X
(데이터         │
바인딩과     알림 전송  
커맨드)         │
    │          │
    X          │
[View Model (상태와 연산)]---업데이트---------->[Model
                         <---알림 전송--------(도메인 특화 데이터)]
```
4) CDN(Content Delivery Network) 주소를 참조하여 HTML문서에 framework를 적용
5) DOM을 지원하여 빠른 UI랜더링이 가능하다.

## 2. 필요한 도구
vue.js devtools : chrome에서 vue개발에 필요 개발도구 
이 책에서는 패키지 관리를 npm대신 yarn으로 한다.
vue-cli : vue의 프로젝트를 생성과 기본 폴더 설정을 해주는 모듈.
```
npm install -g yarn @vue/cli
```

vue-cli으로 프로젝트 생성
```
//commainline으로 생성
vue create [프로젝트 폴더 명]

//GUI로 실행되어
vue ui

//GUI에서 실행 방법
작업목록 >> serve >> 실행 >> 앱열기
```

## 7. ECMAScript 2015

ES2015를 지원하지 않는 하위 브라우저를 위해 트랜스 파일러를 이용하여 하위 버전의 자바스크립트로 번역한다.
트랜스파일러로는 Babel, TSC(TypeScript Compiler)가 있다.
Vue CLI는 두가지 모두 제공한다.

npm install --save-dev : 개발 중에는 모듈을 설치하는 종속성

### 7.2 let과 const 

호이스팅 : 실행 컨텍스트가 만들어진 후에 var키워드가 부여된 변수를 미리 생성하는 것.
중복 선언되도 오류가 나지 않음.

var는 호이스팅하다. 변수 범위가 함수단위로 한정된다. (= 함수 단위의 스코프만 지원)

이를 해결하기 위해 `let`을 사용.
1) 변수 중복 방지
2) `{}`로 변수 범위를 한정(= 블록단위 스코프 지원)

상수 기능을 제공하는 `const`도 블록단위 스코프를 지원한다.

### 7.3 기본 파라미터(Default Parameter)와 가변 파라미터

```js
//기본 파라미터
//함수 파라미터에 기본값 지정이 가능
function addContact(name, mobile, home="없음"){

}

//가변 파라미터
//여러 개의 파라미터 값을 배열로 받을 수 있다.(배열의 길이가 가변적)
function foodReport(name, age, ...faveriteFoods){
    //faveriteFoods는 배열이고 배열의 길이는 호출자가 얼만큼 입력했가에 따라 다르다.
}
```
### 7.4 구조분해할당(destructuring assignment)
배열, 객체의 값들을 추출하여 여러 변수에 할당하는 기능.
```js
//배열
let arr = [10,20,30,40];
//arr배열의 값이 각각 a1, a2, a3에 순서대로 대입된다.
//a1 = 10, a2 = 20, a3 = 30
let [a1,a2,a3] = arr; 

//객체
let p1 = {name:"홍길동", age:20, gender:"M"};
let {name:n, age:a, gender} = p1;
//할당하려는 객체의 속성과 변수가 이름이 같다면 변수명을 생략 가능
//gender가 그 예이다.

//함수 파라미터에서도 사용 가능
function addContact({name, phone, email="이메일 없음", age=0}){

}

addCountact({name:"이몽룡", phone:"010-3434-8989"})

```

### 7.5 화살표 함수(Arrow function)
기존 함수 표현식 간결하게 제공.
함수를 정의하는 영역의 this를 그대로 전달받음.

```js
//아래의 함수들은 모두 동일한 기능 수행
var test1 = function(a,b){
    return a+b;
}
let test2 = (a,b)=>{
    return a+b;
};
let test3 = (a,b) => a+b;

//////////////////////////////
//전통적 함수
function Person(name, yearCount){
    this.name = name;
    this.age = 0;
    
    var incrAge = function(){
        this.age++; //이 함수에 대한 age
    }

    for(var i=1;i<=yearCount;i++){
        incrAge();
    }
}

var p1 = new Person("홍길동", 20);
//--this.age는 0이 출력됨.
console.log(p1.name + "님의 나이 :" + p1.age);

//화살표 함수
function Person(name, yearCount){
    this.name = name;
    this.age = 0;
    
    //이걸 화살표 함수로 선언하면 내부의 this는 Person이 된다.
    var incrAge = ()=>{
        this.age++;
    }

    for(var i=1;i<=yearCount;i++){
        incrAge();
    }
}

var p1 = new Person("홍길동", 20);
console.log(p1.name + "님의 나이 :" + p1.age);

```

### 7.6 새로운 객체 리터럴
객체의 속성 표기법이 개선됨.
```js
//객체의 속성을 작성할 때 변수명과 동일하다면 생략 가능
var name = "홍길동";
var age = 20;
var email = "gh@test.com";

//var obj = {name:name, age:age, email:email};
var obj = {name, age, email};

let p1 = {
    name:"아이패드",
    price : 200000,
    quantity : 2,
    //기존 방식
    order : function(){
        //함수 내용
    },
    addcount:function() addcount{
        //함수 내용
    },
    //새로운 방식
    discount(rate){
        //함수 내용
    }
}

```

### 7.7 템플릿 리터럴
역따옴표로 묶여진 문자열에서 템플릿 대입문(${})을 이용해 동적으로 문자열을 끼워넣는 기능을 제공한다.
템플릿 대입문으로 수식 구문, 변수, 함수 호출 구문 등 대부분의 표현식 사용가능.
개행 문자를 포함하여 여러줄로 작성 가능
```js
var d1 = new Date();
var name = "홍길동";
var r1 = `${name}님에게 ${d1.toDateString()}에 연락했다.`;
//결과 : 홍길동님에게 [오늘 시간]에 연락했다.

//개행문자가 적용되 두줄로 출력
var r2 = `안녕하세요.
띄어쓰기 입니다.`;

```

### 7.8 컬렉션
ES2015에서는 Set, Map, WeakSet, WeakMap과 같은 집합, 맺을 제공한다.

### 7.9 클래스
$ 함수로 유사 클래스(Pseudo Class)가 가능한 이유? C++에서 쓰이는 class랑 다른 건가?
ES2015부터 공식적으로 클래스를 지원한다.
정적 매서드, 인스턴스 메서드, 생성자(constructor)를 모두 지원한다.
상속 또한 지원한다.
```js
class Person{
    //생성자 (constructor는 영어로 생성자라는 뜻)
    constructor(name, tel, address){
        this.name = name;
        this.tel = tel;
        this.address = address;
        if(Person.count){Person.count++;}
        else{Person.count = 1;}
    }
    //정적 매서드
    static getPersonCount(){
        return Person.count; //static이므로 각 객체마다 생기는 것이 아닌 공통으로 하나만 존재
    }
    //인스턴스 메서드
    toString(){
        return `name=${this.name}, tel=${this.tel}, address=${this.address}`;
    }
}

var p1 = new Person('이몽룡','010-222-2222', '경기도');
var p2 = new Person('홍길동','010-444-5555', '서울');
console.log(p1.toString());
console.log(Person.getPersonCount());

//상속
class Employee extends Person{
    constructor(name, tel, address, empno, dept){
        //super은 부모를 나타낸다.
        super(name, tel, address);
        this.empno = empno;
        this.dept = dept;
    }

    toString(){
        return super.toString() + `, empno=${this.empno}, dept=${this.dept}`;
    }
    getEmpInfo(){
        return `${this.empno} : ${this.name}은 ${this.dept}부서입니다.`;
    }
}

let e1 = new Employee("이몽룡", "010-2222-3333","서울시", "A123456","회계팀");
console.log(e1.getEmpInfo());
console.log(e1.toString());
console.log(Person.getPersonCount());
```
### 7.10 모듈
ES2015부터 공식적으로 모듈 기능을 제공합니다.
독립성을 가진 재상용 가능한 코드 블록.
여러개의 코드 블록을 각각의 파일로 분리한 후 필요한 모듈들을 조합해 애플리케이션 개발.
모듈 내부에서 선언된 모든 변수, 함수, 객체, 클래스는 지역적인 것이다.
export할 수 있는 대상은 변수, 함수, 객체, 클래스 등 다양하다.
```js
//파일에서 공개하고자 하는 것들은 export해줘야한다.
export let a = 1000;    
export function f1(a) {....} 
export {n1, n2 as othername, ....}

//또 다른 방법의 export
let var1 = 1000;
function add(a,b){
    return a+b;
}

export {var1, add};
```
```js
//path/ut.js
export let var1 = 1000;
export function add(a,b){
    return a+b;
}

//main.js
//사용하려는 모듈이 있다면 import하면된다. .js확장자는 생략 가능
import{add, var1} from './path/ut.js'; //상대 경로가 사용된다.

//as 예약어를 이용하여 이름을 변경할 수 있다.
import{add, var1 as v} from './path/ut.js';
```

```js
export let a = 1000;    
export function f1(a) {....} 
export {n1, n2 as othername, ....}

//또 다른 방법의 export
let var1 = 1000;
function add(a,b){
    return a+b;
}

export {var1, add};
```
```js
//하나만 export한다면 default키워드를 이용한 후 단일 값으로 import한다
//path/ut.js
let calc = {
    add(x,y){
        return x+y;
    },
    multiply(x,y){
        return x*y;
    }
}
export default calc;

//main.js
import calc from './path/ut.js'; 

```

### 7.11 Promise
[생겨난 이유]
AJAX처리를 위한 비동기 처리를 수행할 때 콜백함수를 사용한다. 하지만 비동기로 처리할 작업이 반복되면 콜백 함수들이 중첩되어 예외처리가 힘들다.

superagent, axios, vue-resource 등에서 사용된다.
```js
//Promise 객체 선언
//생성에서 전달된 함수가 비동기로 실행 됩니다.
//이 방법으로 비동기로 실행할 코드와 비동기 처리 결과를 받아 실행하는 코드를 분리 할 수 있다.
var p = new Promise(function(resolve, reject){
    setTime(function(){
        var num = Math.round(Math.random() * 20);
        var isValid = num % 2;
        //resolve가 호출되면 then으로 등록된 함수가 호출된다.
        if(isValid) {resolve(num);}
        //reject가 호출되면 catch로 등록된 함수가 호출된다.
        else {reject(num);}
    }, 2000);
});


p.then(function(num){  //resolve등록
    ....
}).catch(function(num){ //reject등록
    ...
});

```
```js
//이전 다뤄본 fetch함수
fetch(url)
.then((response)=>response.json())
.then((json)=>console.log(json));
.catch((e)=>console.log(e.message));

//위가 처리된느 절차
// Promise객체───then(response)┌─[정상적으로 응답 받음]──then(json)
//                             │
//                             └─[응답에 오류]──────────catch(e)
```

### 7.12 전개 연산자(Spread Operator)
함수의 가변 파라미터와 다른것이다.
배열이나 객체를 ...연산자와 함께 객체 리터럴, 배열 리터럴에서 사용하면 분해된 값으로 전달된다.
ES2018년에 포함이 확정될듯 하다. ES2015는 포함이 아니라는 뜻이다.
```js
//객체
let obj1 = {name:"박문수", age:29};
let obj2 = {...obj1};
let obj3 = {...obj1, email:"gs@gmail.com"};

//배열
let arr1 = [100,200,300}]
let arr2 = ["hello",...arr1,"world"];
```

- - -

## 8. Vue-CLI도구
vue-cli-service의 내장된 기본 설정을 통해서 복잡한 webpack 번들러의 설정을 하지 않고도 애플리케이션 개발을 할 수 있다.
이게 가능한 이유는 Vue CLI가 내부적으로 webpack을 사용하기 때문이다. 
[자세한 내용은 URL] https://www.zerocho.com/category/Webpack

### 8.1 Vue CLI의 구성요소와 설치
책 참고

## 9. 컴포넌트 심화
### 9.1 단일 파일 컴포넌트
[전역 수준 컴포넌트의 문제점]
- ES2015, TypeScript와 같은 최신 스트립트 문법 사용 불가.
- CSS를 지원하지 않음.
(위의 문제들은 빌드 단계가 없어서 생김)
- HTML파일안에서 여러 개의 `<template />` 태그가 작성되어 가독성이 떨어진다.

Vue CLI로 생성한 프로젝트는 vue-loader를 이용해 단일 파일 컴포넌트를 지원한다.
.vue 파일에 컴포넌트 작성. vue-loader가 파일 파싱.

todolistapp예제를 Vue CLI로 스캐폴딩 코드를 생성하여 단일 파일 컴포넌트로 작성하려한다.

스캐폴딩 : 자동 생성된 코드? 

Vue CLI를 이용해서 프로젝트 생성

cd [프로젝트 생성할 폴더]
vue create [프로젝트 이름]

빌드 방법
cd [프로젝트 폴더]
yarn serve

+ package.json의 serve스크립트에 --opne 옵션을 지정하면 실행 후 브라우저가 자동 구동된다.

[샘플 코드]
src/App.vue & src/components/HelloWorld.vue : 컴포넌트를 선언하는 파일
src/main.js : App.vue 컴포넌트를 화면 출력을 위한 작업을 하는 script
public/index.html : 실제 컴포넌트가 출력된 html page

### 9.2 컴포넌트에서의 스타일
전역 스타일과 다른 컴포넌트의 스타일에서 동일한 CSS클래스 명을 사용 중이라면 충돌이 발생한다.
[해결]
특정 컴포넌트만의 스타일 지정.
1) 범위 CSS(Scoped CSS)
2) CSS Module

styletest예제

#### 9.2.1 범위 CSS
하나의 컴포넌트에는 여러개의 <style>태그 작성 가능. 전역과 범위 CSS를 구분하자.

[선언 방법]
```html
<style scoped>
</style>
```

[주의 사항]
1) 특성 선택자는 적용이 느리다. 반드시 ID, Class, tag이름 선택자로 요소를 선택하여야 느려지는 것을 보완할 수 있다.
2) 부모 컴포넌트에 적용된 범위 CSS는 하위 컴포넌트에도 반영된다.

#### 9.2.2 CSS 모듈
객체처럼 다룰 수 있다.

[CSS 선언방법]
```html
<template>
    <div>
        <!-- $style이라는 계산형 속성을 통해서 style module을 이용한다. -->
        <button :class="$style.hand">CSS Modeule을 적용한 버튼 </button>
        <div :class="[$style.hand, &style.border]">CSS Modeule을 적용한 버튼 </div>
    </div>
</template>


<style module>
</style>
```
### 9.3 슬롯
props로 자신에게 정보를 전달할 때 정보가 HTML태그이면 불편하다.
이걸 해결하기 위해 슬록을 사용한다.
슬롯은 부모 => 자식 HTML마크업을 전달한다.

[자식 컴포넌트 쪽]
```html
<slot></slot>
```

[부모 컴포넌트 쪽]
콘텐츠 영역에 HTML마크업 작성
```
```

#### 9.3.2 명명된 슬롯
이름을 부여한 슬롯이다.
이걸 사용하면 여러 개의 슬롯을 작성할 수 있다.

#### 9.3.3 범위 슬롯
자식 컴포넌트에서 부모 컴포넌트에 정보 전달하는 방법.
자주 쓰이지는 않지만 알아두면 좋다.

### 9.4 동적 컴포넌트
동일한 위치에 여러 컴포넌트를 표현해야할 때 쓰인다.

단 `<component>`에 표시되는 자식 컴포넌트가 정적 콘텐츠라면 매번 실행되는 것은 비효율적이므로 이 문제를 해결하기 위해 `<component>`를 `<keep-alive>`감싸서 캐싱한다.
캐싱하고 싶지 않다면 include, excululde특성에 컴포넌트들의 name을 나열하면 된다.
```js
<keep-alive include="about,home">
    <component v-bind:is="currentView"></component>
</keep-alive>
```

### 9.5 재귀 컴포넌트
템플릿에서 자기 자신을 호출하는 컴포넌트를 말한다.
사용시에 꼭 name옵션을 지정해야만한다.

## 외전 1. vuetify
간단한 UI 템플릿이다.
vue cli 패키지를 기반으로 사용한다.
SSR(서브사이드 렌더링), SPA(싱글페이지 어플리케이션), PWA(프로그레시브 웹 어플리케이션)와 단독 HTML 페이지를 지원한다.

[URL] https://vuetifyjs.com/ko/getting-started/quick-start

<p>익스플로러를 지원하지 않는다.</p>

```js
//vue-cli 필요
npm install @vue/cli -g

//버전 확인
vue --version

//vue 프로젝트 생성
//+ vue의 라우터나 vuex 등을 추가 하고 싶다면 다른 설정
vue create my-app

//이동
cd my-app

//vuetify 추가 - 일단 Default 
vue add vuetify
//start 명령어(이에 대해서 찾아보자.)
npm run serve
```

vue ui로 프로젝트를 생성할 수 있다.
```
vue ui
```

## 외전 1.1. 설치하여 설정하는 방법
Vuetify를 설치할 수 있는 세가지 방법.<br>

첫번째) default installation<br>
자동 A-la-carte를 사용하는 것.
컴파일 크기를 크게 감소할 수 있고 vue-cli-3에 적용된다.
vue add vuetify를 하면 vuetify.js가 생성됩니다. 
이 방법을 가장 권장한다.

vue-cli-3패키지를 사용할 수 없는 경우 vue.config.js또는 웹 팩 구성을 통해 수동으로 vuetify-loader를 설치할 수 있다.

[자세한 내용 URL] https://vuetifyjs.com/ko/customization/a-la-carte

두번째) vue-cli  a-la-carte installation<br>
vuetify-loader없이 개별 구성요소를 수동으로 가져오는 방법.
수동으로 A-la-carte를 설치하는 방법.
자세한 내용은 vuetify 홈페이지 Quick start 참조.

세번째) Webpack installation<br>
웹 팩으로 기존 규칙을 수정하여 필요한 종속성을 설치하는 방법.
자세한 내용은 vuetify 홈페이지 Quick start 참조.

## 외전 1.2. 사용방법
import로 vuetify.js를 가져다 쓴다. vue를 생성한 인스턴스에 vuetify를 등록. 이 방법은 Vue-Router및 Vuex를 사용하는 방법과 유사하다.

```js
//main.js
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

```

vuetify에서 기본으로 사용되는 font를 적용하는 두가지 방법이 있다.
첫번째 ) Google Roboto의 URL을 <link>로 링크하는 방법.
두번째 ) MDI Iconfont를 npm으로 설치하여 적용하는 방법.
```js
//모듈로 설치
npm install @mdi/font -D

//////////////////////////////////////////////////////
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
```

## 외전 1.3. CDN 방법
CDN으로 간단하게 적용하는 방법이 있다.
자세한 내용은 아래의 URL으로
[URL] https://vuetifyjs.com/ko/getting-started/quick-start#cdn-usage

Edge에서 사용하는 방법은 따로 있다.
[URL] https://vuetifyjs.com/ko/getting-started/quick-start#edge-support


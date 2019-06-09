Interactive Web
====================================================
```
//최신 웹
반응형 웹 디자인(Responsive Web Design)
시맨틱(Semantic)
```

# 1) emmet 기능
원래는 아톰 edit에 있었던 기능으로 지금은 VS Code에도 이 기능이 내장되어 있다.

**[추천 검색어]**
```
//이런 기능을
HTML Snippets 라고 한다.

emmet 사용법
```

- ! + tab : html 기본 뼈대
- [tag].[class] + tab : class속성이 설정된 tag
- [tag].[class]>[child tag]*[count] + tab : 부모 tag와 자식 tag를 한번에 여러개 생성할 때 사용한다.
```html
ul.my-list>li*5

<!--결과-->
<ul class="my-list">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>

```
`>` : 바로 아래 단계의 자식 선택자 이다.

# 2) CSS Trasform
변형에 관련된 기술, CSS3 스펙부터 추가되었다. 크기 조정, 기준점 변경, 이동, 비틀기, 3D 등이 가능하다. 하드웨어 가속 이용. (포지션 앱솔루트보다 성능이 잘 나온다. GPS사용)
```css
.box:hover{
    /*transform을 사용하지 않았고 직접 조절 한다면
    기준점은 top & left가 되고 다른 나란히 존재하는 tag들을
    옆으로 밀어낸다.*/
    /* width: 200px;
    height: 200px; */

    /*transform를 사용한다면 중앙을 기준점으로 하여 작동하고 
    웹브라우저는 다른 tag들의 위치를 고려할 필요 없다.
    그러므로 성능도 뛰어나다.
    deg = 도*/
    /*크기 & 회전*/
    /* transform: scale(1.2) rotate(45deg); */
    /* 비틀기 */
    /* transform: skewY(-30deg); */
    /*이동*/
    /* transform: translate(30px, 10px); */

    /* 기준점 변경 */
    transform: scale(1.5);
    /* transform-origin: left top; */
    transform-origin: 30% 80%;

}
```
# 3) CSS Transition
CSS로 애니메이션을 줄 수 있는 속성이다.
transition: 1s;는 여러 기본 값에 의해 시간만 정해주면 애니메이션이 작동한다.
아래 그래프는 애니메이션을 자연스럽게 보여주는 가속도의 그래프이다. 조정하여 그래프 아래 속성 값을 복사하여 적용 가능하다.
<img src="./image/51.png">

transition은 기본적으로 적용된 속성 값에서 사용자의 동작에 의해 변경되는 속성 값 사이에 시간을 주어 점점 변하도록 하는 기술이다.
속성 값이 auto이면 transition은 적용되지 않는다. 꼭 숫자값을 넣어야 적용된다.
```css
.box{
    width: 100px;
    height: 100px;
    border: 2px solid;
    background: rgba(255,255,0,0.7);
    /*이렇게 시간을 주어서 애니메이션을 줄 수 있다.
    transition: 1s;는 아래 내용이 축약되어 있는 것이다.
        transition-property: all;
        transition-duration: 1s;
        transition-timing-function: ease;
        transition-delay: 0s;
    */
    transition: 1s cubic-bezier(0.25, 0.1, 1, 1.62);
}

.box:hover{
    width: 200px;
    background: red;
}
```

# 4) CSS Animation
- keyframe : 중간에 방향이 바뀌는 구간을 말한다.
```
■ → → → → (keyframe)
            ↓
            ↓
            ↓
            ↓
            ■
```
- frame by frame : animation의 한 종류. 장면 별로 모두 그려서 장면을 계속 순서대로 보여주어 움직이는 듯한 animation을 보여주는 방법. sprite image를 사용한다.(연속되는 image를 같은 크기로 나누어 순서대로 출력한다면 움직이듯이 보이는 image)
고해상도 모니터를 위해 한 frame당 크기가 300px인 이미지를 150px정도로 css로 출력한다.

gif는 알파 채널을 지원하지 않으므로 이런 기술이 사용된다.

# 5) CSS 3D
3D를 적용하기 위해서는 x, y, z축이 필요하다. 그러므로 웹 페이지 자체가 3D로 설정되어야 한다.

CSS 3D가 Mac, Internet Explor에서 안되는 작용이 있을 수 있다. 이를 해결해야한다.

Mac의 Safari는 webkit기반으로 만들어졌다.



- 아직 CSS표준에 들어가지 않은 속성들은 웹브라우저 마다 다른 vendor prefix가 사용된다. 대표적으로 backface-visibility인 속성은 safari에서는 -webkit-backface-visibility로 mozira에서는 -moz-backface-visibility로 사용된다.
```
chrome, safari => -webkit-
ms의 internet explor => -ms-
firefox => -moz-
오페라 => -o-
```

접두어가 붙지않은 속성을 아래에 써준다. 그 이유는 아래에 선언될 수록 우선순위가 높아지는데 표준 속성이 적용가능한 브라우저에서 굳이 접두어가 붙은 속성이 적용되도록 할 필요 없기 때문이다.
```css
-webkit-backface-visibility: hidden;
backface-visibility: hidden;
```

자동화 library도 있다.

# 6) css Flex
`유투브 스튜디오밀` 에 더 자세하게 flex와 grid에 대해 자세하게 설명하고 있다.

Flex : 축이 한 방향으로 되어 있으어 각각의 요소(tag)를 배치하는 방법이다. 부모 요소와 자식 요소에게 각각의 속성을 줄 수 있다.
```
기본 배치이다. 각 요소들이 나란히 배치대고 축이 있는 방향으로는 요소들의 길이와 상관없이 채운다.
row(행)
│ a │ b │ c │
│   │   │   │
│   │   │   │
│   │   │   │

column(열)
━━━━━━━━━━━━━
a
━━━━━━━━━━━━━
b
━━━━━━━━━━━━━
c
━━━━━━━━━━━━━
```

Grid : 가로와 세로 축으로된 격자를 병합하여 영역을 나눌 수 있다.
```
━╋━━╋━━╋━━╋━
━╋━━╋━━╋━━╋━
━╋━━╋━━╋━━╋━
━╋━━╋━━╋━━╋━
```
두가지를 섞어서 사용 가능하다. 기틀은 grid로 잡고 그 내부를 Flex로 나누는 방법.

# 7) JS 기본
JS는 최신 버전 문법이 있다. 알고싶다면 ECMAScript [년도 ex) 2015]를 찾아보자. 단 internet explor11에서 지원하지 않는 문법이 있을 수 있다.

```js
//위 : 원래 문법, 아래 : 새로운 문법

var a = 100; //last
let a = 100; //new

/*
이 문법의 다른 점은 변수의 유효범위가 다르다.

var는 유효범위는 함수 scope내 이다. 단 함수 내에서는 밖의 변수를 알고 있다. 그러므로 조건문, 반복문 내에 선언된 변수들은 밖에서 접근이 가능하다.

let과 const는 block단위({})이다. 그러므로 범위가 함수, 조건문, 반복문의 {}안으로 제한되어 있다.
*/

const a = 100; //상수로 인식. 이 문법을 사용한다면 var을 사용하지 말자

```

# 8) DOM SCRIPT (Document Object Model)
DOM은 HTML문서의 tag, class, id 등을 모두 객체를 보는 모델이라는 뜻이다. 
<img src="52.png">

```js
//사용 함수
document.querySelector(/*객체 이름*/);
document.querySelectorAll(/*객체 이름*/);

/* 객체이름에는 tag, class, id, emmet문법 모두 사용가능하다.
ex) 두번째 자식 ilbuni를 가져온다. 
document.querySelector('.character .ilbuni:nth-child(2)');
*/

//js.md 객체가져오기 참조

```

```js
//속성 추가, 속성 가져오기
/*
data-XXX는 HTML 표준 커스텀 속성이다.
data- 로 시작하는 표준 커스텀 속성이다. data-index, data-id, data-role 등 data- 의 형식으로 시작하면 어떤 속성이든 필요에 따라 임의로 추가할 수 있다.
*/

const char = document.querySelector('.characters');
char.setAttribute('data-id', 123);
/*
결과 : <div class="characters" data-id="123"></div>
*/

char.getAttribute('data-id');
/*
결과 : "123"
*/

//이런 방법은 js.md에 js로 html문서를 동적으로 편집하는 방법의 예제가 잘 나와있다.
```

```js
//요소의 추가
const pElem = document.createElement('p');
/*
결과
pElem안에
    <p></p>
    라는 값이 들어가 있다.
*/
pElem.innerHTML = '<a href="#">안녕</a>???'
/*
결과
pElem에 아래의 값이 들어가 있다.
<p>
    <a href="#"> 안녕 </a>
    "???"
</p>
*/

const charactersElem = document.querySelector('.characters');
characterElem.appendChild(pElem);
/* 가져온 객체의 자식으로 pElem의 HTML code내용을 대입한다.*/

charactersElem.removeChild(document.querySelector('.b'));
/* 객체의 내용을 삭제한다. */

const ilbuni = document.querySelector('.ilbuni');
ilbuni.classList.add('special');
/* 가져온 객체에 새로운 class를 추가한다.*/

ilbuni.className = 'special';
/* 기존 class속성을 지우고 대입되는 문자열로 초기화한다. */

ilbuni.classList.remove('ilbuni');
/* 가져온 객체에서 대입된 문자열과 같은 이름의 class 속성값을 삭제한다. */

ilbuni.classList.toggle('ilbuni');
/* 가져온 객체에서 대입된 문자열과 같은 이름의 class속성값이 적용되어 있다면 해제하고 해제되어 있다면 적용된다. 이렇듯 class 속성값이 아예 삭제되는 것이 아닌 사용을 제어하는 함수이다. */
```

# 9) JS 이벤트
사용자의 작용, server와의 통신 등으로 생겨나는 신호를 이벤트라고 하고 각 이벤트에 맞게 웹 페이지에 code가 추가, 삭제, 수정 된다면 동적인 웹 페이지를 보여 줄 수 이다.

```js
const ibuni = document.querySelector('.ibuni:nth-child(3)');
ilbuni.addEventListener('click', function(){
    /*이벤트가 생겼을 때 처리할 행동*/
    ilbuni.classList.add('special');
})
/*
addEventListener(이벤트 문자열, callback 함수, ...)
*/

window.addEventListener('load', function(){});
/*
windows객체는 HTML문서 자체를 나타낸다.

js가 DOM객체를 가져오고 싶다면 load가 되어야 한다.

그러므로 아래와 같은 이벤트를 사용하거나 맨 아래에 Script를 추가한다.

load 이벤트 : 문서를 모두 읽었을 때 호출되는 이벤트.
DOMContentLoaded : 문서 전체가 아닌, DOM객체들을 모두 읽어 들였을 때 호출된다.(문서에 포함된 이미지나 다른 파일들이 로드되지 않았어도 html 요소들이 모두 로드되었다면 이벤트가 불린다.) load이벤트보다 효율적이다.
*/

/* 전역함수 : script 태그 안에 선언한 변수는 그 페이지에서 전역 변수로 사용된다. 하지만 JS는 전역변수의 최소화를 권장하고 있다. 그러므로 이런 기능들을 함수 단위로 묶는다.*/

(function() {
    const libuni = document.Selector('.ilbuni');
    /*이렇게 함수 내부에서*/
})(); /*()로 선언을 묶고 함수 호출자를 바로 사용하여 생성과 실행을 동시에 할 수 있다.*/

```
```html
<body>
    <div class="characters">
        <div class="ilbuni a">
            <img src="images/ilbuni_0.png" alt="일분이">
        </div>
        <div class="ilbuni b">
            <img src="images/ilbuni_1.png" alt="일분이">
        </div>
        <div class="ilbuni c">
            <img src="images/ilbuni_2.png" alt="일분이">
        </div>
        <div class="ilbuni d">
            <img src="images/ilbuni_3.png" alt="일분이">
        </div>
    </div>
    <script>
        /* 여러 캐릭터 요소 중 하나가 선택 됐을 때 각각 이벤트를 주는 예제 */
        (function(){
            const characters = document.querySelector('.characters');

            function clickHandler(e){
                //이벤트에 의해 호출되는 CallBack은  매개변수로 이벤트 객체를 입력받는다.
                //이 이벤트 객체는 이벤트와 관련해서 여러 속성들이 들어 있는 객체이다.
                
                //console.log(this); currentTarget은 이벤트 클릭을 기다리고 있는 요소이며 this도 마찬가지 이다. 
                console.log(e.currentTarget);

                //target은 내가 클릭한 요소 자체이다. 만약 이미지인 첫번째 일분이를 클릭했다면
                //결과 : <img src="images/ilbuni_0.png" alt="일분이">
                console.log(e.target);
            }
            //여기서의 click 이벤트를 기다리는 요소는 .characters class 요소이다.
            characters.addEventListener('click', clickHandler);
        })();
    </script>
</body>
```

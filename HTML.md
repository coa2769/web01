
HTML 정리
===================================================================
**[기본적인 내용]**
- **`<>`** 안에 명령어를 쓰는 것을 태그라고 부른다.
- 앞의 Tag를 열리는 태그, 뒤의 Tag를 닫히는 태그라고 구분하기도 한다.
- Tag는 중첩으로 사용 가능하다.
- 한줄을 모두 사용하는 tag를 block level elemant라고 하고 자신의 크기만큼의 부피를 같는 tag를 inline element

테그를 검색 할때 사용되는 검색어 예시로는 **`"HTML __ tag", "frequency of __"`** 가 있다.
찾아본 내용을 볼때 예시를 먼저 확인한 후 정의를 본다.<br>
<a href="https://www.advancedwebranking.com/html/" target="_blank" title="많이 쓰는 태그의 통계를 분석">태그 분석(랭킹)</a>

- - - 

## 1) Tag 문법정리
>### (1) 웹페이지의 구조에 대한
> - **`<!doctype html>`** : 이 웹페이지가 HTML로써 만들어졌다는 것을 표현하기위해서 문서의 시작에 이 코드를 추가합니다.
> - **`<html>, </html>`** : head와 body 태그를 모두 감싸는 태그입니다.
> - **`<head>, </head>`** : 본문을 설명하는 태그로써 title, meta태그가 여기에 쓰인다.
> - **`<body>, </body>`** : 본문이라는 것을 나타내는 태그(웹브라우져에 직접 보이는 부분이다.)

>### (2) 웹페이지의 제목과 설명에 대한
> - **`<title>,</title>`** : 웹페이지의 제목이 된다.(크롬의 상단 바에서 확인가능하다.)
 특히 title태그는 검색엔진이 웹페이지를 분석할 때가 가장 중요하게 생각하는 태그이다.
> - **`<meta charset="utf-8">`** : meta태그는 이 본문이 utf-8로 저장되어 있다는 것을 설명한다.
(에디터 하단 오른쪽의 utf-8은 이 웹페이지가 그 형식으로 저장되어 있다는 뜻.
만약 웹페이지가 깨지면 그 이유는 저장된 문자표현과 웹브라우저가 해석하는 방식이 일치하지 않아서 이다.)

>### (3) 본문에 쓰이는 태그
> - **`<!--(주석 내용)-->`**  : 주석문 입니다.
> - **`<strong>, </strong>`** : 글자를 진하게 해준다.
> - **`<u>, </u>`** : 밑줄이 그어진다
> - **`<h1> ~ <h6>`**
>> ```
>> <h1>, </h1> : 좀 더 중요한 제목에 쓰인다.
>> <h6>, </h6> : 좀 덜 중요한 제목에 쓰인다.
>>
>> 예제)
>> <h1>This is heading 1</h1>
>> <h2>This is heading 2</h2>
>> <h3>This is heading 3</h3>
>> <h4>This is heading 4</h4>
>> <h5>This is heading 5</h5>
>> <h6>This is heading 6</h6>
>> ```
> - **`<br>`** : 줄 바꿈이 된다.
> - **`<p>, </p>`** : HTML에서 단락을 나눌때 사용된다. 여백을 더 주고 싶다면 CSS언어를 사용한다.
> - **`<img src="arrow.png" height="100">`** : 이미지를 출력한다. 태그 이름만으로 표현 못하는 정보는 Attribute로 표현한다. src == source, width, height 등이 있다.

- - -

## 2) parent태그와 child태그
> ```
> <parent>
>    <child></child>
> </parent>
> ```
>이런 구조의 태그들이 있다. 여기서 parent태그에 대해서 child태그를 자식 태그라고 합니다. 또 child태그에 대해서 parent태그를 부모 태그라고 합니다.

> - **`<li>, </li>`** : 목차를 표현하는 태그, list를 줄인 말이다.
> - **`<ul>, </ul>`** : ul은 Unordered List를 나타낸다. 서로 다른 목록을 나타낼때 ul태그를 사용한다. ul태그는 li의 부모 태그이다.
> - **`<ol>, </ol>`** : Ordered List의 약자이다. 이 태그도 서로 다른 목록을 나타낼 때 사용한다. 단 ul과 달리 한줄에 숫자가 붙는다. ol태그는 li의 부모 태그이다.
>> ```
>> ex)
>> < ul >
>>   < li >< /li>
>> < ul >
>> ===================================
>> < ol >
>>   < li >< /li >
>> < ol >
>> ```
> - **`<table>, </table>`** : 표를 작성할 때 쓰인다.
> - **`<tr>, </tr>`** : tr는 한 행이다.
> - **`<td>, </td>`** : td는 한 열이다.
>>```
>>ex)<br>
>><table>
>>  <tr>
>>    <td>1-1</td>
>>    <td>1-2</td>
>>  </tr>
>>  <tr>
>>    <td>2-1</td>
>>    <td>2-2</td>
>>  </tr>
>></table>
>>```
> <table>
>  <tr>
>    <td>1-1</td>
>    <td>1-2</td>
>  </tr>
>  <tr>
>    <td>2-1</td>
>    <td>2-2</td>
>  </tr>
> </table><br>

- - -

## 3) Attribute(속성) 문법정리
태그의 이름만으로는 정보가 부족해서 생겨난 문법이다.

> - **`<a href="https:// ~ " target="_blank" title="설명">, </a>`** : `anchor`(배에 정박할 때 쓰는 닻)의 첫글자 `a`입니다. 다른 웹페이를 링크 할때 쓰인다.
>   - href는 HyperText Renference의 약자입니다. 이 속성은 URL을 넣어줍니다.
>   - target="_blank"는 링크를 클릭했을 대 새창에서 페이지가 열리게 하는 속성입니다.
>   - title은 링크되어 있는 글자에 마우스를 울렸을 때 어떤 내용을 담고 있는지를 룰팁으로 보여준다.

## 4) 그 외
> - html specification(사양, 설명서)으로 검색하면 HTML에 대한 사양이 나온다.
> - html만을 서비스하는 웹호스팅을 찾고 싶다면 **`"free static web hosting"`** 으로 검색한다.
> - 웹서버 프로그램이니 aphache를 설치하는 방법은 **`"how to install apache http server (운영체제 이름)"`** 로 검색한다.
> - 유투브나 영상 스트리밍 사이트의 동영상에서 **`공유>퍼가기>소스 복사`** 를 하면 영상을 내 HTML문서에 적용할 수 있다. 
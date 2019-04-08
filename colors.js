document.write(1+1);
document.write("1" + "1");

function sum2(left, right){
  return left+right;
}
document.write(sum2(2,3) + '<br>');
document.write('<div style="color:red">'+sum2(2,3) + '</div>');
document.write('<div style="font-size:3rem;">' + sum2(2,3) + '</div>');

//<!--조건문-->
//document.querySelector('body') : CSS의  선택자나 태그를 선택 할 수 있다.
//style.backgroundColor = 'black'; : 변화를 주는 CSS코드를 JS로 넣는 코드
//<!--이 태그의 value값을 알기위해 하는 방법 검색어 : javascript elemant get value-->
//<!--이 태그 안에서 자신을 가지리키고 싶다면 this를 사용한다.-->
//<!-- 변수에 선택자를 넣을 수 있다.
//반복문 사용
//document.querySelector('a')는 첫번째 태그만 가져온다. (그런 특성을 가지고 있음)
//여러 a태그를 선택하려고 할때 => 검색어 : javascript get element by css selector multiple
//document.querySelectorALL('a') 모든 a태그를 배열처럼 가져온다.(하지만 실제 배열은 아니다.)-->
function  nightDayHandler(self)
{
  var target = document.querySelector('body');
  if(self.value === 'night')
  {
    target.style.backgroundColor = 'black';
    target.style.color = 'white';
    self.value = 'day';

    var alist = document.querySelectorAll('a');
    var i = 0;
    while(i < alist.length)
    {
      console.log(alist[i]);
      alist[i].style.color = 'powderblue';
      i=i+1;
    }

  }
  else
  {
    target.style.backgroundColor = 'white';
    target.style.color = 'black';
    self.value = 'night';

    var alist = document.querySelectorAll('a');
    var i = 0;
    while(i < alist.length)
    {
      console.log(alist[i]);
      alist[i].style.color = 'blue';
      i=i+1;
    }
  }
}

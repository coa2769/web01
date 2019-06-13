const {ipcRenderer, clipboard, shell} = require('electron');
let type = 'home';
let data = [];

const btnHome = document.querySelector('#btn-home');
const btnGithub = document.querySelector('#btn-github');

//버튼 초기화
btnHome.classList.add('active');
btnGithub.classList.remove('active');

function update(){
    //지금 type과 일치하는 목록만 출력
    //item : 배열의 값, index : item이 몇번째 배열인가?
    //items : 지금 선택된 type과 같은 값을 배열로 만들어서 반환된 것.
    const items = data.filter((item, index) => {
        //몇번째 인덱스 인지 입력
        item.removeId = index;
        //type에 맞는 객체 인가?
        return item.type === type; 
    });
    //이걸로 list 적용
    const htmls = items.map(item => {
        return `
        <li class="list-group-item">
            <div class="media-body">
                <strong><a href="#">${item.url}</a></strong>
                <p>
                    ${item.title}
                    <span class="icon icon-trash pull-right"></span>
                </p>
            </div>
        </li>
        `;
    });
    const html = htmls.join('');
    document.querySelector('#data').innerHTML = html;
    
    //삭제 버튼에 이벤트를 추가한다.
    const removeDoms = document.querySelectorAll('.icon-trash');
    //forEach : 배열을 순회하는 함수
    removeDoms.forEach((removeDom, index) => {
        removeDom.addEventListener('click', () => {
            //각 목록의 id를 main process를 등록한다.
            ipcRenderer.send('remove', items[index].removeId);
        });
    });

    //url을 눌렀을 때 브라우저가 열려 페이지로 이동한다.
    const openDoms = document.querySelectorAll('.list-group-item a');
    openDoms.forEach(openDom => {
        openDom.addEventListener('click', (e) => {
            shell.openExternal(e.target.innerHTML);
        });
    });
}

ipcRenderer.on('update',(event, _data) => {
    //받은 데이터를 리스트에 출력
    data = _data;
    update();
});


btnHome.addEventListener('click', () => {
    if(type === 'home')
    {
        return;
    }
    btnHome.classList.add('active');
    btnGithub.classList.remove('active');
    type = 'home';
    update();
});

btnGithub.addEventListener('click', () => {
    if(type === 'github')
    { 
        return;
    }
    btnGithub.classList.add('active');
    btnHome.classList.remove('active');
    type = 'github';
    update();
});

//CTRL + V 이벤트 등록
document.addEventListener('paste', () => {
    const text = clipboard.readText(); //붙여 넣기 된 값인 문자열을 가져오는 함수.
    const item = {
        type: type,
        url: text
    }
    ipcRenderer.send('paste', item);

});

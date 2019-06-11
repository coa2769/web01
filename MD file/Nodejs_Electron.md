Nodejs Electron
=====================================================
Native Descktop App을 만드는 framework이다.

※ JS
+ 기본 문법
+ ES6, ES7 문법
+ DOM, Node.js
+ jQuery / React / Angular / Vue....
+ TypeScript

- node.js & chrome 두가지를 기본으로 이용한다.
- node.js와 OS의 이벤트 루프(?)를 합쳐 native UI제어
- 크로미움을 개조한 라이브러리를 랜더링 할때 사용(크롬 브라우저가 뜬다는 뜻?)
- 

= 일렉트론에 따른 nodejs의 버전 확인 필요.
= 크롬 버전 체크(ES와 api 스펙)

<img scr="./image/53.png">


Eletron UserLand 
<img src="./image/54.png">

electron korea 
질문 가능

[개발환경]
(1) Node.js설치
(2) Node Version Manager를 설치하여 node의 버전을 관리 할 수 있다. 
nvm-window로 윈도우에서 설치가능

## 1) 만들어진 앱의 실행 과정
(1) 각각의 환경에 맞는 prebuilt된 실행파일을 준비
 Electron Releases 로 검색하여 github에서 다운로드 가능하며 Electron공식 사이트에서는 정보를 제공한다.

 (2) prebuilt된 실행파일의 실행 방법
 - 단독 실행
  더블 클릭(모든 GUI os), commandline에서 인자 없이 실행(모든 os)단 path가 등록되어 있지 않다면 실행 환경(os)에 따라 미리 정해진 폴더에서 있는 실행 파일을 실행한다.

- 인자로 특정 폴더를 지정하여 실행(개발 모드)
commandline에서 실행파일 뒤에 폴더를 인자로 하여 실행

(3) 실행파일이 실행하는 폴더
- Project-Folder/ <= 실행할때 지정된 폴더
    - package.json : main이 지정하는 js파일을 엔트리 포인트로 사용.
- 실행파일의 nodejs 버전과 크로미움의 버전 중요
- 이 프로젝트 폴더가 개발해야할 영역이다.

(4) 실행파일의 이름과 아이콘 변경(리브랜딩)
- 일렉트론 프레임워크의 소스코드를 받아서 빌드할때 처리할 수 있지만, 권장하지 않음.
- 미리 빌드된 실행파일로도 이름과 아이콘을 변경할 수 있으므로 자신의 프로젝트 소스 폴더만 정해진 자리에 넣은 뒤, 아이콘과 이름을 변경하는 방식을 사용한다.

## 2) electron-quick-start모듈
[모듈 설치]
(1) git-bash를 실행한다.
(2) `git clone https://github.com/electron/electron-quick-start.git` 저장소를 가져온다.
(3) electron-quick-start폴더로 이동하여 `npm install` 명령어를 실행한다.
(4) `npm start` 명령어를 실행하면 앱이 실행된다.

[구조]
userland에서 제공하는 electron(electron-prebuilt) 모듈을 필요로한다. 
이런 script를 npm script라고 한다.
```js
/* electron(electron-prebuilt) 의 package.json파일 */
//electron(electron-prebuilt)의 dependencies
  "dependencies": {
    "@types/node": "^10.12.18",
    "electron-download": "^4.1.0",
    "extract-zip": "^1.0.3"
  },
//위의 모듈들이 필요하다.

//이 모듈이 어떤 js를 실행하는가에 대한 내용이다.
  "scripts": {
      //"명령어" : 실행될 파일 or commandline명령어
    "cache-clean": "rm -rf ~/.electron && rm -rf dist",
    //node install.js : 해당 환경에 맞는 일렉트론 실행 파일이 다운로드 된다. 
    "postinstall": "node install.js", 
    "pretest": "npm run cache-clean",
    "test": "standard"
  }

  /* electron-quick-start의 package.json파일 */
  {
  "name": "electron-quick-start",
  "version": "1.0.0",
  "description": "A minimal Electron application",
  "main": "main.js",
  "scripts": {
      //start 명령어는 ./node_modules/.bin/electron 을 실행하고 그 내용은 
      //node ./node_modules/electron/cli.js 명령어를 실행한다.
    "start": "electron ."
  },

//./node_modules/electron/cli.js는 electron모듈안의 index.js를 electron실행 명령어를 가져와 spqwn함수로 실행한다.

//./node_modules/electron/index.js는 path.txt파일을 읽어들여 실행파일의 경로를 읽고 명령어를 반환해준다.


/*결과 : 미리빌드된 실행파일을 다운로드하고 명령어를 사용한다.*/


  /* electron-quick-start의 package.json파일 */
  {
  "name": "electron-quick-start",
  "version": "1.0.0",
  "description": "A minimal Electron application",
  /* main 으로써 실행되는 파일을 지정한다.*/
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },


  /* main.js*/
  function createWindow () {
  // BrowserWindow로 Render Process생성
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

 //index.html을 실행한다.
  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

//index.html은 node와 결합되어 있는 html파일이다.
  ```

## 3) App 모듈 알아보기

[프로젝트 생성]
```
//프로젝트 폴더 생성
mkdir electron-basic-app-event
npm init -y

//electron 모듈 설치
npm install electron -D

//모듈이 설치된 폴더를 vs code로 열기
code .

```

[기초 설정]
```js
{
  "name": "Electron-basic-app-event",
  "version": "1.0.0",
  "description": "",
  /* main에 등록된 파일을 생성한다. */
  "main": "index.js",
  "scripts": {
    /*  */
    "start":"electron .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^5.0.3"
  }
}
```

[자주 쓰이는 이벤트]
```js
//첫번째는 이벤트를 관리하는 app모듈이고 
//두번째로는 render process로 window를 생성할 수 
//있는 BrowserWindow모듈을 가져온다.
const {app, BrowserWindow} = require('electron');

console.log('start');

app.on('ready', launchInfo =>{
    console.log(`ready : ${JSON.stringify(launchInfo)}`);
    //render process를 생성하면 window가 화면에 출력된다.
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600
    });
});

//모든 window가 닫혔을 때 호출된다. 만약에 이 이벤트를 등록한다면 
//before-quit, wiil-quit, quit는 callback에서 명시적으로 호출해야한다.
app.on('window-all-closed', () => {
    console.log('window-all-closed');
    //이걸 명시적으로 호출하지 않는다면 window는 사라지지만
    // main  process가 종료되지 않는다.
    app.quit();
});

//앱 종료 시작. 앱 windows를 닫기 시작할 때 호출된다.
app.on('before-quit', event => {
    //event.preventDefault(); : 다음 이벤트를 
    console.log('before-quit');
});

// 모든 앱 window가 닫히고 main process가 종료되기 직전 호출된다.
app.on('will-quit', event => {
    console.log('will-quit');
});

//application이 완전히 종료될 때 호출된다.
app.on('quit', (event, exitCode) => {
    //event객체와 어떤 식으로 종료되었는지를 알려주는 code가 매개변수로 넘어온다.
    console.log(`quit : ${exitCode}`);

//activate, will-finish-launching는 MAC OS에서만 사용가능한 이벤트이다.
```

## 2) BrowserWindow 모듈

* BrowserWindow로 개발자 도구를 함수로 띄우는 방법
```js
const mainWindow = new BrowserWindow();
mainWindow.webContents.openDevTools(); //생성한 Window에서 함수로 호출
```


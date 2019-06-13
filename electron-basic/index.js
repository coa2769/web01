
/* Event Example */

// //첫번째는 이벤트를 관리하는 app모듈이고 
// //두번째로는 render process로 window를 생성할 수 
// //있는 BrowserWindow모듈을 가져온다.
// const {app, BrowserWindow} = require('electron');

// console.log('start');

// app.on('ready', launchInfo =>{
//     console.log(`ready : ${JSON.stringify(launchInfo)}`);
//     //render process를 생성하면 window가 화면에 출력된다.
//     const mainWindow = new BrowserWindow({
//         width: 600,
//         height: 600
//     });
// });

// //모든 window가 닫혔을 때 호출된다. 만약에 이 이벤트를 등록한다면 
// //before-quit, wiil-quit, quit는 callback에서 명시적으로 호출해야한다.
// app.on('window-all-closed', () => {
//     console.log('window-all-closed');
//     //이걸 명시적으로 호출하지 않는다면 window는 사라지지만
//     // main  process가 종료되지 않는다.
//     app.quit();
// });

// //앱 종료 시작. 앱 windows를 닫기 시작할 때 호출된다.
// app.on('before-quit', event => {
//     //event.preventDefault(); : 다음 이벤트를 
//     console.log('before-quit');
// });

// // 모든 앱 window가 닫히고 main process가 종료되기 직전 호출된다.
// app.on('will-quit', event => {
//     console.log('will-quit');
// });

// //application이 완전히 종료될 때 호출된다.
// app.on('quit', (event, exitCode) => {
//     //event객체와 어떤 식으로 종료되었는지를 알려주는 code가 매개변수로 넘어온다.
//     console.log(`quit : ${exitCode}`);
// });


/* Browser Window 모듈 */

// //두번째로는 render process로 window를 생성할 수 
// //있는 BrowserWindow모듈을 가져온다.
// const {app, BrowserWindow} = require('electron');

// app.on('ready', () => {
//     console.log('ready');
//     //render process를 생성하면 window가 화면에 출력된다.
//     const mainWindow = new BrowserWindow({
//         //가로, 세로 크기 결정
//         width: 600,
//         height: 600
//     });
//     //해당 URL에 접속하여 application window에 출력해준다.
//     mainWindow.loadURL('https://github.com');

//     const secondWindow = new BrowserWindow({
//         width:300,
//         height: 300,
//         x: 0,
//         y: 0,
//         minWidth: 200,
//         minHeight: 200,
//         maxWidth: 500,
//         maxHeight: 500,
//         movable: false, /* window이동이 가능한가? */
//         title: 'second' /* window 최상단 출력된다. */
//     });
//     //file:// 파일 시스템 프로토콜을 의미한다.
//     //${__dirname} : 현재 폴더의 이름
//     //해당 HTML문서를 출력해준다.
//     secondWindow.loadURL(`file://${__dirname}/second.html`);

// });

/* frameless window */

// const {app, BrowserWindow} = require('electron');

// app.on('ready', () => {
//     console.log('ready');

//     const first = new BrowserWindow({
//         frame: false /* window를 제어하는 frame이 없어진다. */

//         //최신 macOS에서만 사용 가능한 옵션.

//         // drag에 필요한 바는 사라졌지만 닫기, 최소화, 최대화 버튼은 그대로 이다.
//         //titleBarStyle: 'hidden'
//         //titleBarStyle:'hidden-inset'
//     });

//     //window 창 제어가 불가능하므로 CSS로 이런 부분들을 채워준다.
//     first.loadURL(`file://${__dirname}/index.html`);
// });

/* 컨텐츠 로드 후 window 생성 */
//컨텐츠가 로드되지 않은 상태에서 window가 생성된다면 window에는 아무것도 출력되지 않는다.
//그러므로 컨텐츠가 모두 로드된 후 window가 화면에 출력되게 하여야한다.
// const {app, BrowserWindow} = require('electron');

// app.on('ready', () => {
//     console.log('ready');

//     const win = new BrowserWindow({
//         width: 600,
//         height: 600,
//         show: false /* 보이지 않게 설정 */
//     });

//     //URL page를 가져온다.
//     win.loadURL('http://github.com');

//     win.once('ready-to-show', () => {
//         win.show(); //이 때 윈도우가 화면에 출력된다.
//     })
// });

/* window간에 부모 자식 관계 설정 */
// const {app, BrowserWindow} = require('electron');

// app.on('ready', () => {
//     const imParent = new BrowserWindow();

//     //setTimeout(callback, 시간)
//     setTimeout(() => {
//         const imChild = new BrowserWindow({
//             width: 300,
//             height: 300,
//             parent: imParent, /* 부모 자식 관계를 준다. */
//             modal: true, /* MFC와 같은 뜻. child를 닫아야 parent를 제어할 수 있다. */
//             webPreferences: {
//                 nodeIntegration: true
//             }
//         });

//         imChild.loadURL(`file://${__dirname}/child.html`);
//     }, 3000);
// });

/* render process(BrowserWindow 모듈)의 이벤트로 callback 호출 */
// const {app, BrowserWindow} = require('electron');

// let win = null;

// app.on('ready', () => {
//     console.log('ready');

//     win = new BrowserWindow({
//         show: false,
//         webPreferences:{
//             nodeIntegration: true
//         }
//     });

//     win.loadURL(`file://${__dirname}/index.html`);

//     win.on('ready-to-show', () => {
//         console.log('ready-to-show');
//         win.show();
//     });

//     /* 화면에 출력될 때 */
//     win.on('show', () => {
//         console.log('show');
//         // win.hide();
//     });

//     /* 출력 중인 window가 사라질때(main process는 살아있으므로 완전한 종료는 아니다.) */
//     win.on('hide', () => {
//         console.log('hide');

//         setTimeout(() => {
//             win.show();
//         }, 3000);
//     });
//     /* 윈도우를 닫을 때, 이 event후에는 winodw에 대한 참조를 제거하고 사용하지 말아야한다.*/
//     win.on('close', () => {
//         console.log('close');
//     });
//     /* 윈도우가 닫힐때 */
//     win.on('closed', () => {
//         console.log('closed');
//     });
//     /* focus가 되어 있을 때 */
//     win.on('focus', () => {
//         console.log('focus');
//     });
//     /* focus가 없을 때 */
//     win.on('blur', () => {
//         console.log('blur');
//     });
//     /* window가 새 위치로 이동할 때 */
//     win.on('move', () => {
//         console.log('move');
//     });

//     //moved : macOS의 이벤트이다. BrowserWindow모듈의 이벤트이다.
//     //activate : macOS의 이벤트이다. app모듈의 이벤트이다.

// });

/* BrowserWindow 함수 */
// const {app, BrowserWindow} = require('electron');

// app.on('ready', () => {
//     console.log('ready');

//     const frist = new BrowserWindow({
//         webPreferences:{
//             nodeIntegration: true
//         }
//     });
//     frist.loadURL(`file://${__dirname}/index.html`);

//     const seconde = new BrowserWindow({
//         webPreferences:{
//             nodeIntegration: true
//         }
//     });
//     seconde.loadURL(`file://${__dirname}/index.html`);
// });


/* Electron의 native UI 들*/

/* 1. Menu */
/* 1.1. Template을 이용한 Menu추가 */
/* MacOS에서 menu는 화면 왼쪽 맨위에 위치하지만 windows는 각 window의 왼쪽 상단에 위치한다.
그러므로 menu에 대한 구현은 각각의 OS에 맞게 따로 하여야한다 */
// const {app, BrowserWindow, Menu} = require('electron');

// const template = [
//     //1
//     {
//         //메뉴바에 출력되는 이름, MacOS에서는 첫번째 메뉴의 이름은 'electron'가 Default이다.
//         label:'First',
//         //메뉴바에 눌렸을 때 나오는 서브 메뉴들
//         submenu:[
//             {
//                 //1-1 
//                 /*
//                 label:[메뉴 이름], [동작]: ()=>{ 호출될 함수의 내용}
//                 label:[메뉴 이름], [동작](){호출될 함수의 내용}
//                 */
//                 label:'First-sub1',
//                 click: () => {
//                     console.log('First-sub1 click');
//                     app.quit();
//                 }
//             }
//         ]
//     },
//     //2
//     {
//         label: 'Second',
//         submenu:[
//             {
//                 //2-1
//                 label:'Second-sub1'
//             },
//             {
//                 //2-2
//                 label:'Second-sub2'
//             },
//             {
//                 //메뉴의 구분선을 해준다.
//                 type:'separator'
//             },
//             {
//                 //2-3
//                 label:'Second-sub3',
//                 click(){
//                     console.log('Second-sub3 click');
//                 }
//             },
//         ]
//     }
// ];

// app.on('ready', () => {

//     //내 Menu로 초기화
//     const menu = Menu.buildFromTemplate(template);
//     Menu.setApplicationMenu(menu);

//     //Menu.getApplicationMenu()의 객체내용을 알 수 있다.
//     console.log(Menu.getApplicationMenu());

//     const win = new BrowserWindow();
// });

/* 1.2. MenuItem을 이용한 Menu */
// const {app, BrowserWindow} = require('electron');

// app.on('ready', () => {
//     const win = new BrowserWindow({
//         webPreferences:{
//             nodeIntegration: true
//         }
//     });
//     win.loadURL(`file://${__dirname}/index.html`);

//     //검사 도구
//     win.webContents.openDevTools();
// });

/* 2. Tray */
//시스템 알림 영역에 아이콘 및 컨텍스트 메뉴를 추가
//Windows와 MacOS의 Tray UI는 위치에 차이가 있다. 

// const {app, BrowserWindow, Tray, Menu} = require('electron');

// let win = null;
// let tray = null;

// const template = [
//     {
//         label: 'Item1'
//     },
//     {
//         label: 'Item2',
//         type: 'checkbox',
//         checked: true
//     },
//     {
//         type: 'separator'
//     },
//     {
//         label: 'Item3',
//         click: () => {
//             console.log('Item3 click');
//             app.quit();
//         }
//     }
// ];

// app.on('ready', () => {
    
//     win = new BrowserWindow();

//     //Tray를 생성한다. 이 UI의 아이콘을 생성
//     tray = new Tray(`${__dirname}/image/icon.png`);

//     //검사 도구
//     win.webContents.openDevTools();

//     //마우스 왼쪽 click
//     tray.on('click', () => {
//         console.log('click');
//     });

//     //마우스 오른쪽 click
//     tray.on('right-click', () => {
//         console.log('right-click');
//     });

//     //메뉴 생성
//     const menu = Menu.buildFromTemplate(template);
//     //설정하면 마우스 오른쪽 click이벤트의 등록된 callback함수가 호출되지 않는다.
//     tray.setContextMenu(menu);
// });

/* 3. Dialog */
//여러가지 종류의 Dialog
// const {app, BrowserWindow} = require('electron');

// app.on('ready', () => {
//     const win = new BrowserWindow({
//         webPreferences:{
//             nodeIntegration: true
//         }
//     });
//     win.loadURL(`file://${__dirname}/index.html`);
//     win.webContents.openDevTools();
// });

/* Inter-Process Communitation */
//Main Process와 Render Process 사이의  데이터를 전달을 위해 사용되는 기술이다.
//이 때 동기와 비동기 방식이 있다.
//IpcMain 모듈, IpcRenderer 모듈이 있다.
//const {app, BrowserWindow, ipcMain} = require('electron');

// app.on('ready', () => {
//     const win = new BrowserWindow({
//         webPreferences:{
//             nodeIntegration: true
//         }
//     });
//     win.loadURL(`file://${__dirname}/index.html`);
//     win.webContents.openDevTools();

//     //ipcMain.on(채널 문자열, callback 함수)
//     //데이터를 받는 함수이다.
//     //채널 문자열 : 전송 쪽과 같은 문자열 채널
//     //callback 함수: event와 message 매개변수가 있다. event 객체는 ipMain이 특정 채널로 데이터를 받았을 때의 정보를 가지고 있다.
//     ipcMain.on('send_async_channel', (event, message) => {
//         console.log(message);

//         //매세지를 보낸 render process의 webContents를 반환한다. send()를 통해 비동기 메시지를 보내는 것이 가능하다.
//         //event.sender.send('reply_async_channel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
//         //이미 내가 받은 render process의 객체를 가지고 있으므로 이렇게 전송하는 것도 가능하다.
//         win.webContents.send('reply_async_channel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
//     });

//     ipcMain.on('send_sync_channel', (event, message) =>{
//         console.log(message);
//         //event.returnValue에 값을 지정해주는 것이 동기 대답이다.
//         event.returnValue = '이것은 메인프로세스에서 동기 대답입니다.';
//     });

//     setInterval(() => {
//         //render process 객체를 가지고 있다면 바로 send를 보내는 것도 가능하다.
//         win.webContents.send('reply_async_channel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
//     }, 3000);

// });

/* Remote, Shell, process 모듈 알아보기 */

const {app, BrowserWindow, shell} = require('electron');

app.on('ready', () => {
    const win = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        }
    });
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();

    //render process의 id
    console.log(win.id);

    setTimeout(() => {
        shell.openExternal('https://www.protopie.io');
    }, 3000);
});
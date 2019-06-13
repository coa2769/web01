const {app, BrowserWindow, ipcMain, dialog, Tray, Menu, clipboard} = require('electron');
const request = require('superagent');
const getTitle = require('get-title');
const fs = require('fs');
const path = require('path');

let win = null;
let tray = null;

const DATA_PATH = path.join(__dirname, './data.json');
const data = JSON.parse(fs.readFileSync(DATA_PATH).toString());

//Tray icon disappearing문제가 있다.(해결)

//electron-package를 사용하는 법.
//1. npm install electron-packager -D명령어로 설치
//2. package.json에 pack 명령어를 등록
//3. npm run pack로 electron-packager를 실행한다.

const template = [
    {   
        label:'Open',
        click: () => {
            win.show();

        }
    },
    {
        label:'Save',
        submenu:[
            {
                label:'Home',
                click: () => {
                    const item = {
                        type: 'home',
                        url: clipboard.readText()
                    };
                    save(item);
                }
            },
            {
                label:'Github',
                click: () => {
                    const item = {
                        type: 'github',
                        url: clipboard.readText()
                    };
                    save(item);
                }
            }
        ]
    },
    {
        type: 'separator'
    },
    {
        label:'Quit',
        click: () => {
            app.quit();
        }
    }
];

app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template);
    tray = new Tray(path.join(__dirname,'./icon.png'));
    tray.setContextMenu(menu);
    tray.on('click', () => {
        toggle();
    });

    const bounds = tray.getBounds();
    console.log(bounds);
    win = new BrowserWindow({
        width: 400,
        height: 400,
        x: bounds.x - 200 - 10,
        y: bounds.y - 400,
        acceptFirstMouse: true,
        frame: false,
        show: false,
        resizable: false,
        movable:false,
        webPreferences:{
            nodeIntegration: true
        }
    });

    win.webContents.openDevTools();

    win.loadURL(`file://${__dirname}/index.html`);
    //ready-to-show는 최초 한번만 불리므로 once()를 사용한다.
    win.once('ready-to-show', () => {
        win.webContents.send('update', data);
    });

    ipcMain.on('paste', (event, item) => {
        save(item);
    });

    ipcMain.on('remove', (event, removeId) => {
        data.splice(removeId, 1);
        fs.writeFileSync(DATA_PATH, JSON.stringify(data));
        win.webContents.send('update', data);
    });
});

function toggle(){
    if(win.isVisible())
    {
        win.hide();
    }
    else
    {
        win.show();        
    }
}

function save(item)
{
    //url이 유효한가?
    if(item.url.indexOf('http://') > -1 || item.url.indexOf("https://") > -1)
    {
        const type = item.type;
        const url = item.url;
        //title 추출
        //1. superagent로 html contents를 가겨온다.
        //2. get-title로 title 추출
        request.get(url).end((err, response) => {
            const contents = response.res.text;
            getTitle(contents).then(title => {
                data.push({type, url, title});
                fs.writeFileSync(DATA_PATH, JSON.stringify(data));
                win.webContents.send('update', data);
            });
        });
    }
    else
    {
        dialog.showErrorBox('경고', '유효한 url이 아닙니다.');
    }
}
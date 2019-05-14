var template = {
    makeList : function(fileList)
    {
        //파일에 따라 목록을 나타내는 code자동 생성
        var list = '<ol>';
        var i=0;
        while(i < fileList.length)
        {
            list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
            i = i+1;
        }
        list = list + '</ol>';
        return list;
    },

    /**
     * fn       makeHTML(title, list, body, control)
     * brief    응답 페이지의 본문을 생성하여 반환해준다.
     * param    title    제목
     * param    list     글 목록
     * param    body     본문
     * param    control  페이지를 제어하는 UI
     * return   html code가 작성된 string을 반환한다.
     */
    makeHTML : function(title, list, body, control)
    {
        //본문을 만든다.
        return `
        <!doctype html>
            <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/"> WEB </a></h1>
                    ${list}
                    ${body}
                </body>
            </html>`;
    }
}

module.exports = template;
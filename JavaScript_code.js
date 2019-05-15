var Links = {
    SetColor:function (color){
        
        //jQuery를 이용한 작업
        $('a').css('color', color);
        //var aList = document.querySelectorAll('a');

        // var i = 0;
        // while(i <aList.length)
        // {
        //     if(aList[i].className !== 'saw')
        //     {
        //         aList[i].style.color = color;
        //     }
        //     i = i+1;
        // }
    }

}

var Body = {
    SetColor:function(color){
        var target = document.querySelector('body');
        target.style.color = color;  
    },

    SetBackgroundColor:function(color){
        var target = document.querySelector('body');
        target.style.backgroundColor = color;
    }
}

function ControlNinghtDay(self)
{
    if(self.value === 'night')
    {
        Body.SetBackgroundColor('black');
        Body.SetColor('white');
        Links.SetColor('powderblue');
        self.value = 'day';
    }
    else
    {
        Body.SetBackgroundColor('white');
        Body.SetColor('black');
        Links.SetColor('black');
        self.value = 'night';
    }
}

function FetchPage(fileName)
{
    fetch(fileName).then(function(response){
        response.text().then(function(text){
            document.querySelector('article').innerHTML=text;
        })
    });
}


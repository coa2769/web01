var Links = {
    SetColor:function (color){
        var aList = document.querySelectorAll('a');
        
        var i = 0;

        while(i <aList.length)
        {
            if(aList[i].className !== 'saw')
            {
                aList[i].style.color = color;
            }
            i = i+1;
        }
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

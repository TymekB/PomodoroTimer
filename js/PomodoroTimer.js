function PomodoroTimer(DOMElement, sessionTime = 25, breakTime = 5)
{
    this.sessionTime = sessionTime;
    this.breakTime = breakTime;
    this.min = this.sessionTime;
    this.sec = 0;
    this.timer = null;
    this.DOMElement = DOMElement;

    this.onTick = function()
    {
        this.sec--;

        if(this.sec < 0)
        {
            this.sec = 59;
            this.min--;

            if(this.min < 10)
            {
                this.min = "0" + this.min;
            }
        }

        if(this.sec < 10)
        {
            this.sec = "0" + this.sec;
        }

        if(this.timeOut())
        {
            clearInterval(this.timer);
        }

        this.render();
    }

    this.timeOut = function()
    {
        if(this.min <= 0 && this.sec <= 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    this.start = function()
    {
        var _this = this;

        this.timer = setInterval(function(){
            _this.onTick();
        }, 1000);
    }

    this.render = function()
    {
        $(DOMElement).html(this.min + ":" + this.sec);
        $('title').text("Session " + this.min + ":" + this.sec);
    }

}

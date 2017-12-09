function PomodoroTimer(DOMElement, sessionTime = 25, breakTime = 5)
{
    this.sessionTime = sessionTime;
    this.breakTime = breakTime;
    this.min = this.sessionTime;
    this.sec = 0;
    this.timer = null;
    this.DOMElement = DOMElement;
    this.break = false;

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
            this.pause();

            if(!this.break)
            {
                this.break = true;
                this.startBreak();
            }
            else
            {
                this.break = false;
                this.startSession();
            }
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

    this.pause = function()
    {
        clearInterval(this.timer);
    }

    this.startSession = function()
    {
        this.min = sessionTime;
        this.sec = 0;
        this.start();
    }

    this.startBreak = function()
    {
        this.min = breakTime;
        this.sec = 0;
        this.start();
    }

    this.render = function()
    {
        $(DOMElement).html(this.min + ":" + this.sec);
        $('title').text("Session " + this.min + ":" + this.sec);
    }

}

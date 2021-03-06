function PomodoroTimer(DOMElement, sessionTime = 25, breakTime = 5)
{
    this.DOMElement = DOMElement;
    this.sessionTime = sessionTime;
    this.breakTime = breakTime;
    this.min = this.sessionTime;
    this.sec = 0;
    this.timer = null;
    this.break = false;
    this.sessionsCounter = localStorage.getItem('sessionsCounter') || 0;
    this.breaksCounter = localStorage.getItem('breaksCounter') || 0;

    this.onTick = function()
    {
        this.sec--;

        if(this.timeOut())
        {
            this.pause();

            if(!this.break)
            {
                this.break = true;
                this.sessionsCounter++;
                localStorage.setItem('sessionsCounter', this.sessionsCounter);

                this.breakConfirmation();
            }
            else
            {
                this.break = false;
                this.breaksCounter++;
                localStorage.setItem('breaksCounter', this.breaksCounter);

                this.sessionConfirmation();
            }
        }

        if(this.sec <= 0)
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

    this.sessionConfirmation = function()
    {
        if(confirm('Do you want to start session?'))
        {
            this.startSession();
        }
        else
        {
            location.reload();
        }
    }

    this.breakConfirmation = function()
    {
        if(confirm('Do you want to start break?'))
        {
            this.startBreak();
        }
        else
        {
            location.reload();
        }
    }

    this.resetCounters = function()
    {
        localStorage.removeItem('sessionsCounter');
        localStorage.removeItem('breaksCounter');
        location.reload();
    }

    this.render = function()
    {
        $(DOMElement).html(this.min + ":" + this.sec);

        if(this.break)
        {
            $('title').text("Break " + this.min + ":" + this.sec);
        }
        else
        {
            $('title').text("Session " + this.min + ":" + this.sec);
        }

        $('#sessions').html("Sessions: " + this.sessionsCounter);
        $('#breaks').html("Breaks: " + this.breaksCounter);
    }
}

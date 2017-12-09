function PomodoroTimer(sessionTime = 25, breakTime = 5)
{
    this.sessionTime = sessionTime;
    this.breakTime = breakTime;
    this.min = this.sessionTime;
    this.sec = 0;
    this.timer = null;

    this.onTick = function()
    {
        this.sec--;

        if(this.sec < 0)
        {
            this.sec = 59;
            this.min--;
        }

        if(this.timeOut())
        {
            clearInterval(this.timer);
        }

        console.log('Min: '+this.min+' | '+' Sec: '+this.sec);
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
        }, 1);
    }

}

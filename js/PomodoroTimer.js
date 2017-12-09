function PomodoroTimer(sessionTime, breakTime)
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

        console.log('Min: '+this.min+' | '+' Sec: '+this.sec);
    }
}

var timer = new PomodoroTimer("#timer");

$('#start').click(function(){
    timer.start();

    $('#start').attr('disabled', true);
    $('#pause').attr('disabled', false);
});

$('#pause').click(function(){
   timer.pause();

   $('#start').attr('disabled', false);
   $('#pause').attr('disabled', true);
});

$('#reset').click(function(){
    location.reload();
});


Stage.Timer = 2500;

Stage.Info = {
    scoreInfo : $('#scoreInfo'),
    healthInfo : $('#healthInfo')

};


function Stage() {

    var _player = new Player($('#player'));

    var _obstacle = new Obstacle($('#obstacle'));

    var _$dom = $('#stage');



    var _interval;

    var _lastActiveTime = 0;

    var _lastTimeChanged = 0;

    var _timeStarted = 0;

    this.getDomStage = function(){
        return _$dom
    };

    this.getPlayer = function() {
        return _player;
    };

    this.getObstacle = function() {
        return _obstacle;
    };

    this.setInterval = function(interval) {
        _interval = interval;
    };

    this.getInterval = function() {
        return _interval;
    };

    this.setLastActiveTime = function(time) {
        _lastActiveTime = time;
    };

    this.getLastActiveTime = function() {
        return _lastActiveTime;
    };

    this.setLastTimeChanged = function(time) {
        _lastTimeChanged = time;
    };

    this.getLastTimeChanged = function() {
        return _lastTimeChanged;
    };

    this.setTimeStarted = function(time) {
        _timeStarted = time;
    };

    this.getTimeStarted = function() {
        return _timeStarted;
    }
}

Stage.prototype.start = function() {
    this.events();
    var player = this.getPlayer();
    var obstacle = this.getObstacle();
    player.move();

    Stage.Info.healthInfo.html(player.getHealth());
    Stage.Info.scoreInfo.html(player.getPoints());

    var _this = this;
    _this.setTimeStarted(Date.now());
    _this.updateTimer(Date.now());
    var interval = window.setInterval(function() {

        var time = Date.now();
        if (time - _this.getLastActiveTime() > Stage.Timer) {
            obstacle.appear();
            obstacle.move();
            _this.setLastActiveTime(time);
        }

        _this.updateTimer(time);


        if(_this.checkCollision() == 'Point'){
            var currentScore = player.getPoints();
            currentScore++;
            player.setPoints(currentScore);
            Stage.Info.scoreInfo.html(player.getPoints());
        }


        if(_this.checkCollision() == 'Hit'){
            obstacle.hide();
            var currentHealth = player.getHealth();
            currentHealth--;
            if(!currentHealth){
                currentHealth = 0;
                _this.stop();
            }
            player.setHealth(currentHealth);
            Stage.Info.healthInfo.html(player.getHealth());
        }


    }, 25);

	_this.setInterval(interval);
};

Stage.prototype.stop = function() {
    if (this.getInterval() !== undefined) {
        window.clearInterval(this.getInterval());
    }
    var strScore = "" + this.getPlayer().getPoints();
    var totalScoreInfo = $('#totalScore');
    totalScoreInfo.html('Your score is: ' + strScore);
    this.getPlayer().getDom().hide(500);

    console.log(this.getDomStage());

    $('#controlButtons').fadeIn(1500);


};

Stage.prototype.updateTimer = function(currentTime) {
    if (currentTime - this.getLastTimeChanged() > 800) {
        var timespan = Math.floor((currentTime - this.getTimeStarted()) / 1000);

        var minutes = Math.floor(timespan / 60);
        var seconds = timespan % 60;

        var html = '';
        html +=  minutes >= 10 ? minutes : '0' + minutes;
        html += ':';
        html +=  seconds >= 10 ? seconds : '0' + seconds;

        $('#time-container span').html(html);
        this.setLastTimeChanged(currentTime);
    }
};

Stage.prototype.checkCollision = function(){


    var obsLeft    = parseInt($('#stage').innerWidth()) - parseInt(this.getObstacle().getDom().css('right')) - 70;
    var obsHeight  = this.getObstacle().getTop();

    var playerRight= parseInt(this.getPlayer().getDom().css('left')) + 70;
    var playerLeft = parseInt(this.getPlayer().getDom().css('left'));
    var playerBot  = parseInt(this.getPlayer().getDom().css('bottom'));
    var pHeight    = parseInt(this.getPlayer().getDom().css('height'));
    var playerHeight = playerBot + pHeight;

    var active = this.getObstacle().getIsActive();


    //console.log(active);

    if(playerRight > obsLeft && playerHeight >= obsHeight && playerBot <= obsHeight && active){
        //this.getObstacle().setIsActive(false);
        return 'Hit';


    }else if(playerLeft > obsLeft && active){
        this.getObstacle().setIsActive(false);
        return 'Point';
    }

};

Stage.prototype.events = function() {

    var save = $('#save');
    var playAgain = $('#playAgain');
    var _this = this;

    save.on('click', function () {
        var userName = $('#name').val();
        console.log('tuk');
        if (!userName) {
            console.log('invalid input');
            return;
        }


        $('#score-panel').fadeIn(1000);
        $('#addResult').css('display', 'none');



        var strScore = _this.getPlayer().getPoints() + '';
        var userName = $('#name').val();

        console.log('score: ' + strScore + '  name: ' + userName);

        var currentScore = {
            name: userName,
            score: strScore
        };

        localStorage.setItem(currentScore.name, currentScore.score);

        var allUsers = localStorage;

        var sortable = [];

        for (var user in allUsers)
            sortable.push([user, allUsers[user]])
        sortable.sort(function (a, b) {
            return a[1] - b[1]
        });


        var result = '';

        sortable.reverse();


        for (var i = 0; i < sortable.length; i++) {

            result += '<tr><td>' + i + '</td><td>' + sortable[i][0] + '</td><td>' + sortable[i][1] + '</td></tr>';

        }


        $('table').append($(result));


        _this.getDomStage().hide()
    })

    playAgain.on('click', function(){
        location.reload();
    });


};







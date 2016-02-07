Player.States = {
    Jumped: 4,
    Standing: 3,
    Ducked: 2,
    Down: 1,
    Current: 3,
    Last : 0
};
Player.Defaults = {
    Health:3,
    Points: 0,
    Speed : 140, // miliseconds
    State: Player.States.Standing,
    Name: 'Unknown'
};
Player.Dom = {
    Jumped:{
        Width: 70,
        Height: 210,
        Bottom: 90
    },
    Ducked:{
        Width: 100,
        Height: 140,
        Bottom: 20
    },
    Down:{
        Width: 140,
        Height: 70,
        Bottom: 20
    },
    Standing:{
        Width: 70,
        Height: 210,
        Bottom: 20
    }
};



function Player($dom) {

    var _$dom = $dom;

    var _health = Player.Defaults.Health;

    var _score  = Player.Defaults.Points;

    var _name   = Player.Defaults.Name;

    this.getDom = function() {

        return _$dom;
    };

    this.getHealth = function() {
        return _health;
    };

    this.setHealth = function(health) {
        _health = health;
    };

    this.getPoints = function() {
        return _score;
    };

    this.setPoints = function(points) {
        _score = points;
    };

    this.getName = function() {
        return _name;
    };

    this.setName = function(name) {
        _name = name;
    }
}



Player.prototype.move = function() {
    var _this = this;

    $(document).keydown(function (e) {

        if (e.keyCode == 38){
            Player.States.Current++;
            Player.States.Current =
                Player.States.Current > Player.States.Jumped ?
                Player.States.Jumped : Player.States.Current;
        }
        if (e.keyCode == 40){
            Player.States.Current--;
            Player.States.Current =
                Player.States.Current < Player.States.Down ?
                Player.States.Down : Player.States.Current;
        }

        if(Player.States.Last == Player.States.Current){
            return;
        }

        //console.log(Player.States.Current);

        if (Player.States.Current == Player.States.Jumped) {

            _this.animate(Player.Dom.Jumped.Width, Player.Dom.Jumped.Height, Player.Dom.Jumped.Bottom, Player.Defaults.Speed)

        }
        if (Player.States.Current == Player.States.Standing) {

            _this.animate(Player.Dom.Standing.Width, Player.Dom.Standing.Height, Player.Dom.Standing.Bottom, Player.Defaults.Speed)

        }
        if (Player.States.Current == Player.States.Ducked) {

            _this.animate(Player.Dom.Ducked.Width, Player.Dom.Ducked.Height, Player.Dom.Ducked.Bottom, Player.Defaults.Speed)

        }
        if (Player.States.Current == Player.States.Down) {

            _this.animate(Player.Dom.Down.Width, Player.Dom.Down.Height, Player.Dom.Down.Bottom, Player.Defaults.Speed)

        }

        Player.States.Last = Player.States.Current;

    });

};

Player.prototype.animate = function(width, height, bottom, speed){
    var _this = this;
    _this.getDom().animate({

        width:  width,
        height: height,
        bottom: bottom

    }, speed);
};

Player.prototype.updateScore = function(){
     var currentPoints = this.getPoints();
    currentPoints++;
    this.setPoints(currentPoints);
};

Player.prototype.updateHealth = function(){
    var currentHealth = this.getHealth();
    currentHealth--;
    this.setHealth(currentHealth);
};











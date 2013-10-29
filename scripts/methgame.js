Time = function () {
    this.DELTA_TIME = 1;
    this.lastTime = Date.now();
    this.frames = 0;
    this.speed = 1
};
Time.constructor = Time;
Time.prototype.update = function () {
    this.frames++;
    var a = Date.now();
    //this.frames = 0;
    this.DELTA_TIME = 0.06 * (a - this.lastTime);
    this.DELTA_TIME *= this.speed;
    2.3 < this.DELTA_TIME && (this.DELTA_TIME = 2.3);
    this.lastTime = a
};



var GAME = {};
GAME.time = new Time;
GAME.Game = function() {
	GAME.width = 400;
	GAME.height = 300;
	PIXI.DisplayObjectContainer.call(this);
	//level objects here
	this.score = 0;
}

GAME.Game.constructor = GAME.Game;
GAME.Game.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.Game.prototype.start = function () {};
GAME.Game.prototype.gameover = function () {
    //this.isGameover = !0;
    //this.gameoverView.show();
    //this.gameoverView.onContinue = $.proxy(this.restart, this)
};
GAME.Game.prototype.restart = function () {
};
GAME.Game.prototype.update = function () {
    GAME.time.update();
    this.bpm += 1 * GAME.time.DELTA_TIME;
    //bounce trees:
    /*for (var a = Math.sin(0.1 * this.bpm), b = Math.cos(0.1 * this.bpm), c = 0; c < this.trees.length; c++) {
        var d = this.trees[c];
        d.scale.x = 0.95 + 0.05 * a;
        d.scale.y = 0.95 + -0.05 * a;
        d.rotation = 0.05 * Math.cos(0.05 * this.bpm) * (0.5 + 0.5 * d.random)
    }*/
    //this.damage = 0;
    //this.elk.update();
    //blood.update();
    //this.enemyManager.update();
    //this.goodyManager.update();
    //this.elk.position.x = GAME.width / 2 + 5 * Math.sin(5 * this.life);
    /*for (c = 0; c < this.clouds.length; c++) a = this.clouds[c],
    a.position.x -= a.speed * GAME.time.DELTA_TIME, a.scale.x = a.scale.y = 0.98 + 0.02 * b, -160 > a.position.x && (a.position.x += GAME.width + 260);
    this.scoreView.setScore(this.score);
    if (!this.isGameover && (this.life -= 0.1 * this.damage * GAME.time.DELTA_TIME, 0 > this.life && (this.gameover(), this.elk.die()), this.lifeBar.bar.scale.x = 0.92 * (this.life / 100), (b = GAME.bonusArray[0]) && 0 > b.life)) b.parent.removeChild(b), GAME.bonusArray.splice(0, 1), GAME.bonusPool.returnObject(b)*/
};
GAME.Game.prototype.resize = function (a, b) {
    GAME.width = a;
    GAME.height = b;
    //this.gameoverView.resize(a, b)
};




// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);

stage.setInteractive(true);

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(400,300);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

$(document).ready(onReady);
//$(window).resize(onResize);

var gameScreen = new GAME.Game;

function onReady(){
	//startup.run();
	requestAnimFrame( update );
}

var methTest = new Receptor(gameScreen.width/2, gameScreen.height/2, RECEPTOR_TYPES.METH);

stage.addChild(methTest.getDisplayObject());

//var t = Date.now();
//var lastTime = t;
//var dT = 0.0;

var doRender = true;

//console.log(window.performance.now());
function update() {
	gameScreen.update();
	renderer.render(stage);
	doRender && requestAnimFrame(update);
	/*t = currTime();
	dT = t - lastTime;

    requestAnimFrame( update );

    // just for fun, lets rotate mr rabbit a little
    
	
    // render the stage   
    renderer.render(stage);
    
    lastTime = t;*/
    
    methTest.position.x += Math.sin(GAME.time.lastTime)*10;
}

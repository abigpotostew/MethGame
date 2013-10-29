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

/**************************************************
	SimpleApp Class
***************************************************/
SimpleApp = function (a) {
    this.container = a; //stage
    this.screens = {};
    this.currentScreen;
    this.fading = false;
    this.ratio = 11.0/14.0; // w/h ratio
    this.h = $(window).height();
    this.w = this.ratio*this.h;
};
SimpleApp.constructor = SimpleApp;
SimpleApp.prototype.gotoScreenByID = function (a) {
    this.gotoScreen(this.screens[a])
};
SimpleApp.prototype.gotoScreen = function (a, b) {
    if (this.currentScreen != a && (this.nextScreen = a, !this.fading))
        if (this.fading = !0, this.currentScreen) b ? TweenLite.to(this.currentScreen, 0, {
            alpha: 0,
            onComplete: $.proxy(this.onFadeout, this)
        }) : TweenLite.to(this.currentScreen, 0.4, {
            alpha: 0,
            onComplete: $.proxy(this.onFadeout, this)
        });
        else this.onFadeout()
};
SimpleApp.prototype.onFadeout = function () {
    if (this.currentScreen) {
        if (this.currentScreen.onHidden) this.currentScreen.onHidden();
        this.container.removeChild(this.currentScreen)
    }
    this.currentScreen = this.nextScreen;
    this.currentScreen.alpha = 0;
    this.currentScreen.resize && this.currentScreen.resize(this.w, this.h);
    TweenLite.to(this.currentScreen, 0.4, {
        alpha: 1,
        onComplete: $.proxy(this.onFadein, this)
    });
    this.container.addChildAt(this.currentScreen, 0)
};
SimpleApp.prototype.onFadein = function () {
    this.fading = !1;
    if (this.currentScreen.onShown) this.currentScreen.onShown();
    this.currentScreen != this.nextScreen && this.gotoScreen(this.nextScreen)
};
SimpleApp.prototype.resize = function (a, b) {
    this.w = this.ratio*b;
    this.h = b;
    this.currentScreen && this.currentScreen.resize && this.currentScreen.resize(this.w, this.h)
};


var GAME = {};
GAME.time = new Time;
GAME.Game = function() {
	GAME.width = $(window).height()*(11./14.);
	GAME.height = $(window).height();
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
    //this.bpm += 1 * GAME.time.DELTA_TIME;
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
var renderer = PIXI.autoDetectRenderer($(window).height()*(11./14.),$(window).height());

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

$(document).ready(onReady);
//$(window).resize(onResize);

var gameScreen = new GAME.Game;

function onReady(){
	//startup.run();
	requestAnimFrame( update );
}

var methTest = new Receptor(GAME.width/2, GAME.height/2, RECEPTOR_TYPES.METH);

stage.addChild(methTest);

var doRender = true;

function update() {
	TWEEN.update();
	gameScreen.update();
	renderer.render(stage);
	doRender && requestAnimFrame(update);
}

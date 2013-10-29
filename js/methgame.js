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
    this.h = 1303;
    this.w = 1024;
};
SimpleApp.constructor = SimpleApp;
SimpleApp.prototype.gotoScreenByID = function (a) {
    this.gotoScreen(this.screens[a])
};
SimpleApp.prototype.gotoScreen = function (a, b) {
    if (this.currentScreen != a && (this.nextScreen = a, !this.fading))
        if (this.fading = true, this.currentScreen) b ? new TWEEN.Tween(this.currentScreen).to({alpha:0},400).onComplete($.proxy(this.onFadeout, this)).start() : new TWEEN.Tween(this.currentScreen).to({alpha:0},400).onComplete($.proxy(this.onFadeout, this)).start();
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
    var t = new TWEEN.Tween(this.currentScreen);
    t.to({ alpha: 1 },400);
    t.onComplete($.proxy(this.onFadein, this));
    t.start();
    this.container.addChildAt(this.currentScreen, 0)
};
SimpleApp.prototype.onFadein = function () {
    this.fading = false;
    if (this.currentScreen.onShown) this.currentScreen.onShown();
    this.currentScreen != this.nextScreen && this.gotoScreen(this.nextScreen)
};
SimpleApp.prototype.resize = function (a, b) {
    this.w = a;
    this.h = b;
    this.currentScreen && this.currentScreen.resize && this.currentScreen.resize(this.w, this.h)
};

Startup = function () {
    //this.loader = new PIXI.AssetLoader("img/BG_col_01.png img/BG_col_02.png img/BG_col_03.png img/BG_col_04.png img/BG_col_05.png img/ohdeer.png img/TITLE.png img/play_again_rollpress.png img/submit_rollpress.png img/play.png img/play_rollpress.png img/fullTimeHobby.png img/PP.png img/goodboy.png img/gameAssets-hd.json img/frontEndAssets-hd.json img/handAssets-hd.json img/hudAssets.json".split(" "));
    this.loader = new PIXI.AssetLoader("img/devil_shit_lq.jpg".split(" "));
    simpleApp.gotoScreen(loadingScreen);
    this.loader.addEventListener("onComplete", function () {
        gameScreen =
            new GAME.Game;
        //titleScreen = new TitleScreen;
        //transition = new GAME.TransitionAnimation;
        //stage.addChildAt(transition, 1);
        simpleApp.gotoScreen(gameScreen);
    })
};
Startup.constructor = Startup;
Startup.prototype.run = function () {
    this.loader.load()
};



LoadingScreen = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.loading = new PIXI.Text("Loading");
    this.addChild(this.loading);
    this.loading.position.x = 400;
    this.loading.position.y = 300
};
LoadingScreen.constructor = LoadingScreen;
LoadingScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
LoadingScreen.prototype.resize = function (a, b) {
    this.loading.position.x = a / 2;
    this.loading.position.y = b / 2;
    this.loading.anchor.x = 0.5;
    this.loading.anchor.y = 0.5;
};



var GAME = {};
GAME.time = new Time;
GAME.Game = function() {
	GAME.width = 1024;
	GAME.height = 1303;
	PIXI.DisplayObjectContainer.call(this);
	//level objects here
	this.methTest = new Receptor(100,100,RECEPTOR_TYPES.METH);
	this.mx = 100;
	this.addChild(this.methTest);
	this.score = 0;
}

GAME.Game.constructor = GAME.Game;
GAME.Game.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.Game.prototype.start = function () {};
GAME.Game.prototype.gameover = function () {
    //this.isGameover = true;
    //this.gameoverView.show();
    //this.gameoverView.onContinue = $.proxy(this.restart, this)
};
GAME.Game.prototype.restart = function () {
};
GAME.Game.prototype.update = function () {
    GAME.time.update();
    this.methTest.position.x = this.mx + Math.sin(GAME.time.lastTime);
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



var ratio = new PIXI.Point(11./14., 1.);
// create a renderer instance
var renderer = PIXI.autoDetectRenderer($(window).height()*ratio.x,$(window).height()*ratio.y);
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

//Initial setup of variables
var stage = new PIXI.Stage(0x66FF99),
	gameScreen,
	mouse = new PIXI.Point,
	simpleApp = new SimpleApp(stage),
	loadingScreen = new LoadingScreen,
	startUp = new Startup,
	doRender = true;
$(window).resize(onResize);

function update() {
	TWEEN.update();
	simpleApp.currentScreen == gameScreen && gameScreen.update();
	renderer.render(stage);
	doRender && requestAnimFrame(update);
}

$(document).ready(onReady);

function onReady(){
	//startup.run();
	startUp.run();
    requestAnimFrame(update);
    onResize()
}


function startRender() {
    doRender || (doRender = true, requestAnimFrame(update))
}

function onTouchMove(a) {
    a.preventDefault();
    var b = renderer.view.getBoundingClientRect();
    mouse.x = (a.touches[0].clientX - b.left) / ratio.x;
    mouse.y = (a.touches[0].clientY - b.top) / ratio.y
}

function onTouchStart(a) {
    a.preventDefault();
    var b = renderer.view.getBoundingClientRect();
    mouse.x = (a.touches[0].clientX - b.left) / ratio.x;
    mouse.y = (a.touches[0].clientY - b.top) / ratio.y;
    interactiveManager.mousedown()
}

function onTouchEnd(a) {
    a.preventDefault();
    interactiveManager.mouseup()
}

function onMouseMove(a) {
    a.preventDefault();
    var b = renderer.view.getBoundingClientRect();
    mouse.x = (a.clientX - b.left) / ratio.x;
    mouse.y = (a.clientY - b.top) / ratio.y
}

function onMouseDown(a) {
    a.preventDefault();
    interactiveManager.mousedown()
}

function onMouseUp(a) {
    a.preventDefault();
    interactiveManager.mouseup()
}

function onResize() {
    var a = $(window).height()*ratio.x,
        b = $(window).height()*ratio.y;
    renderer.view.style.width = a + "px";
    renderer.view.style.height = b + "px";
    simpleApp.resize(a, b);
    //set landscape mode here in future
}

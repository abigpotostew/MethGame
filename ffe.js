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
    this.frames = 0;
    this.DELTA_TIME = 0.06 * (a - this.lastTime);
    this.DELTA_TIME *= this.speed;
    2.3 < this.DELTA_TIME && (this.DELTA_TIME = 2.3);
    this.lastTime = a
};
var GAME = {};
SimpleApp = function (a) {
    this.container = a;
    this.screens = {};
    this.currentScreen;
    this.fading = !1;
    this.w = $(window).width();
    this.h = $(window).height()
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
    this.w = a;
    this.h = b;
    this.currentScreen && this.currentScreen.resize && this.currentScreen.resize(a, b)
};
Startup = function () {
    this.loader = new PIXI.AssetLoader("img/BG_col_01.png img/BG_col_02.png img/BG_col_03.png img/BG_col_04.png img/BG_col_05.png img/ohdeer.png img/TITLE.png img/play_again_rollpress.png img/submit_rollpress.png img/play.png img/play_rollpress.png img/fullTimeHobby.png img/PP.png img/goodboy.png img/gameAssets-hd.json img/frontEndAssets-hd.json img/handAssets-hd.json img/hudAssets.json".split(" "));
    simpleApp.gotoScreen(loadingScreen);
    this.loader.addEventListener("onComplete", function () {
        gameScreen =
            new GAME.Game;
        titleScreen = new TitleScreen;
        transition = new GAME.TransitionAnimation;
        stage.addChildAt(transition, 1);
        simpleApp.gotoScreen(titleScreen);
        hand = new GAME.ExplosionAnimation;
        hand.position.x = GAME.width / 2;
        hand.position.y = GAME.height / 2 + 30
    })
};
Startup.constructor = Startup;
Startup.prototype.run = function () {
    this.loader.load()
};
LoadingScreen = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.loading = PIXI.Sprite.fromImage("img/loading.png");
    this.addChild(this.loading);
    this.loading.anchor.x = this.loading.anchor.y = 0.5;
    this.loading.position.x = 400;
    this.loading.position.y = 300
};
LoadingScreen.constructor = LoadingScreen;
LoadingScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
LoadingScreen.prototype.resize = function (a, b) {
    this.loading.position.x = a / 2;
    this.loading.position.y = b / 2
};
TitleScreen = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.logoContainer = new PIXI.DisplayObjectContainer;
    this.logo1 = PIXI.Sprite.fromImage("img/fullTimeHobby.png");
    this.logo2 = PIXI.Sprite.fromImage("img/PP.png");
    this.logo3 = PIXI.Sprite.fromImage("img/goodboy.png");
    this.logo1.anchor.x = this.logo1.anchor.y = 0.5;
    this.logo2.anchor.x = this.logo2.anchor.y = 0.5;
    this.logo3.anchor.x = this.logo3.anchor.y = 0.5;
    this.logo1.alpha = 0;
    this.logo2.alpha = 0;
    this.logo3.alpha = 0;
    this.logoContainer.addChild(this.logo1);
    this.logoContainer.addChild(this.logo2);
    this.logoContainer.addChild(this.logo3);
    this.title = PIXI.Sprite.fromImage("img/TITLE.png");
    this.title.anchor.x = this.title.anchor.y = 0.5;
    this.playButton = PIXI.Sprite.fromImage("img/play.png");
    this.playButton.touchstart = this.playButton.mouseover = function () {
        this.setTexture(PIXI.Texture.fromImage("img/play_rollpress.png"))
    };
    this.playButton.touchend = this.playButton.mouseout = function () {
        this.setTexture(PIXI.Texture.fromImage("img/play.png"))
    };
    this.playButton.hitScale = 1;
    this.playButton.anchor.x = this.playButton.anchor.y =
        0.5;
    this.playButton.interactive = !0;
    this.playButton.position.x = 400;
    this.playButton.position.y = 300;
    this.addChild(this.logoContainer);
    var a = 0.5;
    this.introTimeline = new TimelineLite;
    this.introTimeline.to(this.logo1, a, {
        alpha: 1,
        ease: Sine.easeIn
    });
    this.introTimeline.to(this.logo1, a, {
        alpha: 0,
        ease: Sine.easeOut,
        delay: 1
    });
    this.introTimeline.to(this.logo2, a, {
        alpha: 1,
        ease: Sine.easeIn
    });
    this.introTimeline.to(this.logo2, a, {
        alpha: 0,
        ease: Sine.easeOut,
        delay: 1
    });
    this.introTimeline.to(this.logo3, a, {
        alpha: 1,
        ease: Sine.easeIn
    });
    this.introTimeline.to(this.logo3, a, {
        alpha: 0,
        ease: Sine.easeOut,
        delay: 1
    });
    this.introTimeline.call(this.onIntrosComplete.bind(this));
    this.instruction1 = PIXI.Sprite.fromImage("img/instruct_01.png");
    this.instruction2 = PIXI.Sprite.fromImage("img/instruct_02.png");
    this.instruction3 = PIXI.Sprite.fromImage("img/instruct_03.png");
    this.instruction4 = PIXI.Sprite.fromImage("img/instruct_04.png");
    this.instruction1.alpha = 0;
    this.instruction2.alpha = 0;
    this.instruction3.alpha = 0;
    this.instruction4.alpha = 0;
    a = 0.3;
    this.tutorialTimline =
        new TimelineLite;
    this.tutorialTimline.to(this.instruction1, a, {
        alpha: 1,
        ease: Sine.easeIn
    });
    this.tutorialTimline.to(this.instruction1, 0.3, {
        alpha: 0,
        ease: Sine.easeIn,
        delay: 1.5
    });
    this.tutorialTimline.to(this.instruction2, a, {
        alpha: 1,
        ease: Sine.easeIn
    });
    this.tutorialTimline.to(this.instruction2, 0.3, {
        alpha: 0,
        ease: Sine.easeIn,
        delay: 1.5
    });
    this.tutorialTimline.to(this.instruction3, a, {
        alpha: 1,
        ease: Sine.easeIn
    });
    this.tutorialTimline.to(this.instruction3, 0.3, {
        alpha: 0,
        ease: Sine.easeIn,
        delay: 1.5
    });
    this.tutorialTimline.to(this.instruction4,
        a, {
            alpha: 1,
            ease: Sine.easeIn
        });
    this.tutorialTimline.to(this.instruction4, 0.3, {
        alpha: 0,
        ease: Sine.easeIn,
        delay: 1.5
    });
    this.tutorialTimline.call(this.onTutorialComplete.bind(this));
    this.tutorialTimline.stop();
    this.instruction1.anchor.x = 0.5;
    this.instruction1.anchor.y = 0.5;
    this.instruction2.anchor.x = 0.5;
    this.instruction2.anchor.y = 0.5;
    this.instruction3.anchor.x = 0.5;
    this.instruction3.anchor.y = 0.5;
    this.instruction4.anchor.x = 0.5;
    this.instruction4.anchor.y = 0.5;
    this.addChild(this.instruction1);
    this.addChild(this.instruction2);
    this.addChild(this.instruction3);
    this.addChild(this.instruction4)
};
TitleScreen.constructor = TitleScreen;
TitleScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
TitleScreen.prototype.onIntrosComplete = function () {
    this.removeChild(this.logoContainer);
    this.title.alpha = 0;
    this.playButton.alpha = 0;
    TweenLite.to(this.title, 0.5, {
        alpha: 1,
        ease: Sine.easeOut
    });
    TweenLite.to(this.playButton, 0.5, {
        alpha: 1,
        ease: Sine.easeOut,
        delay: 0.3
    });
    this.addChildAt(this.playButton, 0);
    this.addChild(this.title)
};
TitleScreen.prototype.onShown = function () {
    this.introTimeline.play();
    this.playButton.click = this.playButton.tap = $.proxy(this.onPlayPressed, this)
};
TitleScreen.prototype.onHidden = function () {};
TitleScreen.prototype.onPlayPressed = function () {
    this.playButton.setInteractive(!1);
    setTimeout(this.onHandFinished.bind(this), 600);
    stage.addChild(hand)
};
TitleScreen.prototype.onHandFinished = function () {
    document.getElementById("music").play();
    muteButton.alpha = 0;
    muteButton.visible = !0;
    TweenLite.to(muteButton, 0.3, {
        alpha: 1,
        ease: Sine.eaesIn
    });
    transition.start(1);
    transition.onComplete = this.showTutorial.bind(this)
};
TitleScreen.prototype.showTutorial = function () {
    this.removeChild(this.playButton);
    this.removeChild(this.title);
    this.addChild(this.instruction1);
    this.addChild(this.instruction2);
    this.addChild(this.instruction3);
    this.addChild(this.instruction4);
    this.tutorialTimline.play()
};
TitleScreen.prototype.onTutorialComplete = function () {
    transition.start(0);
    transition.onComplete = function () {
        simpleApp.gotoScreen(gameScreen, !0)
    }
};
TitleScreen.prototype.resize = function (a, b) {
    this.logoContainer.position.x = a / 2;
    this.logoContainer.position.y = b / 2;
    this.title.position.x = a / 2;
    this.title.position.y = 250;
    this.playButton.position.x = a / 2;
    this.playButton.position.y = 470;
    this.instruction1.position.x = a / 2;
    this.instruction1.position.y = b / 2;
    this.instruction2.position.x = a / 2;
    this.instruction2.position.y = b / 2;
    this.instruction3.position.x = a / 2;
    this.instruction3.position.y = b / 2;
    this.instruction4.position.x = a / 2;
    this.instruction4.position.y = b / 2
};
LifeBar = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.bar = PIXI.Sprite.fromImage("img/healthBar.png");
    this.addChild(this.bar);
    this.bar.position.x = 39;
    this.bar.position.y = 6;
    this.bar.scale.x = 0.9;
    this.bar.scale.y = 0.78;
    this.frame = PIXI.Sprite.fromFrame("healthFrame_green.png");
    this.addChild(this.frame)
};
LifeBar.constructor = LifeBar;
LifeBar.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GameoverOverlay = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.gameover = PIXI.Sprite.fromImage("img/ohdeer.png");
    this.gameover.anchor.x = this.gameover.anchor.y = 0.5;
    this.gameover.position.x = 400;
    this.gameover.position.y = 150;
    this.tryAgain = PIXI.Sprite.fromImage("img/BG_col_playAgain.png");
    this.tryAgain.scale.x = 5.36;
    this.tryAgain.scale.y = 4.9;
    this.tryAgain.text = PIXI.Sprite.fromImage("img/play_again.png");
    this.tryAgain.text.scale.x = 1 / this.tryAgain.scale.x;
    this.tryAgain.text.scale.y = 1 / this.tryAgain.scale.y;
    this.tryAgain.text.anchor.x = this.tryAgain.text.anchor.y = 0.5;
    this.tryAgain.addChild(this.tryAgain.text);
    this.tryAgain.mouseover = this.tryAgain.touchstart = function () {
        this.text.setTexture(PIXI.Texture.fromImage("img/play_again_rollpress.png"))
    };
    this.tryAgain.mouseout = this.tryAgain.touchend = function () {
        this.text.setTexture(PIXI.Texture.fromImage("img/play_again.png"))
    };
    this.tryAgain.anchor.x = this.tryAgain.anchor.y = 0.5;
    this.submitButton = PIXI.Sprite.fromImage("img/BG_col_submit.png");
    this.submitButton.scale.x =
        5.36;
    this.submitButton.scale.y = 4.9;
    this.submitButton.hitScale = 1;
    this.submitButton.anchor.x = this.submitButton.anchor.y = 0.5;
    this.submitButton.text = PIXI.Sprite.fromImage("img/submit.png");
    this.submitButton.text.scale.x = 1 / this.submitButton.scale.x;
    this.submitButton.text.scale.y = 1 / this.submitButton.scale.y;
    this.submitButton.text.position.x = 5 / this.submitButton.scale.y;
    this.submitButton.text.anchor.x = this.submitButton.text.anchor.y = 0.5;
    this.submitButton.addChild(this.submitButton.text);
    this.submitButton.mouseover =
        this.submitButton.touchstart = function () {
            this.text.setTexture(PIXI.Texture.fromImage("img/submit_rollpress.png"))
    };
    this.submitButton.mouseout = this.submitButton.touchend = function () {
        this.text.setTexture(PIXI.Texture.fromImage("img/submit.png"))
    };
    this.submitButton.click = this.submitButton.tap = function () {
        highScores.show()
    };
    this.tryAgain.position.x = 400;
    this.tryAgain.position.y = 450;
    this.addChild(this.gameover);
    this.addChild(this.tryAgain);
    this.addChild(this.submitButton);
    this.tryAgain.click = this.tryAgain.tap =
        $.proxy(this.onTryAgainPressed, this);
    this.tryAgain.hitScale = 1;
    this.tweet = new GAME.TweetButton;
    this.addChild(this.tweet);
    this.tweet.position.x = 100;
    this.tweet.position.y = GAME.height / 2;
    this.facebook = new GAME.FacebookButton;
    this.addChild(this.facebook);
    this.facebook.position.x = GAME.width - 100;
    this.facebook.position.y = GAME.height / 2;
    this.tryAgain.alpha = 0;
    this.submitButton.alpha = 0;
    this.gameover.alpha = 0;
    this.tweet.alpha = 0;
    this.facebook.alpha = 0;
    this.tl = new TimelineLite;
    this.tl.to(this.gameover, 0.5, {
        alpha: 1,
        ease: Sine.easeIn
    });
    this.tl.to(this.gameover, 0.5, {
        alpha: 0,
        ease: Sine.easeOut,
        delay: 2
    });
    this.tl.to(this.facebook, 0.5, {
        alpha: 1,
        ease: Sine.easeIn
    }, 3);
    this.tl.to(this.tryAgain, 0.5, {
        alpha: 1,
        ease: Sine.easeIn
    }, 3.2);
    this.tl.to(this.submitButton, 0.5, {
        alpha: 1,
        ease: Sine.easeIn
    }, 3.4);
    this.tl.to(this.tweet, 0.5, {
        alpha: 1,
        ease: Sine.easeIn
    }, 3.6);
    this.tl.call(this.onPlayAgainFaded.bind(this));
    this.deetsContainer = new PIXI.DisplayObjectContainer;
    this.addChild(this.deetsContainer);
    var a = PIXI.Sprite.fromImage("img/watchVideo.png");
    this.deetsContainer.addChild(a);
    a.anchor.x = 1;
    a.position.x = GAME.width - 70;
    a.position.y = 490;
    a.hitScale = 1;
    a.setInteractive(!0);
    a.click = a.tap = function () {
        window.open("http://vimeo.com/60999448")
    };
    a = PIXI.Sprite.fromImage("img/buyAlbum.png");
    this.deetsContainer.visible = !1;
    this.deetsContainer.addChild(a);
    a.position.x = 60;
    a.position.y = 490;
    a.hitScale = 1;
    a.setInteractive(!0);
    var b = this;
    a.click = a.tap = function () {
        this.toggle = !this.toggle;
        console.log(this.toggle);
        this.toggle ? (b.addChild(b.buyContainer), TweenLite.to(b.buyContainer,
            0.3, {
                alpha: 1
            })) : TweenLite.to(b.buyContainer, 0.3, {
            alpha: 0,
            onComplete: function () {
                b.removeChild(b.buyContainer)
            }
        })
    };
    this.buyContainer = new PIXI.DisplayObjectContainer;
    this.buyContainer.alpha = 0;
    a = PIXI.Sprite.fromImage("img/amazon.png");
    this.buyContainer.addChild(a);
    a.position.x = 71;
    a.position.y = 524;
    a.hitScale = 1;
    a.setInteractive(!0);
    a.click = a.tap = function () {
        window.open("http://www.amazon.co.uk/Alone-Aboard-The-Leisure-Society/dp/B00B2QILWA/ref\x3dsr_1_6?ie\x3dUTF8\x26qid\x3d1358852906\x26sr\x3d8-6")
    };
    a =
        PIXI.Sprite.fromImage("img/itunes.png");
    this.buyContainer.addChild(a);
    a.position.x = 71;
    a.position.y = 576;
    a.hitScale = 1;
    a.setInteractive(!0);
    a.click = a.tap = function () {
        window.open("https://itunes.apple.com/gb/album/alone-aboard-the-ark/id610352289")
    };
    a = PIXI.Sprite.fromImage("img/stakeholders.png");
    this.deetsContainer.addChild(a);
    a.anchor.x = 0.5;
    a.anchor.y = 1;
    a.position.x = GAME.width / 2;
    a.position.y = GAME.height - 10;
    a.hitScale = 1;
    a.setInteractive(!0);
    a.click = a.tap = function (a) {
        var b = this.worldTransform;
        a = a.global;
        var e = b[0],
            g = b[1],
            f = b[2],
            h = b[3],
            j = b[4],
            b = b[5],
            k = 1 / (e * j + g * -h);
        tempPoint.x = j * k * a.x + -g * k * a.y + (b * g - f * j) * k;
        tempPoint.y = e * k * a.y + -h * k * a.x + (-b * e + f * h) * k;
        180 < tempPoint.x ? window.open("http://www.goodboydigital.com/") : 59 < tempPoint.x ? window.open("http://www.persistentperil.com/") : 14 < tempPoint.x ? window.open("http://www.fulltimehobby.co.uk/main/") : window.open("http://www.theleisuresociety.co.uk/")
    }
};
GameoverOverlay.constructor = GameoverOverlay;
GameoverOverlay.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GameoverOverlay.prototype.show = function () {
    this.reversing = !1;
    this.deetsContainer.visible = !1;
    this.tweet.visible = !0;
    this.facebook.visible = !0;
    this.gameover.visible = !0;
    this.tl.restart();
    this.tl.play();
    this.tryAgain.setInteractive(!1);
    this.submitButton.setInteractive(!1)
};
GameoverOverlay.prototype.onPlayAgainFaded = function () {
    this.reversing || (this.tryAgain.setInteractive(!0), this.submitButton.setInteractive(!0), this.deetsContainer.visible = !0, this.deetsContainer.alpha = 0, TweenLite.to(this.deetsContainer, 0.3, {
        alpha: 1
    }))
};
GameoverOverlay.prototype.hide = function () {
    this.tryAgain.setInteractive(!1);
    this.submitButton.setInteractive(!1);
    this.tweet.visible = !1;
    this.facebook.visible = !1;
    this.tweet.hide();
    this.facebook.hide()
};
GameoverOverlay.prototype.onTryAgainPressed = function () {
    this.reversing = !0;
    this.tl.reverse();
    this.tryAgain.setInteractive(!1);
    this.submitButton.setInteractive(!1);
    TweenLite.to(this.deetsContainer, 0.3, {
        alpha: 0
    });
    setTimeout(this.onContinue, 1E3);
    this.gameover.visible = !1
};
GameoverOverlay.prototype.onSubmitPressed = function () {};
GameoverOverlay.prototype.resize = function (a, b) {
    this.facebook.position.x = 122.5;
    this.facebook.position.y = b / 2;
    this.tryAgain.position.x = 379;
    this.tryAgain.position.y = b / 2;
    this.submitButton.position.x = 647;
    this.submitButton.position.y = b / 2;
    this.gameover.position.x = a / 2;
    this.gameover.position.y = b / 2 - 20;
    this.tweet.position.x = a - 122.5;
    this.tweet.position.y = b / 2
};
var GAME = {}, backgroundColors = [8306548, 4308143, 13480785, 15895987, 9993651],
    backgroundColorsName = ["healthFrame_green.png", "healthFrame_turq.png", "healthFrame_yellow.png", "healthFrame_pink.png", "healthFrame_purple.png"],
    backgroundColorsName2 = ["img/BG_col_01.png", "img/BG_col_02.png", "img/BG_col_03.png", "img/BG_col_04.png", "img/BG_col_05.png"],
    treePositions = [-22, 102, 12, 56, 74, 70, 118, 84, 296, 74, 764, 50, 802, 56, 838, 62, 948, 52, 978, 82],
    colorPos = 0;
GAME.time = new Time;
GAME.Game = function () {
    GAME.width = 1024;
    GAME.height = 690;
    PIXI.DisplayObjectContainer.call(this);
    this.bgContainer = new PIXI.DisplayObjectContainer;
    this.bpm = 0;
    this.clouds = [];
    for (var a = 0; 3 > a; a++) {
        var b = PIXI.Sprite.fromFrame("cloud.png");
        this.bgContainer.addChild(b);
        b.position.y = 60 + 60 * Math.random();
        b.position.x = 1024 / 3 * a + 100 * Math.random();
        b.speed = 1 + 2 * Math.random();
        b.speed *= 0.1;
        b.anchor.x = b.anchor.y = 0.5;
        this.clouds.push(b)
    }
    this.bgContainer.interactive = !1;
    this.shadowContainer = new PIXI.DisplayObjectContainer;
    this.gameContainer = new PIXI.DisplayObjectContainer;
    this.score = this.damage = 0;
    this.life = 100;
    this.lifeBar = new LifeBar;
    this.lifeBar.position.x = GAME.width / 2 - 135.5;
    this.lifeBar.position.y = GAME.height - 50;
    this.gameoverView = new GameoverOverlay;
    this.addChild(this.bgContainer);
    this.addChild(this.shadowContainer);
    this.addChild(this.gameContainer);
    this.addChild(this.lifeBar);
    this.elk = new GAME.Elk;
    this.elk.position.x = GAME.width / 2;
    this.elk.position.y = GAME.height / 2 + 50;
    this.enemyManager = new GAME.EnemyManager(this);
    this.goodyManager = new GAME.GoodyManager(this);
    this.addChild(this.elk);
    this.isGameover = !1;
    this.scoreView = new GAME.Score;
    this.scoreView.position.x = GAME.width / 2;
    this.scoreView.position.y = 20;
    this.addChild(this.scoreView);
    this.white = PIXI.Sprite.fromImage("img/whiteSquare.png");
    this.white.scale.x = GAME.width / 10;
    this.white.scale.y = GAME.height / 10;
    this.trees = [];
    for (a = 0; a < treePositions.length / 2; a++) b = PIXI.Sprite.fromFrame(a % 2 ? "tree_01.png" : "tree_02.png"), this.bgContainer.addChild(b), b.anchor.x = 0.5, b.anchor.y =
        1, b.random = Math.random(), b.position.x = treePositions[2 * a] + 34, b.position.y = treePositions[2 * a + 1] + 218, this.trees.push(b);
    a = PIXI.Sprite.fromFrame("shed.png");
    a.position.x = 171;
    a.position.y = 302;
    a.anchor.x = 0.5;
    a.anchor.y = 1;
    this.bgContainer.addChild(a);
    a.random = -1;
    this.trees.push(a);
    blood = new GAME.BloodSpray(this.elk);
    explosion = new GAME.ExplosionAnimationNoHand;
    explosion.position.x = this.elk.position.x;
    explosion.position.y = this.elk.position.y - 100
};
GAME.Game.constructor = GAME.Game;
GAME.Game.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.Game.prototype.onShown = function () {
    this.lifeBar.frame.setTexture(PIXI.Texture.fromFrame(backgroundColorsName[colorPos % backgroundColors.length]))
};
GAME.Game.prototype.start = function () {};
GAME.Game.prototype.gameover = function () {
    TweenLite.to(this.lifeBar, 0.3, {
        alpha: 0,
        ease: Sine.easeOut
    });
    this.isGameover = !0;
    this.enemyManager.disperce();
    blood.reset();
    this.addChild(this.gameoverView);
    this.gameoverView.show();
    this.gameoverView.onContinue = $.proxy(this.restart, this)
};
GAME.Game.prototype.restart = function () {
    this.elk.revive();
    TweenLite.to(this.lifeBar, 0.3, {
        alpha: 1,
        ease: Sine.easeOut
    });
    hand.position.y = GAME.height / 2 - 20;
    stage.addChild(hand);
    setTimeout(this.onHandTap.bind(this), 600)
};
GAME.Game.prototype.onHandTap = function () {
    this.gameoverView.hide();
    this.score = 0;
    colorPos++;
    transition.onComplete = this.onGameoverFade.bind(this);
    transition.onCompleteReal = this.onGameoverFadeIn.bind(this);
    transition.start(colorPos % backgroundColors.length)
};
GAME.Game.prototype.onGameoverFade = function () {
    this.life = 100;
    this.lifeBar.bar.scale.x = 0.92 * (this.life / 100);
    this.lifeBar.frame.setTexture(PIXI.Texture.fromFrame(backgroundColorsName[colorPos % backgroundColors.length]));
    this.elk.reset();
    this.enemyManager.destroyAll();
    this.goodyManager.destroyAll();
    this.removeChild(this.gameoverView)
};
GAME.Game.prototype.onGameoverFadeIn = function () {
    this.isGameover = !1
};
GAME.Game.prototype.update = function () {
    GAME.time.update();
    this.bpm += 1 * GAME.time.DELTA_TIME;
    for (var a = Math.sin(0.1 * this.bpm), b = Math.cos(0.1 * this.bpm), c = 0; c < this.trees.length; c++) {
        var d = this.trees[c];
        d.scale.x = 0.95 + 0.05 * a;
        d.scale.y = 0.95 + -0.05 * a;
        d.rotation = 0.05 * Math.cos(0.05 * this.bpm) * (0.5 + 0.5 * d.random)
    }
    this.damage = 0;
    this.elk.update();
    blood.update();
    this.enemyManager.update();
    this.goodyManager.update();
    this.elk.position.x = GAME.width / 2 + 5 * Math.sin(5 * this.life);
    for (c = 0; c < this.clouds.length; c++) a = this.clouds[c],
    a.position.x -= a.speed * GAME.time.DELTA_TIME, a.scale.x = a.scale.y = 0.98 + 0.02 * b, -160 > a.position.x && (a.position.x += GAME.width + 260);
    this.scoreView.setScore(this.score);
    if (!this.isGameover && (this.life -= 0.1 * this.damage * GAME.time.DELTA_TIME, 0 > this.life && (this.gameover(), this.elk.die()), this.lifeBar.bar.scale.x = 0.92 * (this.life / 100), (b = GAME.bonusArray[0]) && 0 > b.life)) b.parent.removeChild(b), GAME.bonusArray.splice(0, 1), GAME.bonusPool.returnObject(b)
};
GAME.Game.prototype.resize = function (a, b) {
    GAME.width = a;
    GAME.height = b;
    this.gameoverView.resize(a, b)
};
var depthSwapUpdateTransform = function () {
    PIXI.DisplayObject.prototype.updateTransform.call(this);
    this.children.sort(sortFunction);
    for (var a = 0, b = this.children.length; a < b; a++) this.children[a].updateTransform()
}, sortFunction = function (a, b) {
        return a.position.y - b.position.y
    };
GAME.TweetButton = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.div = document.getElementById("tweet");
    this.bg = PIXI.Sprite.fromImage("img/BG_col_twitter.png");
    this.addChild(this.bg);
    this.bg.anchor.x = 0.5;
    this.bg.anchor.y = 0.5;
    this.bg.scale.x = 4.9;
    this.bg.scale.y = 4.9;
    this.f = PIXI.Sprite.fromImage("img/twitter_bird.png");
    this.addChild(this.f);
    this.f.anchor.x = this.f.anchor.y = 0.5;
    this.f.position.y = -60
};
GAME.TweetButton.constructor = GAME.TweetButton;
GAME.TweetButton.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.TweetButton.prototype.updateTransform = function () {
    var a = renderer.view.getBoundingClientRect();
    this.div.style.display = this.visible ? "block" : "none";
    var b = this.worldTransform;
    this.div.style.left = b[2] / (renderer.width / a.width) - 35 + "px";
    this.div.style.top = (b[5] - 5 + 55) / (renderer.height / a.height) + "px";
    this.div.style.opacity = this.worldAlpha;
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
};
GAME.TweetButton.prototype.start = function () {};
GAME.FacebookButton = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.div = document.getElementById("facebook");
    this.bg = PIXI.Sprite.fromImage("img/BG_col_facebook.png");
    this.addChild(this.bg);
    this.f = PIXI.Sprite.fromImage("img/facebook_F.png");
    this.addChild(this.f);
    this.f.anchor.x = this.f.anchor.y = 0.5;
    this.f.position.y = -60;
    this.bg.anchor.x = 0.5;
    this.bg.anchor.y = 0.5;
    this.bg.scale.x = 4.9;
    this.bg.scale.y = 4.9
};
GAME.FacebookButton.constructor = GAME.FacebookButton;
GAME.FacebookButton.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.FacebookButton.prototype.updateTransform = function () {
    var a = renderer.view.getBoundingClientRect();
    this.div.style.display = this.visible ? "block" : "none";
    var b = this.worldTransform;
    this.div.style.left = b[2] / (renderer.width / a.width) - 35 + "px";
    this.div.style.top = (b[5] - 5 + 55) / (renderer.height / a.height) + "px";
    this.div.style.opacity = this.worldAlpha;
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
};
GAME.FacebookButton.prototype.hide = GAME.TweetButton.prototype.hide = function () {
    this.div.style.display = "none"
};
GAME = GAME || {};
GAME.GameObjectPool = function (a) {
    this.classType = a;
    this.pool = []
};
GAME.GameObjectPool.constructor = GAME.GameObjectPool;
GAME.GameObjectPool.prototype.getObject = function () {
    var a = this.pool.pop();
    a || (a = new this.classType);
    return a
};
GAME.GameObjectPool.prototype.returnObject = function () {};
GAME.Bonus = function () {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame("x2.png"));
    this.life = 100;
    this.anchor.x = 0.5;
    this.anchor.y = 1
};
GAME.Bonus.constructor = GAME.Bonus;
GAME.Bonus.prototype = Object.create(PIXI.Sprite.prototype);
GAME.bonusArray = [];
GAME.Bonus.prototype.updateTransform = function () {
    this.life -= GAME.time.DELTA_TIME;
    this.position.y -= 1 * GAME.time.DELTA_TIME;
    10 > this.life && (this.alpha = this.life / 10);
    PIXI.Sprite.prototype.updateTransform.call(this)
};
GAME.Bonus.prototype.reset = function (a) {
    this.life = 50;
    this.alpah = 1;
    this.position.x = a.x;
    this.position.y = a.y;
    this.scale.x = this.scale.y = 0;
    TweenLite.to(this.scale, 0.6, {
        x: 1,
        y: 1,
        ease: Elastic.easeOut
    })
};
GAME.bonusPool = new GAME.GameObjectPool(GAME.Bonus);
var GAME = GAME || {}, laserCount = 0;
GAME.EnemyManager = function (a) {
    this.engine = a;
    this.enemies = [];
    this.enemyPool = new GAME.GameObjectPool(GAME.Enemy);
    this.spawnCount = 0;
    this.spawnRate = 100;
    this.spawnRate2 = 300;
    this.levelCount = 0;
    this.levelUp = 480;
    this.speed = 1;
    this.ang = this.level = this.mode = 0
};
GAME.EnemyManager.constructor = GAME.EnemyManager;
GAME.EnemyManager.prototype.update = function () {
    for (var a = 0; a < this.enemies.length; a++) {
        var b = this.enemies[a];
        b.update();
        b.isDead && (gameScreen.score += 50, this.enemyPool.returnObject(b), this.enemies.splice(a, 1), a--, interactiveManager.remove(b), this.engine.gameContainer.removeChild(b), this.engine.shadowContainer.removeChild(b.shadow))
    }
    if (!this.engine.isGameover)
        if (this.levelCount++, this.levelCount > this.levelUp && (this.levelCount = 0, this.speed += 0.1, this.level++, this.spawnRate *= isMobile ? 0.7 : 0.9), 0 == this.mode) this.spawnCount +=
            GAME.time.DELTA_TIME, this.spawnCount >= this.spawnRate && (this.spawnCount = 0, 0.33333333 < Math.random() ? 0.5 < Math.random() ? this.addEnemy(-60, 310 + Math.random() * (GAME.height - 310)) : this.addEnemy(GAME.width + 60, 310 + Math.random() * (GAME.height - 310)) : this.addEnemy(Math.random() * GAME.width, GAME.height));
        else if (1 == this.mode) this.spawnCount += GAME.time.DELTA_TIME, this.spawnCount >= 0.8 * this.spawnRate && (this.spawnCount = 0, this.ang++, this.ang %= 100, b = this.ang / 100, b *= 2 * Math.PI, a = Math.sin(b - Math.PI / 2), b = Math.cos(b - Math.PI /
        2), this.addEnemy(GAME.width / 2 + a * GAME.width / 1.2, GAME.height / 2 + b * GAME.height / 1.2));
    else if (2 == this.mode && (this.spawnCount += GAME.time.DELTA_TIME, this.spawnCount >= this.spawnRate))
        for (a = this.spawnCount = 0; 10 > a; a++) this.addEnemy(Math.random() * GAME.width, GAME.height)
};
GAME.EnemyManager.prototype.addEnemy = function (a, b) {
    var c = this.enemyPool.getObject();
    c.realPosition.x = a;
    c.realPosition.y = b;
    c.elkTarget = this.engine.elk.position;
    c.speed = this.speed;
    interactiveManager.add(c);
    this.enemies.push(c);
    this.engine.gameContainer.addChild(c);
    this.engine.shadowContainer.addChild(c.shadow)
};
GAME.EnemyManager.prototype.pickup = function () {};
GAME.EnemyManager.prototype.disperce = function () {
    for (var a = 0; a < this.enemies.length; a++) this.enemies[a].pushAway()
};
GAME.EnemyManager.prototype.destroyAll = function () {
    for (var a = 0; a < this.enemies.length; a++) {
        var b = this.enemies[a];
        this.enemyPool.returnObject(b);
        this.enemies.splice(a, 1);
        a--;
        interactiveManager.remove(b);
        this.engine.gameContainer.removeChild(b);
        this.engine.shadowContainer.removeChild(b.shadow)
    }
    this.speed = 1;
    this.spawnCount = 0;
    this.spawnRate = 100;
    this.levelCount = 0;
    this.levelUp = 600;
    this.level = 0
};
var tempPoint = new PIXI.Point,
    matrix = mat3.create();
GAME.Enemy = function () {
    this.hitScale = 2;
    this.count = 0;
    this.walkingFrames = [PIXI.Texture.fromFrame("fox_walk0001.png"), PIXI.Texture.fromFrame("fox_walk0003.png"), PIXI.Texture.fromFrame("fox_walk0005.png"), PIXI.Texture.fromFrame("fox_walk0007.png")];
    this.pickedupFrames = [PIXI.Texture.fromFrame("foxHang0001.png"), PIXI.Texture.fromFrame("foxHang0002.png"), PIXI.Texture.fromFrame("foxHang0003.png"), PIXI.Texture.fromFrame("foxHang0004.png"), PIXI.Texture.fromFrame("foxHang0005.png"), PIXI.Texture.fromFrame("foxHang0006.png"),
        PIXI.Texture.fromFrame("foxHang0007.png"), PIXI.Texture.fromFrame("foxHang0008.png"), PIXI.Texture.fromFrame("foxHang0009.png"), PIXI.Texture.fromFrame("foxHang0010.png"), PIXI.Texture.fromFrame("foxHang0011.png")
    ];
    this.throwFrame = PIXI.Texture.fromFrame("fox_fly.png");
    this.eatingFrame = PIXI.Texture.fromFrame("fox_attack0001.png");
    this.flatFrame = PIXI.Texture.fromFrame("foxflat.png");
    this.pounceFrames = [PIXI.Texture.fromFrame("fox_prone0001.png"), PIXI.Texture.fromFrame("fox_prone0002.png"), PIXI.Texture.fromFrame("fox_prone0003.png"),
        PIXI.Texture.fromFrame("fox_prone0004.png"), PIXI.Texture.fromFrame("fox_prone0005.png")
    ];
    this.walkingFrames.anchor = 0.5;
    PIXI.Sprite.call(this, this.walkingFrames[0]);
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.realY = this.zSpeed = this.z = 0;
    this.dashTarget = new PIXI.Point;
    this.elkTarget;
    this.state = 2;
    this.realPosition = new PIXI.Point;
    this.speed = 1;
    this.throwSpeed = new PIXI.Point;
    this.lastPosition = new PIXI.Point;
    this.direction = new PIXI.Point;
    this.shadow = PIXI.Sprite.fromFrame("carry_shadow.png");
    this.shadow.anchor.x =
        this.shadow.anchor.y = 0.5;
    this.jumpDistance = 140 + 300 * Math.random();
    this.eatSpeed = new PIXI.Point(2, 2);
    this.interactive = !0;
    this.touchstart = this.mousedown;
    this.touchendOutside = this.mouseupOutside = this.touchend = this.mouseup
};
GAME.Enemy.constructor = GAME.Enemy;
GAME.Enemy.prototype = Object.create(PIXI.Sprite.prototype);
GAME.Enemy.prototype.update = function () {
    if (0 == this.state) {
        this.z += 0.3 * (40 - this.z);
        this.lastPosition.x = this.realPosition.x;
        this.lastPosition.y = this.realPosition.y;
        this.realPosition.x += 0.3 * (this.pointer.global.x - this.realPosition.x);
        this.realPosition.y += 0.3 * (this.pointer.global.y + 15 - this.realPosition.y + this.z);
        this.throwSpeed.x += this.realPosition.x - this.lastPosition.x - 0.3 * this.throwSpeed.x;
        this.throwSpeed.y += this.realPosition.y - this.lastPosition.y - 0.3 * this.throwSpeed.y;
        this.rotation = 0.01 * this.throwSpeed.x;
        this.count += 0.3;
        var a = this.count + 0.5 | 0;
        this.setTexture(this.pickedupFrames[a % 11])
    } else if (1 == this.state) {
        300 > this.realPosition.y ? (this.realPosition.y = 299, this.zSpeed += 0.1, this.z += -this.throwSpeed.y * GAME.time.DELTA_TIME) : (this.zSpeed += 0.2, this.realPosition.y += this.throwSpeed.y * GAME.time.DELTA_TIME);
        this.throwSpeed.y *= 0.97;
        this.zSpeed += 0.2;
        this.z -= this.zSpeed;
        this.throwSpeed.x *= 0.97;
        this.realPosition.x += this.throwSpeed.x * GAME.time.DELTA_TIME;
        0 == this.bounce ? (this.rotation = Math.atan2(this.throwSpeed.y,
            this.throwSpeed.x), -1 == this.scale.x && (this.rotation += Math.PI)) : this.rotation = 0;
        if (-60 > this.realPosition.x || this.realPosition.x > GAME.width + 60) this.isDead = !0;
        else if (-20 > this.position.y || this.position.y > GAME.height + 20) this.isDead = !0;
        if (0 > this.z && (this.z = 0, this.zSpeed *= -0.8, this.throwSpeed.x *= 0.92, this.throwSpeed.y *= 0.92, 299 == this.realPosition.y && (this.throwSpeed.y = 0, this.zSpeed *= 0.65, this.realPosition.y = 300), this.bounce++, this.setTexture(this.flatFrame), 2 < this.bounce)) {
            if (gameScreen.isGameover) return;
            this.state = 4;
            this.rotation = 0
        }
    } else if (2 == this.state) {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.direction.x = this.elkTarget.x - this.realPosition.x;
        this.direction.y = this.elkTarget.y - this.realPosition.y;
        var b = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);
        this.direction.x /= b;
        this.direction.y /= b;
        this.realPosition.x += this.direction.x * this.speed * GAME.time.DELTA_TIME;
        this.realPosition.y += this.direction.y * this.speed * GAME.time.DELTA_TIME;
        this.scale.x = 0 > this.direction.x ? -1 : 1;
        this.count +=
            0.3 * GAME.time.DELTA_TIME;
        a = this.count + 0.5 | 0;
        this.setTexture(this.walkingFrames[a % 4]);
        40 > b ? (this.state = 5, this.setTexture(this.eatingFrame)) : b < this.jumpDistance && (this.count = 0, this.state = 3, this.setTexture(this.pounceFrames[0]), this.pounceCount = 0, this.homeX = this.realPosition.x)
    } else 3 == this.state ? (this.count += 0.3 * GAME.time.DELTA_TIME, a = this.count + 0.5 | 0, 4 < a && (a = 4), this.setTexture(this.pounceFrames[a]), this.pounceCount += GAME.time.DELTA_TIME, 60 <= this.pounceCount ? (this.setTexture(this.throwFrame), this.direction.x =
        this.elkTarget.x - this.realPosition.x, this.direction.y = this.elkTarget.y - this.realPosition.y, b = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y), this.z = 50 * Math.sin(2 * ((1 - b / this.jumpDistance) * Math.PI / 2)), this.direction.x /= b, this.direction.y /= b, this.rotation = Math.atan2(this.direction.y, this.direction.x), -1 == this.scale.x && (this.rotation += Math.PI), this.realPosition.x += 6 * this.direction.x * GAME.time.DELTA_TIME, this.realPosition.y += 6 * this.direction.y * GAME.time.DELTA_TIME, 40 > b &&
        (this.state = 5, this.anchor.x = 0.5, this.anchor.y = 0.5, this.setTexture(this.eatingFrame), blood.positions.push(this.position))) : this.realPosition.x = this.homeX + 5 * Math.sin(0.5 * this.pounceCount) * this.pounceCount / 60) : 4 == this.state ? (this.throwSpeed.x *= 0.97, this.throwSpeed.y *= 0.97, this.realPosition.x += this.throwSpeed.x * GAME.time.DELTA_TIME, this.realPosition.y += this.throwSpeed.y * GAME.time.DELTA_TIME, 0.1 > this.throwSpeed.x * this.throwSpeed.x + this.throwSpeed.y * this.throwSpeed.y && (this.state = 2), this.rotation = 0) : 5 ==
        this.state && (this.rotation += 0.3, gameScreen.damage += 1);
    this.position.x = this.realPosition.x;
    this.position.y = this.realPosition.y - this.z;
    this.shadow.position.x = this.realPosition.x;
    this.shadow.position.y = this.realPosition.y;
    a = 0.8 + 0.2 * (1 - this.z / 30);
    0 > a && (a = 0);
    this.shadow.scale.x = this.shadow.scale.y = a;
    this.shadow.alpha = 0.5 * (this.z / 40);
    1 < this.shadow.alpha && (this.shadow.alpha = 1)
};
GAME.Enemy.prototype.pushAway = function () {
    if (5 == this.state) {
        var a = blood.positions.indexOf(this.position);
        blood.positions.splice(a, 1)
    }
    this.state = 1;
    this.bounce = 0;
    this.pickedup = !1;
    this.setTexture(this.throwFrame);
    this.anchor.y = this.walkingFrames.anchor;
    this.throwSpeed.x = 22 + 5 * Math.random();
    this.realPosition.x < GAME.width / 2 && (this.throwSpeed.x *= -1);
    this.throwSpeed.y = 4 * Math.random();
    this.zSpeed = -7;
    this.scale.x = 0 > this.throwSpeed.x ? -1 : 1
};
GAME.Enemy.prototype.mousedown = function (a) {
    this.pointer = a;
    this.anchor.y = 0.25;
    this.count = 0;
    3 == this.state ? (a = GAME.bonusPool.getObject(), a.reset(this.position), GAME.bonusArray.push(a), gameScreen.addChild(a), gameScreen.score += 200) : 5 == this.state && (a = blood.positions.indexOf(this.position), blood.positions.splice(a, 1));
    this.state = 0
};
GAME.Enemy.prototype.mouseup = function () {
    console.log("IP!!");
    if (3 != this.state) {
        this.state = 1;
        this.bounce = 0;
        this.pickedup = !1;
        this.setTexture(this.throwFrame);
        this.anchor.y = this.walkingFrames.anchor;
        this.throwSpeed.x = this.realPosition.x - this.lastPosition.x;
        this.throwSpeed.y = this.realPosition.y - this.lastPosition.y;
        if (300 > this.realPosition.y) {
            var a = this.realPosition.y - 300;
            this.realPosition.y = 300;
            this.z = -a
        }
        this.zSpeed = -4;
        this.scale.x = 0 > this.throwSpeed.x ? -1 : 1
    }
};
GAME = GAME || {};
laserCount = 0;
GAME.GoodyManager = function (a) {
    this.engine = a;
    this.goodies = [];
    this.goodyPool = new GAME.GameObjectPool(GAME.Goody);
    this.spawnCount = 0;
    this.spawnRate = 700;
    this.levelCount = 0;
    this.levelUp = 600
};
GAME.GoodyManager.constructor = GAME.GoodyManager;
GAME.GoodyManager.prototype.update = function () {
    for (var a = 0; a < this.goodies.length; a++) {
        var b = this.goodies[a];
        b.update();
        b.isDead && (this.goodyPool.returnObject(b), this.goodies.splice(a, 1), a--, interactiveManager.remove(b), this.engine.gameContainer.removeChild(b), this.engine.shadowContainer.removeChild(b.shadow))
    }
    this.engine.isGameover || (this.spawnCount += GAME.time.DELTA_TIME, this.spawnCount >= this.spawnRate && (this.spawnCount = 0, this.addEnemy(100 + Math.random() * GAME.width - 200, 310 + Math.random() * (GAME.height -
        310))))
};
GAME.GoodyManager.prototype.addEnemy = function (a, b) {
    var c = this.goodyPool.getObject();
    c.realPosition.x = a;
    c.realPosition.y = b;
    c.elkTarget = this.engine.elk.position;
    interactiveManager.add(c);
    this.goodies.push(c);
    this.engine.gameContainer.addChild(c);
    this.engine.shadowContainer.addChild(c.shadow)
};
GAME.GoodyManager.prototype.pickup = function () {};
GAME.GoodyManager.prototype.disperce = function () {
    for (var a = 0; a < this.goodies.length; a++) this.goodies[a].state = 6
};
GAME.GoodyManager.prototype.destroyAll = function () {
    for (var a = 0; a < this.goodies.length; a++) {
        var b = this.goodies[a];
        this.goodyPool.returnObject(b);
        this.goodies.splice(a, 1);
        a--;
        interactiveManager.remove(b);
        this.engine.gameContainer.removeChild(b);
        this.engine.shadowContainer.removeChild(b.shadow)
    }
};
tempPoint = new PIXI.Point;
matrix = mat3.create();
GAME.Goody = function () {
    this.hitScale = 2;
    this.walkingFrame = PIXI.Texture.fromFrame("heartPickup.png");
    this.pickedupFrame = PIXI.Texture.fromFrame("heartPickup.png");
    this.throwFrame = PIXI.Texture.fromFrame("heartPickup.png");
    this.eatingFrame = PIXI.Texture.fromFrame("heartPickup.png");
    this.sittingFrame = PIXI.Texture.fromFrame("heartPickup.png");
    this.pounceFrame = PIXI.Texture.fromFrame("heartPickup.png");
    this.walkingFrame.anchor = 0.5;
    this.pickedupFrame.anchor = 0.25;
    PIXI.Sprite.call(this, this.walkingFrame);
    this.anchor.x =
        0.5;
    this.anchor.y = 0.5;
    this.realY = this.zSpeed = this.z = 0;
    this.dashTarget = new PIXI.Point;
    this.elkTarget;
    this.state = 2;
    this.realPosition = new PIXI.Point;
    this.speed = 1;
    this.throwSpeed = new PIXI.Point;
    this.lastPosition = new PIXI.Point;
    this.direction = new PIXI.Point;
    this.shadow = PIXI.Sprite.fromFrame("carry_shadow.png");
    this.shadow.anchor.x = this.shadow.anchor.y = 0.5;
    this.jumpDistance = 100 + 300 * Math.random();
    this.interactive = !0;
    this.touchstart = this.mousedown;
    this.touchend = this.mouseup
};
GAME.Goody.constructor = GAME.Goody;
GAME.Goody.prototype = Object.create(PIXI.Sprite.prototype);
GAME.Goody.prototype.update = function () {
    0 == this.state ? (this.z += 0.3 * (40 - this.z), this.lastPosition.x = this.realPosition.x, this.lastPosition.y = this.realPosition.y, this.realPosition.x += 0.3 * (this.mouse.global.x - this.realPosition.x), this.realPosition.y += 0.3 * (this.mouse.global.y + 15 - this.realPosition.y + this.z), this.throwSpeed.x += this.realPosition.x - this.lastPosition.x - 0.3 * this.throwSpeed.x, this.throwSpeed.y += this.realPosition.y - this.lastPosition.y - 0.3 * this.throwSpeed.y, this.rotation = 0.01 * this.throwSpeed.x,
        this.direction.x = this.elkTarget.x - this.position.x, this.direction.y = this.elkTarget.y - 40 - this.position.y, 4900 > this.direction.x * this.direction.x + this.direction.y * this.direction.y && (gameScreen.enemyManager.disperce(), this.isDead = !0, gameScreen.life += 10, stage.addChild(explosion), 100 < gameScreen.life && (gameScreen.life = 100))) : 1 == this.state ? (300 > this.realPosition.y ? (this.realPosition.y = 299, this.zSpeed += 0.1, this.z += -this.throwSpeed.y * GAME.time.DELTA_TIME) : (this.zSpeed += 0.2, this.realPosition.y += this.throwSpeed.y *
        GAME.time.DELTA_TIME), this.throwSpeed.y *= 0.97, this.zSpeed += 0.2, this.z -= this.zSpeed, this.throwSpeed.x *= 0.97, this.realPosition.x += this.throwSpeed.x * GAME.time.DELTA_TIME, 0 != this.bounce && (this.rotation = 0), 0 > this.realPosition.x || this.realPosition.x > GAME.width ? this.isDead = !0 : 0 > this.position.y || this.position.y > GAME.height ? this.isDead = !0 : (this.direction.x = this.elkTarget.x - this.position.x, this.direction.y = this.elkTarget.y - 40 - this.position.y, 4900 > this.direction.x * this.direction.x + this.direction.y * this.direction.y &&
        (gameScreen.enemyManager.disperce(), gameScreen.life += 10, stage.addChild(explosion), 100 < gameScreen.life && (gameScreen.life = 100), this.isDead = !0)), 0 > this.z && (this.z = 0, this.zSpeed *= -0.8, this.throwSpeed.x *= 0.92, this.throwSpeed.y *= 0.92, 299 == this.realPosition.y && (this.throwSpeed.y = 0, this.zSpeed *= 0.65, this.realPosition.y = 300), this.bounce++, 2 < this.bounce && (this.state = 4, this.rotation = 0))) : 2 == this.state ? (this.z = 40, this.state = 1, this.direction.x = this.elkTarget.x - this.realPosition.x, this.direction.y = this.elkTarget.y -
        this.realPosition.y, 40 > Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y) && (this.isDead = !0)) : 3 != this.state && 4 != this.state && 5 != this.state && 6 == this.state && this.setTexture(this.sittingFrame);
    this.position.x = this.realPosition.x;
    this.position.y = this.realPosition.y - this.z;
    this.shadow.position.x = this.realPosition.x;
    this.shadow.position.y = this.realPosition.y + 30;
    var a = 0.8 + 0.2 * (1 - this.z / 30);
    0 > a && (a = 0);
    this.shadow.scale.x = this.shadow.scale.y = a;
    this.shadow.alpha = 0.5 * (this.z / 40);
    1 <
        this.shadow.alpha && (this.shadow.alpha = 1)
};
GAME.Goody.prototype.mousedown = function (a) {
    this.mouse = a;
    this.setTexture(this.pickedupFrame);
    this.state = 0
};
GAME.Goody.prototype.mouseup = function () {
    if (3 != this.state) {
        this.state = 1;
        this.bounce = 0;
        this.pickedup = !1;
        this.setTexture(this.throwFrame);
        this.throwSpeed.x = this.realPosition.x - this.lastPosition.x;
        this.throwSpeed.y = this.realPosition.y - this.lastPosition.y;
        if (300 > this.realPosition.y) {
            var a = this.realPosition.y - 300;
            this.realPosition.y = 300;
            this.z = -a
        }
        this.zSpeed = -4
    }
};
GAME = GAME || {};
GAME.Score = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.ratio = 0;
    this.interactive = !1;
    this.glyphs = {
        "0": "no0000.png",
        1: "no0001.png",
        2: "no0002.png",
        3: "no0003.png",
        4: "no0004.png",
        5: "no0005.png",
        6: "no0006.png",
        7: "no0007.png",
        8: "no0008.png",
        9: "no0009.png"
    };
    for (a in this.glyphs) this.glyphs[a] = PIXI.Texture.fromFrame(this.glyphs[a]);
    this.digits = [];
    for (var a = 0; 8 > a; a++) this.digits[a] = new PIXI.Sprite(this.glyphs[a]), this.addChild(this.digits[a]);
    this.setScore(formatScore(12345))
};
GAME.Score.constructor = PIXI.Score;
GAME.Score.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.Score.prototype.setScore = function (a) {
    a = formatScore(a).split("");
    for (var b = 0, c = 0; c < a.length; c++) {
        var d = this.digits[c];
        d.visible = !0;
        d.setTexture(this.glyphs[a[c]]);
        d.position.x = b;
        b += d.width + 10
    }
    for (c = 0; c < this.digits.length; c++) this.digits[c].position.x -= b / 2;
    for (c = a.length; c < this.digits.length; c++) this.digits[c].visible = !1
};
GAME.Score.prototype.jump = function () {
    this.ratio = 2.2
};

function formatScore(a) {
    a = a.toString().split("");
    for (var b = "", c = a.length, d = c % 3 - 1, e = 0; e < c; e++) b += a[e], 0 == (e - d) % 3 && e != c - 1 && (b += "");
    return b
}
GAME.Elk = function () {
    this.currentFrame = 0;
    this.chewingFrames = [PIXI.Texture.fromFrame("deerChew0001.png"), PIXI.Texture.fromFrame("deerChew0002.png"), PIXI.Texture.fromFrame("deerChew0003.png"), PIXI.Texture.fromFrame("deerChew0004.png"), PIXI.Texture.fromFrame("deerChew0005.png"), PIXI.Texture.fromFrame("deerChew0006.png"), PIXI.Texture.fromFrame("deerChew0007.png")];
    this.lookingFrames = [PIXI.Texture.fromFrame("deer0001.png"), PIXI.Texture.fromFrame("deer0002.png"), PIXI.Texture.fromFrame("deer0003.png"), PIXI.Texture.fromFrame("deer0004.png"),
        PIXI.Texture.fromFrame("deer0004.png"), PIXI.Texture.fromFrame("deer0004.png"), PIXI.Texture.fromFrame("deer0004.png"), PIXI.Texture.fromFrame("deer0004.png"), PIXI.Texture.fromFrame("deer0004.png"), PIXI.Texture.fromFrame("deer0004.png"), PIXI.Texture.fromFrame("deer0004.png"), PIXI.Texture.fromFrame("deer0004.png"), PIXI.Texture.fromFrame("deer0004.png"), PIXI.Texture.fromFrame("deer0003.png"), PIXI.Texture.fromFrame("deer0002.png"), PIXI.Texture.fromFrame("deer0001.png"), PIXI.Texture.fromFrame("deerChew0001.png"),
        PIXI.Texture.fromFrame("deerChew0002.png"), PIXI.Texture.fromFrame("deerChew0003.png"), PIXI.Texture.fromFrame("deerChew0004.png"), PIXI.Texture.fromFrame("deerChew0005.png"), PIXI.Texture.fromFrame("deerChew0006.png"), PIXI.Texture.fromFrame("deerChew0007.png")
    ];
    this.deadFrames = [PIXI.Texture.fromFrame("deerDie0002.png"), PIXI.Texture.fromFrame("deerDie0003.png"), PIXI.Texture.fromFrame("deerDie0004.png"), PIXI.Texture.fromFrame("deerDie0005.png"), PIXI.Texture.fromFrame("deerDie0006.png"), PIXI.Texture.fromFrame("deerDie0007.png"),
        PIXI.Texture.fromFrame("deerDie0008.png"), PIXI.Texture.fromFrame("deerDie0009.png"), PIXI.Texture.fromFrame("deerDie0010.png"), PIXI.Texture.fromFrame("deerDie0011.png"), PIXI.Texture.fromFrame("deerDie0012.png"), PIXI.Texture.fromFrame("deerDie0013.png"), PIXI.Texture.fromFrame("deerDie0014.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"),
        PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"),
        PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png"), PIXI.Texture.fromFrame("deerDie0015.png")
    ];
    this.reviveFrames = [PIXI.Texture.fromFrame("deerDie0011.png"), PIXI.Texture.fromFrame("deerDie0011.png"), PIXI.Texture.fromFrame("deerDie0011.png"), PIXI.Texture.fromFrame("deerDie0011.png"), PIXI.Texture.fromFrame("deerDie0011.png"), PIXI.Texture.fromFrame("deerDie0011.png"), PIXI.Texture.fromFrame("deerDie0011.png"),
        PIXI.Texture.fromFrame("deerDie0010.png"), PIXI.Texture.fromFrame("deerDie0009.png"), PIXI.Texture.fromFrame("deerDie0008.png"), PIXI.Texture.fromFrame("deerDie0007.png"), PIXI.Texture.fromFrame("deerDie0006.png"), PIXI.Texture.fromFrame("deerDie0005.png"), PIXI.Texture.fromFrame("deerDie0004.png"), PIXI.Texture.fromFrame("deerDie0003.png"), PIXI.Texture.fromFrame("deerDie0002.png"), PIXI.Texture.fromFrame("deerChew0001.png")
    ];
    this.currentFrames = this.lookingFrames;
    this.isLooking = !1;
    PIXI.Sprite.call(this, this.chewingFrames[0]);
    this.anchor.x = 0.5;
    this.anchor.y = 0.7;
    this.count = 0
};
GAME.Elk.constructor = GAME.Elk;
GAME.Elk.prototype = Object.create(PIXI.Sprite.prototype);
GAME.Elk.prototype.update = function () {
    this.isDead ? (this.currentFrame += 0.2 * GAME.time.DELTA_TIME, this.isReviving ? this.currentFrame > this.currentFrames.length - 1 && (this.currentFrame = this.currentFrames.length - 1) : this.currentFrame > this.currentFrames.length - 1 && (this.currentFrame = this.currentFrames.length - 5 - 21)) : (this.currentFrame += 0.3 * GAME.time.DELTA_TIME, this.count += GAME.time.DELTA_TIME, 500 < this.count && (this.currentFrame = this.count = 0, this.currentFrames = this.lookingFrames), this.currentFrame > this.currentFrames.length -
        1 && (this.currentFrame = this.currentFrames.length - 1));
    this.setTexture(this.currentFrames[this.currentFrame + 0.5 | 0])
};
GAME.Elk.prototype.die = function () {
    this.currentFrame = 0;
    this.isDead = !0;
    this.currentFrames = this.deadFrames
};
GAME.Elk.prototype.revive = function () {
    this.currentFrame = 0;
    this.isReviving = !0;
    this.currentFrames = this.reviveFrames
};
GAME.Elk.prototype.reset = function () {
    this.currentFrame = 0;
    this.isDead = this.isReviving = !1;
    this.currentFrames = this.lookingFrames
};
GAME.Hand = function () {
    this.currentFrame = 0;
    this.frames = [PIXI.Texture.fromFrame("creatorHand0001.png"), PIXI.Texture.fromFrame("creatorHand0002.png"), PIXI.Texture.fromFrame("creatorHand0003.png"), PIXI.Texture.fromFrame("creatorHand0004.png"), PIXI.Texture.fromFrame("creatorHand0005.png")];
    PIXI.Sprite.call(this, this.frames[0]);
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.animating = !1
};
GAME.Hand.constructor = GAME.Hand;
GAME.Hand.prototype = Object.create(PIXI.Sprite.prototype);
GAME.Hand.prototype.tap = function () {
    this.animating = !1;
    this.currentFrame = 0;
    this.setTexture(this.frames[0]);
    this.rotation = Math.PI / 2;
    TweenLite.to(this, 0.5, {
        rotation: 0
    });
    this.position.x = GAME.width / 2 + 100;
    this.position.y = GAME.height + 500;
    TweenLite.to(this.position, 0.5, {
        y: GAME.height,
        onComplete: $.proxy(this.onIn, this)
    })
};
GAME.Hand.prototype.onIn = function () {
    this.animating = !0
};
GAME.Hand.prototype.update = function () {
    this.animating && (this.currentFrame += 0.2, this.count++, this.currentFrame > this.frames.length - 1 && (this.currentFrame = this.frames.length - 1, this.animating = !1, this.onComplete()), this.setTexture(this.frames[(this.currentFrame + 0.5 | 0) % 5]))
};
GAME.BloodSpray = function (a) {
    this.stage = a;
    this.target = new PIXI.Point;
    this.particals = [];
    this.particalPool = new GAME.GameObjectPool(Partical);
    this.max = 100;
    this.posIndex = this.count = 0;
    this.positions = [];
    GAME.BloodTextures = [PIXI.Texture.fromFrame("bloodSplash0001.png"), PIXI.Texture.fromFrame("bloodSplash0002.png"), PIXI.Texture.fromFrame("bloodSplash0003.png"), PIXI.Texture.fromFrame("bloodSplash0004.png"), PIXI.Texture.fromFrame("bloodSplash0005.png"), PIXI.Texture.fromFrame("bloodSplash0006.png"), PIXI.Texture.fromFrame("bloodSplash0007.png"),
        PIXI.Texture.fromFrame("bloodSplash0008.png"), PIXI.Texture.fromFrame("bloodSplash0009.png"), PIXI.Texture.fromFrame("bloodSplash0010.png"), PIXI.Texture.fromFrame("bloodSplash0011.png"), PIXI.Texture.fromFrame("bloodSplash0012.png"), PIXI.Texture.fromFrame("bloodSplash0013.png"), PIXI.Texture.fromFrame("bloodSplash0014.png"), PIXI.Texture.fromFrame("bloodSplash0015.png")
    ]
};
GAME.BloodSpray.constructor = GAME.BloodSpray;
GAME.BloodSpray.prototype.update = function () {
    this.count++;
    if (this.count % 3 && 0 < this.positions.length) {
        var a = this.particalPool.getObject();
        this.stage.addChild(a);
        this.particals.push(a);
        a.count = 0;
        a.speed.x = 6 * (Math.random() - 0.5);
        a.speed.y = 7 * -Math.random();
        var b = this.positions[this.posIndex % this.positions.length];
        this.posIndex++;
        a.position.x = b.x - this.stage.position.x;
        a.position.y = b.y - this.stage.position.y
    }
    for (b = 0; b < this.particals.length; b++) {
        a = this.particals[b];
        a.position.x += a.speed.x;
        a.position.y += a.speed.y;
        a.speed.y += 0.3;
        a.speed.x *= 0.99;
        a.count += 0.5 * GAME.time.DELTA_TIME;
        var c = a.count + 0.5 | 0;
        14 < c && (c = 14, this.stage.removeChild(a), this.particals.splice(b, 1), this.particalPool.returnObject(a), b--);
        a.setTexture(GAME.BloodTextures[c])
    }
};
GAME.BloodSpray.prototype.reset = function () {
    this.positions = []
};
Partical = function () {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame("bloodSplat.png"));
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.count = 0;
    this.speed = new PIXI.Point
};
Partical.constructor = Partical;
Partical.prototype = Object.create(PIXI.Sprite.prototype);
var reviveHand = {
    mc4: {
        view: "yellowSpot",
        depth: 0,
        startFrame: 12,
        endFrame: 20,
        position: [-33, 65, -45.55, 52.45, -58.1, 39.85, -70.7, 27.3, -83.3, 14.7, -95.85, 2.1, -108.4, -10.45, -121, -23],
        scale: [0.2960052490234375, 0.2960052490234375, 0.396575927734375, 0.396575927734375, 0.4971466064453125, 0.4971466064453125, 0.59771728515625, 0.59771728515625, 0.6982879638671875, 0.6982879638671875, 0.798858642578125, 0.798858642578125, 0.8994293212890625, 0.8994293212890625, 1, 1]
    },
    mc5: {
        view: "yellowRing",
        depth: 0,
        startFrame: 20,
        endFrame: 26,
        position: [-121, -23, -128.6, -30.6, -136.2, -38.2, -143.8, -45.8, -151.4, -53.4, -159, -61],
        scale: [1, 1, 1.0608062744140625, 1.0608062744140625, 1.1215972900390625, 1.1215972900390625, 1.182403564453125, 1.182403564453125, 1.243194580078125, 1.243194580078125, 1.3040008544921875, 1.3040008544921875],
        alpha: [1, 0.80078125, 0.6015625, 0.3984375, 0.19921875, 0]
    },
    mc6: {
        view: "yellowLine",
        depth: 1,
        startFrame: 20,
        endFrame: 26,
        position: [99.45, 89.95, 160.65, 89.95, 208.25, 89.95, 242.25, 89.95, 262.65, 89.95, 269.45, 89.95],
        alpha: [1, 0.640625, 0.359375, 0.16015625,
            0.0390625, 0
        ]
    },
    mc7: {
        view: "yellowLine",
        depth: 2,
        startFrame: 20,
        endFrame: 26,
        position: [-95.6, 73.25, -157.1, 50.35, -204.95, 32.6, -239.15, 19.95, -259.65, 12.4, -266.55, 10],
        scale: [0.9999661557469983, 0.9999661557469983, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9999661557469983, 0.9999661557469983],
        alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0],
        rotation: [-160.5423583984375, -160.67694091796875, -160.67694091796875, -160.67694091796875, -160.67694091796875, -160.5423583984375]
    },
    mc8: {
        view: "pinkSpot",
        depth: 3,
        startFrame: 20,
        endFrame: 28,
        position: [-39, 63, -51, 51, -63, 39.05, -75, 27, -87, 15, -99, 3, -111, -8.95, -123, -21],
        scale: [0.3280029296875, 0.3280029296875, 0.4239959716796875, 0.4239959716796875, 0.5200042724609375, 0.5200042724609375, 0.615997314453125, 0.615997314453125, 0.712005615234375, 0.712005615234375, 0.8079986572265625, 0.8079986572265625, 0.9040069580078125, 0.9040069580078125, 1, 1]
    },
    mc9: {
        view: "pinkRing",
        depth: 0,
        startFrame: 28,
        endFrame: 34,
        position: [-121, -23, -130.8, -32.8, -140.6, -42.6, -150.4, -52.4, -160.2, -62.2, -170, -72],
        scale: [1, 1, 1.078399658203125, 1.078399658203125, 1.1567840576171875, 1.1567840576171875, 1.2351837158203125, 1.2351837158203125, 1.313568115234375, 1.313568115234375, 1.3919677734375, 1.3919677734375],
        alpha: [1, 0.80078125, 0.6015625, 0.3984375, 0.19921875, 0]
    },
    mc10: {
        view: "pinkLine",
        depth: 1,
        startFrame: 28,
        endFrame: 34,
        position: [47.2, 11.6, 84.1, -49.2, 112.7, -96.5, 133.1, -130.3, 145.3, -150.6, 149.2, -157.4],
        scale: [0.9999888884450443,
            0.9999888884450443, 0.9985671941798615, 0.9985804272394746, 0.9985671941798615, 0.9985804272394746, 0.9985671941798615, 0.9985804272394746, 0.9985671941798615, 0.9985804272394746, 0.9999888884450443, 0.9999888884450443
        ],
        alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0],
        rotation: [-59.99946594238281, -60.13932800292969, -60.13932800292969, -60.13932800292969, -60.13932800292969, -59.99946594238281]
    },
    mc11: {
        view: "pinkLine",
        depth: 2,
        startFrame: 28,
        endFrame: 34,
        position: [-92.1, 136.6, -132.45, 147.05, -163.85, 155.15, -186.25,
            160.95, -199.65, 164.45, -204.1, 165.6
        ],
        scale: [0.9999571754740653, 0.9999571754740653, 0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9999571754740653, 0.9999571754740653],
        alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0],
        rotation: [164.99945068359375, 164.98558044433594, 164.98558044433594, 164.98558044433594, 164.98558044433594, 164.99945068359375]
    },
    mc12: {
        view: "turqSpot",
        depth: 3,
        startFrame: 28,
        endFrame: 36,
        position: [-33, 65, -45.55, 52.45, -58.1, 39.85, -70.7, 27.3, -83.3, 14.7, -95.85, 2.1, -108.4, -10.45, -121, -23],
        scale: [0.2960052490234375, 0.2960052490234375, 0.396575927734375, 0.396575927734375, 0.4971466064453125, 0.4971466064453125, 0.59771728515625, 0.59771728515625, 0.6982879638671875, 0.6982879638671875, 0.798858642578125, 0.798858642578125, 0.8994293212890625, 0.8994293212890625, 1, 1]
    },
    mc14: {
        view: "turqRing",
        depth: 0,
        startFrame: 36,
        endFrame: 42,
        position: [-121, -23, -130.8, -32.8, -140.6, -42.6, -150.4, -52.4, -160.2, -62.2, -170, -72],
        scale: [1, 1, 1.078399658203125, 1.078399658203125, 1.1567840576171875, 1.1567840576171875, 1.2351837158203125, 1.2351837158203125, 1.313568115234375, 1.313568115234375, 1.3919677734375, 1.3919677734375],
        alpha: [1, 0.80078125, 0.6015625, 0.3984375, 0.19921875, 0]
    },
    mc15: {
        view: "turqLine",
        depth: 1,
        startFrame: 36,
        endFrame: 42,
        position: [93.2, 147.05, 134.55, 171.7, 166.75, 190.7, 189.75, 204.3, 203.55, 212.5, 208.2, 215.05],
        scale: [0.9999944736329873, 0.9999944736329873, 0.9985728302216509, 0.9985728302216509, 0.9985728302216509, 0.9985728302216509,
            0.9985728302216509, 0.9985728302216509, 0.9985728302216509, 0.9985728302216509, 0.9999944736329873, 0.9999944736329873
        ],
        alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0],
        rotation: [29.999221801757812, 29.859344482421875, 29.859344482421875, 29.859344482421875, 29.859344482421875, 29.999221801757812]
    },
    mc16: {
        view: "turqLine",
        depth: 2,
        startFrame: 36,
        endFrame: 42,
        position: [-75.8, 41.25, -125.1, -7.8, -163.5, -45.8, -190.9, -72.95, -207.3, -89.25, -212.8, -94.55],
        scale: [1.0000010789366207, 1.0000010789366207, 0.9983192492564951,
            0.9983192492564951, 0.9983192492564951, 0.9983192492564951, 0.9983192492564951, 0.9983192492564951, 0.9983192492564951, 0.9983192492564951, 1.0000010789366207, 1.0000010789366207
        ],
        alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0],
        rotation: [-135.00131225585938, -135.09410095214844, -135.09410095214844, -135.09410095214844, -135.09410095214844, -135.00131225585938]
    },
    mc0: {
        view: "creatorHand0001",
        depth: 0,
        startFrame: 0,
        endFrame: 7,
        position: [90.65, 244, 48, 215.35, 6.5, 188.5, -34.5, 163.8, -74.55, 141.1, -113.75, 120.45, -151, 101],
        scale: [0.9999944736329873, 0.9999944736329873, 0.9987509594545362, 0.9987509594545362, 0.9989419190250672, 0.9989419190250672, 0.9991846473079278, 0.9991846473079278, 0.9994249508871986, 0.9994249508871986, 0.9997254645323269, 0.9997254645323269, 1, 1],
        rotation: [29.999221801757812, 24.845443725585938, 19.834503173828125, 14.82421875, 9.818649291992188, 4.812835693359375, 0]
    },
    mc1: {
        view: "creatorHand0002",
        depth: 0,
        startFrame: 7,
        endFrame: 8,
        position: [-199, 95]
    },
    mc2: {
        view: "creatorHand0003",
        depth: 0,
        startFrame: 8,
        endFrame: 9,
        position: [-126,
            123.95
        ]
    },
    mc3: {
        view: "creatorHand0004",
        depth: 0,
        startFrame: 9,
        endFrame: 34,
        position: [-90, 30, -90, 18.9, -90, 12.2, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 10, -90, 12.4, -90, 19.6, -90, 29.7, -90, 39.75, -90, 49.85, -90, 59.9, -90, 70]
    },
    mc13: {
        view: "creatorHand0005",
        depth: 1,
        startFrame: 34,
        endFrame: 41,
        position: [-89, 35, -89, 73.35, -89, 111.65, -89, 150, -89, 188.35, -89, 226.65, -89, 265]
    }
}, boomMap = {
        mc0: {
            view: "yellowSpot",
            depth: 0,
            startFrame: 0,
            endFrame: 8,
            position: [-33, 65, -45.55,
                52.45, -58.1, 39.85, -70.7, 27.3, -83.3, 14.7, -95.85, 2.1, -108.4, -10.45, -121, -23
            ],
            scale: [0.2960052490234375, 0.2960052490234375, 0.396575927734375, 0.396575927734375, 0.4971466064453125, 0.4971466064453125, 0.59771728515625, 0.59771728515625, 0.6982879638671875, 0.6982879638671875, 0.798858642578125, 0.798858642578125, 0.8994293212890625, 0.8994293212890625, 1, 1]
        },
        mc1: {
            view: "yellowRing",
            depth: 0,
            startFrame: 8,
            endFrame: 14,
            position: [-121, -23, -128.6, -30.6, -136.2, -38.2, -143.8, -45.8, -151.4, -53.4, -159, -61],
            scale: [1, 1, 1.0608062744140625,
                1.0608062744140625, 1.1215972900390625, 1.1215972900390625, 1.182403564453125, 1.182403564453125, 1.243194580078125, 1.243194580078125, 1.3040008544921875, 1.3040008544921875
            ],
            alpha: [1, 0.80078125, 0.6015625, 0.3984375, 0.19921875, 0]
        },
        mc2: {
            view: "yellowLine",
            depth: 1,
            startFrame: 8,
            endFrame: 14,
            position: [99.45, 89.95, 160.65, 89.95, 208.25, 89.95, 242.25, 89.95, 262.65, 89.95, 269.45, 89.95],
            alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0]
        },
        mc3: {
            view: "yellowLine",
            depth: 2,
            startFrame: 8,
            endFrame: 14,
            position: [-95.6, 73.25, -157.1,
                50.35, -204.95, 32.6, -239.15, 19.95, -259.65, 12.4, -266.55, 10
            ],
            scale: [0.9999661557469983, 0.9999661557469983, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9989474140393945, 0.9999661557469983, 0.9999661557469983],
            alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0],
            rotation: [-160.5423583984375, -160.67694091796875, -160.67694091796875, -160.67694091796875, -160.67694091796875, -160.5423583984375]
        },
        mc4: {
            view: "pinkSpot",
            depth: 3,
            startFrame: 8,
            endFrame: 16,
            position: [-39, 63, -51, 51, -63, 39.05, -75, 27, -87, 15, -99, 3, -111, -8.95, -123, -21],
            scale: [0.3280029296875, 0.3280029296875, 0.4239959716796875, 0.4239959716796875, 0.5200042724609375, 0.5200042724609375, 0.615997314453125, 0.615997314453125, 0.712005615234375, 0.712005615234375, 0.8079986572265625, 0.8079986572265625, 0.9040069580078125, 0.9040069580078125, 1, 1]
        },
        mc5: {
            view: "pinkRing",
            depth: 0,
            startFrame: 28,
            endFrame: 34,
            position: [-121, -23, -130.8, -32.8, -140.6, -42.6, -150.4, -52.4, -160.2, -62.2, -170, -72],
            scale: [1, 1, 1.078399658203125, 1.078399658203125, 1.1567840576171875, 1.1567840576171875, 1.2351837158203125, 1.2351837158203125, 1.313568115234375, 1.313568115234375, 1.3919677734375, 1.3919677734375],
            alpha: [1, 0.80078125, 0.6015625, 0.3984375, 0.19921875, 0]
        },
        mc6: {
            view: "pinkLine",
            depth: 1,
            startFrame: 28,
            endFrame: 34,
            position: [47.2, 11.6, 84.1, -49.2, 112.7, -96.5, 133.1, -130.3, 145.3, -150.6, 149.2, -157.4],
            scale: [0.9999888884450443, 0.9999888884450443, 0.9985671941798615, 0.9985804272394746, 0.9985671941798615, 0.9985804272394746,
                0.9985671941798615, 0.9985804272394746, 0.9985671941798615, 0.9985804272394746, 0.9999888884450443, 0.9999888884450443
            ],
            alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0],
            rotation: [-59.99946594238281, -60.13932800292969, -60.13932800292969, -60.13932800292969, -60.13932800292969, -59.99946594238281]
        },
        mc7: {
            view: "pinkLine",
            depth: 2,
            startFrame: 28,
            endFrame: 34,
            position: [-92.1, 136.6, -132.45, 147.05, -163.85, 155.15, -186.25, 160.95, -199.65, 164.45, -204.1, 165.6],
            scale: [0.9999571754740653, 0.9999571754740653, 0.9991170886127896,
                0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9991170886127896, 0.9999571754740653, 0.9999571754740653
            ],
            alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0],
            rotation: [164.99945068359375, 164.98558044433594, 164.98558044433594, 164.98558044433594, 164.98558044433594, 164.99945068359375]
        },
        mc8: {
            view: "turqSpot",
            depth: 3,
            startFrame: 28,
            endFrame: 36,
            position: [-33, 65, -45.55, 52.45, -58.1, 39.85, -70.7, 27.3, -83.3, 14.7, -95.85, 2.1, -108.4, -10.45, -121, -23],
            scale: [0.2960052490234375, 0.2960052490234375, 0.396575927734375, 0.396575927734375, 0.4971466064453125, 0.4971466064453125, 0.59771728515625, 0.59771728515625, 0.6982879638671875, 0.6982879638671875, 0.798858642578125, 0.798858642578125, 0.8994293212890625, 0.8994293212890625, 1, 1]
        },
        mc9: {
            view: "turqRing",
            depth: 0,
            startFrame: 36,
            endFrame: 42,
            position: [-121, -23, -130.8, -32.8, -140.6, -42.6, -150.4, -52.4, -160.2, -62.2, -170, -72],
            scale: [1, 1, 1.078399658203125, 1.078399658203125, 1.1567840576171875, 1.1567840576171875, 1.2351837158203125,
                1.2351837158203125, 1.313568115234375, 1.313568115234375, 1.3919677734375, 1.3919677734375
            ],
            alpha: [1, 0.80078125, 0.6015625, 0.3984375, 0.19921875, 0]
        },
        mc10: {
            view: "turqLine",
            depth: 1,
            startFrame: 36,
            endFrame: 42,
            position: [93.2, 147.05, 134.55, 171.7, 166.75, 190.7, 189.75, 204.3, 203.55, 212.5, 208.2, 215.05],
            scale: [0.9999944736329873, 0.9999944736329873, 0.9985728302216509, 0.9985728302216509, 0.9985728302216509, 0.9985728302216509, 0.9985728302216509, 0.9985728302216509, 0.9985728302216509, 0.9985728302216509, 0.9999944736329873,
                0.9999944736329873
            ],
            alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0],
            rotation: [29.999221801757812, 29.859344482421875, 29.859344482421875, 29.859344482421875, 29.859344482421875, 29.999221801757812]
        },
        mc11: {
            view: "turqLine",
            depth: 2,
            startFrame: 36,
            endFrame: 42,
            position: [-75.8, 41.25, -125.1, -7.8, -163.5, -45.8, -190.9, -72.95, -207.3, -89.25, -212.8, -94.55],
            scale: [1.0000010789366207, 1.0000010789366207, 0.9983192492564951, 0.9983192492564951, 0.9983192492564951, 0.9983192492564951, 0.9983192492564951, 0.9983192492564951,
                0.9983192492564951, 0.9983192492564951, 1.0000010789366207, 1.0000010789366207
            ],
            alpha: [1, 0.640625, 0.359375, 0.16015625, 0.0390625, 0],
            rotation: [-135.00131225585938, -135.09410095214844, -135.09410095214844, -135.09410095214844, -135.09410095214844, -135.00131225585938]
        }
    };
GAME.ExplosionAnimation = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.sprites = [];
    console.log("?");
    for (var a in reviveHand) {
        var b = reviveHand[a],
            c = PIXI.Sprite.fromFrame(b.view + ".png");
        this.addChild(c);
        b.sprite = c;
        c.visible = !1
    }
    this.currentFrame = 0
};
GAME.ExplosionAnimation.constructor = GAME.ExplosionAnimation;
GAME.ExplosionAnimation.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.ExplosionAnimation.prototype.updateTransform = function () {
    this.currentFrame += 0.5 * GAME.time.DELTA_TIME;
    if (45 <= this.currentFrame) this.currentFrame = 0, this.parent.removeChild(this);
    else {
        var a = this.currentFrame,
            a = Math.round(a),
            b;
        for (b in reviveHand) {
            var c = reviveHand[b];
            if (a >= c.startFrame && a < c.endFrame) {
                c.sprite.visible = !0;
                var d = a - c.startFrame,
                    e = Math.floor(d),
                    g = Math.round(d),
                    d = d - e,
                    f = c.position[2 * e + 1];
                c.sprite.position.x = c.position[2 * e];
                c.sprite.position.y = f;
                var h = f = 1;
                c.scale && (f = c.scale[2 * e], f += (c.scale[2 *
                    g] - f) * d, h = c.scale[2 * e + 1], h += (c.scale[2 * g + 1] - h) * d);
                c.sprite.scale.x = f;
                c.sprite.scale.y = h;
                f = 1;
                c.alpha && (f = c.alpha[e], f += (c.alpha[g] - f) * d);
                c.sprite.alpha = f;
                c.rotation && (e = c.rotation[e], interRotation = e + (c.rotation[g] - e) * d, c.sprite.rotation = interRotation * (Math.PI / 180))
            } else c.sprite.visible = !1
        }
        PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
    }
};
GAME.ExplosionAnimationNoHand = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.sprites = [];
    console.log("?");
    for (var a in boomMap) {
        var b = boomMap[a],
            c = PIXI.Sprite.fromFrame(b.view + ".png");
        this.addChild(c);
        b.sprite = c;
        c.visible = !1
    }
    this.currentFrame = 0
};
GAME.ExplosionAnimationNoHand.constructor = GAME.ExplosionAnimationNoHand;
GAME.ExplosionAnimationNoHand.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.ExplosionAnimationNoHand.prototype.updateTransform = function () {
    this.currentFrame += 0.5 * GAME.time.DELTA_TIME;
    if (10 <= this.currentFrame) this.currentFrame = 0, this.parent.removeChild(this);
    else {
        var a = this.currentFrame,
            a = Math.round(a),
            b;
        for (b in boomMap) {
            var c = boomMap[b];
            if (a >= c.startFrame && a < c.endFrame) {
                c.sprite.visible = !0;
                var d = a - c.startFrame,
                    e = Math.floor(d),
                    g = Math.round(d),
                    d = d - e,
                    f = c.position[2 * e + 1];
                c.sprite.position.x = c.position[2 * e];
                c.sprite.position.y = f;
                var h = f = 1;
                c.scale && (f = c.scale[2 * e], f += (c.scale[2 *
                    g] - f) * d, h = c.scale[2 * e + 1], h += (c.scale[2 * g + 1] - h) * d);
                c.sprite.scale.x = f;
                c.sprite.scale.y = h;
                f = 1;
                c.alpha && (f = c.alpha[e], f += (c.alpha[g] - f) * d);
                c.sprite.alpha = f;
                c.rotation && (e = c.rotation[e], interRotation = e + (c.rotation[g] - e) * d, c.sprite.rotation = interRotation * (Math.PI / 180))
            } else c.sprite.visible = !1
        }
        PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
    }
};
GAME.TransitionAnimation = function () {
    PIXI.DisplayObjectContainer.call(this);
    this.halfSprite = PIXI.Sprite.fromImage("img/BG_col_01.png");
    this.halfSprite.skew = -0.2;
    this.halfSprite.scale.x = 5;
    this.halfSprite.scale.y = GAME.height / 50;
    this.halfSprite.alpha = 0.5;
    this.halfSprite.position.y = GAME.height / 2;
    this.halfSprite.anchor.y = 0.5;
    this.sprite = PIXI.Sprite.fromImage("img/BG_col_01.png");
    this.sprite.skew = -0.2;
    this.sprite.scale.x = (GAME.width + 200) / 50;
    this.sprite.scale.y = GAME.height / 50;
    this.sprite.position.x = 200;
    this.sprite.position.y =
        GAME.height / 2;
    this.sprite.anchor.y = 0.5;
    this.halfSprite.updateTransform = GAME.TransitionAnimation.skewTransform;
    this.sprite.updateTransform = GAME.TransitionAnimation.skewTransform;
    this.addChild(this.halfSprite);
    this.addChild(this.sprite);
    this.visible = !1
};
GAME.TransitionAnimation.skewTransform = function () {
    this.localTransform[0] = this.scale.x;
    this.localTransform[1] = Math.tan(this.skew) * this.scale.y;
    this.localTransform[3] = 0;
    this.localTransform[4] = this.scale.y;
    this.localTransform[2] = this.position.x;
    this.localTransform[5] = this.position.y;
    mat3.multiply(this.localTransform, this.parent.worldTransform, this.worldTransform);
    this.worldAlpha = this.alpha * this.parent.worldAlpha
};
GAME.TransitionAnimation.constructor = GAME.TransitionAnimation;
GAME.TransitionAnimation.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.TransitionAnimation.prototype.start = function (a) {
    this.color = a;
    this.sprite.alpha = 1;
    this.sprite.setTexture(PIXI.Texture.fromImage(backgroundColorsName2[a]));
    this.halfSprite.setTexture(PIXI.Texture.fromImage(backgroundColorsName2[a]));
    this.sprite.position.x = GAME.width + 60;
    this.halfSprite.position.x = GAME.width + 60;
    this.halfSprite.visible = !0;
    TweenLite.to(this.halfSprite.position, 2, {
        x: -100,
        ease: Sine.easeInOut
    });
    TweenLite.to(this.sprite.position, 2, {
        x: -100,
        delay: 0.23,
        ease: Sine.easeInOut,
        onComplete: this.onCovered.bind(this)
    });
    this.visible = !0
};
GAME.TransitionAnimation.prototype.onCovered = function () {
    stage.setBackgroundColor(backgroundColors[this.color]);
    this.halfSprite.visible = !1;
    TweenLite.to(this.sprite, 0.5, {
        alpha: 0,
        ease: Sine.easeInOut,
        onComplete: this.onTransitionComplete.bind(this)
    });
    if (this.onComplete) this.onComplete()
};
GAME.TransitionAnimation.prototype.onTransitionComplete = function () {
    this.visible = !1;
    if (this.onCompleteReal) this.onCompleteReal()
};
GAME.Highscores = function () {};
GAME.Highscores.constructor = GAME.Highscores;
GAME.Highscores.prototype.show = function () {
    var a = this;
    FB.getLoginStatus(function (b) {
        "connected" === b.status ? (console.log("ALREADY LOGGED IN!"), a.submitScore()) : (console.log("NOT LOGGED IN.. "), FB.login(a.onLoginResponce.bind(a), {
            scope: "publish_actions"
        }))
    })
};
GAME.Highscores.prototype.onLoginResponce = function (a) {
    a.authResponse ? this.submitScore() : console.log("No login...")
};
GAME.Highscores.prototype.submitScore = function () {
    var a = {};
    a.score = gameScreen.score;
    a.client_id = "309422069185539";
    a.client_secret = "f5b00c326a69e7680fd59f3479cf8f7e";
    FB.api("/" + FB.getUserID() + "/scores?limit\x3d5", "post", a, this.onScoreSubmitted.bind(this))
};
GAME.Highscores.prototype.onScoreSubmitted = function (a) {
    console.log("SCORE SUBMITTED: " + a);
    FB.api("/309422069185539/scores", this.onScoresRecieved.bind(this))
};
GAME.Highscores.prototype.onScoresRecieved = function (a) {
    var b = $(window).width(),
        c = $(window).height(),
        d = 536 * b / GAME.width;
    if (!this.container) {
        this.container = document.createElement("div");
        this.container.className = "scoreContainer";
        this.container.style["-webkit-transform-origin"] = "50% 0%";
        this.container.style["transform-origin"] = "50% 0%";
        var e = new Image;
        e.src = "img/highScores.png";
        e.className = "highscoreTitle";
        this.container.appendChild(e);
        this.closeButton = new Image;
        this.closeButton.src = "img/close.png";
        this.closeButton.className =
            "closeButton";
        this.closeButton.style.left = b / 2 + d / 2 - 72 + "px";
        this.closeButton.onclick = this.closeButton.onTap = this.onClosePressed.bind(this);
        this.closeButton.addEventListener("touchstart", this.onClosePressed.bind(this), !0)
    }
    a = a.data;
    this.container.innerHTML = "";
    this.container.style.width = d + "px";
    this.container.style.height = c + "px";
    this.container.style.left = b / 2 - d / 2 + "px";
    for (b = 0; b < a.length; b++) c = a[b], d = document.createElement("div"), d.className = "userContainer", d.innerHTML = "\x3cimage src\x3d'http://graph.facebook.com/" +
        c.user.id + "/picture?height\x3d160\x26width\x3d160' class\x3d'scoreThumb'\x3e\x3cdiv class\x3d'copyContainer'\x3e\x3cdiv class\x3d'positionCopy'\x3e#" + (b + 1) + "\x3c/div\x3e\x3cdiv class\x3d'scoreCopy'\x3e" + c.score + "\x3c/div\x3e\x3cdiv class\x3d'nameCopy'\x3e" + c.user.name + "\x3c/div\x3e\x3c/div\x3e", this.container.appendChild(d);
    document.body.appendChild(this.closeButton);
    document.body.appendChild(this.container);
    doRender = !1;
    this.resize()
};
GAME.Highscores.prototype.resize = function () {
    if (this.container) {
        var a = $(window).width(),
            b = $(window).height(),
            c = 536 * a / GAME.width;
        if (550 > c) {
            var d = c / 550;
            this.container.style["-transform"] = "scale(" + d + ", " + d + ")";
            this.container.style["-webkit-transform"] = "scale(" + d + ", " + d + ")";
            this.container.style.width = c / d + "px";
            this.container.style.height = b / d + "px";
            this.container.style.top = "0px";
            this.container.style.left = a / 2 - c / d / 2 + "px";
            this.closeButton.style.left = a / 2 + 550 * d / 2 - 72 * d + "px";
            this.closeButton.style.width = 72 * d + "px";
            this.closeButton.style.height = 72 * d + "px"
        } else this.container.style["-transform"] = "scale(1, 1)", this.container.style["-webkit-transform"] = "scale(1, 1)", this.container.style.width = c + "px", this.container.style.height = b + "px", this.container.style.left = a / 2 - c / 2 + "px", this.closeButton.style.left = a / 2 + c / 2 - 72 + "px", this.closeButton.style.width = "72px", this.closeButton.style.height = "72px"
    }
};
GAME.Highscores.prototype.onClosePressed = function () {
    document.body.removeChild(this.closeButton);
    document.body.removeChild(this.container);
    startRender()
};
var interactiveItems, Interactive = function () {
        var a = [],
            b = null,
            c = new PIXI.Point,
            d = mat3.create();
        this.add = function (b) {
            a.push(b)
        };
        this.remove = function (b) {
            b = a.indexOf(b); - 1 !== b && a.splice(b, 1)
        };
        this.hitTest = function () {
            console.log(a.length);
            for (var b = 0; b < a.length; b++) {
                var g = a[b];
                mat3.inverse(g.worldTransform, d);
                c.x = d[0] * mouse.x + d[1] * mouse.y + d[2];
                c.y = d[4] * mouse.y + d[3] * mouse.x + d[5];
                var f = g.width * g.hitScale,
                    h = -g.width * g.anchor.x - 0.5 * (f - g.width);
                if (c.x > h && c.x < h + f && (f = g.height * g.hitScale, h = -g.height * g.anchor.y -
                    0.5 * (f - g.height), c.y > h && c.y < h + f)) return g
            }
            return null
        };
        this.mousedown = function () {
            (b = this.hitTest()) && b.mousedown()
        };
        this.mouseup = function () {
            b && b.mouseup()
        }
    };
window.onorientationchange = onResize;
window.mobilecheck = function () {
    var a = !1,
        b = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,
        4))) a = !0;
    return a
};
isMobile = window.mobilecheck();
var renderer = PIXI.autoDetectRenderer(1024, 690);
document.body.appendChild(renderer.view);
var interactiveManager = new Interactive,
    stage = new PIXI.Stage(9993651, !0),
    mouse = new PIXI.Point,
    touches = [],
    ratio = new PIXI.Point,
    simpleApp = new SimpleApp(stage),
    loadingScreen = new LoadingScreen,
    titleScreen, gameScreen, startup = new Startup,
    highScores = new GAME.Highscores,
    music = document.getElementById("music");
music.playing = !0;
PIXI.Texture.addTextureToCache(PIXI.Texture.fromImage("img/sound_OFF.png"));
PIXI.Texture.addTextureToCache(PIXI.Texture.fromImage("img/sound_ON.png"));
flip = PIXI.Sprite.fromImage("img/playLandscape.png");
flip.anchor.x = flip.anchor.y = 0.5;
flipBg = PIXI.Sprite.fromImage("img/BG_col_submit.png");
var muteButton = PIXI.Sprite.fromImage("img/sound_ON.png");
muteButton.position.x = 11;
muteButton.position.y = 11;
muteButton.hitScale = 1;
muteButton.setInteractive(!0);
muteButton.visible = !1;
stage.addChild(muteButton);
var isLandscape = !1,
    doRender = !0;
$(document).ready(onReady);
$(window).resize(onResize);
muteButton.mousedown = muteButton.touchstart = function () {
    music.playing ? (this.setTexture(PIXI.TextureCache["img/sound_OFF.png"]), music.playing = !1, music.pause()) : (this.setTexture(PIXI.TextureCache["img/sound_ON.png"]), music.playing = !0, music.play())
};

function onReady() {
    init()
}

function init() {
    startup.run();
    requestAnimFrame(update);
    onResize()
}

function update() {
    simpleApp.currentScreen == gameScreen && !isLandscape && gameScreen.update();
    renderer.render(stage);
    doRender && requestAnimFrame(update)
}

function startRender() {
    doRender || (doRender = !0, requestAnimFrame(update))
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
    var a = $(window).width(),
        b = $(window).height();
    ratio.x = a / 1024;
    ratio.y = b / 690;
    var c = ratio.x < ratio.y ? ratio.x : ratio.y;
    ratio.x = c;
    ratio.y = c;
    renderer.view.style.width = a + "px";
    renderer.view.style.height = b + "px";
    simpleApp.resize(1024, 690);
    flip.scale.x = 1 / (a / 1024);
    flip.scale.y = 1 / (b / 690);
    flip.position.x = 512;
    flip.position.y = 345;
    flipBg.scale.x = 20.48;
    flipBg.scale.y = 13.8;
    a = b > a;
    a != isLandscape && ((isLandscape = a) ? (stage.addChild(flipBg), stage.addChild(flip)) : (stage.removeChild(flipBg), stage.removeChild(flip)))
}
mat3.inverse = function (a, b) {
    var c = a[0],
        d = a[1],
        e = a[2],
        g = a[3],
        f = a[4],
        h = a[5],
        j = 1 / (c * f + d * -g);
    b[0] = f * j;
    b[1] = -d * j;
    b[2] = (h * d - e * f) * j;
    b[3] = -g * j;
    b[4] = c * j;
    b[5] = (-h * c + e * g) * j;
    b[6] = 0;
    b[7] = 0;
    b[8] = 1;
    return b
};
PIXI.InteractionManager.prototype.hitTest = function (a) {
    this.dirty && (this.dirty = !1, this.interactiveItems = [], this.collectInteractiveSprite(this.stage));
    var b = this.tempPoint;
    a = a.global;
    for (var c = this.interactiveItems.length, d = 0; d < c; d++) {
        var e = this.interactiveItems[d];
        if (e.visible) {
            var g = e.worldTransform,
                f = g[0],
                h = g[1],
                j = g[2],
                k = g[3],
                m = g[4],
                g = g[5],
                l = 1 / (f * m + h * -k);
            b.x = m * l * a.x + -h * l * a.y + (g * h - j * m) * l;
            b.y = f * l * a.y + -k * l * a.x + (-g * f + j * k) * l;
            f = e.width * e.hitScale;
            h = -e.width * e.anchor.x - 0.5 * (f - e.width);
            if (b.x > h && b.x < h + f &&
                (f = e.height * e.hitScale, h = -e.height * e.anchor.y - 0.5 * (f - e.height), b.y > h && b.y < h + f)) return e
        }
    }
    return null
};
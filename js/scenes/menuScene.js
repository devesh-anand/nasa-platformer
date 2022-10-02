let menuScene = new Phaser.Class({
   Extends: Phaser.Scene,
   initialize: function menuScene() {
      Phaser.Scene.call(this, {
         key: "menuScene",
      });
   },

   preload: function () {
      this.load.image("pixel1", "images/pixel1.png");
      this.load.image("pixel2", "images/pixel2.png");
      this.load.image("pixel3", "images/pixel3.png");
      this.load.image("discord", "images/discord.png");
      this.load.image("play", "images/play.png");
      this.load.image("play-o", "images/play-over.png");
      this.load.image("credits", "images/credits.png");
      this.load.image("credits-o", "images/credits-over.png");
      this.load.image("info", "images/info.png");
      this.load.image("logo", "images/logo.png");
      this.load.image("highscore", "images/highscore.png");
      this.load.image("highscore-o", "images/highscore-over.png");
      // this.load.image("ship", "images/ship.png");
      this.load.image("ship", "images/fish2.png");
      // this.load.spritesheet("thrust", "images/thrust.png", {
      //    frameWidth: 64,
      //    frameHeight: 64,
      //    margin: 8,
      //    spacing: 8,
      // });
      this.load.spritesheet("shield", "images/shield.png", {
         frameWidth: 128,
         frameHeight: 128,
         margin: 8,
         spacing: 8,
      });
      this.load.spritesheet("cursor", "images/cursor.png", {
         frameWidth: 32,
         frameHeight: 40,
      });
      // this.load.spritesheet("mute", "images/mute.png", {
      //    frameWidth: 32,
      //    frameHeight: 32,
      // });
      this.load.spritesheet("diff", "images/diff.png", {
         frameWidth: 198,
         frameHeight: 33,
      });
      this.load.audio("click", [
         "sounds/effects/click.mp3",
         "sounds/effects/click.wav",
      ]);

      this.load.audio("bg", ["sounds/music/zone.mp3"]);
      this.load.audio("bg2", ["sounds/music/boss.mp3"]);
      this.load.bitmapFont("font", "images/font.png", "images/font.xml");
   },

   create: function () {
      // set scene for global access
      scene = this;
      this.sound.pauseOnBlur = false;
      if (!music) {
         music = this.sound.add("bg", { volume: 1, loop: true });
      }
      if (!bossmusic) {
         bossmusic = this.sound.add("bg2", { volume: 1, loop: true });
      }

      if (bossmusic.isPlaying) {
         bossmusic.stop();
      }

      if (!music.isPlaying) {
         music.play();
      }

      scene.stars = [];
      for (let i = 0; i < 25; i++) {
         const px1 = this.add.image(
            Phaser.Math.Between(0, GAME_WIDTH),
            Phaser.Math.Between(0, GAME_HEIGHT),
            "pixel1"
         );
         // px1.tint = 0x848fa1;
         scene.stars.push(px1);
         const px2 = this.add.image(
            Phaser.Math.Between(0, GAME_WIDTH),
            Phaser.Math.Between(0, GAME_HEIGHT),
            "pixel2"
         );
         // px2.tint = 0x848fa1;
         scene.stars.push(px2);
         const px3 = this.add.image(
            Phaser.Math.Between(0, GAME_WIDTH),
            Phaser.Math.Between(0, GAME_HEIGHT),
            "pixel3"
         );
         // px3.tint = 0x848fa1;
         scene.stars.push(px3);
      }

      scene.anims.create({
         key: "shield3",
         frames: scene.anims.generateFrameNumbers("shield", {
            frames: [16, 17, 18, 19, 20, 21, 22, 23],
         }),
         frameRate: 10,
         repeat: -1,
      });

      // scene.anims.create({
      //    key: "thrust",
      //    frames: scene.anims.generateFrameNumbers("thrust", {
      //       frames: [16, 17, 18, 19, 20, 21, 22, 23],
      //    }),
      //    frameRate: 10,
      //    repeat: -1,
      // });

      this.sounds = [];
      this.sounds["click"] = this.sound.add("click"); //,, { volume: 0.14 });

      let playBtn = this.add
         .image(545, 270, "play")
         .setOrigin(0)
         .setInteractive();
      let highBtn = this.add
         .image(545, 357, "highscore")
         .setOrigin(0)
         .setInteractive();
      let creditsBtn = this.add
         .image(545, 401, "credits")
         .setOrigin(0)
         .setInteractive();
      let leftBtn = this.add
         .sprite(735, 310, "cursor")
         .setOrigin(0)
         .setInteractive()
         .setFrame(2);
      let rightBtn = this.add
         .sprite(520, 310, "cursor")
         .setOrigin(0)
         .setInteractive()
         .setFrame(4);
      let diffLabel = this.add
         .sprite(545, 313, "diff")
         .setOrigin(0)
         .setInteractive()
         .setFrame(diff);
      playBtn.depth = 1;
      highBtn.depth = 1;

      // let mute = this.add
      //    .sprite(10, 680, "mute")
      //    .setOrigin(0)
      //    .setInteractive()
      //    .setFrame(muteAll ? 1 : 0);

      // mute.on(
      //    "pointerdown",
      //    function () {
      //       muteAll = !muteAll;
      //       game.sound.mute = muteAll;
      //       this.sounds["click"].play();
      //       mute.setFrame(muteAll ? 1 : 0);
      //    },
      //    this
      // );

      // this.add.bitmapText(1230, 700, "font", "1.1.0").setScale(0.5);
      // this.add.image(640, 650, "info");
      this.add.image(640, 130, "logo");

      playBtn.on("pointerover", function (event) {
         this.setTexture("play-o");
      });

      playBtn.on("pointerout", function (event) {
         this.setTexture("play");
      });

      highBtn.on("pointerover", function (event) {
         this.setTexture("highscore-o");
      });

      highBtn.on("pointerout", function (event) {
         this.setTexture("highscore");
      });

      // creditsBtn.on("pointerover", function (event) {
      //    this.setTexture("credits-o");
      // });

      // creditsBtn.on("pointerout", function (event) {
      //    this.setTexture("credits");
      // });

      leftBtn.on("pointerover", function (event) {
         this.setFrame(7);
      });

      leftBtn.on("pointerout", function (event) {
         this.setFrame(2);
      });

      rightBtn.on("pointerover", function (event) {
         this.setFrame(9);
      });

      rightBtn.on("pointerout", function (event) {
         this.setFrame(4);
      });

      playBtn.on(
         "pointerdown",
         function () {
            this.sounds["click"].play();
            this.scene.start("gameScene");
         },
         this
      );

      highBtn.on(
         "pointerdown",
         function () {
            this.sounds["click"].play();
            this.scene.start("scoreScene");
         },
         this
      );

      // creditsBtn.on(
      //    "pointerdown",
      //    function () {
      //       this.sounds["click"].play();
      //       this.scene.start("creditsScene");
      //    },
      //    this
      // );

      leftBtn.on(
         "pointerdown",
         function () {
            this.sounds["click"].play();
            diff++;
            if (diff === 3) {
               diff = 0;
            }
            diffLabel.setFrame(diff);
         },
         this
      );

      rightBtn.on(
         "pointerdown",
         function () {
            this.sounds["click"].play();
            diff--;
            if (diff === -1) {
               diff = 2;
            }
            diffLabel.setFrame(diff);
         },
         this
      );

      this.ship = this.add
         .image(570, 447, "ship")
         .setOrigin(0)
         .setInteractive();
      this.shield = this.add
         .sprite(570, 447, "shields")
         .setOrigin(0)
         .setInteractive();
      this.shield.play("shield3");
      this.shield.visible = false;

      this.ship.on(
         "pointerdown",
         function () {
            this.sounds["click"].play();
            if (this.shield.visible) {
               this.shield.visible = false;
               godMode = false;
            } else {
               this.shield.visible = true;
               godMode = true;
            }
         },
         this
      );

      // this.add.sprite(585, 511, "thrust").play("thrust");
   },

   update: function () {
      // this.sounds['bg1'].play(config);
      _.each(scene.stars, function (star) {
         switch (star.texture.key) {
            case "pixel1":
               star.x--;
               break;
            case "pixel2":
               star.x = star.x - 2;
               break;
            case "pixel3":
               star.x = star.x - 3;
               break;
         }
         if (star.x < 0) {
            star.x = GAME_WIDTH;
            star.y = Phaser.Math.Between(0, GAME_HEIGHT);
         }
      });
   },
});

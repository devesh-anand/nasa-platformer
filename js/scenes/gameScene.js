let gameScene = new Phaser.Class({
   Extends: Phaser.Scene,
   initialize: function zoneScene() {
      Phaser.Scene.call(this, {
         key: "gameScene",
      });
   },

   preload: function () {
      this.load.image("pixel1", "images/pixel1.png");
      this.load.image("pixel2", "images/pixel2.png");
      this.load.image("pixel3", "images/pixel3.png");
      // this.load.image("header", "images/header.png");
      // this.load.image("footer", "images/footer.png");
      this.load.image("pip", "images/pip.png");
      // this.load.image("ship", "images/ship.png");
      this.load.image("ship", "images/fish2.png");

      this.load.bitmapFont("font", "images/font.png", "images/font.xml");

      this.load.audio("pew1", [
         "sounds/effects/pew1.mp3",
         "sounds/effects/pew1.wav",
      ]);
      this.load.audio("pew2", [
         "sounds/effects/pew2.mp3",
         "sounds/effects/pew2.wav",
      ]);
      this.load.audio("powerup", [
         "sounds/effects/powerup.mp3",
         "sounds/effects/powerup.wav",
      ]);
      this.load.audio("shipDamage", [
         "sounds/effects/shipDamage.mp3",
         "sounds/effects/shipDamage.wav",
      ]);
      this.load.audio("shipExplodes", [
         "sounds/effects/shipExplodes.mp3",
         "sounds/effects/shipExplodes.wav",
      ]);
      this.load.audio("shipShield", [
         "sounds/effects/shipShield.mp3",
         "sounds/effects/shipShield.wav",
      ]);
      this.load.audio("tentSquish", [
         "sounds/effects/tentSquish.mp3",
         "sounds/effects/tentSquish.wav",
      ]);
      this.load.audio("asteroidHit", ["sounds/effects/asteroidHit.mp3"]);
      this.load.audio("asteroidDeath", ["sounds/effects/asteroidHit.mp3"]);

      this.load.spritesheet("explosion", "images/explosion.png", {
         frameWidth: 64,
         frameHeight: 64,
      });
      // this.load.spritesheet("thrust", "images/thrust.png", {
      //    frameWidth: 64,
      //    frameHeight: 64,
      //    margin: 8,
      //    spacing: 8,
      // });
      this.load.spritesheet("zone", "images/zone.png", {
         frameWidth: 32,
         frameHeight: 32,
      });
      this.load.spritesheet("lazor", "images/lazor.png", {
         frameWidth: 1024,
         frameHeight: 256,
      });
      this.load.spritesheet("orb", "images/orbs.png", {
         frameWidth: 256,
         frameHeight: 256,
      });
      this.load.spritesheet("zoneEnter", "images/zoneEnter.png", {
         frameWidth: 512,
         frameHeight: 132,
      });
      this.load.spritesheet("zoneExit", "images/zoneExit.png", {
         frameWidth: 512,
         frameHeight: 132,
      });
      // this.load.spritesheet("powerups", "images/powerups.png", {
      this.load.spritesheet("powerups", "images/shrimp1.png", {
         frameWidth: 32,
         frameHeight: 32,
         margin: 8,
         spacing: 8,
      });
      this.load.spritesheet("missile", "images/missile.png", {
         frameWidth: 32,
         frameHeight: 32,
         margin: 8,
         spacing: 8,
      });
      this.load.spritesheet("playerTwo", "images/playerTwo.png", {
         frameWidth: 316,
         frameHeight: 32,
      });
      // this.load.spritesheet("bullet", "images/bullet.png", {
      this.load.spritesheet("bullet", "images/bubble.png", {
         frameWidth: 64,
         frameHeight: 64,
         margin: 8,
         spacing: 8,
      });
      // this.load.spritesheet("nixieDigets", "images/nixieDigets.png", {
      //    frameWidth: 24,
      //    frameHeight: 40,
      //    margin: 8,
      //    spacing: 8,
      // });
      // this.load.spritesheet("nixieCommas", "images/nixieCommas.png", {
      //    frameWidth: 16,
      //    frameHeight: 16,
      //    margin: 8,
      //    spacing: 8,
      // });
      this.load.spritesheet("enemyBullet", "images/enemyBullet.png", {
         frameWidth: 16,
         frameHeight: 16,
         margin: 8,
         spacing: 8,
      });
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
      this.load.spritesheet("enemy_1", "images/enemy_1.png", {
         frameWidth: 16,
         frameHeight: 16,
         margin: 8,
         spacing: 8,
      });
      this.load.spritesheet("enemy_2", "images/enemy_2.png", {
         frameWidth: 32,
         frameHeight: 32,
         margin: 8,
         spacing: 8,
      });
      this.load.spritesheet("enemy_4", "images/enemy_4.png", {
         frameWidth: 64,
         frameHeight: 64,
         margin: 8,
         spacing: 8,
      });
      this.load.spritesheet("enemy_6", "images/enemy_6.png", {
         frameWidth: 128,
         frameHeight: 128,
         margin: 8,
         spacing: 8,
      });
      // this.load.spritesheet("asteroid_1", "images/asteroid_1.png", {
      this.load.spritesheet("asteroid_1", "images/sed3.png", {
         frameWidth: 49,
         frameHeight: 32,
      });
      this.load.spritesheet("asteroid_2", "images/sed2.png", {
         frameWidth: 64,
         frameHeight: 64,
      });
      this.load.spritesheet("boss", "images/boss.png", {
         frameWidth: 512,
         frameHeight: 512,
         // margin: 8,
         // spacing: 8,
      });
      this.load.spritesheet("blipp", "images/blipp.png", {
         frameWidth: 32,
         frameHeight: 32,
         margin: 8,
         spacing: 8,
      });
   },

   create: function () {
      // set scene for global access
      scene = this;
      levelsClone = JSON.parse(JSON.stringify(levels));
      this.level = 1;
      this.stageTransition = false;
      this.physics.world.setFPS(24);
      this.gameVars = {};
      this.gameVars.counter = 0;
      this.gameVars.enemies = [];
      this.nextEnemy = false;

      this.sounds = [];
      this.sounds["pew1"] = this.sound.add("pew1"); //, { volume: 0.14 });
      this.sounds["pew2"] = this.sound.add("pew2"); //,, { volume: 0.14 });
      this.sounds["powerup"] = this.sound.add("powerup"); //,, { volume: 0.24 });
      this.sounds["shipDamage"] = this.sound.add("shipDamage"); //,, { volume: 0.2 });
      this.sounds["shipExplodes"] = this.sound.add("shipExplodes"); //,, { volume: 0.25, });
      this.sounds["shipShield"] = this.sound.add("shipShield"); //,, { volume: 0.2 });
      this.sounds["tentSquish"] = this.sound.add("tentSquish"); //,, { volume: 0.14 });
      this.sounds["asteroidHit"] = this.sound.add("asteroidHit"); //,, { volume: 0.54, });
      this.sounds["asteroidDeath"] = this.sound.add("asteroidDeath"); //,, { volume: 0.54, });

      this.playersGroup = this.physics.add.group();
      this.bulletsGroup = this.physics.add.group();
      this.ebulletGroup = this.physics.add.group();
      this.enemiesGroup = this.physics.add.group();
      this.powerupGroup = this.physics.add.group();

      this.gameVars.enemyBullets = new EnemyBullets(scene);
      this.gameVars.orbs = new Orbs(scene);
      this.gameVars.powerups = new Powerups(scene);
      this.gameVars.stars = [];
      for (let i = 0; i < 25; i++) {
         const px1 = this.add.image(
            Phaser.Math.Between(0, GAME_WIDTH),
            Phaser.Math.Between(0, GAME_HEIGHT),
            "pixel1"
         );
         // px1.tint = 0x848fa1;
         this.gameVars.stars.push(px1);
         const px2 = this.add.image(
            Phaser.Math.Between(0, GAME_WIDTH),
            Phaser.Math.Between(0, GAME_HEIGHT),
            "pixel2"
         );
         // px2.tint = 0x848fa1;
         this.gameVars.stars.push(px2);
         const px3 = this.add.image(
            Phaser.Math.Between(0, GAME_WIDTH),
            Phaser.Math.Between(0, GAME_HEIGHT),
            "pixel3"
         );
         // px3.tint = 0x848fa1;
         this.gameVars.stars.push(px3);
      }

      scene.anims.create({
         key: "explosion",
         frames: scene.anims.generateFrameNumbers("explosion"),
         frameRate: 12,
         repeat: 0,
      });

      // scene.anims.create({
      //    key: "thrust1",
      //    frames: scene.anims.generateFrameNumbers("thrust", {
      //       frames: [0, 1, 2, 3, 4, 5, 6, 7],
      //    }),
      //    frameRate: 10,
      //    repeat: -1,
      // });

      // scene.anims.create({
      //    key: "thrust2",
      //    frames: scene.anims.generateFrameNumbers("thrust", {
      //       frames: [8, 9, 10, 11, 12, 13, 14, 15],
      //    }),
      //    frameRate: 10,
      //    repeat: -1,
      // });

      // scene.anims.create({
      //    key: "thrust3",
      //    frames: scene.anims.generateFrameNumbers("thrust", {
      //       frames: [16, 17, 18, 19, 20, 21, 22, 23],
      //    }),
      //    frameRate: 10,
      //    repeat: -1,
      // });

      scene.anims.create({
         key: "shield1",
         frames: scene.anims.generateFrameNumbers("shield", {
            frames: [0, 1, 2, 3, 4, 5, 6, 7],
         }),
         frameRate: 10,
         repeat: -1,
      });

      scene.anims.create({
         key: "shield2",
         frames: scene.anims.generateFrameNumbers("shield", {
            frames: [8, 9, 10, 11, 12, 13, 14, 15],
         }),
         frameRate: 10,
         repeat: -1,
      });

      scene.anims.create({
         key: "shield3",
         frames: scene.anims.generateFrameNumbers("shield", {
            frames: [16, 17, 18, 19, 20, 21, 22, 23],
         }),
         frameRate: 10,
         repeat: -1,
      });

      scene.anims.create({
         key: "shield4",
         frames: scene.anims.generateFrameNumbers("shield", {
            frames: [24, 25, 26, 27, 28, 29, 30, 31],
         }),
         frameRate: 10,
         repeat: -1,
      });

      scene.anims.create({
         key: "shield5",
         frames: scene.anims.generateFrameNumbers("shield", {
            frames: [32, 33, 34, 35, 36, 37, 38, 39],
         }),
         frameRate: 10,
         repeat: -1,
      });

      scene.anims.create({
         key: "shield6",
         frames: scene.anims.generateFrameNumbers("shield", {
            frames: [40, 41, 42, 43, 44, 45, 46, 47],
         }),
         frameRate: 10,
         repeat: -1,
      });

      scene.anims.create({
         key: "shield7",
         frames: scene.anims.generateFrameNumbers("shield", {
            frames: [48, 49, 50, 51, 52, 53, 54, 55],
         }),
         frameRate: 10,
         repeat: -1,
      });

      let player = new Player(scene, 50, 350);
      this.gameVars.ship = player;

      // create input
      this.gameVars.cursors = this.input.keyboard.createCursorKeys();
      this.gameVars.wasd = this.input.keyboard.addKeys({
         up: Phaser.Input.Keyboard.KeyCodes.W,
         down: Phaser.Input.Keyboard.KeyCodes.S,
         left: Phaser.Input.Keyboard.KeyCodes.A,
         right: Phaser.Input.Keyboard.KeyCodes.D,
         missile: Phaser.Input.Keyboard.KeyCodes.V,
         one: Phaser.Input.Keyboard.KeyCodes.ONE,
         two: Phaser.Input.Keyboard.KeyCodes.TWO,
         three: Phaser.Input.Keyboard.KeyCodes.THREE,
         four: Phaser.Input.Keyboard.KeyCodes.FOUR,
      });

      this.gameVars.shift = this.input.keyboard.addKey("Shift");
      this.gameVars.shift.on("down", () => {
         player.fireMissile();
      });

      // input handlers
      this.gameVars.spacebar = this.input.keyboard.addKey("Space");
      this.gameVars.spacebar.on("down", () => {
         player.firing = true;
      });

      this.gameVars.spacebar.on("up", () => {
         player.firing = false;
      });

      scene.anims.create({
         key: "playerTwo",
         frames: scene.anims.generateFrameNumbers("playerTwo"),
         frameRate: 12,
         repeat: -1,
      });

      scene.anims.create({
         key: "zoneEnter",
         frames: scene.anims.generateFrameNumbers("zoneEnter"),
         frameRate: 18,
         repeat: 0,
      });

      scene.anims.create({
         key: "asteroid_die_1",
         frames: scene.anims.generateFrameNumbers("asteroid_1"),
         frameRate: 12,
         repeat: 0,
      });

      scene.anims.create({
         key: "asteroid_die_2",
         frames: scene.anims.generateFrameNumbers("asteroid_2"),
         frameRate: 12,
         repeat: 0,
      });

      scene.anims.create({
         key: "zoneExit",
         frames: scene.anims.generateFrameNumbers("zoneExit"),
         frameRate: 18,
         repeat: 0,
      });

      scene.anims.create({
         key: "orb",
         frames: scene.anims.generateFrameNumbers("orb", {
            frames: [
               0, 1, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3,
               4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4,
               2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2,
               3, 4,
            ],
         }),
         frameRate: 10,
         repeat: 0,
      });

      scene.anims.create({
         key: "lazor_1",
         frames: scene.anims.generateFrameNumbers("lazor", {
            frames: [0, 1],
         }),
         frameRate: 10,
         repeat: 0,
      });

      scene.anims.create({
         key: "lazor_2",
         frames: scene.anims.generateFrameNumbers("lazor", {
            frames: [2, 3],
         }),
         frameRate: 10,
         repeat: 0,
      });

      scene.anims.create({
         key: "lazor_3",
         frames: scene.anims.generateFrameNumbers("lazor", {
            frames: [4, 5, 6, 7],
         }),
         frameRate: 10,
         repeat: 0,
      });

      scene.anims.create({
         key: "missile",
         frames: scene.anims.generateFrameNumbers("missile", {
            frames: [1, 2, 3],
         }),
         frameRate: 12,
         repeat: 5,
      });

      scene.anims.create({
         key: "boss_idle",
         frames: scene.anims.generateFrameNumbers("boss", {
            frames: [0, 1, 2, 3, 4, 5, 6, 7],
         }),
         frameRate: 8,
         repeat: -1,
      });

      scene.anims.create({
         key: "boss_idle_single",
         frames: scene.anims.generateFrameNumbers("boss", {
            frames: [0, 1, 2, 3, 4, 5, 6, 7],
         }),
         frameRate: 8,
         repeat: 3,
      });

      scene.anims.create({
         key: "boss_idle_single_swipe",
         frames: scene.anims.generateFrameNumbers("boss", {
            frames: [0, 1, 2, 3, 4, 5, 6, 7],
         }),
         frameRate: 8,
         repeat: 0,
      });

      scene.anims.create({
         key: "boss_wind_up_lazor",
         frames: scene.anims.generateFrameNumbers("boss", {
            frames: [
               8, 9, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 12,
               13,
            ],
         }),
         frameRate: 8,
         repeat: 0,
      });

      scene.anims.create({
         key: "boss_wind_up_orb",
         frames: scene.anims.generateFrameNumbers("boss", {
            frames: [8, 9, 10, 11, 10, 11, 10, 11, 10, 11, 12, 13],
         }),
         frameRate: 8,
         repeat: 0,
      });

      scene.anims.create({
         key: "boss_fire_orb",
         frames: scene.anims.generateFrameNumbers("boss", {
            frames: [14, 14, 9, 12, 13],
         }),
         frameRate: 8,
         repeat: 0,
      });

      // make beam appear here

      scene.anims.create({
         key: "boss_fire_lazor",
         frames: scene.anims.generateFrameNumbers("boss", {
            frames: [13, 14, 13, 14, 13, 14, 13, 14, 15],
         }),
         frameRate: 8,
         repeat: 0,
      });

      scene.anims.create({
         key: "boss_die",
         frames: scene.anims.generateFrameNumbers("boss", {
            frames: [24, 25, 26, 27, 28, 29, 30, 31],
         }),
         frameRate: 6,
         repeat: 0,
      });

      // back to idle

      _.each([1, 2, 4, 6], function (f) {
         scene.anims.create({
            key: "wiggle_" + f,
            frames: scene.anims.generateFrameNumbers("enemy_" + f, {
               frames: [0, 1, 2, 3, 4, 5],
            }),
            frameRate: 8,
            repeat: 0,
         });

         scene.anims.create({
            key: "fire_" + f,
            frames: scene.anims.generateFrameNumbers("enemy_" + f, {
               frames: [6, 7, 8, 9],
            }),
            frameRate: 8,
            repeat: 0,
         });

         scene.anims.create({
            key: "fired_" + f,
            frames: scene.anims.generateFrameNumbers("enemy_" + f, {
               frames: [10, 11],
            }),
            frameRate: 8,
            repeat: 0,
         });

         scene.anims.create({
            key: "die_" + f,
            frames: scene.anims.generateFrameNumbers("enemy_" + f, {
               frames: [12, 13, 14, 15, 16, 17],
            }),
            frameRate: 12,
            repeat: 0,
         });
      });

      scene.anims.create({
         key: "pu_idle_",
         frames: scene.anims.generateFrameNumbers("powerups"),
         //  frames: scene.anims.generateFrameNumbers("powerups", {
         //     //  frames: [0 + i * 10, 1 + i * 10, 2 + i * 10, 3 + i * 10],
         //     frames: 1,
         //  }),
         frameRate: 6,
         repeat: -1,
      });

      scene.anims.create({
         key: "pu_fall_",
         frames: scene.anims.generateFrameNumbers("powerups"),
         //  frames: scene.anims.generateFrameNumbers("powerups", {
         //     frames: [
         //        3 + i * 10,
         //        4 + i * 10,
         //        5 + i * 10,
         //        6 + i * 10,
         //        7 + i * 10,
         //        8 + i * 10,
         //     ],
         //  }),
         frameRate: 6,
         repeat: -1,
      });

      scene.anims.create({
         key: "pu_activate_",
         frames: scene.anims.generateFrameNumbers("powerups"),
         frameRate: 6,
         repeat: 0,
      });

      this.anims.create({
         key: "blipp",
         frames: this.anims.generateFrameNumbers("blipp", {
            frames: [0, 2, 3, 4, 5],
         }),
         frameRate: 12,
         repeat: 0,
      });

      this.add
         .sprite(900, 18, "playerTwo")
         .setOrigin(0)
         .setDepth(1)
         .play("playerTwo");

      scene.gameOver = this.add
         .bitmapText(650, 300, "font", "")
         .setScale(2)
         .setOrigin(0.5)
         .setCenterAlign();
      scene.gameOver.visible = false;

      this.gameVars.hullPips = [];
      for (let i = 0; i < 7; i++) {
         let pip = this.add
            .image(50 + i * 16, 18, "pip")
            .setOrigin(0)
            .setDepth(2);
         this.gameVars.hullPips.push(pip);
      }

      this.gameVars.zonePips = [];
      for (let i = 0; i < 5; i++) {
         let pip = this.add
            .image(677 + i * 16, 28, "pip")
            .setOrigin(0)
            .setDepth(2);
         this.gameVars.zonePips.push(pip);
      }

      this.gameVars.weaponPips = [];
      for (let i = 0; i < 5; i++) {
         let pip = this.add
            .image(210 + i * 16, 50, "pip")
            .setOrigin(0)
            .setDepth(2);
         this.gameVars.weaponPips.push(pip);
      }

      this.gameVars.missilePips = [];
      for (let i = 0; i < 5; i++) {
         let pip = this.add
            .image(338 + i * 16, 50, "pip")
            .setOrigin(0)
            .setDepth(2);
         this.gameVars.missilePips.push(pip);
      }

      this.gameVars.shieldPips = [];
      for (let i = 0; i < 7; i++) {
         let pip = this.add
            .image(50 + i * 16, 50, "pip")
            .setOrigin(0)
            .setDepth(2);
         this.gameVars.shieldPips.push(pip);
      }

      this.gameVars.shieldBadge = this.add
         .sprite(12, 31, "powerups")
         .setOrigin(0)
         .setDepth(2)
         .play("pu_idle_0");

      this.gameVars.weaponBadge = this.add
         .sprite(173, 31, "powerups")
         .setOrigin(0)
         .setDepth(2)
         .play("pu_idle_1");

      this.gameVars.missileBadge = this.add
         .sprite(302, 31, "powerups")
         .setOrigin(0)
         .setDepth(2)
         .play("pu_idle_2");

      this.gameVars.zoneNumber = this.add
         .sprite(625, 15, "zone")
         .setOrigin(0)
         .setDepth(2)
         .setFrame(1);

      this.gameVars.ship.initialize();
      this.gameVars.clear = this.add
         .bitmapText(
            1400,
            200,
            "font",
            "ZONE " + this.gameVars.level + " CLEARED!"
         )
         .setScale(2);

      setZone();
   },

   update: function () {
      this.physics.world.collide(
         this.playersGroup,
         this.powerupGroup,
         function (a, b) {
            if (scene.gameVars.ship.alive !== true) {
               return;
            }
            a.powerUp(b.type);
            b.setActive(false);
            b.setVisible(false);
            b.x = -200;
            b.y = -200;
            b.destroy();
         }
      );

      this.physics.world.collide(
         this.playersGroup,
         this.enemiesGroup,
         function (a, b) {
            if (scene.gameVars.ship.alive !== true) {
               return;
            }
            a.takeDamage(4);
            b.hit(100);
         }
      );

      this.physics.world.collide(
         this.enemiesGroup,
         this.bulletsGroup,
         function (a, b) {
            scene.gameVars.ship.scoreUp(25);
            let blipp = scene.add.sprite(b.x + 16, b.y, "blipp").play("blipp");
            blipp.angle = Phaser.Math.Between(0, 4) * 90;
            blipp.once("animationcomplete", function () {
               blipp.destroy();
            });
            a.hit(b.damage);
            b.setActive(false);
            b.setVisible(false);
            b.x = -200;
            b.y = -200;
         }
      );

      this.physics.world.collide(
         this.playersGroup,
         this.ebulletGroup,
         function (a, b) {
            if (scene.gameVars.ship.alive !== true) {
               return;
            }
            a.takeDamage(b.damageValue);
            b.destroy();

            let blipp = scene.add.sprite(b.x, b.y, "blipp").play("blipp");
            blipp.angle = Phaser.Math.Between(0, 4) * 90;
            blipp.once("animationcomplete", function () {
               blipp.destroy();
            });
         }
      );

      if (!this.stageTransition) {
         this.gameVars.counter++;

         if (this.gameVars.counter % 10 === 0) {
            let scoreUp = [3, 7, 11, 17, 29];
            this.gameVars.ship.scoreUp(scoreUp[this.level - 1] / (diff + 1));
         }

         if (!this.nextEnemy) {
            this.nextEnemy = levelsClone[this.level - 1].shift();
         }
         if (this.nextEnemy && this.gameVars.counter >= this.nextEnemy.time) {
            if (this.nextEnemy.boss) {
               spawnBoss(this);
            } else if (this.nextEnemy.enemy) {
               let diffSetting = 0;
               switch (diff) {
                  case 0:
                     diffSetting = 2;
                     break;
                  case 1:
                     diffSetting = 1;
                     break;
                  case 2:
                     diffSetting = 0;
                     break;
                  default:
                     break;
               }
               if (
                  !this.nextEnemy.powerup &&
                  Phaser.Math.Between(1, 3) <= diffSetting
               ) {
                  // do not spawn baddie
               } else {
                  spawnEnemy(
                     this,
                     this.nextEnemy.enemy,
                     this.nextEnemy.path,
                     this.nextEnemy.duration,
                     this.nextEnemy.powerup
                  );
               }
            } else if (this.nextEnemy.asteroid) {
               spawnAsteroid(
                  this,
                  this.nextEnemy.asteroid,
                  this.nextEnemy.powerup,
                  this.nextEnemy.speed
               );
            } else {
               scene.gameVars.powerups.spawn(
                  this.nextEnemy.y,
                  this.nextEnemy.powerup
               );
            }
            if (levelsClone[this.level - 1].length > 0) {
               this.nextEnemy = levelsClone[this.level - 1].shift();
            } else {
               this.nextEnemy = null;
            }
         }
      }

      if (
         levelsClone[this.level - 1].length === 0 &&
         scene.gameVars.ship.alive === true &&
         this.enemiesGroup.children.getArray().length === 0 &&
         this.powerupGroup.children.getArray().length === 0 &&
         !this.stageTransition &&
         !this.nextEnemy
      ) {
         _.each(scene.ebulletGroup.getChildren(), function (b) {
            b.setActive(false);
            b.setVisible(false);
            b.x = -200;
            b.y = -200;
         });
         // END OF THING HERE
         if (this.level === 5) {
         } else {
            zoneTransitionOne();
         }
      }
      _.each(scene.gameVars.enemies, function (e) {
         e.update();
      });

      // background stars
      _.each(scene.gameVars.stars, function (star) {
         switch (star.texture.key) {
            case "pixel1":
               star.x--;
               break;
            case "pixel2":
               star.x = star.x - 1.5;
               break;
            case "pixel3":
               star.x = star.x - 2;
               break;
         }
         if (star.x < 0) {
            star.x = GAME_WIDTH;
            star.y = Phaser.Math.Between(0, GAME_HEIGHT);
         }
      });

      if (this.gameVars.ship.alive) {
         this.gameVars.ship.tick();
         // player movement logic
         if (!this.stageTransition) {
            if (
               this.gameVars.cursors.left.isDown ||
               this.gameVars.wasd.left.isDown
            ) {
               this.gameVars.ship.body.setVelocityX(-400);
            } else if (
               this.gameVars.cursors.right.isDown ||
               this.gameVars.wasd.right.isDown
            ) {
               this.gameVars.ship.body.setVelocityX(400);
            } else {
               this.gameVars.ship.body.setVelocityX(0);
            }

            if (
               this.gameVars.cursors.up.isDown ||
               this.gameVars.wasd.up.isDown
            ) {
               this.gameVars.ship.body.setVelocityY(-400);
            } else if (
               this.gameVars.cursors.down.isDown ||
               this.gameVars.wasd.down.isDown
            ) {
               this.gameVars.ship.body.setVelocityY(400);
            } else {
               this.gameVars.ship.body.setVelocityY(0);
            }

            if (this.gameVars.wasd.missile.isDown) {
               this.gameVars.ship.fireMissile();
            }
         }
      }
   },
});

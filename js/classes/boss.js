class Boss extends Phaser.Physics.Arcade.Sprite {
   constructor(scene) {
      super(scene, 1600, 500, "boss");
      if (!bossmusic.isPlaying) {
         bossmusic.play();
      }

      if (music.isPlaying) {
         music.stop();
      }
      this.alive = true;
      this.firing = false;
      scene.physics.add.existing(this);
      scene.add.existing(this);
      scene.enemiesGroup.add(this);
      this.inv = true;
      this.tick = 0;
      this.setCircle(150, 100, 100);
      this.health = 10000;
      this.orbNumbers = [-1, 0, 1];

      this.body.setImmovable();

      this.status = "appearing";
      this.action();
      this.shuffle();

      let that = this;
      this.on("animationcomplete", function (animation, frame) {
         switch (animation.key) {
            case "boss_wind_up_lazor":
               this.yMove.pause();
               this.lazor();
               this.play("boss_fire_lazor");
               break;
            case "boss_fire_lazor":
               this.yMove.resume();
               this.play("boss_idle_single");
               break;
            case "boss_idle_single":
               that.action();
               break;
            case "boss_idle_single_swipe":
               if (Phaser.Math.Between(1, 4) === 1) {
                  that.action();
               } else {
                  Phaser.Math.Between(1, 2) === 1
                     ? this.swipeUp()
                     : this.swipeDown();
               }
               break;
            case "boss_wind_up_orb":
               this.yMove.pause();
               this.orb();
               this.play("boss_fire_orb");
               break;
            case "boss_fire_orb":
               if (this.orbNumbers.length === 0) {
                  this.play("boss_idle_single");
                  this.orbNumbers = [-1, 0, 1];
                  shuffle(this.orbNumbers);
                  this.yMove.resume();
               } else {
                  this.orb();
                  this.play("boss_fire_orb");
               }
               break;
            case "boss_idle_single":
               that.action();
               break;
            case "boss_die":
               that.visible = false;
               victory();
               break;
            default:
               break;
         }
      });
   }

   update() {}

   shuffle() {
      let that = this;
      this.yMove = scene.tweens.add({
         targets: that,
         y: Phaser.Math.Between(250, 500),
         duration: 4000,
         onComplete: function () {
            that.shuffle();
         },
      });
   }

   action() {
      if (this.remainingBeforeHide === 0 && !this.hiding) {
         this.status = "hiding";
         this.inv = true;
      } else if (this.remainingBeforeHide > 0 && !this.hiding) {
         this.remainingBeforeHide--;
         let animation = Phaser.Math.Between(1, 3);
         switch (animation) {
            case 1:
               this.status = "beam";
               break;
            case 2:
               this.status = "orb";
               break;
            case 3:
               this.status = "swipe";
               break;
            default:
               break;
         }
      }
      let that = this;
      switch (this.status) {
         case "beam":
            this.play("boss_wind_up_lazor");
            break;
         case "orb":
            this.play("boss_wind_up_orb");
            break;
         case "swipe":
            this.stop();
            this.swipeUp();
            break;
         case "appearing":
            this.play("boss_idle");
            scene.tweens.add({
               targets: that,
               x: 1100,
               duration: 4000,
               onComplete: function () {
                  that.inv = false;
                  that.hiding = false;
                  that.remainingBeforeHide = Phaser.Math.Between(3, 6);
                  that.action();
               },
            });
            break;
         case "hiding":
            this.play("boss_idle");
            scene.tweens.add({
               targets: that,
               x: 1600,
               duration: 4000,
               onComplete: function () {
                  that.hiding = true;
                  setTimeout(function () {
                     console.log("spawning babies!");
                     that.spawnBabies();
                     setTimeout(function () {
                        console.log("spawning babies!");
                        that.spawnBabies();
                        setTimeout(function () {
                           console.log("spawning babies!");
                           that.spawnBabies();
                           setTimeout(function () {
                              console.log("spawning babies!");
                              that.spawnBabies();
                           }, 2000);
                        }, 2000);
                     }, 2000);
                  }, 2000);
                  setTimeout(function () {
                     that.status = "appearing";
                     that.action();
                  }, 15000);
               },
            });
            break;

         default:
            break;
      }
   }

   spawnBabies() {
      for (let i = 0; i < 8; i++) {
         spawnEnemy(scene, 1, -1, 30000);
      }
   }

   orb() {
      let orb = this.orbNumbers.shift();
      scene.gameVars.orbs.fireOrb(this.x, this.y, orb);
   }

   lazor() {
      let lazor = scene.add.sprite(this.x - 600, this.y, "lazor");
      lazor.on("animationcomplete", function (animation, frame) {
         switch (animation.key) {
            case "lazor_1":
               if (
                  scene.gameVars.ship.y - this.y < 50 &&
                  scene.gameVars.ship.y - this.y > -50
               ) {
                  scene.gameVars.ship.lazorDamage();
               }
               lazor.play("lazor_2");
               break;
            case "lazor_2":
               if (
                  scene.gameVars.ship.y - this.y < 120 &&
                  scene.gameVars.ship.y - this.y > -120
               ) {
                  scene.gameVars.ship.lazorDamage();
               }
               lazor.play("lazor_3");
               break;
            case "lazor_3":
               lazor.destroy();
            default:
               break;
         }
      });
      lazor.play("lazor_1");
   }

   swipeUp() {
      let that = this;
      that.stop();
      that.setFrame(16);
      if (that.health > 0) {
         scene.gameVars.enemyBullets.fireBullet(that.x, that.y, 6, 4);
         scene.gameVars.enemyBullets.fireBullet(that.x, that.y - 25, 6, 4);
         setTimeout(function () {
            if (that.health > 0) {
               that.setFrame(17);
               scene.gameVars.enemyBullets.fireBullet(
                  that.x,
                  that.y - 50,
                  6,
                  10
               );
               scene.gameVars.enemyBullets.fireBullet(
                  that.x,
                  that.y - 50,
                  6,
                  15
               );
               setTimeout(function () {
                  if (that.health > 0) {
                     that.setFrame(18);
                     scene.gameVars.enemyBullets.fireBullet(
                        that.x,
                        that.y - 75,
                        6,
                        20
                     );
                     scene.gameVars.enemyBullets.fireBullet(
                        that.x,
                        that.y - 75,
                        6,
                        25
                     );
                     setTimeout(function () {
                        if (that.health > 0) {
                           that.setFrame(19);
                           scene.gameVars.enemyBullets.fireBullet(
                              that.x,
                              that.y - 100,
                              6,
                              30
                           );
                           scene.gameVars.enemyBullets.fireBullet(
                              that.x,
                              that.y - 100,
                              6,
                              35
                           );
                           setTimeout(function () {
                              if (that.health > 0) {
                                 that.play("boss_idle_single_swipe");
                              }
                           }, 125);
                        }
                     }, 125);
                  }
               }, 125);
            }
         }, 125);
      }
   }

   swipeDown() {
      let that = this;
      that.stop();
      if (that.health > 0) {
         that.setFrame(20);
         scene.gameVars.enemyBullets.fireBullet(that.x, that.y, 6, 4);
         scene.gameVars.enemyBullets.fireBullet(that.x, that.y + 25, 6, 4);
         setTimeout(function () {
            if (that.health > 0) {
               that.setFrame(21);
               scene.gameVars.enemyBullets.fireBullet(
                  that.x,
                  that.y + 50,
                  6,
                  -10
               );
               scene.gameVars.enemyBullets.fireBullet(
                  that.x,
                  that.y + 50,
                  6,
                  -15
               );
               setTimeout(function () {
                  if (that.health > 0) {
                     that.setFrame(22);
                     scene.gameVars.enemyBullets.fireBullet(
                        that.x,
                        that.y + 75,
                        6,
                        -20
                     );
                     scene.gameVars.enemyBullets.fireBullet(
                        that.x,
                        that.y + 75,
                        6,
                        -25
                     );
                     setTimeout(function () {
                        if (that.health > 0) {
                           that.setFrame(23);
                           scene.gameVars.enemyBullets.fireBullet(
                              that.x,
                              that.y + 100,
                              6,
                              -30
                           );
                           scene.gameVars.enemyBullets.fireBullet(
                              that.x,
                              that.y + 100,
                              6,
                              -35
                           );
                           setTimeout(function () {
                              if (that.health > 0) {
                                 that.play("boss_idle_single_swipe");
                              }
                           }, 125);
                        }
                     }, 125);
                  }
               }, 125);
            }
         }, 125);
      }
   }

   hit(damage) {
      console.log(this.health);
      scene.sounds["tentSquish"].play({
         volume: Phaser.Math.Between(80, 100) / 100,
      });
      if (!this.inv) {
         this.health -= damage;
         if (this.health <= 0) {
            this.body = null;
            this.inv = true;
            this.tick = -10000;
            scene.gameVars.ship.scoreUp(100000);
            this.stop();
            this.play("boss_die");
         }
      }
   }
}

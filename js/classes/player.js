class Player extends Phaser.GameObjects.Container {
   constructor(scene, x, y) {
      super(scene, x, y);
      scene.playersGroup.add(this);
      this.alive = true;
      this.hull = 7;
      this.firepower = 1;
      this.missiles = 0;
      this.score = 0;
      this.shields = 0;
      this.missileCooldown = 0;
      this.inv = 0;
      this.counter = 0;

      this.bullets = new Bullets(scene);

      let ship = scene.add.sprite(0, 0, "ship");
      this.add(ship);
      this.ship = ship;
      // let thrust = scene.add.sprite(-50, 0, "thrust");
      // this.add(thrust);

      let shield = scene.add.sprite(0, 0, "shield");
      this.add(shield);
      this.shield = shield;
      // this.thrust = thrust;
      // this.thrust.play("thrust2", true);
      scene.physics.add.existing(this);
      scene.add.existing(this);
      this.body.setSize(90, 40);
      this.body.setOffset(-44, -18);
      this.body.setCollideWorldBounds(true);
      this.body.setBoundsRectangle(
         new Phaser.Geom.Rectangle(10, 80, GAME_WIDTH - 20, GAME_HEIGHT - 135)
      );

      this.firespeed = 5;
      this.cooldown = 0;
      this.topgun = false;
   }

   initialize() {
      this.setFirepower();
      this.setMissiles();
      this.setShield();
      this.setArmor();
      displayScore(0);
   }

   tick() {
      if (this.missileCooldown > 0) {
         this.missileCooldown--;
      }
      // if (this.body.velocity.x > 0) {
      //    this.thrust.play("thrust3", true);
      // } else if (this.body.velocity.x < 0) {
      //    this.thrust.play("thrust1", true);
      // } else {
      //    this.thrust.play("thrust2", true);
      // }
      if (this.firing && !scene.stageTransition && this.alive) {
         this.counter++;
         if (this.counter % 5 === 0) {
            this.fireMain();
            this.topgun = !this.topgun;
         }
         if (this.firepower === 2 && this.counter % 30 === 0) {
            this.fireAuxOne(1);
         }

         if (this.firepower === 3 && this.counter % 20 === 0) {
            this.fireAuxOne(3);
         }
         if (this.firepower === 3 && this.counter % 30 === 0) {
            this.fireAuxTwo(1);
         }

         if (this.firepower === 4 && this.counter % 5 === 0) {
            this.fireAuxOne(1);
         }
         if (this.firepower === 4 && this.counter % 30 === 0) {
            this.fireAuxTwo(3);
         }
         if (this.firepower === 4 && this.counter % 40 === 0) {
            this.fireAuxThree(1);
         }
         if (this.firepower === 5 && this.counter % 5 === 0) {
            this.fireAuxOne(3);
         }
         if (this.firepower === 5 && this.counter % 30 === 0) {
            this.fireAuxTwo(3);
         }
         if (this.firepower === 5 && this.counter % 30 === 0) {
            this.fireAuxThree(1);
         }
         if (this.firepower === 5 && this.counter % 40 === 0) {
            this.fireAuxFour(1);
         }
      }
      if (this.inv > 0) {
         this.inv--;
         if (this.inv > 35) {
            this.visible = false;
         } else if (this.inv > 30) {
            this.visible = true;
         } else if (this.inv > 25) {
            this.visible = false;
         } else if (this.inv > 20) {
            this.visible = true;
         } else if (this.inv > 15) {
            this.visible = false;
         } else if (this.inv > 10) {
            this.visible = true;
         } else if (this.inv > 5) {
            this.visible = false;
         } else {
            this.visible = true;
         }
      }
   }

   fireMain() {
      let damage = 1;
      if (this.firepower < 3) {
         damage = this.topgun ? 1 : 3;
      } else if (this.firepower > 2 && this.firepower < 5) {
         damage = 3;
      } else if (this.firepower > 4) {
         damage = this.topgun ? 3 : 5;
      }
      this.bullets.fireBullet(
         this.x + 64,
         this.y + (this.topgun ? 6 : 10),
         damage
      );
      scene.sounds["pew" + Phaser.Math.Between(1, 2)].play();
   }

   fireAuxOne(damage) {
      this.bullets.fireBullet(
         this.x + 64,
         this.y + (this.topgun ? 6 : 10),
         damage,
         1
      );
      this.bullets.fireBullet(
         this.x + 64,
         this.y + (this.topgun ? 6 : 10),
         damage,
         -1
      );
   }

   fireAuxTwo(damage) {
      this.bullets.fireBullet(
         this.x + 64,
         this.y + (this.topgun ? 6 : 10),
         damage,
         -2
      );
      this.bullets.fireBullet(
         this.x + 64,
         this.y + (this.topgun ? 6 : 10),
         damage,
         2
      );
   }

   fireAuxThree(damage) {
      this.bullets.fireBullet(this.x + 10, this.y + 35, damage, -3);
      this.bullets.fireBullet(this.x + 10, this.y - 35, damage, 3);
   }

   fireAuxFour(damage) {
      this.bullets.fireBullet(this.x - 10, this.y - 35, damage, -4);
      this.bullets.fireBullet(this.x - 10, this.y + 35, damage, 4);
   }

   spread() {
      let y = Math.floor(this.y);
      let that = this;
      let bullets1 = [];
      let bullets2 = [];
      for (let i = y - 50; i > y - 300; i = i - 30) {
         bullets1.push({ y: i, x: this.x - 10 });
      }
      for (let i = y + 50; i < y + 300; i = i + 30) {
         bullets2.push({ y: i, x: this.x - 10 });
      }
      let t = 450;
      _.each(bullets1, function (bullet) {
         let b = that.bullets.spawnBullet(that.x, that.y, 50);
         that.scene.tweens.add({
            targets: b,
            x: that.x - 50 - t / 100,
            duration: t / 2,
            ease: "Power1",
            yoyo: true,
            onComplete: function () {
               b.launch();
            },
         });
         that.scene.tweens.add({
            targets: b,
            y: bullet.y,
            duration: t,
            ease: "Linear",
         });
         t = t + 50;
      });
      t = 450;
      _.each(bullets2, function (bullet) {
         let b = that.bullets.spawnBullet(that.x, that.y, 50);
         that.scene.tweens.add({
            targets: b,
            x: that.x - 50 - t / 100,
            duration: t / 2,
            ease: "Power1",
            yoyo: true,
            onComplete: function () {
               b.launch();
            },
         });
         that.scene.tweens.add({
            targets: b,
            y: bullet.y,
            duration: t,
            ease: "Linear",
         });
         t = t + 50;
      });
   }

   lazorDamage() {
      if (this.inv === 0) {
         if (this.shields > 0) {
            scene.sounds["shipShield"].play();
            this.shields = 0;
            this.setShield();
            this.setArmor();
            this.inv = 40;
         } else {
            // scene.sounds["shipDamage"].play();
            this.alive = false;
            this.hull = 0;
            scene.sounds["shipExplodes"].play();
            this.ship.setTexture("explosion");
            // this.thrust.visible = false;
            this.ship.play("explosion");
            let that = this;
            this.ship.on(
               "animationcomplete",
               function () {
                  that.ship.destroy();
               },
               this.ship
            );
            gameOver();
         }
      }
   }

   takeDamage(damage) {
      if (this.inv === 0 && !godMode) {
         if (this.shields > 0) {
            scene.sounds["shipShield"].play();
            if (damage !== 10) {
               this.shields--;
            } else {
               if (this.shields > 3) {
                  this.shields = this.shields - 3;
               } else {
                  this.shields = 0;
               }
            }
         } else {
            scene.sounds["shipDamage"].play();
            if (damage === 10) {
               damage = 3;
            }
            if (damage >= this.hull) {
               this.alive = false;
               this.hull = 0;
               scene.sounds["shipExplodes"].play();
               this.ship.setTexture("explosion");
               //  this.thrust.visible = false;
               this.ship.play("explosion");
               let that = this;
               this.ship.on(
                  "animationcomplete",
                  function () {
                     that.ship.destroy();
                  },
                  this.ship
               );
               gameOver();
            } else {
               this.hull -= damage;
            }
         }

         this.setShield();
         this.setArmor();
         this.inv = 40;
      }
   }

   setFirepower() {
      let level = this.firepower;
      _.each(scene.gameVars.weaponPips, function (p) {
         p.visible = false;
      });
      for (let index = 0; index < level; index++) {
         scene.gameVars.weaponPips[index].visible = true;
      }
   }

   setMissiles() {
      let level = this.missiles;
      _.each(scene.gameVars.missilePips, function (p) {
         p.visible = false;
      });
      for (let index = 0; index < level; index++) {
         scene.gameVars.missilePips[index].visible = true;
      }
   }

   setShield() {
      let level = this.shields;
      _.each(scene.gameVars.shieldPips, function (p) {
         p.visible = false;
      });
      for (let index = 0; index < level; index++) {
         scene.gameVars.shieldPips[index].visible = true;
      }
      if (this.shields > 5) {
         this.shield.setFrame(2);
         this.shield.visible = true;
      } else if (this.shields > 3) {
         this.shield.setFrame(1);
         this.shield.visible = true;
      } else if (this.shields > 0) {
         this.shield.setFrame(0);
         this.shield.visible = true;
      } else {
         this.shield.visible = false;
      }
      if (this.shields > 0) {
         this.shield.play("shield" + this.shields);
      }
   }

   setArmor() {
      let level = this.hull;
      _.each(scene.gameVars.hullPips, function (p) {
         p.visible = false;
      });
      for (let index = 0; index < level; index++) {
         scene.gameVars.hullPips[index].visible = true;
      }
   }

   scoreUp(score) {
      if (this.alive) {
         this.score = Math.floor(this.score + score * 879);
         displayScore(this.score);
      }
   }

   fireMissile() {
      if (
         this.missiles > 0 &&
         this.missileCooldown === 0 &&
         !scene.stageTransition &&
         this.alive
      ) {
         this.missileCooldown = 50;
         this.missiles--;
         this.setMissiles();
         this.spread();
      }
   }

   powerUp(type) {
      scene.sounds["powerup"].play();
      switch (type) {
         case 0:
            this.scoreUp(2000);
            if (this.shields === 7) {
               this.scoreUp(800);
            } else {
               this.shields++;
               this.setShield();
            }
            scene.gameVars.shieldBadge.play("pu_activate_0");
            scene.gameVars.shieldBadge.on("animationcomplete", function () {
               scene.gameVars.shieldBadge.play("pu_idle_0");
            });
            break;
         case 1:
            this.scoreUp(2000);
            if (this.firepower === 5) {
               this.scoreUp(8000);
            } else {
               this.firepower++;
               this.setFirepower();
            }
            scene.gameVars.weaponBadge.play("pu_activate_1");
            scene.gameVars.weaponBadge.on("animationcomplete", function () {
               scene.gameVars.weaponBadge.play("pu_idle_1");
            });
            break;
         case 2:
            this.scoreUp(2000);
            if (this.missiles === 5) {
               this.scoreUp(8000);
            } else {
               this.missiles++;
               if (this.missiles !== 5) {
                  this.missiles++;
               }
               this.setMissiles();
            }
            scene.gameVars.missileBadge.play("pu_activate_2");
            scene.gameVars.missileBadge.on("animationcomplete", function () {
               scene.gameVars.missileBadge.play("pu_idle_2");
            });
            break;
         default:
            break;
      }
   }
}

function spawnEnemy(scene, id, path, duration, powerup) {
   if (!Array.isArray(path)) {
      if (path === -1) {
         path = paths[Phaser.Math.Between(0, 9)];
      } else {
         path = paths[path];
      }
   }
   scene.gameVars.enemies.push(
      new Enemy(scene, 1400, 1400, "enemy_" + id, path, duration, powerup)
   );
}

function spawnAsteroid(scene, id, powerup, speed) {
   let y = Phaser.Math.Between(80, 640);
   let speedY = Phaser.Math.Between(-20, 0) / 100;
   if (y > 300) {
      speedY = Phaser.Math.Between(0, 20) / 100;
   }
   scene.gameVars.enemies.push(
      new Asteroid(scene, id, powerup, 1400, y, speed, speedY)
   );
}

function spawnBoss(scene) {
   scene.gameVars.enemies.push(new Boss(scene));
}

function playAnimation(sprite, key) {
   if (
      !sprite.anims.isPlaying ||
      (key !== "player-idle" &&
         sprite.anims.currentAnim.key === "player-idle") ||
      key !== sprite.anims.currentAnim.key
   ) {
      sprite.play(key);
   }
}

function displayScore(score) {
   //  if (score > 999) {
   //     scene.gameVars.nixieCommas[2].setFrame(1);
   //  } else {
   //     scene.gameVars.nixieCommas[2].setFrame(0);
   //  }
   //  if (score > 999999) {
   //     scene.gameVars.nixieCommas[1].setFrame(1);
   //  } else {
   //     scene.gameVars.nixieCommas[1].setFrame(0);
   //  }
   //  if (score > 999999999) {
   //     scene.gameVars.nixieCommas[0].setFrame(1);
   //  } else {
   //     scene.gameVars.nixieCommas[0].setFrame(0);
   //  }
   //  let arr = Array.from(String(score).padStart(12, "0"), Number);
   //  _.each(arr, function (n, i) {
   //     scene.gameVars.nixieDigets[i].setFrame(n);
   //  });
}

function setZone() {
   let level = scene.gameVars.currentZone;
   _.each(scene.gameVars.missilePips, function (p) {
      p.visible = false;
   });
   for (let index = 0; index < level; index++) {
      scene.gameVars.missilePips[index].visible = true;
   }
}

function victory() {
   scene.gameVars.ship.body.setVelocityX(0);
   scene.gameVars.ship.body.setVelocityY(0);
   scene.gameVars.clear.setText("SECTOR CLEAR!\r\n   YOU WON");
   scene.gameVars.ship.body.setBoundsRectangle(
      new Phaser.Geom.Rectangle(-210, 80, GAME_WIDTH + 2000, GAME_HEIGHT - 135)
   );
   scene.stageTransition = true;
   scene.tweens.add({
      targets: scene.gameVars.ship,
      x: 640,
      y: 360,
      ease: "Linear",
      duration: 2000,
   });

   scene.tweens.add({
      targets: scene.gameVars.clear,
      x: 450,
      ease: "Linear",
      duration: 2000,
      onComplete: function () {
         scene.tweens.add({
            targets: scene.gameVars.clear,
            x: 450,
            ease: "Linear",
            duration: 3000,
            onComplete: function () {
               scene.tweens.add({
                  targets: scene.gameVars.clear,
                  x: -500,
                  ease: "Linear",
                  duration: 2000,
                  onComplete: function () {
                     scene.gameVars.clear.x = 1400;
                     score = scene.gameVars.ship.score;

                     scene.scene.start(godMode ? "scoreScene" : "submitScene");
                  },
               });
            },
         });
      },
   });
}

function zoneTransitionOne() {
   scene.gameVars.ship.body.setVelocityX(0);
   scene.gameVars.ship.body.setVelocityY(0);
   scene.gameVars.clear.setText("ZONE " + scene.level + " CLEARED");
   scene.gameVars.ship.body.setBoundsRectangle(
      new Phaser.Geom.Rectangle(-210, 80, GAME_WIDTH + 2000, GAME_HEIGHT - 135)
   );
   scene.stageTransition = true;
   scene.tweens.add({
      targets: scene.gameVars.ship,
      x: 640,
      y: 360,
      ease: "Linear",
      duration: 2000,
   });

   scene.tweens.add({
      targets: scene.gameVars.clear,
      x: 450,
      ease: "Linear",
      duration: 2000,
      onComplete: function () {
         scene.tweens.add({
            targets: scene.gameVars.clear,
            x: 450,
            ease: "Linear",
            duration: 800,
            onComplete: function () {
               scene.tweens.add({
                  targets: scene.gameVars.clear,
                  x: -500,
                  ease: "Linear",
                  duration: 2000,
                  onComplete: function () {
                     scene.gameVars.clear.x = 1400;
                     zoneTransitionTwo();
                  },
               });
            },
         });
      },
   });
}

function zoneTransitionTwo() {
   let zoneExit = scene.add
      .sprite(393, 480, "zoneExit")
      .setOrigin(0)
      .setDepth(1);
   zoneExit.play("zoneExit");
   zoneExit.on("animationcomplete", function () {
      scene.tweens.add({
         targets: scene.gameVars.ship,
         x: 1400,
         ease: "Linear",
         duration: 2000,
         onComplete: function () {
            zoneExit.destroy();
            scene.gameVars.ship.x = -100;
            scene.level++;
            scene.gameVars.counter = 0;
            scene.gameVars.zoneNumber.setFrame(scene.level);
            setZone();
            scene.gameVars.ship.hull = 7;
            scene.gameVars.ship.setArmor();
            scene.tweens.add({
               targets: scene.gameVars.ship,
               x: 640,
               ease: "Linear",
               duration: 2000,
               onComplete: function () {
                  zoneTransitionThree();
               },
            });
            // issue with rocket here
         },
      });
   });
}

function zoneTransitionThree() {
   scene.gameVars.clear.setText("ENTERING ZONE " + scene.level);
   scene.tweens.add({
      targets: scene.gameVars.clear,
      x: 450,
      ease: "Linear",
      duration: 2000,
      onComplete: function () {
         scene.tweens.add({
            targets: scene.gameVars.clear,
            x: 450,
            ease: "Linear",
            duration: 800,
            onComplete: function () {
               scene.tweens.add({
                  targets: scene.gameVars.clear,
                  x: -500,
                  ease: "Linear",
                  duration: 2000,
                  onComplete: function () {
                     scene.gameVars.clear.x = 1400;
                     let zoneEnter = scene.add
                        .sprite(425, 480, "zoneEnter")
                        .setOrigin(0)
                        .setDepth(1);
                     zoneEnter.play("zoneEnter");
                     zoneEnter.on("animationcomplete", function () {
                        zoneEnter.destroy();
                        scene.stageTransition = false;
                        scene.gameVars.ship.body.setBoundsRectangle(
                           new Phaser.Geom.Rectangle(
                              10,
                              80,
                              GAME_WIDTH - 20,
                              GAME_HEIGHT - 135
                           )
                        );
                     });
                  },
               });
            },
         });
      },
   });
}

function setZone() {
   let level = scene.level;
   _.each(scene.gameVars.zonePips, function (p) {
      p.visible = false;
   });
   for (let index = 0; index < level; index++) {
      scene.gameVars.zonePips[index].visible = true;
   }
}

function gameOver() {
   let counter = 9;
   scene.gameOver.visible = true;
   scene.interval = setInterval(function () {
      scene.gameOver.setText("GAME OVER\r\n\r\n\r\n" + counter);
      counter--;
      if (counter === -1) {
         clearInterval(scene.interval);
         score = scene.gameVars.ship.score;
         scene.scene.start(godMode ? "scoreScene" : "submitScene");
      }
   }, 500);
}

function shuffle(array) {
   array.sort(() => Math.random() - 0.5);
}

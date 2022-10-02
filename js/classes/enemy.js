class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, path, duration, powerup) {
    super(scene, x, y, key);
    this.alive = true;
    this.firing = false;
    scene.physics.add.existing(this);
    scene.add.existing(this);
    scene.enemiesGroup.add(this);
    this.type = key;
    this.duration = duration;
    this.index = key.split("_")[1];
    this.inv = true;
    this.tick = 0;
    this.powerup = powerup;

    switch (this.type) {
      case "enemy_1":
        this.setCircle(12);
        this.health = 5;
        break;
      case "enemy_2":
        this.setCircle(12, 6, 6);
        this.health = 15;
        break;
      case "enemy_4":
        this.setCircle(24, 12, 12);
        this.health = 60;
        break;
      case "enemy_6":
        this.setCircle(48, 24, 24);
        this.health = 210;
        break;
      default:
        break;
    }
    this.body.setImmovable();
    this.on("animationcomplete", this.action);
    this.action();
    this.path = { t: 0, vec: new Phaser.Math.Vector2() };
    this.curve = new Phaser.Curves.Spline(path);
    this.points = this.curve.points;
    scene.tweens.add({
      targets: this.path,
      t: 1,
      ease: "Linear",
      duration: duration,
    });
  }

  update() {
    this.curve.getPoint(this.path.t, this.path.vec);
    this.x = this.path.vec.x;
    this.y = this.path.vec.y;
    if (this.x < -20) {
      this.destroy();
    }
    if (this.tick < 20) {
      this.tick++;
    } else {
      this.inv = false;
    }
  }

  action() {
    if (this.firing) {
      this.play("fired_" + this.index);
      this.firing = false;
      this.fire();
    } else {
      if (Phaser.Math.Between(1, 3) === 1) {
        this.play("fire_" + this.index);
        this.firing = true;
      } else {
        this.play("wiggle_" + this.index);
      }
    }
  }
  fire() {
    if (this.x > 1280) {
      return;
    }
    switch (this.type) {
      case "enemy_6":
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 3, 1);
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 3, 2);
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 3, 3);
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 3, 4);
        let that = this;
        setTimeout(function () {
          scene.gameVars.enemyBullets.fireBullet(that.x, that.y, 3, 5);
          scene.gameVars.enemyBullets.fireBullet(that.x, that.y, 3, 6);
          scene.gameVars.enemyBullets.fireBullet(that.x, that.y, 3, 7);
          scene.gameVars.enemyBullets.fireBullet(that.x, that.y, 3, 8);
        }, 200);
        break;
      case "enemy_4":
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 2, 1);
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 2, 2);
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 2, 3);
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 2, 4);
        break;
      case "enemy_2":
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 1, 2);
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 1, 4);
        break;
      case "enemy_1":
        scene.gameVars.enemyBullets.fireBullet(this.x, this.y, 1, 4);
        break;
      default:
        break;
    }
  }

  hit(damage) {
    scene.sounds["tentSquish"].play({
      volume: Phaser.Math.Between(80, 100) / 100,
    });
    if (!this.inv) {
      this.health -= damage;
      if (this.health <= 0) {
        this.body = null;
        this.inv = true;
        this.tick = -10000;
        scene.gameVars.ship.scoreUp(300 * this.index);
        this.play("die_" + this.index);
        this.on("animationcomplete", function () {
          this.die();
        });
      }
    }
  }

  die() {
    this.destroy();
    if (this.powerup > -1) {
      scene.gameVars.powerups.spawn(this.y, this.powerup, this.x);
    }
    if (this.type !== "enemy_1") {
      if (this.type === "enemy_2") {
        for (let j = 0; j < 2; j++) {
          let newPath = paths[Phaser.Math.Between(0, 9)].slice();
          newPath.shift();
          newPath.shift();
          let path = [this.x, this.y].concat(newPath);
          spawnEnemy(scene, 1, path, this.duration / 1.2);
        }
      } else if (this.type === "enemy_4") {
        if (Phaser.Math.Between(1, 2) === 1) {
          for (let j = 0; j < 2; j++) {
            let newPath = paths[Phaser.Math.Between(0, 9)].slice();
            newPath.shift();
            newPath.shift();
            let path = [this.x, this.y].concat(newPath);
            spawnEnemy(scene, 2, path, this.duration / 1.2);
          }
        } else {
          let newPath = paths[Phaser.Math.Between(0, 9)].slice();
          newPath.shift();
          newPath.shift();
          let path = [this.x, this.y].concat(newPath);
          spawnEnemy(scene, 2, path, this.duration / 1.2);
          for (let j = 0; j < 2; j++) {
            let newPath = paths[Phaser.Math.Between(0, 9)].slice();
            newPath.shift();
            newPath.shift();
            let path = [this.x, this.y].concat(newPath);
            spawnEnemy(scene, 1, path, this.duration / 1.2);
          }
        }
      } else if (this.type === "enemy_6") {
        if (Phaser.Math.Between(1, 2) === 1) {
          for (let j = 0; j < 3; j++) {
            let newPath = paths[Phaser.Math.Between(0, 9)].slice();
            newPath.shift();
            newPath.shift();
            let path = [this.x, this.y].concat(newPath);
            spawnEnemy(scene, 2, path, this.duration / 1.2);
          }
        } else {
          let newPath = paths[Phaser.Math.Between(0, 9)].slice();
          newPath.shift();
          newPath.shift();
          let path = [this.x, this.y].concat(newPath);
          spawnEnemy(scene, 2, path, this.duration / 1.2);
          newPath = paths[Phaser.Math.Between(0, 9)].slice();
          newPath.shift();
          newPath.shift();
          path = [this.x, this.y].concat(newPath);
          spawnEnemy(scene, 4, path, this.duration / 1.2);
        }
      }
    }
  }
}

class Asteroid extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, key, powerup, positionX, positionY, speedX, speedY = 0) {
    super(scene, positionX, positionY, "asteroid_" + key);
    this.alive = true;
    scene.physics.add.existing(this);
    scene.add.existing(this);
    scene.enemiesGroup.add(this);
    this.type = key;
    this.inv = true;
    this.powerup = powerup;
    this.speedX = speedX;
    this.speedY = speedY;

    if (key === 1) {
      this.setCircle(16);
      this.health = 25;
    } else {
      this.setCircle(32);
      this.health = 100;
    }
    this.body.setImmovable();
  }

  update() {
    this.x = this.x - this.speedX;
    this.y = this.y - this.speedY;
    if (this.x < -20) {
      this.destroy();
    }
    if (this.tick < 20) {
      this.tick++;
    } else {
      this.inv = false;
    }
  }

  hit(damage) {
    scene.sounds["asteroidHit"].play({
      volume: Phaser.Math.Between(80, 100) / 100,
    });
    if (!this.inv) {
      this.health -= damage;
      if (this.health <= 0) {
        scene.sounds["asteroidDeath"].play({
          volume: Phaser.Math.Between(100, 100) / 100,
        });
        this.body = null;
        this.inv = true;
        this.tick = -10000;
        scene.gameVars.ship.scoreUp(500 * this.type);
        this.play("asteroid_die_" + this.type);
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
    if (this.type === 2) {
      for (let i = 0; i < Math.ceil(scene.level / 2) + 1; i++) {
        scene.gameVars.enemies.push(
          new Asteroid(
            scene,
            1,
            -1,
            this.x,
            this.y,
            this.speedX * (Phaser.Math.Between(50, 125) / 100),
            Phaser.Math.Between(-150, 150) / 100
          )
        );
      }
    }
  }
}

class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 200,
      key: "bullet",
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBullet(x, y, damage, direction) {
    let bullet = this.getFirstDead(false);
    if (bullet) {
      if (damage === 1) {
        bullet.setTexture("bullet", 0);
      } else if (damage === 3) {
        bullet.setTexture("bullet", 1);
      } else if (damage === 5) {
        bullet.setTexture("bullet", 2);
      } else {
        // MISSILE
        bullet.setTexture("missile");
        bullet.play("missile");
      }
      bullet.damage = damage;
      bullet.fire(x, y);
      if (direction) {
        bullet.setDirection(direction);
      }
    }
  }

  spawnBullet(x, y, damage) {
    let bullet = this.getFirstDead(false);
    if (bullet) {
      return bullet.spawn(x, y, damage);
    }
  }
}

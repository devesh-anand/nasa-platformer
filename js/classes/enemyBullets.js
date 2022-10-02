class EnemyBullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 500,
      key: "enemyBullet",
      active: false,
      visible: false,
      classType: EnemyBullet,
    });

    for (let i = 0; i < 200; i++) {
      this.fireBullet(-100, -100);
    }
  }

  fireBullet(x, y, type, direction) {
    let bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y, type, direction);
    }
  }
}

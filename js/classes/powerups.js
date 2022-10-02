class Powerups extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 100,
      key: "powerups",
      active: false,
      visible: false,
      classType: Powerup,
    });
  }

  spawn(y, type, x = 1300) {
    let pu = this.getFirstDead(false);
    if (pu) {
      pu.move(y, type, x);
    }
  }
}

class Orbs extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 6,
      key: "orb",
      active: false,
      visible: false,
      classType: Orb,
    });
  }

  fireOrb(x, y, direction) {
    let orb = this.getFirstDead(false);

    if (orb) {
      orb.damage = 10;
      orb.fire(x, y, direction);
    }
  }
}

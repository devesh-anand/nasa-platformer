class Orb extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "orb");
    // this.scene = scene
  }

  fire(x, y, direction) {
    scene.ebulletGroup.add(this);
    this.body.reset(x, y);
    this.damageValue = 10;
    this.play("orb");
    this.setActive(true);
    this.setVisible(true);
    this.setCircle(85, 40, 40);
    switch (direction) {
      case -1:
        this.setVelocityX(-725);
        this.setVelocityY(306);
        break;
      case 1:
        this.setVelocityX(-725);
        this.setVelocityY(-306);
        break;
      default:
        this.setVelocityX(-800);
        this.setVelocityY(0);
        break;
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.x >= 1500 || this.x < -10) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

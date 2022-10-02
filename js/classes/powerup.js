class Powerup extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "powerups");
    // this.scene = scene
  }

  move(y, type, x) {
    scene.powerupGroup.add(this);
    this.body.reset(x, y);
    this.play("pu_fall_" + type);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(-100);
    this.type = type;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x < -10) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }
}

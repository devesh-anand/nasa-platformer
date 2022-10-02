class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
  }

  fire(x, y) {
    this.body.reset(x, y);
    scene.bulletsGroup.add(this);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(800);
    this.setCircle(12, 20, 20);
    this.angle = 0;
  }

  setDirection(direction) {
    switch (direction) {
      case 1:
        this.setVelocityX(772);
        this.setVelocityY(207);
        this.angle = 15;
        break;
      case -1:
        this.setVelocityX(772);
        this.setVelocityY(-207);
        this.angle = -15;
        break;
      case 2:
        this.setVelocityX(725);
        this.setVelocityY(306);
        this.angle = 25;
        break;
      case -2:
        this.setVelocityX(725);
        this.setVelocityY(-306);
        this.angle = -25;
        break;
      case 3:
        this.setVelocityX(0);
        this.setVelocityY(-800);
        this.angle = -90;
        break;
      case -3:
        this.setVelocityX(0);
        this.setVelocityY(800);
        this.angle = 90;
        break;
      case 4:
        this.setVelocityX(-772);
        this.setVelocityY(207);
        this.angle = 165;
        break;
      case -4:
        this.setVelocityX(-772);
        this.setVelocityY(-207);
        this.angle = -165;
        break;

      default:
        break;
    }
  }

  launch() {
    this.setVelocityX(800);
  }

  spawn(x, y, damage) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    if (damage === 1) {
      this.setFrame(0);
    } else if (damage === 3) {
      this.setFrame(1);
    } else if (damage === 5) {
      this.setFrame(2);
    } else {
      // MISSILE
      this.setTexture("missile");
      this.play("missile");
    }
    this.damage = damage;
    return this;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.x >= 1300 || this.x < -200 || this.y < 0 || this.y > 800) {
      this.setTexture("bullet");
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

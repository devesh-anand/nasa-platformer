class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "enemyBullet");
    // this.scene = scene
  }

  fire(x, y, type, direction) {
    scene.ebulletGroup.add(this);
    let speed = 300;
    let frame = 0;
    if (type === 2) {
      this.damageValue = 2;
      speed = 200;
      frame = 1;
    } else if (type === 1) {
      this.damageValue = 1;
      speed = 300;
      frame = 0;
    } else if (type === 4) {
      this.damageValue = 1;
      speed = 300;
      frame = 0;
    } else {
      this.damageValue = 4;
      speed = 300;
      frame = 2;
    }
    this.body.reset(x, y);
    this.setFrame(frame);
    this.setActive(true);
    this.setVisible(true);
    this.setDepth(1);
    switch (direction) {
      case 1:
        this.setVelocityY(-speed);
        break;
      case 2:
        this.setVelocityX(speed);
        break;
      case 3:
        this.setVelocityY(speed);
        break;
      case 4:
        this.setVelocityX(-speed);
        break;
      case 5:
        this.setVelocityY(-speed * 0.7);
        this.setVelocityX(speed * 0.7);
        break;
      case 6:
        this.setVelocityY(-speed * 0.7);
        this.setVelocityX(-speed * 0.7);
        break;
      case 7:
        this.setVelocityY(speed * 0.7);
        this.setVelocityX(speed * 0.7);
        break;
      case 8:
        this.setVelocityY(speed * 0.7);
        this.setVelocityX(-speed * 0.7);
        break;
      case 10:
        this.setVelocityY(speed * 0.17);
        this.setVelocityX(-speed * 0.98);
        break;
      case 15:
        this.setVelocityY(speed * 0.25);
        this.setVelocityX(-speed * 0.96);
        break;
      case 20:
        this.setVelocityY(speed * 0.34);
        this.setVelocityX(-speed * 0.93);
        break;
      case 25:
        this.setVelocityY(speed * 0.42);
        this.setVelocityX(-speed * 0.9);
        break;
      case 30:
        this.setVelocityY(speed * 0.5);
        this.setVelocityX(-speed * 0.86);
        break;
      case 35:
        this.setVelocityY(speed * 0.57);
        this.setVelocityX(-speed * 0.81);
        break;
      case 40:
        this.setVelocityY(speed * 0.64);
        this.setVelocityX(-speed * 0.75);
        break;
      case 45:
        this.setVelocityY(speed * 0.7);
        this.setVelocityX(-speed * 0.7);
        break;

      case -10:
        this.setVelocityY(-speed * 0.17);
        this.setVelocityX(-speed * 0.98);
        break;
      case -15:
        this.setVelocityY(-speed * 0.25);
        this.setVelocityX(-speed * 0.96);
        break;
      case -20:
        this.setVelocityY(-speed * 0.34);
        this.setVelocityX(-speed * 0.93);
        break;
      case -25:
        this.setVelocityY(-speed * 0.42);
        this.setVelocityX(-speed * 0.9);
        break;
      case -30:
        this.setVelocityY(-speed * 0.5);
        this.setVelocityX(-speed * 0.86);
        break;
      case -35:
        this.setVelocityY(-speed * 0.57);
        this.setVelocityX(-speed * 0.81);
        break;
      case -40:
        this.setVelocityY(-speed * 0.64);
        this.setVelocityX(-speed * 0.75);
        break;
      case -45:
        this.setVelocityY(-speed * 0.7);
        this.setVelocityX(-speed * 0.7);
        break;
      default:
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

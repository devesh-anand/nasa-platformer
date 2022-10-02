let creditsScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function creditsScene() {
    Phaser.Scene.call(this, {
      key: "creditsScene",
    });
  },

  preload: function () {
    this.load.bitmapFont("font", "images/font.png", "images/font.xml");

    this.load.image("pixel1", "images/pixel1.png");
    this.load.image("pixel2", "images/pixel2.png");
    this.load.image("pixel3", "images/pixel3.png");
    this.load.image("play", "images/play.png");
    this.load.image("play-o", "images/play-over.png");
    this.load.image("back", "images/back.png");
    this.load.image("back-o", "images/back-over.png");

    this.load.audio("click", [
      "sounds/effects/click.mp3",
      "sounds/effects/click.wav",
    ]);
  },

  create: function () {
    // set scene for global access
    scene = this;
    this.add.bitmapText(560, 100, "font", "CREDITS").setScale(2);
    this.scoreNames = this.add.bitmapText(
      350,
      200,
      "font",
      "Horrendous code  .......  Ian Lomas\r\nAmazing Pixel Art  .....  '279'\r\nMusic Composer  ........  Phelippe Afonso\r\nEngaging SFX  ..........  Miguel Abuel".toUpperCase()
    );
    this.add.bitmapText(1230, 700, "font", "1.1.0").setScale(0.5);

    this.sounds = [];
    this.sounds["click"] = this.sound.add("click"); //,, { volume: 0.14 });

    let playBtn = this.add
      .image(1030, 650, "play")
      .setOrigin(0)
      .setInteractive();
    let backBtn = this.add.image(50, 650, "back").setOrigin(0).setInteractive();
    playBtn.depth = 1;
    backBtn.depth = 1;

    playBtn.on("pointerover", function (event) {
      this.setTexture("play-o");
    });

    playBtn.on("pointerout", function (event) {
      this.setTexture("play");
    });

    backBtn.on("pointerover", function (event) {
      this.setTexture("back-o");
    });

    backBtn.on("pointerout", function (event) {
      this.setTexture("back");
    });

    playBtn.on(
      "pointerdown",
      function () {
        this.sounds["click"].play();
        this.scene.start("gameScene");
      },
      this
    );

    backBtn.on(
      "pointerdown",
      function () {
        this.sounds["click"].play();
        this.scene.start("menuScene");
      },
      this
    );

    scene.stars = [];
    for (let i = 0; i < 25; i++) {
      const px1 = this.add.image(
        Phaser.Math.Between(0, GAME_WIDTH),
        Phaser.Math.Between(0, GAME_HEIGHT),
        "pixel1"
      );
      // px1.tint = 0x848fa1;
      scene.stars.push(px1);
      const px2 = this.add.image(
        Phaser.Math.Between(0, GAME_WIDTH),
        Phaser.Math.Between(0, GAME_HEIGHT),
        "pixel2"
      );
      // px2.tint = 0x848fa1;
      scene.stars.push(px2);
      const px3 = this.add.image(
        Phaser.Math.Between(0, GAME_WIDTH),
        Phaser.Math.Between(0, GAME_HEIGHT),
        "pixel3"
      );
      // px3.tint = 0x848fa1;
      scene.stars.push(px3);
    }
  },

  update: function () {
    _.each(scene.stars, function (star) {
      switch (star.texture.key) {
        case "pixel1":
          star.x--;
          break;
        case "pixel2":
          star.x = star.x - 2;
          break;
        case "pixel3":
          star.x = star.x - 3;
          break;
      }
      if (star.x < 0) {
        star.x = GAME_WIDTH;
        star.y = Phaser.Math.Between(0, GAME_HEIGHT);
      }
    });
  },
});

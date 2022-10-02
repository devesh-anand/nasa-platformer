let scoreScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function scoreScene() {
    Phaser.Scene.call(this, {
      key: "scoreScene",
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
    this.add.bitmapText(460, 100, "font", "HALL OF FAME").setScale(2);
    this.scoreNames = this.add.bitmapText(750, 200, "font", "");
    this.scoreScores = this.add
      .bitmapText(550, 200, "font", "")
      .setRightAlign();
    this.scoreNumbers = this.add
      .bitmapText(450, 200, "font", "")
      .setRightAlign();
    $.ajax({
      url: "https://us-dev.nightscapes.io/pallet/score.php",
      type: "GET",
      dataType: "json", // added data type
      success: function (res) {
        populateScores(res.scores);
      },
    });

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
        // this.scene.start("submitScene");
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

function populateScores(scoreList) {
  let names = [];
  let scores = [];
  let numbers = [];
  let counter = 1;
  _.each(scoreList, function (score) {
    numbers.push(counter + ".");
    names.push(score.name.toUpperCase());
    scores.push(score.score);
    counter++;
  });
  if (submission && submission.name) {
    numbers.push(" ");
    names.push(" ");
    scores.push(" . . . ");
    numbers.push(submission.position + ".");
    names.push(submission.name.toUpperCase());
    scores.push(submission.score);
    submission = null;
  }
  scene.scoreNames.setText(names.join("\r\n"));
  scene.scoreScores.setText(scores.join("\r\n"));
  scene.scoreNumbers.setText(numbers.join("\r\n"));
}

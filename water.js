var config = {
   type: Phaser.AUTO,
   width: window.innerWidth,
   height: window.innerHeight,
   physics: {
      default: "arcade",
      arcade: {
         gravity: { y: 300 },
         debug: false,
      },
   },
   scene: {
      preload: preload,
      create: create,
      update: update,
   },
};

var player;
var platforms;
var floor;
var stars;
var score = 0;
var scoreText;
var gameOver = false;
var bombs;

let keyA;
let keyS;
let keyD;
let keyW;

var game = new Phaser.Game(config);

function preload() {
   this.load.spritesheet("fish", "assets/sheet/fishes.png", {
      frameHeight: 256,
      frameWidth: 256,
   });
   this.load.image("tile", "assets/water/fishTile_038.png");
   this.load.image("fish1", "assets/water/fishTile_078.png");
   this.load.image("fish2", "assets/water/fishTile_079.png");
   this.load.image("sky", "assets/sky.png");
   this.load.image("ground", "assets/platform.png");
   this.load.image("star", "assets/star.png");
   this.load.image("bomb", "assets/bomb.png");
   this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 48,
      frameHeight: 48,
   });
}
function create() {
   this.add
      .image(window.innerWidth / 2, window.innerHeight / 2, "sky")
      .setDisplaySize(window.innerWidth, window.innerHeight);

   platforms = this.physics.add.staticGroup();

   platforms.create(400, 10, "ground").setScale(6).refreshBody();

   platforms.create(600, 400, "ground");
   platforms.create(50, 250, "ground");
   platforms.create(750, 220, "ground");

   player = this.physics.add.sprite(100, 250, "fish");

   player.setBounce(0.2);
   player.setCollideWorldBounds(true); //understand

   this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("fish", { start: 7, end: 11 }),
      frameRate: 10,
      repeat: -1,
   });

   this.anims.create({
      key: "turn",
      frames: [{ key: "fish", frame: 1 }],
      frameRate: 20,
   });

   this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("fish", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
   });

   cursors = this.input.keyboard.createCursorKeys();

   stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
   });

   stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
   });

   bombs = this.physics.add.group();

   scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
   });

   this.physics.add.collider(player, platforms);
   this.physics.add.collider(stars, platforms);
   this.physics.add.collider(bombs, platforms);

   this.physics.add.overlap(player, stars, collectStar, null, this);

   this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function repeatBlocks(count, startIndex, endIndex, sprite) {
   var platformSpriteCount = count;
   var platformSpriteStart = startIndex;
   while (platformSpriteCount--) {
      platforms.create(
         platformSpriteStart + (5 - platformSpriteCount) * 64,
         endIndex,
         "tile"
      );
   }
}

function update() {
   if (gameOver) {
      return;
   }

   keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
   keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
   keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
   keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

   if (keyA.isDown || cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
   } else if (keyD.isDown || cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
   } else {
      player.setVelocityX(0);

      player.anims.play("turn");
   }

   if ((keyW.isDown || cursors.up.isDown) && player.body.touching.down) {
      player.setVelocityY(-330);
   }
}
function collectStar(player, star) {
   star.disableBody(true, true);

   score += 10;
   scoreText.setText("Score: " + score);

   if (stars.countActive(true) === 0) {
      stars.children.iterate(function (child) {
         child.enableBody(true, child.x, 0, true, true);
      });

      var x =
         player.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
   }
}

function hitBomb(player, bomb) {
   this.physics.pause();

   player.setTint(0xff0000);

   player.anims.play("turn");

   gameOver = true;
}

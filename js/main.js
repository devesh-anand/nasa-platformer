let config = {
   // type: Phaser.AUTO,
   type: Phaser.CANVAS,
   width: GAME_WIDTH,
   height: GAME_HEIGHT,
   backgroundColor: "#2aa4f5",
   parent: "wrapper",
   scene: [
      menuScene,
      gameScene,
      scoreScene,
      submitScene,
      helpScene,
      creditsScene,
   ],
   roundPixels: true,
   pixelArt: true,
   physics: {
      default: "arcade",
      arcade: {
         // debug: true,
         gravity: { y: 0 },
      },
   },
   // scale: {
   //   parent: "wrapper",
   //   mode: Phaser.Scale.FIT,
   //   width: GAME_WIDTH,
   //   height: GAME_HEIGHT,
   // },
};

let game = new Phaser.Game(config);

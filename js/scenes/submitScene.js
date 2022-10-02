let submitScene = new Phaser.Class({
   Extends: Phaser.Scene,
   initialize: function submitScene() {
      Phaser.Scene.call(this, {
         key: "submitScene",
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
      this.load.image("clear", "images/clear.png");
      this.load.image("clear-o", "images/clear-over.png");
      this.load.image("random", "images/random.png");
      this.load.image("random-o", "images/random-over.png");
      this.load.image("submit", "images/submit.png");
      this.load.image("submit-o", "images/submit-over.png");

      this.load.spritesheet("cursor", "images/cursor_large.png", {
         frameWidth: 64,
         frameHeight: 80,
      });

      this.load.spritesheet("letters", "images/fontSheet.png", {
         frameWidth: 18,
         frameHeight: 33,
      });

      this.load.audio("click", [
         "sounds/effects/click.mp3",
         "sounds/effects/click.wav",
      ]);
   },

   create: function () {
      if (bossmusic.isPlaying) {
         bossmusic.stop();
      }

      if (!music.isPlaying) {
         music.play();
      }
      // set scene for global access
      scene = this;
      this.submitting = false;
      // this.add
      //   .bitmapText(650, 100, "font", "SUBMIT SCORE")
      //   .setScale(2)
      //   .setOrigin(0.5)
      //   .setCenterAlign();
      // this.add
      //   .bitmapText(650, 200, "font", score)
      //   .setScale(2)
      //   .setOrigin(0.5)
      //   .setCenterAlign();

      this.sounds = [];
      this.sounds["click"] = this.sound.add("click"); //,, { volume: 0.14 });

      this.letters = [
         " ",
         "!",
         ",",
         ".",
         "0",
         "1",
         "2",
         "3",
         "4",
         "5",
         "6",
         "7",
         "8",
         "9",
         "?",
         "A",
         "B",
         "C",
         "D",
         "E",
         "F",
         "G",
         "H",
         "I",
         "J",
         "K",
         "L",
         "M",
         "N",
         "O",
         "P",
         "Q",
         "R",
         "S",
         "T",
         "U",
         "V",
         "W",
         "X",
         "Y",
         "Z",
         "%",
         "",
      ];

      //keys = this.input.keyboard.addKeys(this.letters.join(','));
      this.input.keyboard.on("keyup", keyup, this);
      this.letterSlots = [];
      this.slots = [];
      for (let i = 0; i < 8; i++) {
         let slot = this.add
            .sprite(370 + i * 70, 350, "cursor")
            .setOrigin(0)
            .setInteractive()
            .setScale(2)
            .setFrame(0);
         let letter = this.add
            .sprite(384 + i * 70, 358, "letters")
            .setOrigin(0)
            .setFrame(Phaser.Math.Between(1, 42))
            .setScale(2);
         this.add
            .sprite(370 + i * 70, 270, "cursor")
            .setOrigin(0)
            .setInteractive()
            .setScale(2)
            .setFrame(1)
            .on(
               "pointerdown",
               function () {
                  this.sounds["click"].play();
                  highlightTile(i);
                  if (letter.frame.name === 0) {
                     letter.setFrame(40);
                  } else {
                     letter.setFrame(letter.frame.name - 1);
                  }
               },
               this
            )
            .on("pointerover", function () {
               this.setFrame(6);
            })
            .on("pointerout", function () {
               this.setFrame(1);
            });

         this.add
            .sprite(370 + i * 70, 430, "cursor")
            .setOrigin(0)
            .setInteractive()
            .setFrame(3)
            .setScale(2)
            .on(
               "pointerdown",
               function () {
                  this.sounds["click"].play();
                  highlightTile(i);
                  letter.setFrame(letter.frame.name + 1);
               },

               this
            )
            .on("pointerover", function () {
               this.setFrame(8);
            })
            .on("pointerout", function () {
               this.setFrame(3);
            });
         this.slots.push(slot);
         this.letterSlots.push(letter);
      }
      this.inserter = 0;
      highlightTile(0);

      let playBtn = this.add
         .image(1030, 650, "play")
         .setOrigin(0)
         .setInteractive();
      let backBtn = this.add
         .image(50, 650, "back")
         .setOrigin(0)
         .setInteractive();
      let subBtn = this.add
         .image(545, 650, "submit")
         .setOrigin(0)
         .setInteractive();
      let clearBtn = this.add
         .image(1030, 375, "clear")
         .setOrigin(0)
         .setInteractive();
      let randBtn = this.add
         .image(50, 375, "random")
         .setOrigin(0)
         .setInteractive();
      playBtn.depth = 1;
      backBtn.depth = 1;
      subBtn.depth = 1;
      clearBtn.depth = 1;
      randBtn.depth = 1;

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

      subBtn.on("pointerover", function (event) {
         this.setTexture("submit-o");
      });

      subBtn.on("pointerout", function (event) {
         this.setTexture("submit");
      });

      clearBtn.on("pointerover", function (event) {
         this.setTexture("clear-o");
      });

      clearBtn.on("pointerout", function (event) {
         this.setTexture("clear");
      });

      randBtn.on("pointerover", function (event) {
         this.setTexture("random-o");
      });

      randBtn.on("pointerout", function (event) {
         this.setTexture("random");
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

      subBtn.on("pointerdown", submitScore, this);

      clearBtn.on(
         "pointerdown",
         function () {
            this.sounds["click"].play();
            populateLetters(" ");
            scene.inserter = 0;
            highlightTile(scene.inserter);
         },
         this
      );

      randBtn.on(
         "pointerdown",
         function () {
            this.sounds["click"].play();
            populateLetters(animals[Phaser.Math.Between(0, 191)]);
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
      populateLetters(
         scoreName ? scoreName : animals[Phaser.Math.Between(0, 191)]
      );
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

function populateLetters(word) {
   let counter = 0;
   if (word) {
      word = word.toUpperCase().split("");
   } else {
      word = "POTATO".split("");
   }
   _.each(scene.letterSlots, function (s) {
      let letter = 0;
      if (word[counter]) {
         letter = scene.letters.indexOf(word[counter]);
      }
      s.setFrame(letter);
      counter++;
   });
}

function extractLetters() {
   let str = "";
   _.each(scene.letterSlots, function (s) {
      str += scene.letters[s.frame.name];
   });
   return str;
}

function highlightTile(i) {
   _.each(scene.slots, function (s) {
      s.setFrame(0);
   });
   scene.slots[i].setFrame(5);
}

function keyup(event) {
   moveInserter = false;
   if (event.keyCode >= 48 && event.keyCode <= 57) {
      moveInserter = true;
      scene.letterSlots[scene.inserter].setFrame(event.keyCode - 44);
   } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      moveInserter = true;
      scene.letterSlots[scene.inserter].setFrame(event.keyCode - 50);
   } else if (event.keyCode == 32) {
      moveInserter = true;
      scene.letterSlots[scene.inserter].setFrame(0);
   } else if (event.keyCode == 190) {
      moveInserter = true;
      scene.letterSlots[scene.inserter].setFrame(3);
   } else if (event.keyCode == 188) {
      moveInserter = true;
      scene.letterSlots[scene.inserter].setFrame(2);
   } else if (event.keyCode == 13) {
      submitScore();
   }
   if (moveInserter) {
      scene.sounds["click"].play();
      scene.inserter++;
      if (scene.inserter === 8) {
         scene.inserter = 0;
      }
      highlightTile(scene.inserter);
   }
}

function submitScore() {
   scene.sounds["click"].play();
   if (!scene.submitting) {
      scene.submitting = true;
      scoreName = extractLetters();
      data = btoa(
         '{ "name": "' + extractLetters() + '", "score": ' + score + "}"
      );
      $.ajax({
         type: "POST",
         url: "https://us-dev.nightscapes.io/pallet/score.php",
         data: { data: data },
         dataType: "json", // added data type
         success: function (res) {
            submission = res;
            scene.scene.start("scoreScene");
         },
      });
   }
}

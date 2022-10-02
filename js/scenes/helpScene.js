let helpScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function zoneScene() {
    Phaser.Scene.call(this, {
      key: "helpScene",
    });
  },

  preload: function () {},

  create: function () {
    // set scene for global access
    scene = this;
  },

  update: function () {},
});

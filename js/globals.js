const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

let levels = [level_1, level_2, level_3, level_4, level_5];
let scene; // game scene
let score = 123;
let music;
let bossmusic;
let diff = 1; // 0 hard, 1 medium, 2 easy
let godMode = false;
let submission = null;
let scoreName = null;
// let muteAll = false;

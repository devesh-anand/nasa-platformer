const level_3 = [
  {
    time: 40,
    powerup: 0,
    y: 360,
  },
  {
    time: 200,
    asteroid: 1,
    speed: 3,
  },
  {
    time: 300,
    asteroid: 1,
    speed: 3,
  },
  {
    time: 400,
    asteroid: 1,
    speed: 3,
  },
  {
    time: 400,
    asteroid: 1,
    speed: 3.25,
  },
  {
    time: 500,
    asteroid: 1,
    speed: 3,
  },
  {
    time: 500,
    asteroid: 1,
    speed: 3,
  },
  {
    time: 500,
    asteroid: 1,
    speed: 3,
  },
  {
    time: 700,
    asteroid: 2,
    powerup: 2,
    speed: 3,
  },
  {
    time: 800,
    asteroid: 1,
    speed: 3.25,
  },
  {
    time: 800,
    asteroid: 1,
    speed: 3.25,
  },
  {
    time: 1100,
    asteroid: 2,
    speed: 3,
  },
  {
    time: 1200,
    enemy: 2,
    path: 0,
    duration: 60000,
  },
  {
    time: 1200,
    enemy: 1,
    path: 1,
    duration: 60000,
  },
  {
    time: 1350,
    enemy: 2,
    powerup: 2,
    path: 1,
    duration: 60000,
  },
  {
    time: 1350,
    enemy: 1,
    path: 0,
    duration: 60000,
  },
  // more t1's
  {
    time: 1750,
    enemy: 2,
    path: 2,
    duration: 60000,
  },
  {
    time: 1750,
    enemy: 1,
    path: 3,
    duration: 60000,
  },
  {
    time: 1750,
    powerup: 2,
    y: 100,
  },
  {
    time: 1850,
    enemy: 2,
    path: 2,
    duration: 60000,
  },
  {
    time: 1850,
    enemy: 1,
    path: 3,
    duration: 60000,
  },
  // some t2's
  {
    time: 2100,
    enemy: 4,
    path: 5,
    powerup: 0,
    duration: 60000,
  },
  {
    time: 2100,
    enemy: 4,
    path: 6,
    duration: 60000,
  },
  {
    time: 2300,
    enemy: 2,
    path: 5,
    duration: 60000,
  },
  {
    time: 2300,
    enemy: 4,
    path: 6,
    duration: 60000,
  },
  // and we're back to T1's and T2's but faster!

  {
    time: 2600,
    enemy: 2,
    path: 0,
    duration: 50000,
  },
  {
    time: 2600,
    asteroid: 1,
    speed: 6.25,
  },
  {
    time: 2600,
    asteroid: 1,
    speed: 6.25,
  },
  {
    time: 2600,
    enemy: 2,
    path: 1,
    duration: 50000,
  },
  {
    time: 2650,
    powerup: 0,
    y: 400,
  },
  {
    time: 2750,
    enemy: 2,
    path: 1,
    duration: 50000,
  },
  {
    time: 2750,
    enemy: 2,
    path: 0,
    duration: 50000,
  },
  // more t1's
  {
    time: 3050,
    enemy: 2,
    powerup: 1,
    path: 7,
    duration: 50000,
  },
  {
    time: 3050,
    enemy: 2,
    path: 8,
    duration: 50000,
  },
  {
    time: 3050,
    powerup: 2,
    y: 100,
  },
  {
    time: 3150,
    enemy: 2,
    powerup: 1,
    path: 7,
    duration: 50000,
  },
  {
    time: 3150,
    enemy: 2,
    path: 8,
    duration: 50000,
  },
  {
    time: 3150,
    asteroid: 1,
    speed: 3.25,
  },
  {
    time: 3150,
    asteroid: 1,
    speed: 3.25,
  },
  {
    time: 3150,
    asteroid: 1,
    speed: 3.25,
  },
  {
    time: 3150,
    asteroid: 1,
    speed: 3.25,
  },
  // some t2's
  {
    time: 3400,
    enemy: 4,
    path: 5,
    duration: 50000,
  },
  {
    time: 3400,
    enemy: 4,
    powerup: 2,
    path: 6,
    duration: 50000,
  },
  {
    time: 3500,
    enemy: 4,
    path: 5,
    duration: 50000,
  },
  {
    time: 3500,
    enemy: 4,
    path: 6,
    duration: 50000,
  },
  // and we're back to t1's one last time!
  {
    time: 3800,
    enemy: 2,
    path: 0,
    duration: 40000,
  },
  {
    time: 3800,
    asteroid: 2,
    speed: 3.25,
  },
  {
    time: 3800,
    enemy: 1,
    path: 1,
    duration: 40000,
  },
  {
    time: 4050,
    enemy: 1,
    path: 1,
    duration: 40000,
  },
  {
    time: 4050,
    enemy: 2,
    path: 0,
    duration: 40000,
  },
  // more t1's
  {
    time: 4150,
    enemy: 1,
    path: 7,
    duration: 40000,
  },
  {
    time: 4100,
    asteroid: 2,
    speed: 3.25,
  },
  {
    time: 4150,
    enemy: 2,
    path: 8,
    duration: 40000,
  },
  {
    time: 4350,
    enemy: 1,
    path: 7,
    duration: 40000,
  },
  {
    time: 4350,
    enemy: 2,
    powerup: 0,
    path: 8,
    duration: 40000,
  },

  // and finally, some T6's!

  {
    time: 4350,
    enemy: 6,
    path: 8,
    duration: 60000,
  },
  {
    time: 4350,
    enemy: 6,
    path: 4,
    duration: 60000,
  },
  {
    time: 4350,
    powerup: 1,
    y: 260,
  },
  {
    time: 4500,
    asteroid: 2,
    speed: 3.25,
  },
  {
    time: 4500,
    asteroid: 2,
    speed: 3.25,
  },
  {
    time: 4500,
    asteroid: 2,
    speed: 3.25,
  },
  {
    time: 4500,
    asteroid: 2,
    speed: 3.25,
  },
  {
    time: 4600,
    asteroid: 2,
    speed: 3.25,
  },
];
try {
  module.exports = level_3;
} catch (err) {}

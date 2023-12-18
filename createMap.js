/* CREATE MAP LAYOUT
  0 = No Tile
  1 = O.T = Normal Tile
  2 = O.JT = Jump Tile
  3 = O.B = Box Obstacle 
  4 = O.MT = Moving Tile 
  5 = O.MJT = Moving Jump Tile 
  6 = O.MBY = Moving Box Obstacle In Y-axis
  7 = O.MBX = Moving Box Obstacle In X-axis

  99 = O.ET = End Tile
  To Make : CheckPoint Tile */

//enum
const O = {
  T: 1,
  JT: 2,
  B: 3,
  MT: 4,
  MJT: 5,
  MBY: 6,
  MBX: 7,
  ET: 99,
};

const data = [
  //ALL NORMAL TILES
  [O.T, O.T, O.T, O.T, O.T], //our start
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  //   /* ---------------------------------------- OBSTACLES START HERE ----------------------------------------------------------------*/

  // 2 sides Moving Box - X-axis
  [O.MBX, O.T, 0, O.T, O.MBX],
  [O.MBX, O.T, 0, O.T, O.MBX],
  [O.MBX, O.T, O.T, O.T, O.MBX],
  [O.MBX, O.T, O.T, O.T, O.MBX],

  //Walking
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],

  // Simple Moving Box - Y-axis
  [0, O.T, 0, O.T, 0],
  [0, O.MBY, 0, O.MBY, 0],
  [0, 0, 0, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.MBY, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],

  [0, 0, O.MBY, 0, 0],
  [0, 0, 0, 0, 0],

  // Walking
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],

  //straight simple walking path
  [0, O.MBY, O.T, O.MBY, 0],
  [0, O.MBY, O.T, O.MBY, 0],
  [0, O.MBY, O.T, O.MBY, 0],
  [0, O.MBY, O.T, O.MBY, 0],
  [0, O.MBY, O.T, O.MBY, 0],

  //Walking
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],

  // MOVING NORMAL TILE
  [0, 0, O.MT, 0, 0],

  //Walking
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],

  // MOVING JUMPING TILE
  [0, 0, O.MT, 0, 0],

  //Walking
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],

  //SIMPLE OBSTACLE
  [0, O.B, O.T, O.B, 0],
  [0, O.B, O.T, O.B, 0],
  [0, 0, O.T, 0, 0],

  //Walking
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  //JUMP TRAP
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.B, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],

  //Right Sided
  [O.T, 0, 0, 0, O.T],
  [O.T, 0, 0, 0, O.T],
  [O.T, 0, 0, 0, O.T],

  [O.T, O.T, 0, O.T, O.T],
  [O.T, O.T, 0, O.T, O.T],
  [O.T, O.T, 0, O.T, O.T],

  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  //Walking
  [0, O.T, O.T, O.T, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],

  //Blocks - center open
  [O.B, O.B, O.T, O.B, O.B],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  //Blocks - 2 sides open
  [O.B, O.T, O.B, O.T, O.B],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  //Blocks - center open
  [O.B, O.B, O.T, O.B, O.B],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  //Blocks - Right side open
  [O.B, O.B, O.B, O.T, O.B],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  //Blocks - center open
  [O.B, O.B, O.T, O.B, O.B],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  //Blocks - Left side open
  [O.B, O.T, O.B, O.T, O.B],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  //Blocks - center open
  [O.B, O.B, O.T, O.B, O.B],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  // BRIDGE
  [O.T, O.B, O.T, O.B, 0],

  //FOR NORMAL TILES CURVE
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],

  [0, 0, O.T, O.T, 0],
  [0, 0, O.T, O.T, 0],
  [0, 0, 0, O.T, 0],
  [0, 0, 0, O.T, 0],
  [0, 0, 0, O.T, 0],

  [0, 0, O.T, O.T, 0],
  [0, 0, O.T, O.T, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],

  [0, O.T, O.T, 0, 0],
  [0, O.T, O.T, 0, 0],
  [0, O.T, 0, 0, 0],

  [0, O.T, 0, 0, 0],
  [0, O.T, 0, 0, 0],

  [0, O.T, O.T, 0, 0],
  [0, O.T, O.T, 0, 0],

  //FOR JUMP TILES CURVE JUMPS
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [0, O.T, 0, O.T, 0],

  [O.T, O.T, 0, O.T, O.T],
  [O.T, O.T, 0, O.T, O.T],
  [0, 0, O.T, 0, 0],
  [0, O.T, O.T, O.T, 0],

  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0],
  [O.T, O.T, 0, O.T, O.T],
  [O.T, O.T, 0, O.T, O.T],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],

  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, 0, 0, 0, 0],

  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],

  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],

  [0, 0, O.JT, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],

  [0, 0, O.T, 0, 0],
  [0, O.B, O.T, O.B, 0],

  //sixth, puzzle
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, 0, O.T, 0, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.T, O.T, 0],
  [0, O.T, O.JT, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [0, O.JT, 0, O.JT, 0],
  [0, O.B, 0, O.B, 0],
  [0, 0, 0, 0, 0],

  [0, O.T, 0, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [0, O.T, 0, O.T, 0],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  [O.MBX, O.T, O.MBX, O.T, O.MBX],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.MBY, O.T, O.MBY, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  [O.MBY, O.T, O.MBY, O.T, O.MBY],

  [O.T, O.T, O.T, O.T, O.T],
  [O.T, 0, O.T, 0, O.T],
  [0, O.T, 0, O.T, 0],
  [O.T, 0, O.T, 0, O.T],
  [0, O.T, 0, O.T, 0],
  [O.T, 0, O.T, 0, O.T],
  [0, O.T, 0, O.T, 0],
  [O.T, 0, O.T, 0, O.T],
  [0, O.T, 0, O.T, 0],
  [O.T, 0, O.T, 0, O.T],
  [0, O.T, 0, O.T, 0],
  [O.T, 0, O.T, 0, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  [0, O.MBX, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, O.MBX, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, O.MBX, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, O.MBX, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, O.MBX, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],

  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],

  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MJT, 0, 0],
  [0, 0, O.MJT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MJT, 0, 0],
  [0, 0, O.MJT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MJT, 0, 0],
  [0, 0, O.MJT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, 0, O.MT, 0, 0],
  [0, O.MBX, O.MT, 0, 0],
  [0, O.MBX, O.MT, 0, 0],
  [0, O.MBX, O.MT, 0, 0],

  [0, 0, O.MT, 0, 0],

  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.T, O.T, O.T, O.T, O.T],
  [O.ET, O.ET, O.ET, O.ET, O.ET],
  [O.ET, O.ET, O.ET, O.ET, O.ET],
  [O.ET, O.ET, O.ET, O.ET, O.ET],
  [O.ET, O.ET, O.ET, O.ET, O.ET],
];

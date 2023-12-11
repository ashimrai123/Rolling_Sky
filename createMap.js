
/* CREATE MAP LAYOUT
  0 = No Tile
  1 = Normal Tile
  2 = Jump Tile
  3 = Box Obstacle 
  99 = End Tile
  To Make : CheckPoint Tile */
const data = [
    [1, 1, 1, 1, 1], //our start
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 2, 2, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 3, 1, 3, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 1, 3, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [3, 1, 1, 3, 3],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [0, 3, 3, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 3],
    [0, 3, 1, 1, 3],
    [0, 3, 1, 1, 3],
    [0, 3, 1, 1, 3],
    [0, 1, 1, 3, 0],
    [0, 1, 1, 3, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 2, 3, 2, 0],
    [0, 0, 3, 0, 0],
    [0, 1, 3, 0, 0],
    [0, 1, 3, 3, 0],
    [0, 2, 1, 3, 0],
    [0, 1, 1, 3, 0],
    [0, 1, 1, 3, 0],
    [0, 1, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 3, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [2, 1, 2, 1, 2],
    [0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],

    [0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],

    [0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],

    [0, 2, 0, 2, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [99, 99, 99, 99, 99],
    [99, 99, 99, 99, 99],
    [99, 99, 99, 99, 99],
    [99, 99, 99, 99, 99],
  







  ];

  
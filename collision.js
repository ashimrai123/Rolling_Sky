// let jumpFlag = false;
const maxHeight = 7;
let jumpFlag = true;
function checkCollision(
  tileX,
  tileZ,
  tileSize,
  sphereX,
  sphereY,
  sphereZ,
  sphereRadius
) {
  // Calculate the distance between the centers of the sphere and the tile in 2D (x, z) space
  const deltaX = tileX - sphereX;
  const deltaZ = tileZ - sphereZ;
  const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);

  // Check if the distance is less than the sum of the radii for collision
  return distance < tileSize / 2 + sphereRadius;
}

function handleCollisions() {
  // Iterate through tiles and check for collision with Sphere 1
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const tileType = data[row][col];
      // Check collision only for tiles
      if (
        tileType == 1 ||
        tileType == 2 ||
        tileType == 3 ||
        tileType == 4 ||
        tileType == 5 ||
        tileType == 99
      ) {
        const tileX = col * tileSize - 2 * tileSize;
        const tileZ = row * -4.0 - 5;

        if (
          checkCollision(
            tileX,
            tileZ,
            tileSize,
            mainPositionX,
            mainPositionY,
            mainPositionZ,
            sphere1Radius
          )
        ) {
          switch (tileType) {
            case 1: //Normal Tile
            case 4: //
              if (
                mainPositionY >= tileHeight - 1 &&
                mainPositionY <= tileHeight + 1
              ) {
                mainPositionY = tileHeight;
              }
            
            case 2:
            case 5:
              if (
                mainPositionY >= tileHeight - 1 &&
                mainPositionY <= tileHeight + 1
              ) {
                jumpFlag = true;
              }
              if (mainPositionY >= maxHeight) {
                jumpFlag = false;
              }
              if (jumpFlag) {
                mainPositionY += jumpVelocity;
              }
              break;
            case 3:
              if (mainPositionY <= boxHeight) {
                tryAgain();
              }
              break;

            case 99:
              endGame();
              break;
          }
        }
      }
    }
  }
}

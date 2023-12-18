

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
  return distance < tileSize / 2 + sphereRadius ;
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
        tileType == 6 ||
        tileType == 7 ||
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
          handleCollisionForTile(tileType);
        }

        if ( tileType == 7) {
          // Check collision for moving box obstacle in X-axis
          const boxX = movingTilePositionBox + col * tileSize - 2 * tileSize;
          const boxZ = row * -4.0 - 5;

          if (
            checkCollision(
              boxX,
              boxZ,
              mboxSize, 
              mainPositionX,
              mainPositionY,
              mainPositionZ,
              sphere1Radius
            )
          ) {
            if (mainPositionY <= boxHeight ){
              tryAgainMenu();

            }
          }
      }

      // Check collision for moving Normal tiles in X-axis
      if (tileType == 4) {
        const tileX = movingTilePosition + col * tileSize - 2 * tileSize;
        const tileZ = row * -4.0 - 5;
        if (
          checkCollision(
            tileX,
            tileZ,
            movTileSize,
            mainPositionX,
            mainPositionY,
            mainPositionZ,
            sphere1Radius
          )
        ) {
          if (
            mainPositionY >=  -1.5 // tile's y-coordinate is -1, 0.5 is added in case of gravity applied 
             && mainPositionY <= 0.9 // letting sphere float above 0.9 
          ) {
            mainPositionY = 0.9 ; // sphere's radius is 0.9
            gravityAcceleration = 0.001; //ball is on ground, the gravity acceleration stops;

          }
  
        }
      }

      // Check collision for moving JUmp tiles
      if (tileType == 5) {        
        const jTileX =
          jmovingTilePosition + col * tileSize - 2 * tileSize;
        const jTileZ = row * -4.0 - 5;

        if (
          checkCollision(
            jTileX,
            jTileZ,
            jmovTileSize,
            mainPositionX,
            mainPositionY,
            mainPositionZ,
            sphere1Radius
          )
        ) {
          if (
            mainPositionY >=  -1.5 // tile's y-coordinate is -1, 0.5 is added in case of gravity applied 
        && mainPositionY <= 0.9 // letting sphere float above 0.9 
      ) {
        jumpFlag = true; // allowed to jump 
      }    }
      }
    }
  }

    }
    }
 


  function handleCollisionForTile(tileType){
    switch(tileType){
      case 1: //Normal Tile
        if (
          mainPositionY >=  -1.5 // tile's y-coordinate is -1, 0.5 is added in case of gravity applied 
           && mainPositionY <= 0.9 // letting sphere float above 0.9 
        ) {
          mainPositionY = 0.9 ; // sphere's radius is 0.9
          gravityAcceleration = 0.001; //ball is on ground, the gravity acceleration stops;

        }
        
        break;

      case 2: // Jump Tile
      if (
        mainPositionY >=  -1.5 // tile's y-coordinate is -1, 0.5 is added in case of gravity applied 
        && mainPositionY <= 0.9 // letting sphere float above 0.9 
      ) {
        jumpFlag = true; // allowed to jump 
      }
        break;

      case 3: //Box Obstacle
      case 6: // Moving Box Obstacle Y-axis
        if (mainPositionY <= boxHeight ) {
          tryAgainMenu(); // Restart the game 
        }
        break;

      case 99:
        winGameMenu(); //End of the game
        mainPositionZ -= walkingSpeed;
        mainPositionY -= gravity; 
        cameraPosition[2] -= walkingSpeed;
        break;
    }
      
    }
  





    function checkCollision(tileX, tileZ, tileSize, sphereX, sphereY, sphereZ, sphereRadius) {
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
            if (tileType == 1 || tileType == 2 || tileType == 3)  {
            const tileX = col * tileSize - 2 * tileSize;
            const tileZ = row * (-4.0) - 5;
    
            if (checkCollision(tileX, tileZ, tileSize, mainPositionX, mainPositionY, mainPositionZ, sphere1Radius)) {
            if(tileType ==1){
            if (mainPositionY >= tileHeight - 1 && mainPositionY <= tileHeight) {
                mainPositionY = tileHeight;
            }
            
                    }
            else if (tileType == 2 ) {
                //Jump if collision with tile 2
                
                    mainPositionY += jumpVelocity;
        

                    }

            else if(tileType == 3){
                            tryAgain();
                        }
            else if(tileType == 99){
                endGame();
            }
            
                
                
            }
            
        }
        
        }
    }
    }
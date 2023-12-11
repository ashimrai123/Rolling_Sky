function tryAgain() {
    // Reset ball position and any other game state variables
    mainPositionX = 0;

    mainPositionY = 0.2;
    mainPositionZ = -8.0;
    cameraPosition[2] = 5.0;
    // You can add any additional game reset logic here
  
    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
  

  function endGame(){
    
  }
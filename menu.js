function tryAgain() {
  // Reset ball position 
  mainPositionX = 0;

  mainPositionY = 0.2;
  mainPositionZ = -8.0;
  cameraPosition[2] = 5.0;

  // Clear the canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
}


function endGame(){
  
}
function tryAgain() {
    // Reset ball position 
    mainPositionX = 0;

    mainPositionY = 0.4;
    mainPositionZ = -8.0;
    cameraPosition[2] = 5.0;
    tryAgainFlag =false;

  
    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
  }
  
  
  // function intro(){
  //   cameraPosition[0] = 0;
  //   cameraPosition[1] = 4;
  //   cameraPosition[2] = 20;

  //    introStartTime = Date.now();

  //    introStart=false;
  //   animateIntro();
    
  // }
  // function animateIntro(){
  //   const currentTime = Date.now();
  //   const timeElapsed = currentTime - introStartTime;
  //   if(timeElapsed <= 1000){
  //     const progress = timeElapsed / 1000;
  //     cameraPosition[2] = 20 - 10*progress;
  //     requestAnimationFrame(animateIntro);
  //   }
  //   else 
  //   {cameraPosition[2]=10;
  //   requestAnimationFrame(render)}
  // }
  // animateIntro();

  function endGame(){
    
  }


  function pause(){

  }
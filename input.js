//input.js


let keys = {}; // Object to track which keys are currently pressed

  window.addEventListener('keydown', (e) => {
    e.preventDefault();
    keys[e.key] = true;
    
  });

  window.addEventListener('keyup', (e) => {
    e.preventDefault();

    keys[e.key] = false;
  });




  function handleKeys() {
    const speed = 0.15; // Adjust the speed as needed



    // if (keys['w']|| keys['KeyW']) {
    //   mainPositionY += speed;
    // }

    // if (keys['s'] || keys['KeyS']) {
    //   mainPositionY -= speed;
    // }

    if (keys['ArrowLeft']) {
      mainPositionX -= speed;
    }

    if (keys['ArrowRight']) {
      mainPositionX += speed;
    }
    // if (keys['ArrowUp'] ) {
    //   // Move forward logic
    //   mainPositionZ -= speed;
    // }
    
    // if (keys['ArrowDown']) {
    //   // Move backward logic
    //   mainPositionZ += speed;
    // }

    if (keys['i'] || keys['KeyI']) {
      // Move camera along the positive Z-axis
      cameraPosition[2] -= speed;
    }

    if (keys['k'] || keys['KeyK']) {
      // Move camera along the negative Z-axis
      cameraPosition[2] += speed;
    }

    if (keys['j'] || keys['KeyJ']) {
      // Move camera along the negative X-axis
      cameraPosition[0] -= speed;
    }

    if (keys['l'] || keys['KeyL']) {
      // Move camera along the positive X-axis
      cameraPosition[0] += speed;
    }

    if (keys['t'] || keys['KeyT']) {
      // Move camera along the positive Y-axis
      cameraPosition[1] += speed;
    }

    if (keys['g'] || keys['KeyG']) {
      // Move camera along the negative Y-axis
      cameraPosition[1] -= speed;
    }
  }



//PAUSE LOGIC 


let lastKeyPressTime = 0;
const debounceInterval = 120; 
let pausedTime =0;
let totalPausedTime =0;

  function handlePause(){
    const currentTime = Date.now();
    if(keys[' '] && currentTime - lastKeyPressTime >debounceInterval){
      pauseGame = !pauseGame;
      lastKeyPressTime = currentTime; 
      if (pauseGame) {
        // If the game is paused, record the start time of the pause
        pauseStartTime = currentTime;
      } else {
        // If the game is unpaused, calculate the pause duration and add it to totalPausedTime
        const pauseDuration = currentTime - pauseStartTime;
        totalPausedTime += pauseDuration;
      }
    }
    
  }
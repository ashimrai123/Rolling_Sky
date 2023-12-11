//input.js


let keys = {}; // Object to track which keys are currently pressed

  window.addEventListener('keydown', (e) => {
    e.preventDefault();
    keys[e.key] = true;
    
  });

  window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
  });




  function handleKeys() {
    const speed = 0.1; // Adjust the speed as needed


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
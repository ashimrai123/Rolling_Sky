//input.js

let keys = {}; // Object to track which keys are currently pressed

window.addEventListener("keydown", (e) => {
  e.preventDefault();
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  e.preventDefault();

  keys[e.key] = false;
});

const speedZ = 0.24; // Adjust the speed as needed
const speedX = 0.1; // Adjust the speed as needed
const speed = 0.15;

let increasingSpeedZup = speedZ;
let increasingSpeedZdown = speedZ;
let maxSpeeding = speedZ + 0.05;
let increasingSpeedXright = speedX;
let increasingSpeedXleft = speedX;

/*------------------------------------- FOR ROTATION --------------------------------------------------*/
let speedR = 0.055;

let increasingRotationZup = speedR;
let increasingRotationZdown = speedR;
let increasingRotationXright = speedR;
let increasingRotationXleft = speedR;
let maxRotation = speedR + 0.01;

/*------------------------------------- FRICTION FOR ROTATION  --------------------------------------------------*/

let frictionZupR = 0.000001;
let frictionZdownR = 0.000001;
let frictionXrightR = 0.000001;
let frictionXleftR = 0.000001;

/*------------------------------------- FRICTION FOR MOVEMENT  --------------------------------------------------*/

let frictionZup = 0.000001;
let frictionZdown = 0.000001;
let frictionXright = 0.000001;
let frictionXleft = 0.000001;
/*------------------------------------- FRICTION FOR CAMERA       -----------------------------------------------*/

let frictionYupC = 0.000001;
let frictionYdownC = 0.000001;
let frictionXrightC = 0.000001;
let frictionXleftC = 0.000001;

let increasingSpeedYupC = speedZ;
let increasingSpeedYdownC = speedZ;
let maxSpeedingC = speedZ + 0.05;
let increasingSpeedXrightC = speedX;
let increasingSpeedXleftC = speedX;

function handleKeys() {
  // if (keys['w']|| keys['KeyW']) {
  //   mainPositionY += speed;
  // }

  // if (keys['s'] || keys['KeyS']) {
  //   mainPositionY -= speed;
  // }

  /*---------------------------------------------------- ARROW RIGHT ----------------------------------------------------------------------*/

  if (keys["ArrowRight"]) {
    mainPositionX += increasingSpeedXright;

    //FOR ROTATION ---------------------------------------------------------------------------------------
    sphereRotationZ -= increasingRotationXright;
    sphereRotationY += increasingRotationXright;

    if (increasingSpeedXright <= maxSpeeding) {
      increasingSpeedXright += 0.0000006;
      increasingRotationXright += 0.00006; // ROTATION
    } else if (
      increasingSpeedXright >= maxSpeeding &&
      increasingSpeedXright <= maxSpeeding + 0.004
    ) {
      // to keep making the ball in maximum speed
      increasingSpeedXright = maxSpeeding; //the speed remains constant
      increasingRotationXright = maxRotation; // FOR ROTATION
    }
    frictionXright = 0.000001;
    frictionXrightR = 0.000001; //FOR ROTATION
  } else {
    // When up arrow released, we still have to move a little
    if (increasingSpeedXright > speedX) {
      //X for X-axis
      increasingSpeedXright -= frictionXright + 0.00000005;
      frictionXright += 0.00000005;
      mainPositionX += increasingSpeedXright;

      //FOR ROTATION ---------------------------------------------------------------------------------------
      increasingRotationXright -= frictionXrightR + 0.000005;
      frictionXrightR += 0.000005;
      sphereRotationZ -= increasingRotationXright;
      sphereRotationY += increasingRotationXright;
    }
  }
  /*---------------------------------------------------- ARROW LEFT ----------------------------------------------------------------------*/

  if (keys["ArrowLeft"]) {
    mainPositionX -= increasingSpeedXleft;

    //ROTATION ---------------------------------------------------------------------------------------
    sphereRotationZ += increasingRotationXleft;
    sphereRotationY -= increasingRotationXleft;

    if (increasingSpeedXleft <= maxSpeeding) {
      increasingSpeedXleft += 0.0000006;
      increasingRotationXleft += 0.00006;
    } else if (
      increasingSpeedXleft >= maxSpeeding &&
      increasingSpeedXleft <= maxSpeeding + 0.004
    ) {
      // to keep making the ball in maximum speed
      increasingSpeedXleft = maxSpeeding; //the speed remains constant
      increasingRotationXleft += 0.00006; // ROTATION
    }
    frictionXleft = 0.000001;
    frictionXleftR = 0.000001; //FOR ROTATION
  } else {
    // When up arrow released, we still have to move a little
    if (increasingSpeedXleft > speedX) {
      //X for X-axis
      increasingSpeedXleft -= frictionXleft + 0.00000005;
      frictionXleft += 0.00000005;
      mainPositionX -= increasingSpeedXleft;
      //FOR ROTATION ---------------------------------------------------------------------------------------
      increasingRotationXleft -= frictionXleftR + 0.000005;
      frictionXleftR += 0.000005;
      sphereRotationZ += increasingRotationXleft;
      sphereRotationY -= increasingRotationXleft;
    }
  }

  /*---------------------------------------------------- ARROW UP ----------------------------------------------------------------------*/

  if (keys["ArrowUp"]) {
    // Move forward logic

    sphereRotationX -= increasingRotationZup;

    mainPositionZ -= 1.8 * increasingSpeedZup;
    if (increasingSpeedZup < maxSpeeding) {
      //increase speed of ball
      increasingSpeedZup += 0.0000006;
      increasingRotationZup += 0.00006;
    } else if (
      increasingSpeedZup >= maxSpeeding &&
      increasingSpeedZup <= maxSpeeding + 0.004
    ) {
      // to keep making the ball in maximum speed
      increasingSpeedZup = maxSpeeding; //the speed remains constant
      increasingRotationZup += 0.00006; // ROTATION
    }
    frictionZup = 0.000001;
    frictionZupR = 0.000001; //FOR ROTATION
  } else {
    // When up arrow released, we still have to move a little
    if (increasingSpeedZup > speedZ) {
      //Z for Z-axis
      increasingSpeedZup -= frictionZup + 0.00000005;
      frictionZup += 0.00000005;
      mainPositionZ -= increasingSpeedZup;
      //FOR ROTATION ---------------------------------------------------------------------------------------
      increasingRotationZup -= frictionZupR + 0.000005;
      frictionZupR += 0.000005;
      sphereRotationX -= increasingRotationZup;
    }
  }

  /*---------------------------------------------------- ARROW DOWN ----------------------------------------------------------------------*/

  if (keys["ArrowDown"]) {
    // Move backward logic
    sphereRotationX += increasingRotationZdown; // Adjust the rotation speed as needed

    mainPositionZ += 1.8 * increasingSpeedZdown;
    if (increasingSpeedZdown < maxSpeeding) {
      //increase speed of ball
      increasingSpeedZdown += 0.0000006;
      increasingRotationZdown += 0.00006;
    } else if (
      increasingSpeedZdown >= maxSpeeding &&
      increasingSpeedZdown <= maxSpeeding + 0.004
    ) {
      // to keep making the ball in maximum speed
      increasingSpeedZdown = maxSpeeding; //the speed remains constant
      increasingRotationZdown += 0.00006; // ROTATION
    }
    frictionZdown = 0.000001;
    frictionZdownR = 0.000001; //FOR ROTATION
  } else {
    // When up arrow released, we still have to move a little
    if (increasingSpeedZdown > speedZ) {
      //Z for Z-axis
      increasingSpeedZdown -= frictionZdown + 0.00000005;
      frictionZdown += 0.00000005;
      mainPositionZ += increasingSpeedZdown;
      //FOR ROTATION ---------------------------------------------------------------------------------------
      increasingRotationZdown -= frictionZdownR + 0.000005;
      frictionZdownR += 0.000005;
      sphereRotationX += increasingRotationZdown;
    }
  }

  /*---------------------------------------------------- SPACE JUMP ----------------------------------------------------------------------*/

  if (keys[" "]) {
    if (
      mainPositionY >= -1.5 && // tile's y-coordinate is -1, 0.5 is added in case of gravity applied
      mainPositionY <= 0.9 // letting sphere float above 0.9
    ) {
      jumpFlag = true; // allowed to jump
    }
  }

  /* CAMERA MOVEMENT LOGIC */

  if (keys["i"] || keys["KeyI"]) {
    // Move camera along the positive Z-axis
    cameraPosition[2] -= speed;
  }

  if (keys["k"] || keys["KeyK"]) {
    // Move camera along the negative Z-axis
    cameraPosition[2] += speed;
  }

  if (keys["a"] || keys["KeyA"]) {
    // Move camera along the negative X-axis
    cameraPosition[0] -= increasingSpeedXrightC;
    if (increasingSpeedXleftC <= maxSpeeding) {
      increasingSpeedXleftC += 0.0000006;
    } else if (
      increasingSpeedXleftC >= maxSpeeding &&
      increasingSpeedXleftC <= maxSpeeding + 0.004
    ) {
      // to keep making the ball in maximum speed
      increasingSpeedXleftC = maxSpeeding; //the speed remains constant
    }
    frictionXleftC = 0.000001;
  } else {
    // When up arrow released, we still have to move a little
    if (increasingSpeedXleftC > speedX) {
      increasingSpeedXleftC -= frictionXleftC + 0.00000005;
      frictionXleftC += 0.00000005;
      cameraPosition[0] -= increasingSpeedXleftC;
    }
  }

  if (keys["d"] || keys["KeyD"]) {
    // Move camera along the positive X-axis
    cameraPosition[0] += increasingSpeedXrightC;
    if (increasingSpeedXrightC <= maxSpeeding) {
      increasingSpeedXrightC += 0.0000006;
    } else if (
      increasingSpeedXrightC >= maxSpeeding &&
      increasingSpeedXrightC <= maxSpeeding + 0.004
    ) {
      // to keep making the ball in maximum speed
      increasingSpeedXrightC = maxSpeeding; //the speed remains constant
    }
    frictionXrightC = 0.000001;
  } else {
    // When up arrow released, we still have to move a little
    if (increasingSpeedXrightC > speedX) {
      increasingSpeedXrightC -= frictionXrightC + 0.00000005;
      frictionXrightC += 0.00000005;
      cameraPosition[0] += increasingSpeedXrightC;
    }
  }

  if (keys["w"] || keys["KeyW"]) {
    // Move camera along the positive Y-axis
    cameraPosition[1] += increasingSpeedYupC;
    if (increasingSpeedYupC <= maxSpeeding) {
      increasingSpeedYupC += 0.0000006;
    } else if (
      increasingSpeedYupC >= maxSpeeding &&
      increasingSpeedYupC <= maxSpeeding + 0.004
    ) {
      // to keep making the ball in maximum speed
      increasingSpeedYupC = maxSpeeding; //the speed remains constant
    }
    frictionYupC = 0.000001;
  } else {
    // When up arrow released, we still have to move a little
    if (increasingSpeedYupC > speedZ) {
      increasingSpeedYupC -= frictionYupC + 0.00000005;
      frictionYupC += 0.00000005;
      cameraPosition[1] += increasingSpeedYupC;
    }
  }

  if (keys["s"] || keys["KeyS"]) {
    // Move camera along the negative Y-axis
    cameraPosition[1] -= increasingSpeedYdownC;
    if (increasingSpeedYdownC <= maxSpeeding) {
      increasingSpeedYdownC += 0.0000006;
    } else if (
      increasingSpeedYdownC >= maxSpeeding &&
      increasingSpeedYdownC <= maxSpeeding + 0.004
    ) {
      // to keep making the ball in maximum speed
      increasingSpeedYdownC = maxSpeeding; //the speed remains constant
    }
    frictionYdownC = 0.000001;
  } else {
    // When up arrow released, we still have to move a little
    if (increasingSpeedYdownC > speedZ) {
      increasingSpeedYdownC -= frictionYdownC + 0.00000005;
      frictionYdownC += 0.00000005;
      cameraPosition[1] -= increasingSpeedYdownC;
    }
  }
}

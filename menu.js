let lastKeyPressTime = 0;
const debounceInterval = 120;
let pausedTime = 0;
let totalPausedTime = 0;

function handlePause() {
  const currentTime = Date.now();
  if (
    (keys["p"] || keys["keyP"]) &&
    currentTime - lastKeyPressTime > debounceInterval &&
    !tryAgainFlag
  ) {
    pauseGame = !pauseGame;
    lastKeyPressTime = currentTime;
    if (pauseGame) {
      // If the game is paused, record the start time of the pause
      pauseStartTime = currentTime;
      showPausedMenu();
    } else {
      // If the game is unpaused, calculate the pause duration and add it to totalPausedTime
      const pauseDuration = currentTime - pauseStartTime;
      totalPausedTime += pauseDuration;
      hidePausedMenu();
    }
  }
}

/* -------------------------------------------------- PAUSED MENU ------------------------------------------------------------------------------- */

//RESUME GAME BUTTON
function resumeGame() {
  pauseGame = false;
  hidePausedMenu();
}
// Pause Game when Menu is Shown
function showPausedMenu() {
  document.getElementById("menuOverlayPaused").style.display = "block";
}

//Resume Game when Menu is hidden
function hidePausedMenu() {
  document.getElementById("menuOverlayPaused").style.display = "none";
}

/* -------------------------------------------------- TRY AGAIN MENU ------------------------------------------------------------------------------- */

function resetPositions() {
  mainPositionX = 0;
  mainPositionY = 0.4;
  mainPositionZ = -9.0;

  cameraPosition[0] = 0; // X-coordinate of the camera
  cameraPosition[1] = 5; // Y-coordinate of the camera (height)
  cameraPosition[2] = 5; // Z-coordinate of the camera

  //Reset speed
  increasingSpeedZup = speedZ;
  increasingSpeedZdown = speedZ;
  maxSpeeding = speedZ + 0.05;
  increasingSpeedXright = speedX;
  increasingSpeedXleft = speedX;
}

//TRY AGAIN BUTTON
function tryAgain() {
  // Reset ball position
  resetPositions();
  hideTryAgainMenu();
  tryAgainFlag = false;

  // Clear the canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

let tryAgainFlag;

function tryAgainMenu() {
  showTryAgainMenu();
  mainPositionY = -99;
  tryAgainFlag = true;
}

function showTryAgainMenu() {
  document.getElementById("menuOverlayTryAgain").style.display = "block";
}

function hideTryAgainMenu() {
  document.getElementById("menuOverlayTryAgain").style.display = "none";
}

/* -------------------------------------------------- WIN GAME MENU ------------------------------------------------------------------------------- */

function winGameMenu() {
  document.getElementById("menuOverlayWin").style.display = "block";
  endTileReached = true;
}

function playAgain() {
  introStartTime = Date.now();
  endTileReached = false;

  introStart = true;
  document.getElementById("menuOverlayWin").style.display = "none";
}

// main.js

// Initialize WebGL Context
const canvas = document.getElementById("myCanvas");
const gl = canvas.getContext("webgl");

// Check if WebGL is available
if (!gl) {
  console.error("Unable to initialize WebGL. Your browser may not support it.");
}

// Set up viewport and clear color
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(1.9, 0.6, 2.9, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

/* ------------------------------------------ SPHERE 1 SETUP --------------------------------------------------------------------*/

const sphere1Radius = 0.9;
const sphere1LatitudeBands = 30;
const sphere1LongitudeBands = 30;

const { vertices: vertices1, indices: indices1 } = generateSphereVertices(
  sphere1Radius,
  sphere1LatitudeBands,
  sphere1LongitudeBands
);

// Buffer Setup for Sphere 1
const vertexBuffer1 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer1);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices1), gl.STATIC_DRAW);

const indexBuffer1 = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer1);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(indices1),
  gl.STATIC_DRAW
);

// Shader Compilation and Linking for Sphere 1
const vertexShader1 = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
const fragmentShader1 = compileShader(
  gl,
  fragmentShaderSource,
  gl.FRAGMENT_SHADER
);

const shaderProgram1 = linkProgram(gl, vertexShader1, fragmentShader1);
gl.useProgram(shaderProgram1);

// Attribute and Uniform Locations for Sphere 1
const positionAttribLocation1 = gl.getAttribLocation(
  shaderProgram1,
  "a_position"
);
gl.vertexAttribPointer(positionAttribLocation1, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttribLocation1);

const modelViewMatrixLocation1 = gl.getUniformLocation(
  shaderProgram1,
  "u_modelViewMatrix"
);
const projectionMatrixLocation1 = gl.getUniformLocation(
  shaderProgram1,
  "u_projectionMatrix"
);

/* ------------------------------------------ SPHERE 2 SETUP --------------------------------------------------------------------*/

// Data Generation for Sphere 2
const sphere2Radius = 0.6;
const sphere2LatitudeBands = 30;
const sphere2LongitudeBands = 30;

const { vertices: vertices2, indices: indices2 } = generateSphereVertices(
  sphere2Radius,
  sphere2LatitudeBands,
  sphere2LongitudeBands
);

// Buffer Setup for Sphere 2
const vertexBuffer2 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW);

const indexBuffer2 = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer2);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(indices2),
  gl.STATIC_DRAW
);

// Shader Compilation and Linking for Sphere 2
const vertexShader2 = compileShader(gl, vertexShaderSource2, gl.VERTEX_SHADER);
const fragmentShader2 = compileShader(
  gl,
  fragmentShaderSource2,
  gl.FRAGMENT_SHADER
);

const shaderProgram2 = linkProgram(gl, vertexShader2, fragmentShader2);
gl.useProgram(shaderProgram2);

// Attribute and Uniform Locations for Sphere 2
const positionAttribLocation2 = gl.getAttribLocation(
  shaderProgram2,
  "a_position"
);
gl.vertexAttribPointer(positionAttribLocation2, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttribLocation2);

const modelViewMatrixLocation2 = gl.getUniformLocation(
  shaderProgram2,
  "u_modelViewMatrix"
);
const projectionMatrixLocation2 = gl.getUniformLocation(
  shaderProgram2,
  "u_projectionMatrix"
);

/* ------------------------------------------ TILE SETUP --------------------------------------------------------------------*/

const tileSize = 4.0;
const tileHeight = 0.3;
const { vertices: tileVertices, indices: tileIndices } = generateTileVertices(
  tileSize,
  tileHeight
);

// Buffer Setup for Tiles
const tileVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, tileVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tileVertices), gl.STATIC_DRAW);

const tileIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tileIndexBuffer);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(tileIndices),
  gl.STATIC_DRAW
);

// Shader Compilation and Linking for Tiles
const vertexShaderTile = compileShader(
  gl,
  vertexShaderSourceTile,
  gl.VERTEX_SHADER
);
const fragmentShaderTile = compileShader(
  gl,
  fragmentShaderSourceTile,
  gl.FRAGMENT_SHADER
);

const shaderProgramTile = linkProgram(gl, vertexShaderTile, fragmentShaderTile);
gl.useProgram(shaderProgramTile);

// Attribute and Uniform Locations for Tiles
const positionAttribLocationTile = gl.getAttribLocation(
  shaderProgramTile,
  "a_position"
);
gl.vertexAttribPointer(positionAttribLocationTile, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttribLocationTile);

const modelViewMatrixLocationTile = gl.getUniformLocation(
  shaderProgramTile,
  "u_modelViewMatrix"
);
const projectionMatrixLocationTile = gl.getUniformLocation(
  shaderProgramTile,
  "u_projectionMatrix"
);

/* ------------------------------------------ MOVING TILE SETUP --------------------------------------------------------------------*/

const movTileSize = 4.0;
const movTileHeight = 0.3;
const { vertices: movTileVertices, indices: movTileIndices } =
  generateMovTileVertices(movTileSize, movTileHeight);

// Buffer Setup for Tiles
const movTileVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, movTileVertexBuffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(movTileVertices),
  gl.STATIC_DRAW
);

const movTileIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, movTileIndexBuffer);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(movTileIndices),
  gl.STATIC_DRAW
);

// Shader Compilation and Linking for Tiles
const vertexShaderMovTile = compileShader(
  gl,
  vertexShaderSourceMovTile,
  gl.VERTEX_SHADER
);
const fragmentShaderMovTile = compileShader(
  gl,
  fragmentShaderSourceMovTile,
  gl.FRAGMENT_SHADER
);

const shaderProgramMovTile = linkProgram(
  gl,
  vertexShaderMovTile,
  fragmentShaderMovTile
);
gl.useProgram(shaderProgramMovTile);

// Attribute and Uniform Locations for Tiles
const positionAttribLocationMovTile = gl.getAttribLocation(
  shaderProgramMovTile,
  "a_position"
);
gl.vertexAttribPointer(positionAttribLocationMovTile, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttribLocationMovTile);

const modelViewMatrixLocationMovTile = gl.getUniformLocation(
  shaderProgramMovTile,
  "u_modelViewMatrix"
);
const projectionMatrixLocationMovTile = gl.getUniformLocation(
  shaderProgramMovTile,
  "u_projectionMatrix"
);

/* ------------------------------------------ JUMPING MOVING TILE SETUP --------------------------------------------------------------------*/

const jmovTileSize = 4.0;
const jmovTileHeight = 0.3;
const { vertices: jmovTileVertices, indices: jmovTileIndices } =
  generateMovTileVertices(jmovTileSize, jmovTileHeight);

// Buffer Setup for Tiles
const jmovTileVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, jmovTileVertexBuffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(jmovTileVertices),
  gl.STATIC_DRAW
);

const jmovTileIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, jmovTileIndexBuffer);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(jmovTileIndices),
  gl.STATIC_DRAW
);

// Shader Compilation and Linking for Tiles
const vertexShaderJmovTile = compileShader(
  gl,
  vertexShaderSourceJmovTile,
  gl.VERTEX_SHADER
);
const fragmentShaderJmovTile = compileShader(
  gl,
  fragmentShaderSourceJmovTile,
  gl.FRAGMENT_SHADER
);

const shaderProgramJmovTile = linkProgram(
  gl,
  vertexShaderJmovTile,
  fragmentShaderJmovTile
);
gl.useProgram(shaderProgramJmovTile);

// Attribute and Uniform Locations for Tiles
const positionAttribLocationJmovTile = gl.getAttribLocation(
  shaderProgramJmovTile,
  "a_position"
);
gl.vertexAttribPointer(
  positionAttribLocationJmovTile,
  3,
  gl.FLOAT,
  false,
  0,
  0
);
gl.enableVertexAttribArray(positionAttribLocationJmovTile);

const modelViewMatrixLocationJmovTile = gl.getUniformLocation(
  shaderProgramJmovTile,
  "u_modelViewMatrix"
);
const projectionMatrixLocationJmovTile = gl.getUniformLocation(
  shaderProgramJmovTile,
  "u_projectionMatrix"
);

/* ------------------------------------------ JUMP TILE SETUP --------------------------------------------------------------------*/

const jTileSize = 4.0;
const jTileHeight = 0.3;
const { vertices: jTileVertices, indices: jTileIndices } = generateTileVertices(
  jTileSize,
  jTileHeight
);

// Buffer Setup for Tiles
const jTileVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, jTileVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(jTileVertices), gl.STATIC_DRAW);

const jTileIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, jTileIndexBuffer);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(jTileIndices),
  gl.STATIC_DRAW
);

// Shader Compilation and Linking for Tiles
const vertexShaderJumpTile = compileShader(
  gl,
  vertexShaderSourceJumpTile,
  gl.VERTEX_SHADER
);
const fragmentShaderJumpTile = compileShader(
  gl,
  fragmentShaderSourceJumpTile,
  gl.FRAGMENT_SHADER
);

const shaderProgramJumpTile = linkProgram(
  gl,
  vertexShaderJumpTile,
  fragmentShaderJumpTile
);
gl.useProgram(shaderProgramJumpTile);

// Attribute and Uniform Locations for Tiles
const positionAttribLocationJumpTile = gl.getAttribLocation(
  shaderProgramJumpTile,
  "a_position"
);
gl.vertexAttribPointer(
  positionAttribLocationJumpTile,
  3,
  gl.FLOAT,
  false,
  0,
  0
);
gl.enableVertexAttribArray(positionAttribLocationJumpTile);

const modelViewMatrixLocationJumpTile = gl.getUniformLocation(
  shaderProgramJumpTile,
  "u_modelViewMatrix"
);
const projectionMatrixLocationJumpTile = gl.getUniformLocation(
  shaderProgramJumpTile,
  "u_projectionMatrix"
);

/* ------------------------------------------ END TILE SETUP --------------------------------------------------------------------*/

const eTileSize = 4.0;
const eTileHeight = 0.3;
const { vertices: eTileVertices, indices: eTileIndices } = generateTileVertices(
  eTileSize,
  eTileHeight
);

// Buffer Setup for Tiles
const eTileVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, eTileVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(eTileVertices), gl.STATIC_DRAW);

const eTileIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eTileIndexBuffer);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(eTileIndices),
  gl.STATIC_DRAW
);

// Shader Compilation and Linking for Tiles
const vertexShaderEndTile = compileShader(
  gl,
  vertexShaderSourceEndTile,
  gl.VERTEX_SHADER
);
const fragmentShaderEndTile = compileShader(
  gl,
  fragmentShaderSourceEndTile,
  gl.FRAGMENT_SHADER
);

const shaderProgramEndTile = linkProgram(
  gl,
  vertexShaderEndTile,
  fragmentShaderEndTile
);
gl.useProgram(shaderProgramEndTile);

// Attribute and Uniform Locations for Tiles
const positionAttribLocationEndTile = gl.getAttribLocation(
  shaderProgramEndTile,
  "a_position"
);
gl.vertexAttribPointer(positionAttribLocationEndTile, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttribLocationEndTile);

const modelViewMatrixLocationEndTile = gl.getUniformLocation(
  shaderProgramEndTile,
  "u_modelViewMatrix"
);
const projectionMatrixLocationEndTile = gl.getUniformLocation(
  shaderProgramEndTile,
  "u_projectionMatrix"
);

/* ------------------------------------------ BOX OBSTACLE SETUP --------------------------------------------------------------------*/

const boxSize = 4.0;
const boxHeight = 2.0;
const { vertices: boxVertices, indices: boxIndices } = generateBoxVertices(
  boxSize,
  boxHeight
);

// Buffer Setup for Box
const boxVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

const boxIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBuffer);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(boxIndices),
  gl.STATIC_DRAW
);

// Shader Compilation and Linking for Tiles
const vertexShaderBox = compileShader(
  gl,
  vertexShaderSourceBox,
  gl.VERTEX_SHADER
);
const fragmentShaderBox = compileShader(
  gl,
  fragmentShaderSourceBox,
  gl.FRAGMENT_SHADER
);

const shaderProgramBox = linkProgram(gl, vertexShaderBox, fragmentShaderBox);
gl.useProgram(shaderProgramBox);

// Attribute and Uniform Locations for Tiles
const positionAttribLocationBox = gl.getAttribLocation(
  shaderProgramBox,
  "a_position"
);
gl.vertexAttribPointer(positionAttribLocationBox, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttribLocationBox);

const modelViewMatrixLocationBox = gl.getUniformLocation(
  shaderProgramBox,
  "u_modelViewMatrix"
);
const projectionMatrixLocationBox = gl.getUniformLocation(
  shaderProgramBox,
  "u_projectionMatrix"
);

/* --------------------------------------------- RENDER BOX OBSTACLES --------------------------------------------------------------------*/

function renderBoxes() {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const boxType = data[row][col];

      // Only render a box if the data value is 2
      if (boxType === 3) {
        // Update model-view matrix for translation of Boxes
        mat4.lookAt(
          modelViewMatrix,
          cameraPosition,
          [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1],
          [0.0, 1.0, 0.0]
        );

        // Apply translation based on row, column, and box height
        mat4.translate(modelViewMatrix, modelViewMatrix, [
          col * boxSize - 2 * boxSize,
          -1.0,
          row * -4.0 - 5,
        ]);

        // Use shader program and bind vertex buffer for Boxes
        gl.useProgram(shaderProgramBox);
        gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBuffer);

        // Enable attributes and set attribute pointers for Boxes
        gl.enableVertexAttribArray(positionAttribLocationBox);
        gl.vertexAttribPointer(
          positionAttribLocationBox,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );

        // Set uniforms for transformation matrices for Boxes
        gl.uniformMatrix4fv(modelViewMatrixLocationBox, false, modelViewMatrix);
        gl.uniformMatrix4fv(
          projectionMatrixLocationBox,
          false,
          projectionMatrix
        );

        // Draw Boxes
        gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
      }
    }
  }
}

/* --------------------------------------------- RENDER TILES --------------------------------------------------------------------*/

function renderTiles() {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const tileType = data[row][col];

      // Only render a tile if the data value is not 0 (indicating no tile)
      if (tileType === 1) {
        // Update model-view matrix for translation of Tiles
        mat4.lookAt(
          modelViewMatrix,
          cameraPosition,
          [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1],
          [0.0, 1.0, 0.0]
        );

        // Apply translation based on row, column, and tile height
        mat4.translate(modelViewMatrix, modelViewMatrix, [
          col * tileSize - 2 * tileSize,
          -1.0,
          row * -4.0 - 5,
        ]);

        // Use shader program and bind vertex buffer for Tiles
        gl.useProgram(shaderProgramTile);
        gl.bindBuffer(gl.ARRAY_BUFFER, tileVertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tileIndexBuffer);

        // Enable attributes and set attribute pointers for Tiles
        gl.enableVertexAttribArray(positionAttribLocationTile);
        gl.vertexAttribPointer(
          positionAttribLocationTile,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );

        // Set uniforms for transformation matrices for Tiles
        gl.uniformMatrix4fv(
          modelViewMatrixLocationTile,
          false,
          modelViewMatrix
        );
        gl.uniformMatrix4fv(
          projectionMatrixLocationTile,
          false,
          projectionMatrix
        );

        // Draw Tiles
        gl.drawElements(gl.TRIANGLES, tileIndices.length, gl.UNSIGNED_SHORT, 0);
      }
    }
  }
}

/* --------------------------------------------- RENDER MOVING TILES --------------------------------------------------------------------*/

movingTilePosition = 0;

function renderMovingTiles() {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const tileType = data[row][col];

      if (tileType === 4) {
        // Update model-view matrix for translation of Tiles
        mat4.lookAt(
          modelViewMatrix,
          cameraPosition,
          [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1],
          [0.0, 1.0, 0.0]
        );

        movingTilePosition = Math.sin(Date.now() * 0.003) * 2;

        let translationX = movingTilePosition + col * tileSize - 2 * tileSize;
        let translationY = -1.0;
        let translationZ = row * -4.0 - 5;

        // Apply translation based on row, column, and tile height
        mat4.translate(modelViewMatrix, modelViewMatrix, [
          translationX,
          translationY,
          translationZ,
        ]);

        // Use shader program and bind vertex buffer for Tiles
        gl.useProgram(shaderProgramMovTile);
        gl.bindBuffer(gl.ARRAY_BUFFER, movTileVertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, movTileIndexBuffer);

        // Enable attributes and set attribute pointers for Tiles
        gl.enableVertexAttribArray(positionAttribLocationMovTile);
        gl.vertexAttribPointer(
          positionAttribLocationMovTile,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );

        // Set uniforms for transformation matrices for Tiles
        gl.uniformMatrix4fv(
          modelViewMatrixLocationMovTile,
          false,
          modelViewMatrix
        );
        gl.uniformMatrix4fv(
          projectionMatrixLocationMovTile,
          false,
          projectionMatrix
        );

        // Draw Tiles
        gl.drawElements(
          gl.TRIANGLES,
          movTileIndices.length,
          gl.UNSIGNED_SHORT,
          0
        );
      }
    }
  }
}

/* --------------------------------------------- RENDER MOVING JUMP TILES --------------------------------------------------------------------*/

jmovingTilePosition = 0;

function renderJmovingTiles() {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const tileType = data[row][col];

      if (tileType === 5) {
        // Update model-view matrix for translation of Tiles
        mat4.lookAt(
          modelViewMatrix,
          cameraPosition,
          [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1],
          [0.0, 1.0, 0.0]
        );

        jmovingTilePosition = Math.sin(Date.now() * 0.003) * 2;

        let jTranslationX = jmovingTilePosition + col * tileSize - 2 * tileSize;
        let jTranslationY = -1.0;
        let jTranslationZ = row * -4.0 - 5;

        // Apply translation based on row, column, and tile height
        mat4.translate(modelViewMatrix, modelViewMatrix, [
          jTranslationX,
          jTranslationY,
          jTranslationZ,
        ]);

        // Use shader program and bind vertex buffer for Tiles
        gl.useProgram(shaderProgramJmovTile);
        gl.bindBuffer(gl.ARRAY_BUFFER, jmovTileVertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, jmovTileIndexBuffer);

        // Enable attributes and set attribute pointers for Tiles
        gl.enableVertexAttribArray(positionAttribLocationJmovTile);
        gl.vertexAttribPointer(
          positionAttribLocationJmovTile,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );

        // Set uniforms for transformation matrices for Tiles
        gl.uniformMatrix4fv(
          modelViewMatrixLocationJmovTile,
          false,
          modelViewMatrix
        );
        gl.uniformMatrix4fv(
          projectionMatrixLocationJmovTile,
          false,
          projectionMatrix
        );

        // Draw Tiles
        gl.drawElements(
          gl.TRIANGLES,
          jmovTileIndices.length,
          gl.UNSIGNED_SHORT,
          0
        );
      }
    }
  }
}

/* --------------------------------------------- RENDER JUMP TILES --------------------------------------------------------------------*/

function renderJumpTiles() {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const tileType = data[row][col];

      if (tileType === 2) {
        // Update model-view matrix for translation of Tiles
        mat4.lookAt(
          modelViewMatrix,
          cameraPosition,
          [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1],
          [0.0, 1.0, 0.0]
        );

        // Apply translation based on row, column, and tile height
        mat4.translate(modelViewMatrix, modelViewMatrix, [
          col * tileSize - 2 * tileSize,
          -1.0,
          row * -4.0 - 5,
        ]);

        // Use shader program and bind vertex buffer for Tiles
        gl.useProgram(shaderProgramJumpTile);
        gl.bindBuffer(gl.ARRAY_BUFFER, jTileVertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, jTileIndexBuffer);

        // Enable attributes and set attribute pointers for Tiles
        gl.enableVertexAttribArray(positionAttribLocationJumpTile);
        gl.vertexAttribPointer(
          positionAttribLocationJumpTile,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );

        // Set uniforms for transformation matrices for Tiles
        gl.uniformMatrix4fv(
          modelViewMatrixLocationJumpTile,
          false,
          modelViewMatrix
        );
        gl.uniformMatrix4fv(
          projectionMatrixLocationJumpTile,
          false,
          projectionMatrix
        );

        // Draw Tiles
        gl.drawElements(
          gl.TRIANGLES,
          jTileIndices.length,
          gl.UNSIGNED_SHORT,
          0
        );
      }
    }
  }
}

/* --------------------------------------------- RENDER END TILES --------------------------------------------------------------------*/

function renderEndTiles() {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const tileType = data[row][col];

      if (tileType === 99) {
        // Update model-view matrix for translation of Tiles
        mat4.lookAt(
          modelViewMatrix,
          cameraPosition,
          [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1],
          [0.0, 1.0, 0.0]
        );

        // Apply translation based on row, column, and tile height
        mat4.translate(modelViewMatrix, modelViewMatrix, [
          col * tileSize - 2 * tileSize,
          -1.0,
          row * -4.0 - 5,
        ]);

        // Use shader program and bind vertex buffer for Tiles
        gl.useProgram(shaderProgramEndTile);
        gl.bindBuffer(gl.ARRAY_BUFFER, eTileVertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eTileIndexBuffer);

        // Enable attributes and set attribute pointers for Tiles
        gl.enableVertexAttribArray(positionAttribLocationEndTile);
        gl.vertexAttribPointer(
          positionAttribLocationEndTile,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );

        // Set uniforms for transformation matrices for Tiles
        gl.uniformMatrix4fv(
          modelViewMatrixLocationEndTile,
          false,
          modelViewMatrix
        );
        gl.uniformMatrix4fv(
          projectionMatrixLocationEndTile,
          false,
          projectionMatrix
        );

        // Draw Tiles
        gl.drawElements(
          gl.TRIANGLES,
          eTileIndices.length,
          gl.UNSIGNED_SHORT,
          0
        );
      }
    }
  }
}

/* ------------------------------------------ MATRIX AND PROJECTION SETUP --------------------------------------------------------------------*/

let modelViewMatrix = mat4.create();
let projectionMatrix = mat4.create();
let tilePositionX = 0.0; // New variable to store sphere position along the x-axis
let mainPositionX = 0.0; // New variable to store main position along the x-axis
let mainPositionY = 0.2; // New variable to store main position along the y-axis
let mainPositionZ = -11.0; // New variable to store main position along the z-axis

const fieldOfView = Math.PI / 4; // 45 degrees
const aspect = canvas.width / canvas.height;
const near = 0.99;
const far = 1000.0;
let pitchAngle = 0.3;

mat4.perspective(projectionMatrix, fieldOfView, aspect, near, far);

let cameraPosition = vec3.fromValues(0.0, 2.0, 5.0); // Initial camera position

cameraPosition[0] = 0; // X-coordinate of the camera
cameraPosition[1] = 4; // Y-coordinate of the camera (height)
cameraPosition[2] = 5; // Z-coordinate of the camera

// const lookAtPoint = [0, 0, 1]; // Point the camera is looking at

// // Update model-view matrix for translation of Sphere 1
// mat4.lookAt(modelViewMatrix, cameraPosition, lookAtPoint, [0.0, 1.0, 0.0]);
// Apply rotation about the x-axis (pitch)

// Update the model-view matrix for translation
mat4.lookAt(
  modelViewMatrix,
  cameraPosition,
  [cameraPosition[0], cameraPosition[1] - 1, cameraPosition[2] - 5],
  [0.0, 1.0, 0.0]
);

/* --------------------------------------------- RENDER LOOP --------------------------------------------------------------------*/

// Rendering Loop
function render() {
  handleKeys();

  // Adjust the gravity strength as needed
  mainPositionY += gravity;

  mainPositionZ += -0.3;
  cameraPosition[2] += -0.3;

  if (mainPositionY < -6) {
    tryAgain();
  }

  // Update model-view matrix for translation of Sphere 1
  mat4.lookAt(
    modelViewMatrix,
    cameraPosition,
    [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 5],
    [0.0, 1.0, 1.0]
  );

  // mat4.identity(modelViewMatrix);
  mat4.translate(modelViewMatrix, modelViewMatrix, [
    mainPositionX,
    mainPositionY,
    mainPositionZ,
  ]);

  // Set clear color and clear the canvas
  gl.enable(gl.DEPTH_TEST);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Use shader program and bind vertex buffer for Sphere 1
  gl.useProgram(shaderProgram1);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer1);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer1);

  // Enable attributes and set attribute pointers for Sphere 1
  gl.enableVertexAttribArray(positionAttribLocation1);
  gl.vertexAttribPointer(positionAttribLocation1, 3, gl.FLOAT, false, 0, 0);

  // Set uniforms for transformation matrices for Sphere 1
  gl.uniformMatrix4fv(modelViewMatrixLocation1, false, modelViewMatrix);
  gl.uniformMatrix4fv(projectionMatrixLocation1, false, projectionMatrix);

  // Draw Sphere 1
  gl.drawElements(gl.TRIANGLES, indices1.length, gl.UNSIGNED_SHORT, 0);

  // Update model-view matrix for translation of Sphere 2
  mat4.lookAt(
    modelViewMatrix,
    cameraPosition,
    [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1],
    [0.0, 1.0, 0.0]
  );

  // Apply rotation about the x-axis
  // mat4.rotateX(modelViewMatrix, modelViewMatrix, cameraRotationX);

  mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0.1, -5.0]); // Adjust the position

  // Use shader program and bind vertex buffer for Sphere 2
  gl.useProgram(shaderProgram2);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer2);

  // Enable attributes and set attribute pointers for Sphere 2
  gl.enableVertexAttribArray(positionAttribLocation2);
  gl.vertexAttribPointer(positionAttribLocation2, 3, gl.FLOAT, false, 0, 0);

  // Set uniforms for transformation matrices for Sphere 2
  gl.uniformMatrix4fv(modelViewMatrixLocation2, false, modelViewMatrix);
  gl.uniformMatrix4fv(projectionMatrixLocation2, false, projectionMatrix);

  // Draw Sphere 2
  gl.drawElements(gl.TRIANGLES, indices2.length, gl.UNSIGNED_SHORT, 0);

  // Render tiles
  renderTiles();

  // Render Box obstacles
  renderBoxes();

  renderJumpTiles();

  renderMovingTiles();

  renderJmovingTiles();

  renderEndTiles();

  //HANDLE COLLISION
  handleCollisions();


  // Request the next frame
  requestAnimationFrame(render);
}

/* --------------------------------------------- START RENDER --------------------------------------------------------------------*/

// Start the rendering loop
render();

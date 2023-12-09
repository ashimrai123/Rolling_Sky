// main.js

// Step 1: Initialize WebGL Context
const canvas = document.getElementById('myCanvas');
const gl = canvas.getContext('webgl');

// Check if WebGL is available
if (!gl) {
  console.error('Unable to initialize WebGL. Your browser may not support it.');
}

// Set up viewport and clear color
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);



// Step 3: Data Generation for Sphere 1
const sphere1Radius = 0.9;
const sphere1LatitudeBands = 30;
const sphere1LongitudeBands = 30;

const { vertices: vertices1, indices: indices1 } = generateSphereVertices(sphere1Radius, sphere1LatitudeBands, sphere1LongitudeBands);

// Step 4: Buffer Setup for Sphere 1
const vertexBuffer1 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer1);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices1), gl.STATIC_DRAW);

const indexBuffer1 = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer1);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices1), gl.STATIC_DRAW);




// Step 5: Shader Compilation and Linking for Sphere 1
const vertexShader1 = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
const fragmentShader1 = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

const shaderProgram1 = linkProgram(gl, vertexShader1, fragmentShader1);
gl.useProgram(shaderProgram1);

// Step 6: Attribute and Uniform Locations for Sphere 1
const positionAttribLocation1 = gl.getAttribLocation(shaderProgram1, 'a_position');
gl.vertexAttribPointer(positionAttribLocation1, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttribLocation1);

const modelViewMatrixLocation1 = gl.getUniformLocation(shaderProgram1, 'u_modelViewMatrix');
const projectionMatrixLocation1 = gl.getUniformLocation(shaderProgram1, 'u_projectionMatrix');





// Step 3: Data Generation for Sphere 2
const sphere2Radius = 0.6;
const sphere2LatitudeBands = 30;
const sphere2LongitudeBands = 30;

const { vertices: vertices2, indices: indices2 } = generateSphereVertices(sphere2Radius, sphere2LatitudeBands, sphere2LongitudeBands);

// Step 4: Buffer Setup for Sphere 2
const vertexBuffer2 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW);


const indexBuffer2 = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer2);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices2), gl.STATIC_DRAW);


// Step 5: Shader Compilation and Linking for Sphere 2
const vertexShader2 = compileShader(gl, vertexShaderSource2, gl.VERTEX_SHADER);
const fragmentShader2 = compileShader(gl, fragmentShaderSource2, gl.FRAGMENT_SHADER);

const shaderProgram2 = linkProgram(gl, vertexShader2, fragmentShader2);
gl.useProgram(shaderProgram2);

// Step 6: Attribute and Uniform Locations for Sphere 2
const positionAttribLocation2 = gl.getAttribLocation(shaderProgram2, 'a_position');
gl.vertexAttribPointer(positionAttribLocation2, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttribLocation2);

const modelViewMatrixLocation2 = gl.getUniformLocation(shaderProgram2, 'u_modelViewMatrix');
const projectionMatrixLocation2 = gl.getUniformLocation(shaderProgram2, 'u_projectionMatrix');







// Example usage:
const tileSize = 5.0;
const tileHeight = 0.3;
const { vertices: tileVertices, indices: tileIndices } = generateTileVertices(tileSize,tileHeight);




// Step 10: Buffer Setup for Tiles
const tileVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, tileVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tileVertices), gl.STATIC_DRAW);

const tileIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tileIndexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tileIndices), gl.STATIC_DRAW);

// Step 11: Shader Compilation and Linking for Tiles
const vertexShaderTile = compileShader(gl, vertexShaderSourceTile, gl.VERTEX_SHADER);
const fragmentShaderTile = compileShader(gl, fragmentShaderSourceTile, gl.FRAGMENT_SHADER);

const shaderProgramTile = linkProgram(gl, vertexShaderTile, fragmentShaderTile);
gl.useProgram(shaderProgramTile);

// Step 12: Attribute and Uniform Locations for Tiles
const positionAttribLocationTile = gl.getAttribLocation(shaderProgramTile, 'a_position');
gl.vertexAttribPointer(positionAttribLocationTile, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttribLocationTile);

const modelViewMatrixLocationTile = gl.getUniformLocation(shaderProgramTile, 'u_modelViewMatrix');
const projectionMatrixLocationTile = gl.getUniformLocation(shaderProgramTile, 'u_projectionMatrix');










// Step 7: Matrix and Projection Setup
let modelViewMatrix = mat4.create();
let projectionMatrix = mat4.create();
let tilePositionX = 0.0; // New variable to store sphere position along the x-axis
let mainPositionX = 2.0; // New variable to store main position along the x-axis
let mainPositionY = 0.0; // New variable to store main position along the y-axis
let mainPositionZ = -5.0; // New variable to store main position along the z-axis
// Example: Set up a perspective projection matrix
const fieldOfView = Math.PI / 4; // 45 degrees
const aspect = canvas.width / canvas.height;
const near = 0.1;
const far = 100.0;

mat4.perspective(projectionMatrix, fieldOfView, aspect, near, far);

let cameraPosition = vec3.fromValues(0.0, 2.0, 5.0); // Initial camera position



let eulerX = 0.0;  // Euler angle for rotation around the X-axis
let eulerY = 8.0;  // Euler angle for rotation around the Y-axis
let eulerZ = 0.0;  // Euler angle for rotation around the Z-axis



function renderTiles(tileCount) {
  for (let i = 0; i < tileCount; i++) {
    // Update model-view matrix for translation of Tiles
    mat4.lookAt(modelViewMatrix, cameraPosition, [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1], [0.0, 1.0, 0.0]);
    mat4.translate(modelViewMatrix, modelViewMatrix, [ 0.0, -1.0, i*(-8.0) -5.0]); // Adjust the position
    
    // Use shader program and bind vertex buffer for Tiles
    gl.useProgram(shaderProgramTile);
    gl.bindBuffer(gl.ARRAY_BUFFER, tileVertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tileIndexBuffer);

    // Enable attributes and set attribute pointers for Tiles
    gl.enableVertexAttribArray(positionAttribLocationTile);
    gl.vertexAttribPointer(positionAttribLocationTile, 3, gl.FLOAT, false, 0, 0);

    // Set uniforms for transformation matrices for Tiles
    gl.uniformMatrix4fv(modelViewMatrixLocationTile, false, modelViewMatrix);
    gl.uniformMatrix4fv(projectionMatrixLocationTile, false, projectionMatrix);

    // Draw Tiles
    gl.drawElements(gl.TRIANGLES, tileIndices.length, gl.UNSIGNED_SHORT, 0);
  }
}


// Step 8: Rendering Loop
function render() {
  // Animation (Optional): Update transformation matrices
  handleKeys();
  // Apply Euler angles for camera rotation


  // Update model-view matrix for translation of Sphere 1
  mat4.lookAt(modelViewMatrix, cameraPosition, [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1], [0.0, 1.0, 0.0]);
  
  // mat4.identity(modelViewMatrix);
  mat4.translate(modelViewMatrix, modelViewMatrix, [mainPositionX, mainPositionY, mainPositionZ]);
  

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
  mat4.lookAt(modelViewMatrix, cameraPosition, [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1], [0.0, 1.0, 0.0]);

  mat4.translate(modelViewMatrix, modelViewMatrix, [tilePositionX, 0.0, -5.0]); // Adjust the position

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



   // Render multiple tiles
   renderTiles(20); // Adjust the number of tiles as needed

  // Request the next frame
  requestAnimationFrame(render);
}


// Start the rendering loop
render();

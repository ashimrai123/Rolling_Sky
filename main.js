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






/* ------------------------------------------ BACKGROUND SETUP --------------------------------------------------------------------*/
const backgroundVertices = [
  -1500.0, -1500.0, 0.0,
  1500.0, -1500.0, 0.0,
  -1500.0, 1500.0, 0.0,
  1500.0, 1500.0, 0.0,
];


// Buffer Setup for Background
const backgroundVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, backgroundVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(backgroundVertices), gl.STATIC_DRAW);

// Shader Compilation and Linking for Background
const vertexShaderBackground = compileShader(gl, vertexShaderSourceBackground, gl.VERTEX_SHADER);
const fragmentShaderBackground = compileShader(gl, fragmentShaderSourceBackground, gl.FRAGMENT_SHADER);

const shaderProgramBackground = linkProgram(gl, vertexShaderBackground, fragmentShaderBackground);
gl.useProgram(shaderProgramBackground);

// Attribute and Uniform Locations for Background
const positionAttribLocationBackground = gl.getAttribLocation(shaderProgramBackground, "a_position");
const modelViewMatrixLocationBackground = gl.getUniformLocation(shaderProgramBackground, "u_modelViewMatrix");
const projectionMatrixLocationBackground = gl.getUniformLocation(shaderProgramBackground, "u_projectionMatrix");
const textureLocationBackground = gl.getUniformLocation(shaderProgramBackground, "u_texture");

const backgroundTexture = gl.createTexture();
const backgroundTextureImage = new Image();
backgroundTextureImage.src = './background14.jpg';

backgroundTextureImage.onload = function () {
  gl.activeTexture(gl.TEXTURE1); // Use a different texture unit
  gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, backgroundTextureImage);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
};



/* ------------------------------------------ SPHERE 1 SETUP --------------------------------------------------------------------*/

const sphere1Radius = 0.9;
const sphere1LatitudeBands = 30;
const sphere1LongitudeBands = 30;

const { vertices: vertices1, textureCoords: textureCoords1, normals: normals1, indices: indices1 } = generateSphereVertices(
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

const texCoordBuffer1 = gl.createBuffer(); //texture -------------------------
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer1);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords1), gl.STATIC_DRAW);

// NORMAL BUFFER
const normalBuffer1 = gl.createBuffer();   //normal *****************
gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer1);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals1), gl.STATIC_DRAW);



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

const texCoordAttribLocation1 = gl.getAttribLocation(//texture -------------------------
  shaderProgram1,
  "a_texCoord"
);


const normalAttribLocation1 = gl.getAttribLocation(shaderProgram1, "a_normal");  //normal *****************
gl.vertexAttribPointer(normalAttribLocation1, 3, gl.FLOAT, false, 0, 0); //normal*********
gl.enableVertexAttribArray(normalAttribLocation1); //normal *********



gl.vertexAttribPointer(positionAttribLocation1, 3, gl.FLOAT, false, 0, 0);
gl.vertexAttribPointer(texCoordAttribLocation1, 2, gl.FLOAT, false, 0, 0); //texture -------------------------

gl.enableVertexAttribArray(positionAttribLocation1);
gl.enableVertexAttribArray(texCoordAttribLocation1); //texture ----------------------------


const modelViewMatrixLocation1 = gl.getUniformLocation(
  shaderProgram1,
  "u_modelViewMatrix"
);
const projectionMatrixLocation1 = gl.getUniformLocation(
  shaderProgram1,
  "u_projectionMatrix"
);

// Add uniform location for the normal matrix if not already present
const normalMatrixLocation1 = gl.getUniformLocation(shaderProgram1, "u_normalMatrix"); //normal *****************




const textureLocation1 = gl.getUniformLocation(shaderProgram1, "u_texture"); //texture ----------------------------

//  Load and Bind Texture
const texture1 = gl.createTexture();
const textureImage1 = new Image();
textureImage1.src = './textureRed1.jpg';

textureImage1.onload = function () { //texture ----------------------------
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage1);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    

    // Generate mipmaps and set texture filter for minification
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // Set the texture uniform in your rendering loop
    gl.useProgram(shaderProgram1);
    gl.uniform1i(textureLocation1, 0);
};








/* ------------------------------------------ TILE SETUP --------------------------------------------------------------------*/

const tileSize = 4.0;
const tileHeight = 0.3;
const { vertices: tileVertices,textureCoords: textureCoordsTile,normals:tileNormals, indices: tileIndices } = generateTileVertices(
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



const texCoordBufferTile = gl.createBuffer(); //texture -------------------------
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBufferTile);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordsTile), gl.STATIC_DRAW);

const normalBufferTile = gl.createBuffer(); //NORMALS ************************
gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferTile);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tileNormals), gl.STATIC_DRAW);


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

const texCoordAttribLocationTile = gl.getAttribLocation(//texture -------------------------
  shaderProgramTile,
  "a_texCoord"
);


const normalAttribLocationTile = gl.getAttribLocation(shaderProgramTile, "a_normal");  //normal *****************
gl.vertexAttribPointer(normalAttribLocationTile, 3, gl.FLOAT, false, 0, 0); //normal
gl.enableVertexAttribArray(normalAttribLocationTile); //normal 



gl.vertexAttribPointer(positionAttribLocationTile, 3, gl.FLOAT, false, 0, 0);
gl.vertexAttribPointer(texCoordAttribLocationTile, 2, gl.FLOAT, false, 0, 0); //texture -------------------------


gl.enableVertexAttribArray(positionAttribLocationTile);
gl.enableVertexAttribArray(texCoordAttribLocationTile); //texture ----------------------------



const modelViewMatrixLocationTile = gl.getUniformLocation(
  shaderProgramTile,
  "u_modelViewMatrix"
);
const projectionMatrixLocationTile = gl.getUniformLocation(
  shaderProgramTile,
  "u_projectionMatrix"
);


const normalMatrixLocationTile = gl.getUniformLocation(shaderProgramTile, "u_normalMatrix"); //normal *****************

const textureLocationTile = gl.getUniformLocation(shaderProgramTile, "u_texture"); //texture ----------------------------

//  Load and Bind Texture
const textureTile = gl.createTexture();
const textureImageTile = new Image();
textureImageTile.src = './yellowTexture.jpg';

textureImageTile.onload = function () { //texture ----------------------------
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureTile);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImageTile);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    

    // Generate mipmaps and set texture filter for minification
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // Set the texture uniform in your rendering loop
    gl.useProgram(shaderProgramTile);
    gl.uniform1i(textureLocationTile, 0);
};


/* ------------------------------------------ MOVING TILE SETUP --------------------------------------------------------------------*/

const movTileSize = 4.0;
const movTileHeight = 0.3;
const { vertices: movTileVertices, textureCoords: textureCoordsTileM, indices: movTileIndices } =
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

const texCoordBufferTileM = gl.createBuffer(); //texture -------------------------
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBufferTileM);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordsTileM), gl.STATIC_DRAW);

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

const texCoordAttribLocationTileM = gl.getAttribLocation(//texture -------------------------
  shaderProgramMovTile,
  "a_texCoord"
);

gl.vertexAttribPointer(positionAttribLocationMovTile, 3, gl.FLOAT, false, 0, 0);
gl.vertexAttribPointer(texCoordAttribLocationTileM, 2, gl.FLOAT, false, 0, 0); //texture -------------------------

gl.enableVertexAttribArray(positionAttribLocationMovTile);
gl.enableVertexAttribArray(texCoordAttribLocationTileM); //texture ----------------------------


const modelViewMatrixLocationMovTile = gl.getUniformLocation(
  shaderProgramMovTile,
  "u_modelViewMatrix"
);
const projectionMatrixLocationMovTile = gl.getUniformLocation(
  shaderProgramMovTile,
  "u_projectionMatrix"
);


const textureLocationTileM = gl.getUniformLocation(shaderProgramMovTile, "u_texture"); //texture ----------------------------


//  Load and Bind Texture
const textureTileM = gl.createTexture();
const textureImageTileM = new Image();
textureImageTileM.src = './yellow.jpg';

textureImageTileM.onload = function () { //texture ----------------------------
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureTileM);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImageTileM);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    

    // Generate mipmaps and set texture filter for minification
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // Set the texture uniform in your rendering loop
    gl.useProgram(shaderProgramMovTile);
    gl.uniform1i(textureLocationTileM, 0);

}
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
const { vertices: eTileVertices, textureCoords: textureCoordsTileEnd, indices: eTileIndices } = generateTileVertices(
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

const texCoordBufferTileEnd = gl.createBuffer(); //texture -------------------------
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBufferTileEnd);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordsTileEnd), gl.STATIC_DRAW);

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
const texCoordAttribLocationTileEnd = gl.getAttribLocation(//texture -------------------------
  shaderProgramEndTile,
  "a_texCoord"
);
gl.vertexAttribPointer(positionAttribLocationEndTile, 3, gl.FLOAT, false, 0, 0);
gl.vertexAttribPointer(texCoordAttribLocationTileEnd, 2, gl.FLOAT, false, 0, 0); //texture -------------------------

gl.enableVertexAttribArray(positionAttribLocationEndTile);
gl.enableVertexAttribArray(texCoordAttribLocationTileEnd); //texture ----------------------------








const modelViewMatrixLocationEndTile = gl.getUniformLocation(
  shaderProgramEndTile,
  "u_modelViewMatrix"
);
const projectionMatrixLocationEndTile = gl.getUniformLocation(
  shaderProgramEndTile,
  "u_projectionMatrix"
);


const textureLocationTileEnd = gl.getUniformLocation(shaderProgramEndTile, "u_texture"); //texture ----------------------------


//  Load and Bind Texture
const textureTileEnd = gl.createTexture();
const textureImageTileEnd = new Image();
textureImageTileEnd.src = './background13.jpg';

textureImageTileEnd.onload = function () { //texture ----------------------------
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureTileEnd);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImageTileEnd);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    

    // Generate mipmaps and set texture filter for minification
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // Set the texture uniform in your rendering loop
    gl.useProgram(shaderProgramEndTile);
    gl.uniform1i(textureLocationTileEnd, 0);

}

/* ------------------------------------------ BOX OBSTACLE SETUP --------------------------------------------------------------------*/

const boxSize = 4.0;
const boxHeight = 2.0;
const { vertices: boxVertices,textureCoords: textureCoordsBox, normals: normalsBox, indices: boxIndices } = generateBoxVertices(
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

const texCoordBufferBox = gl.createBuffer(); //texture -------------------------
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBufferBox);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordsBox), gl.STATIC_DRAW);


// NORMAL BUFFER
const normalBufferBox = gl.createBuffer();   //normal *****************
gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferBox);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalsBox), gl.STATIC_DRAW);


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
const texCoordAttribLocationBox = gl.getAttribLocation(//texture -------------------------
  shaderProgramBox,
  "a_texCoord"
);
gl.vertexAttribPointer(positionAttribLocationBox, 3, gl.FLOAT, false, 0, 0);
gl.vertexAttribPointer(texCoordAttribLocationBox, 2, gl.FLOAT, false, 0, 0); //texture -------------------------

gl.enableVertexAttribArray(positionAttribLocationBox);
gl.enableVertexAttribArray(texCoordAttribLocationBox); //texture ----------------------------



const normalAttribLocationBox = gl.getAttribLocation(shaderProgramBox, "a_normal");  //normal *****************
gl.vertexAttribPointer(normalAttribLocationBox, 3, gl.FLOAT, false, 0, 0); //normal*********
gl.enableVertexAttribArray(normalAttribLocationBox); //normal *********



// Add uniform location for the normal matrix if not already present
const normalMatrixLocationBox = gl.getUniformLocation(shaderProgramBox, "u_normalMatrix"); //normal *****************

const modelViewMatrixLocationBox = gl.getUniformLocation(
  shaderProgramBox,
  "u_modelViewMatrix"
);
const projectionMatrixLocationBox = gl.getUniformLocation(
  shaderProgramBox,
  "u_projectionMatrix"
);

const textureLocationBox = gl.getUniformLocation(shaderProgramBox, "u_texture"); //texture ----------------------------


//  Load and Bind Texture
const textureBox = gl.createTexture();
const textureImageBox = new Image();
textureImageBox.src = './blueTexture3.jpeg';

textureImageBox.onload = function () { //texture ----------------------------
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureBox);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImageBox);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    

    // Generate mipmaps and set texture filter for minification
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // Set the texture uniform in your rendering loop
    gl.useProgram(shaderProgramBox);
    gl.uniform1i(textureLocationBox, 0);

}

/* ------------------------------------------ MOVING BOX OBSTACLE SETUP --------------------------------------------------------------------*/

const mboxSize = 4.0;
const mboxHeight = 2.0;
const { vertices: mboxVertices, textureCoords: textureCoordsBoxM,normals: normalsBoxM, indices: mboxIndices } = generateBoxVertices(
  boxSize,
  boxHeight
);

// Buffer Setup for Box
const mboxVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, mboxVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mboxVertices), gl.STATIC_DRAW);

const mboxIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mboxIndexBuffer);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(mboxIndices),
  gl.STATIC_DRAW
);

const texCoordBufferBoxM = gl.createBuffer(); //texture -------------------------
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBufferBoxM);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordsBoxM), gl.STATIC_DRAW);


// NORMAL BUFFER
const normalBufferBoxM = gl.createBuffer();   //normal *****************
gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferBoxM);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalsBoxM), gl.STATIC_DRAW);




// Shader Compilation and Linking for Tiles
const vertexShaderMbox = compileShader(
  gl,
  vertexShaderSourceMbox,
  gl.VERTEX_SHADER
);
const fragmentShaderMbox = compileShader(
  gl,
  fragmentShaderSourceMbox,
  gl.FRAGMENT_SHADER
);

const shaderProgramMbox = linkProgram(gl, vertexShaderMbox, fragmentShaderMbox);
gl.useProgram(shaderProgramMbox);

// Attribute and Uniform Locations for Tiles
const positionAttribLocationMbox = gl.getAttribLocation(
  shaderProgramMbox,
  "a_position"
);

const texCoordAttribLocationMbox = gl.getAttribLocation(//texture -------------------------
  shaderProgramMbox,
  "a_texCoord"
);



const normalAttribLocationBoxM = gl.getAttribLocation(shaderProgramMbox, "a_normal");  //normal *****************
gl.vertexAttribPointer(normalAttribLocationBoxM, 3, gl.FLOAT, false, 0, 0); //normal*********
gl.enableVertexAttribArray(normalAttribLocationBoxM); //normal *********



// Add uniform location for the normal matrix if not already present
const normalMatrixLocationBoxM = gl.getUniformLocation(shaderProgramMbox, "u_normalMatrix"); //normal *****************



gl.vertexAttribPointer(positionAttribLocationMbox, 3, gl.FLOAT, false, 0, 0);
gl.vertexAttribPointer(texCoordAttribLocationMbox, 2, gl.FLOAT, false, 0, 0); //texture -------------------------

gl.enableVertexAttribArray(positionAttribLocationMbox);
gl.enableVertexAttribArray(texCoordAttribLocationMbox); //texture ----------------------------


const modelViewMatrixLocationMbox = gl.getUniformLocation(
  shaderProgramMbox,
  "u_modelViewMatrix"
);
const projectionMatrixLocationMbox = gl.getUniformLocation(
  shaderProgramMbox,
  "u_projectionMatrix"
);

const textureLocationMbox = gl.getUniformLocation(shaderProgramMbox, "u_texture"); //texture ----------------------------
const textureSizeLocationMbox = gl.getUniformLocation(shaderProgramMbox, "u_textureSize");


//  Load and Bind Texture
const textureMbox = gl.createTexture();
const textureImageMbox = new Image();
textureImageMbox.src = './blueTexture3.jpeg';

textureImageMbox.onload = function () { //texture ----------------------------
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureMbox);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImageMbox);
 // Set texture filtering for magnification (when texture is enlarged)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

// Set texture filtering for minification (when texture is reduced in size)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    

    // Generate mipmaps and set texture filter for minification
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // Set the texture uniform in your rendering loop
    gl.useProgram(shaderProgramMbox);
    gl.uniform2f(textureSizeLocationMbox, textureImageMbox.width, textureImageMbox.height);
    gl.uniform1i(textureSizeLocationMbox, 0);

}
/* --------------------------------------------- RENDER MOVING BOX OBSTACLES --------------------------------------------------------------------*/

let movingTilePositionBox = 0;

function renderMboxes() {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const boxType = data[row][col];

      // Only render a box if the data value is 3
      if (boxType === 6) {
        // Update model-view matrix for translation of Boxes
        mat4.lookAt(
          modelViewMatrix,
          cameraPosition,
          [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1],
          [0.0, 1.0, 0.0]
        );

        movingTilePositionBox = Math.sin(getElapsedTime() * 0.0023) * 3;

        let translationBoxX = col * tileSize - 2 * tileSize;
        let translationBoxY = movingTilePositionBox;
        let translationBoxZ = row * -4.0 - 5;

        // Apply translation based on row, column, and tile height
        mat4.translate(modelViewMatrix, modelViewMatrix, [
          translationBoxX,
          translationBoxY,
          translationBoxZ,
        ]);

        // Use shader program and bind vertex buffer for Boxes
        gl.useProgram(shaderProgramMbox);
        gl.bindBuffer(gl.ARRAY_BUFFER, mboxVertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mboxIndexBuffer);

        // Enable attributes and set attribute pointers for Boxes
        gl.enableVertexAttribArray(positionAttribLocationMbox);
        gl.enableVertexAttribArray(texCoordAttribLocationMbox); //texture---------------------------

        gl.vertexAttribPointer(
          positionAttribLocationMbox,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );
        gl.vertexAttribPointer(texCoordAttribLocationMbox, 2, gl.FLOAT, false, 0, 0);  //texture---------------------------


        // Set uniforms for transformation matrices for Boxes
        gl.uniformMatrix4fv(
          modelViewMatrixLocationMbox,
          false,
          modelViewMatrix
        );
        gl.uniformMatrix4fv(
          projectionMatrixLocationMbox,
          false,
          projectionMatrix
        );
        gl.activeTexture(gl.TEXTURE0); //texture---------------------------
        gl.bindTexture(gl.TEXTURE_2D, textureMbox); //texture---------------------------
        gl.uniform1i(textureLocationMbox, 0); //texture---------------------------


        gl.vertexAttribPointer(normalAttribLocationBoxM, 3, gl.FLOAT, false, 0, 0); //normal*********
        gl.enableVertexAttribArray(normalAttribLocationBoxM); //normal *********
        const normalMatrixBoxM = mat3.create();
        mat3.normalFromMat4(normalMatrixBoxM, modelViewMatrix); // assuming modelViewMatrix is available
        
        gl.uniformMatrix3fv(normalMatrixLocationBoxM, false, normalMatrixBoxM);


        // Draw Boxes
        gl.drawElements(gl.TRIANGLES, mboxIndices.length, gl.UNSIGNED_SHORT, 0);
      }
      // Only render a box if the data value is 7
      if (boxType === 7) {
        // Update model-view matrix for translation of Boxes
        mat4.lookAt(
          modelViewMatrix,
          cameraPosition,
          [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1],
          [0.0, 1.0, 0.0]
        );

        movingTilePositionBox = Math.sin(getElapsedTime() * 0.0023) * 5;

        let translationBoxX =
          movingTilePositionBox + col * tileSize - 2 * tileSize;
        let translationBoxY = -1.0;
        let translationBoxZ = row * -4.0 - 5;

        // Apply translation based on row, column, and tile height
        mat4.translate(modelViewMatrix, modelViewMatrix, [
          translationBoxX,
          translationBoxY,
          translationBoxZ,
        ]);

        // Use shader program and bind vertex buffer for Boxes
        gl.useProgram(shaderProgramMbox);
        gl.bindBuffer(gl.ARRAY_BUFFER, mboxVertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mboxIndexBuffer);

        // Enable attributes and set attribute pointers for Boxes
        gl.enableVertexAttribArray(positionAttribLocationMbox);
        gl.enableVertexAttribArray(texCoordAttribLocationMbox); //texture---------------------------

        gl.vertexAttribPointer(
          positionAttribLocationMbox,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );
        gl.vertexAttribPointer(texCoordAttribLocationMbox, 2, gl.FLOAT, false, 0, 0);  //texture---------------------------


        // Set uniforms for transformation matrices for Boxes
        gl.uniformMatrix4fv(
          modelViewMatrixLocationMbox,
          false,
          modelViewMatrix
        );
        gl.uniformMatrix4fv(
          projectionMatrixLocationMbox,
          false,
          projectionMatrix
        );
        gl.activeTexture(gl.TEXTURE0); //texture---------------------------
        gl.bindTexture(gl.TEXTURE_2D, textureMbox); //texture---------------------------
        gl.uniform1i(textureLocationMbox, 0); //texture---------------------------


        gl.vertexAttribPointer(normalAttribLocationBoxM, 3, gl.FLOAT, false, 0, 0); //normal*********
        gl.enableVertexAttribArray(normalAttribLocationBoxM); //normal *********
        const normalMatrixBoxM = mat3.create();
        mat3.normalFromMat4(normalMatrixBoxM, modelViewMatrix); // assuming modelViewMatrix is available


        // Draw Boxes
        gl.drawElements(gl.TRIANGLES, mboxIndices.length, gl.UNSIGNED_SHORT, 0);
      }
    }
  }
}

/* --------------------------------------------- RENDER BOX OBSTACLES --------------------------------------------------------------------*/

function renderBoxes() {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const boxType = data[row][col];

      // Only render a box if the data value is 3
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
        gl.enableVertexAttribArray(texCoordAttribLocationBox); //texture---------------------------

        gl.vertexAttribPointer(
          positionAttribLocationBox,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );
        gl.vertexAttribPointer(texCoordAttribLocationBox, 2, gl.FLOAT, false, 0, 0);  //texture---------------------------


        // Set uniforms for transformation matrices for Boxes
        gl.uniformMatrix4fv(modelViewMatrixLocationBox, false, modelViewMatrix);
        gl.uniformMatrix4fv(
          projectionMatrixLocationBox,
          false,
          projectionMatrix
        );

        gl.vertexAttribPointer(normalAttribLocationBox, 3, gl.FLOAT, false, 0, 0); //normal*********
        gl.enableVertexAttribArray(normalAttribLocationBox); //normal *********
        const normalMatrixBox = mat3.create();
        mat3.normalFromMat4(normalMatrixBox, modelViewMatrix); // assuming modelViewMatrix is available
        
        gl.uniformMatrix3fv(normalMatrixLocationBox, false, normalMatrixBox);



        gl.activeTexture(gl.TEXTURE0); //texture---------------------------
        gl.bindTexture(gl.TEXTURE_2D, textureBox); //texture---------------------------
        gl.uniform1i(textureLocationBox, 0); //texture---------------------------


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
          [0.0, 1, 0.0]
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
        gl.enableVertexAttribArray(texCoordAttribLocationTile); //texture---------------------------

        
        gl.vertexAttribPointer(
          positionAttribLocationTile,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );
        gl.vertexAttribPointer(texCoordAttribLocationTile, 2, gl.FLOAT, false, 0, 0);  //texture---------------------------



        gl.vertexAttribPointer(normalAttribLocationTile, 3, gl.FLOAT, false, 0, 0); //normal*********
        gl.enableVertexAttribArray(normalAttribLocationTile); //normal *********

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
        gl.useProgram(shaderProgramTile);

        gl.activeTexture(gl.TEXTURE0); //texture---------------------------
        gl.bindTexture(gl.TEXTURE_2D, textureTile); //texture---------------------------
        gl.uniform1i(textureLocationTile, 0); //texture---------------------------

        const normalMatrixTile = mat3.create();
mat3.normalFromMat4(normalMatrixTile, modelViewMatrix); // assuming modelViewMatrix is available

gl.uniformMatrix3fv(normalMatrixLocationTile, false, normalMatrixTile);


        // Draw Tiles
        gl.drawElements(gl.TRIANGLES, tileIndices.length, gl.UNSIGNED_SHORT, 0);
      }
    }
  }
}



   




/* --------------------------------------------- RENDER MOVING TILES --------------------------------------------------------------------*/

let movingTilePosition = 0;
let startTime = Date.now();
let translationX ;
        let translationY ;
        let translationZ ;

function getElapsedTime() {
  return Date.now() - totalPausedTime;
}

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

        movingTilePosition = Math.sin(getElapsedTime() * 0.003) * 2;

        translationX = movingTilePosition + col * tileSize - 2 * tileSize;
         translationY = -1.0;
         translationZ = row * -4.0 - 5;

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
        gl.enableVertexAttribArray(texCoordAttribLocationTileM); //texture---------------------------

        gl.vertexAttribPointer(
          positionAttribLocationMovTile,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );
        gl.vertexAttribPointer(texCoordAttribLocationTileM, 2, gl.FLOAT, false, 0, 0);  //texture---------------------------

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

        gl.activeTexture(gl.TEXTURE0); //texture---------------------------
        gl.bindTexture(gl.TEXTURE_2D, textureTileM); //texture---------------------------
        gl.uniform1i(textureLocationTileM, 0); //texture---------------------------

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

let jmovingTilePosition = 0;

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

        jmovingTilePosition = Math.sin(getElapsedTime() * 0.003) * 5;

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
        gl.enableVertexAttribArray(texCoordAttribLocationTileEnd); //texture---------------------------

        gl.vertexAttribPointer(
          positionAttribLocationEndTile,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );
        gl.vertexAttribPointer(texCoordAttribLocationTileEnd, 2, gl.FLOAT, false, 0, 0);  //texture---------------------------

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
        gl.activeTexture(gl.TEXTURE0); //texture---------------------------
        gl.bindTexture(gl.TEXTURE_2D, textureTileEnd); //texture---------------------------
        gl.uniform1i(textureLocationTileEnd, 0); //texture---------------------------
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
let mainPositionY = 0.4; // New variable to store main position along the y-axis
let mainPositionZ = -9.0; // New variable to store main position along the z-axis

let sphereRotationX = 0.0;
let sphereRotationY = 0.0;
let sphereRotationZ = 0.0;

const fieldOfView = Math.PI / 4; // 45 degrees
const aspect = canvas.width / canvas.height;
const near = 0.99;
const far = 10000.0;
let pitchAngle = 0.3;

mat4.perspective(projectionMatrix, fieldOfView, aspect, near, far);

let cameraPosition = vec3.fromValues(0.0, 2.0, 5.0); // Initial camera position

cameraPosition[0] = 0; // X-coordinate of the camera
cameraPosition[1] = 5; // Y-coordinate of the camera (height)
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

/* --------------------------------------------- VALUES --------------------------------------------------------------------*/



let pauseGame = false;

let accelerationY = 0.0;



// let jumpFlag = false;
const maxHeight = 7;

// Define initial and final camera positions
const initialCameraPosition = [-30, 4, 0];
const finalCameraPosition = [-8, 4, 0];

// Define the duration of the intro in milliseconds
const introDuration = 10000; // 10 seconds

// Get the start time of the intro
let introStartTime = Date.now();

let introStart = true;
/* --------------------------------------------- INTRO HANDLE--------------------------------------------------------------------*/

function introHandle() {
  if (Date.now() - introStartTime > introDuration) {
    introStart = false;
    resetPositions();

  }
  if(cameraPosition[2] > 5){
    cameraPosition[2] -= 2.3;
    cameraPosition[1] -= 0.0131;
  }
    cameraPosition[2] += 2.35;
    cameraPosition[1] += 0.003;
    mainPositionZ = -9.0;
}

// Where to start the camera for Intro? 
cameraPosition[2] = -1200; // We can automatically adjust with calculations in const 




// Add a variable to track the rotation angle
let sphereRotationAngle = 0;


/* --------------------------------------------- RENDER LOOP --------------------------------------------------------------------*/

let endTileReached = false;

// Rendering Loop
function render() {




  // show camera introduction 
  if (introStart) {

    introHandle();

  }

  //handle pause keys 
  handlePause();

  // run if game is not paused
  if (!pauseGame) {
    
    if(mainPositionY > -0.9 && !endTileReached){
      handleKeys();

    }





    mainPositionY += gravity;
    if (mainPositionY >= maxHeight) {
      jumpFlag = false; //not allowed to jump after reaching maximum height and only allowed to fall due to gravity;
      deceleration =0.0011;
      
    }
    
    if(jumpFlag){
      mainPositionY += jumpVelocity - deceleration; // increase in height gradually with each collision detected in tile
      deceleration += 0.003;
    }
    if(!jumpFlag){
      mainPositionY -= gravityAcceleration;
      gravityAcceleration += 0.004;
    }

    //Camera follows ball in Z-axis 
    if(!introStart){
      cameraPosition[2] = mainPositionZ + 14; // 14 is adjusted distance between camera and ball in Z axis 
    }
    

    if (mainPositionY < -9.1) {
      deceleration = 0.0011;

      tryAgainMenu();
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
    // Rotate the sphere around its own axis
mat4.rotate(modelViewMatrix, modelViewMatrix, sphereRotationX, [1, 0, 0]);
mat4.rotate(modelViewMatrix, modelViewMatrix, sphereRotationY, [0, 1, 0]);
mat4.rotate(modelViewMatrix, modelViewMatrix, sphereRotationZ, [0, 0, 1]);






    // Set clear color and clear the canvas
    gl.enable(gl.DEPTH_TEST);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    
    // Use shader program and bind vertex buffer for Sphere 1
    gl.useProgram(shaderProgram1);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer1);

    // Enable attributes and set attribute pointers for Sphere 1
    gl.enableVertexAttribArray(positionAttribLocation1);
    gl.enableVertexAttribArray(texCoordAttribLocation1); //texture---------------------------
    gl.vertexAttribPointer(positionAttribLocation1, 3, gl.FLOAT, false, 0, 0);
    gl.vertexAttribPointer(texCoordAttribLocation1, 2, gl.FLOAT, false, 0, 0);  //texture---------------------------


    gl.enableVertexAttribArray(normalAttribLocation1);
    gl.vertexAttribPointer(normalAttribLocation1, 3, gl.FLOAT, false, 0, 0); //normal*********


    const normalMatrix1 = mat3.create(); // Normal ***************
    mat3.normalFromMat4(normalMatrix1, modelViewMatrix); // Normal ***************
    gl.uniformMatrix3fv(normalMatrixLocation1, false, normalMatrix1); // Normal *************

    // Set uniforms for transformation matrices for Sphere 1
    gl.uniformMatrix4fv(modelViewMatrixLocation1, false, modelViewMatrix);
    gl.uniformMatrix4fv(projectionMatrixLocation1, false, projectionMatrix);

    // Activate texture unit, bind texture, and set uniform
    gl.activeTexture(gl.TEXTURE0); //texture---------------------------
    gl.bindTexture(gl.TEXTURE_2D, texture1); //texture---------------------------
    
    gl.uniform1i(textureLocation1, 0); //texture---------------------------
    

    // Draw Sphere 1
    gl.drawElements(gl.TRIANGLES, indices1.length, gl.UNSIGNED_SHORT, 0);



    // Update model-view matrix for translation of Sphere 1
    mat4.lookAt(
      modelViewMatrix,
      cameraPosition,
      [cameraPosition[0], cameraPosition[1], cameraPosition[2] - 5],
      [0.0, 1.0, 1.0]
    );



    // mat4.identity(modelViewMatrix);
    mat4.translate(modelViewMatrix, modelViewMatrix, [
      0,
      mainPositionY,
      mainPositionZ-1500,
    ]);
// Use shader program and bind vertex buffer for Background
gl.useProgram(shaderProgramBackground);
gl.bindBuffer(gl.ARRAY_BUFFER, backgroundVertexBuffer);

// Enable attributes and set attribute pointers for Background
gl.enableVertexAttribArray(positionAttribLocationBackground);
gl.vertexAttribPointer(positionAttribLocationBackground, 3, gl.FLOAT, false, 0, 0);

// Set uniforms for transformation matrices for Background
gl.uniformMatrix4fv(modelViewMatrixLocationBackground, false, modelViewMatrix);
gl.uniformMatrix4fv(projectionMatrixLocationBackground, false, projectionMatrix);

// Activate texture unit, bind texture, and set uniform for Background
gl.activeTexture(gl.TEXTURE1);
gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
gl.uniform1i(textureLocationBackground, 1);

// Draw Background
gl.drawArrays(gl.TRIANGLE_STRIP, 0, backgroundVertices.length / 3);


    // Render tiles
renderTiles();


    // Render Box obstacles
    renderBoxes();

    renderMboxes();

    renderJumpTiles();

    renderMovingTiles();

    renderJmovingTiles();

    renderEndTiles();

    //HANDLE COLLISION
    handleCollisions();

  }


  // Request the next frame
  requestAnimationFrame(render);
}

/* --------------------------------------------- START RENDER --------------------------------------------------------------------*/

// Start the rendering loop

function startGame(){
  // Get the audio element
  var audio = document.getElementById("music");

  // Play the audio
  audio.play();
  document.getElementById("menuOverlayStarting").style.display ="none";
  introStartTime = Date.now();
  render();
  
}




// GENERATE SPHERE VERTICES 
function generateSphereVertices(radius, latitudeBands, longitudeBands) {
  const vertices = [];
  const textureCoords = [];
  const normals = []; // New array for normal vectors
  const indices = [];

  for (let lat = 0; lat <= latitudeBands; lat++) {
    const theta = (lat * Math.PI) / latitudeBands;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let lon = 0; lon <= longitudeBands; lon++) {
      const phi = (lon * 2 * Math.PI) / longitudeBands;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const x = cosPhi * sinTheta;
      const y = cosTheta;
      const z = sinPhi * sinTheta;

      const u = 1 - lon / longitudeBands;
      const v = 1 - lat / latitudeBands;

      const nx = x; // Normal vectors are the same as vertex positions for a sphere
      const ny = y;
      const nz = z;

      vertices.push(radius * x, radius * y, radius * z);
      textureCoords.push(u, v);
      normals.push(nx, ny, nz);
    }
  }

  for (let lat = 0; lat < latitudeBands; lat++) {
    for (let lon = 0; lon < longitudeBands; lon++) {
      const first = lat * (longitudeBands + 1) + lon;
      const second = first + longitudeBands + 1;
      indices.push(first, second, first + 1, second, second + 1, first + 1);
    }
  }

  return { vertices, textureCoords, normals, indices };
}





// GENERATE TILE CUBE VERTICES


// GENERATE TILE CUBE VERTICES
function generateTileVertices(size, height) {
  const halfSize = size / 2;
  const vertices = [
      // Top face
      -halfSize, height, -halfSize,
      halfSize, height, -halfSize,
      halfSize, height, halfSize,
      -halfSize, height, halfSize,
      // Bottom face
      -halfSize, 0, -halfSize,
      halfSize, 0, -halfSize,
      halfSize, 0, halfSize,
      -halfSize, 0, halfSize,
      // Front face
      -halfSize, 0, halfSize,
      halfSize, 0, halfSize,
      halfSize, height, halfSize,
      -halfSize, height, halfSize,
      // Back face
      -halfSize, 0, -halfSize,
      halfSize, 0, -halfSize,
      halfSize, height, -halfSize,
      -halfSize, height, -halfSize,
      // Left face
      -halfSize, 0, -halfSize,
      -halfSize, 0, halfSize,
      -halfSize, height, halfSize,
      -halfSize, height, -halfSize,
      // Right face
      halfSize, 0, -halfSize,
      halfSize, 0, halfSize,
      halfSize, height, halfSize,
      halfSize, height, -halfSize
  ];

  const textureCoords = [
      // Top face
      0, 0, 1, 0, 1, 1, 0, 1,
      // Bottom face
      0, 0, 1, 0, 1, 1, 0, 1,
      // Front face
      0, 0, 1, 0, 1, 1, 0, 1,
      // Back face
      0, 0, 1, 0, 1, 1, 0, 1,
      // Left face
      0, 0, 1, 0, 1, 1, 0, 1,
      // Right face
      0, 0, 1, 0, 1, 1, 0, 1
  ];

  const indices = [
      0, 1, 2, 0, 2, 3,  // Top face
      4, 5, 6, 4, 6, 7,  // Bottom face
      8, 9, 10, 8, 10, 11,  // Front face
      12, 13, 14, 12, 14, 15,  // Back face
      16, 17, 18, 16, 18, 19,  // Left face
      20, 21, 22, 20, 22, 23  // Right face
  ];
  const normals = [
    // Top face
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    // Bottom face
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
    // Front face
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // Back face
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    // Left face
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    // Right face
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0
  ];

  return { vertices, textureCoords, normals, indices };
}

//   function generateTileVertices(size, height) {
//     const halfSize = size / 2;
//     const vertices = [
//         // Top face
//         -halfSize, height, -halfSize,
//         halfSize, height, -halfSize,
//         halfSize, height, halfSize,
//         -halfSize, height, halfSize,
//         // Bottom face
//         -halfSize, 0, -halfSize,
//         halfSize, 0, -halfSize,
//         halfSize, 0, halfSize,
//         -halfSize, 0, halfSize,
//         // Front face
//         -halfSize, 0, halfSize,
//         halfSize, 0, halfSize,
//         halfSize, height, halfSize,
//         -halfSize, height, halfSize,
//         // Back face
//         -halfSize, 0, -halfSize,
//         halfSize, 0, -halfSize,
//         halfSize, height, -halfSize,
//         -halfSize, height, -halfSize,
//         // Left face
//         -halfSize, 0, -halfSize,
//         -halfSize, 0, halfSize,
//         -halfSize, height, halfSize,
//         -halfSize, height, -halfSize,
//         // Right face
//         halfSize, 0, -halfSize,
//         halfSize, 0, halfSize,
//         halfSize, height, halfSize,
//         halfSize, height, -halfSize
//     ];

//     const indices = [
//         0, 1, 2, 0, 2, 3,  // Top face
//         4, 5, 6, 4, 6, 7,  // Bottom face
//         8, 9, 10, 8, 10, 11,  // Front face
//         12, 13, 14, 12, 14, 15,  // Back face
//         16, 17, 18, 16, 18, 19,  // Left face
//         20, 21, 22, 20, 22, 23  // Right face
//     ];

//     return { vertices, indices };
// }

// GENERATE JUMP CUBE TILE VERTICES
function generateJumpTileVertices(size, height) {
  const halfSize = size / 2;
  const vertices = [
      // Top face
      -halfSize, height, -halfSize,
      halfSize, height, -halfSize,
      halfSize, height, halfSize,
      -halfSize, height, halfSize,
      // Bottom face
      -halfSize, 0, -halfSize,
      halfSize, 0, -halfSize,
      halfSize, 0, halfSize,
      -halfSize, 0, halfSize,
      // Front face
      -halfSize, 0, halfSize,
      halfSize, 0, halfSize,
      halfSize, height, halfSize,
      -halfSize, height, halfSize,
      // Back face
      -halfSize, 0, -halfSize,
      halfSize, 0, -halfSize,
      halfSize, height, -halfSize,
      -halfSize, height, -halfSize,
      // Left face
      -halfSize, 0, -halfSize,
      -halfSize, 0, halfSize,
      -halfSize, height, halfSize,
      -halfSize, height, -halfSize,
      // Right face
      halfSize, 0, -halfSize,
      halfSize, 0, halfSize,
      halfSize, height, halfSize,
      halfSize, height, -halfSize
  ];

  const textureCoords = [
      // Top face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Bottom face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Front face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Back face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Left face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Right face
      0, 1, 1, 1, 1, 0, 0, 0
  ];

  const indices = [
      0, 1, 2, 0, 2, 3,  // Top face
      4, 5, 6, 4, 6, 7,  // Bottom face
      8, 9, 10, 8, 10, 11,  // Front face
      12, 13, 14, 12, 14, 15,  // Back face
      16, 17, 18, 16, 18, 19,  // Left face
      20, 21, 22, 20, 22, 23  // Right face
  ];

  return { vertices, textureCoords, indices };
}

// GENERATE MOVE CUBE TILE VERTICES
function generateMovTileVertices(size, height) {
  const halfSize = size / 2;
  const vertices = [
      // Top face
      -halfSize, height, -halfSize,
      halfSize, height, -halfSize,
      halfSize, height, halfSize,
      -halfSize, height, halfSize,
      // Bottom face
      -halfSize, 0, -halfSize,
      halfSize, 0, -halfSize,
      halfSize, 0, halfSize,
      -halfSize, 0, halfSize,
      // Front face
      -halfSize, 0, halfSize,
      halfSize, 0, halfSize,
      halfSize, height, halfSize,
      -halfSize, height, halfSize,
      // Back face
      -halfSize, 0, -halfSize,
      halfSize, 0, -halfSize,
      halfSize, height, -halfSize,
      -halfSize, height, -halfSize,
      // Left face
      -halfSize, 0, -halfSize,
      -halfSize, 0, halfSize,
      -halfSize, height, halfSize,
      -halfSize, height, -halfSize,
      // Right face
      halfSize, 0, -halfSize,
      halfSize, 0, halfSize,
      halfSize, height, halfSize,
      halfSize, height, -halfSize
  ];

  const textureCoords = [
      // Top face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Bottom face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Front face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Back face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Left face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Right face
      0, 1, 1, 1, 1, 0, 0, 0
  ];

  const indices = [
      0, 1, 2, 0, 2, 3,  // Top face
      4, 5, 6, 4, 6, 7,  // Bottom face
      8, 9, 10, 8, 10, 11,  // Front face
      12, 13, 14, 12, 14, 15,  // Back face
      16, 17, 18, 16, 18, 19,  // Left face
      20, 21, 22, 20, 22, 23  // Right face
  ];

  return { vertices, textureCoords, indices };
}


// GENERATE BOX VERTICES
// function generateBoxVertices(size, height) {
//   const halfSize = size / 2;
//   const vertices = [
//       // Top face
//       -halfSize, height, -halfSize,
//       halfSize, height, -halfSize,
//       halfSize, height, halfSize,
//       -halfSize, height, halfSize,
//       // Bottom face
//       -halfSize, 0, -halfSize,
//       halfSize, 0, -halfSize,
//       halfSize, 0, halfSize,
//       -halfSize, 0, halfSize,
//       // Front face
//       -halfSize, 0, halfSize,
//       halfSize, 0, halfSize,
//       halfSize, height, halfSize,
//       -halfSize, height, halfSize,
//       // Back face
//       -halfSize, 0, -halfSize,
//       halfSize, 0, -halfSize,
//       halfSize, height, -halfSize,
//       -halfSize, height, -halfSize,
//       // Left face
//       -halfSize, 0, -halfSize,
//       -halfSize, 0, halfSize,
//       -halfSize, height, halfSize,
//       -halfSize, height, -halfSize,
//       // Right face
//       halfSize, 0, -halfSize,
//       halfSize, 0, halfSize,
//       halfSize, height, halfSize,
//       halfSize, height, -halfSize
//   ];

//   const textureCoords = [
//       // Top face
//       0, 1, 1, 1, 1, 0, 0, 0,
//       // Bottom face
//       0, 1, 1, 1, 1, 0, 0, 0,
//       // Front face
//       0, 1, 1, 1, 1, 0, 0, 0,
//       // Back face
//       0, 1, 1, 1, 1, 0, 0, 0,
//       // Left face
//       0, 1, 1, 1, 1, 0, 0, 0,
//       // Right face
//       0, 1, 1, 1, 1, 0, 0, 0
//   ];

//   const indices = [
//       0, 1, 2, 0, 2, 3,  // Top face
//       4, 5, 6, 4, 6, 7,  // Bottom face
//       8, 9, 10, 8, 10, 11,  // Front face
//       12, 13, 14, 12, 14, 15,  // Back face
//       16, 17, 18, 16, 18, 19,  // Left face
//       20, 21, 22, 20, 22, 23  // Right face
//   ];

//   return { vertices, textureCoords, indices };
// }

// GENERATE BOX VERTICES
function generateBoxVertices(size, height) {
  const halfSize = size / 2;
  const vertices = [
      // Top face
      -halfSize, height, -halfSize,
      halfSize, height, -halfSize,
      halfSize, height, halfSize,
      -halfSize, height, halfSize,
      // Bottom face
      -halfSize, 0, -halfSize,
      halfSize, 0, -halfSize,
      halfSize, 0, halfSize,
      -halfSize, 0, halfSize,
      // Front face
      -halfSize, 0, halfSize,
      halfSize, 0, halfSize,
      halfSize, height, halfSize,
      -halfSize, height, halfSize,
      // Back face
      -halfSize, 0, -halfSize,
      halfSize, 0, -halfSize,
      halfSize, height, -halfSize,
      -halfSize, height, -halfSize,
      // Left face
      -halfSize, 0, -halfSize,
      -halfSize, 0, halfSize,
      -halfSize, height, halfSize,
      -halfSize, height, -halfSize,
      // Right face
      halfSize, 0, -halfSize,
      halfSize, 0, halfSize,
      halfSize, height, halfSize,
      halfSize, height, -halfSize
  ];

  const textureCoords = [
      // Top face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Bottom face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Front face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Back face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Left face
      0, 1, 1, 1, 1, 0, 0, 0,
      // Right face
      0, 1, 1, 1, 1, 0, 0, 0
  ];

  const indices = [
      0, 1, 2, 0, 2, 3,  // Top face
      4, 5, 6, 4, 6, 7,  // Bottom face
      8, 9, 10, 8, 10, 11,  // Front face
      12, 13, 14, 12, 14, 15,  // Back face
      16, 17, 18, 16, 18, 19,  // Left face
      20, 21, 22, 20, 22, 23  // Right face
  ];

  // Calculate normals for each face
  const faceNormals = [
      [0, 1, 0], // Top face normal
      [0, -1, 0], // Bottom face normal
      [0, 0, 1], // Front face normal
      [0, 0, -1], // Back face normal
      [-1, 0, 0], // Left face normal
      [1, 0, 0] // Right face normal
  ];

  // Duplicate normals for each vertex in the face
  const normals = [];
  for (let i = 0; i < indices.length; i++) {
      const faceIndex = Math.floor(i / 6); // 6 indices per face
      normals.push(...faceNormals[faceIndex]);
  }

  return { vertices, textureCoords, normals, indices };
}



// GENERATE SPHERE VERTICES 
function generateSphereVertices(radius, latitudeBands, longitudeBands) {
  const vertices = [];
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

      vertices.push(radius * x, radius * y, radius * z);
    }
  }

  for (let lat = 0; lat < latitudeBands; lat++) {
    for (let lon = 0; lon < longitudeBands; lon++) {
      const first = lat * (longitudeBands + 1) + lon;
      const second = first + longitudeBands + 1;
      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return { vertices, indices };
}



// GENERATE TILE VERTICES
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

  const indices = [
      0, 1, 2, 0, 2, 3,  // Top face
      4, 5, 6, 4, 6, 7,  // Bottom face
      8, 9, 10, 8, 10, 11,  // Front face
      12, 13, 14, 12, 14, 15,  // Back face
      16, 17, 18, 16, 18, 19,  // Left face
      20, 21, 22, 20, 22, 23  // Right face
  ];

  return { vertices, indices };
}


// GENERATE TILE VERTICES
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

  const indices = [
      0, 1, 2, 0, 2, 3,  // Top face
      4, 5, 6, 4, 6, 7,  // Bottom face
      8, 9, 10, 8, 10, 11,  // Front face
      12, 13, 14, 12, 14, 15,  // Back face
      16, 17, 18, 16, 18, 19,  // Left face
      20, 21, 22, 20, 22, 23  // Right face
  ];

  return { vertices, indices };
}



// GENERATE TILE VERTICES
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

  const indices = [
      0, 1, 2, 0, 2, 3,  // Top face
      4, 5, 6, 4, 6, 7,  // Bottom face
      8, 9, 10, 8, 10, 11,  // Front face
      12, 13, 14, 12, 14, 15,  // Back face
      16, 17, 18, 16, 18, 19,  // Left face
      20, 21, 22, 20, 22, 23  // Right face
  ];

  return { vertices, indices };
}




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

  const indices = [
      0, 1, 2, 0, 2, 3,  // Top face
      4, 5, 6, 4, 6, 7,  // Bottom face
      8, 9, 10, 8, 10, 11,  // Front face
      12, 13, 14, 12, 14, 15,  // Back face
      16, 17, 18, 16, 18, 19,  // Left face
      20, 21, 22, 20, 22, 23  // Right face
  ];

  return { vertices, indices };
}

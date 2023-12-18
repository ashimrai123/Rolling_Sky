const vertexShaderSourceBackground = `
  attribute vec3 a_position;
  attribute vec2 a_texCoord;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;
  varying vec2 v_texCoord;
  
  void main() {
    gl_Position = u_projectionMatrix * u_modelViewMatrix * vec4(a_position, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const fragmentShaderSourceBackground = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_texture;

  void main() {
    gl_FragColor = texture2D(u_texture, v_texCoord);
  }
`;

function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }
  
  function linkProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
  
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
  
    return program;
  }
  

  
  
  // Step 3: Data Generation
  function initShaderProgram(gl, vsSource, fsSource) {
    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
  
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
  
      return shader;
    }
  
    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);
  
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
  
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    // Log attribute locations
  const numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < numAttributes; i++) {
    const info = gl.getActiveAttrib(program, i);
    const location = gl.getAttribLocation(program, info.name);
    console.log(`Attribute ${info.name} has location: ${location}`);
  }

  
    return program;
  }


  // Shader Programs for MAIN SPHERE
const vertexShaderSource = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec3 a_normal; // New attribute for normal vectors

uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;
uniform mat3 u_normalMatrix; // New uniform for normal matrix

varying vec2 v_texCoord;
varying vec3 v_normal; // New varying for interpolated normal vectors

void main() {
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
    v_texCoord = a_texCoord;

    // Transform normal to eye space
    v_normal = normalize(u_normalMatrix * a_normal);
}

`;


const fragmentShaderSource = `
precision mediump float;

varying vec2 v_texCoord;
varying vec3 v_normal; // New varying for interpolated normal vectors

uniform sampler2D u_texture;

void main() {
    vec2 clampedTexCoord = clamp(v_texCoord, 0.8, 1.0);
    vec4 textureColor = texture2D(u_texture, clampedTexCoord);

    vec3 lightDirection = normalize(vec3(0.2, 2.0, 1.1)); // Adjust light direction
    float lightIntensity = max(dot(v_normal, lightDirection), 0.0); // Lambertian diffuse

    vec3 ambientColor = vec3(0.3, 0.3, 1.2); // Adjust ambient color for the sphere
    vec3 diffuseColor = vec3(1.0, 1.0, 1.0); // Adjust diffuse color for the sphere

    vec3 finalColor = textureColor.rgb * (ambientColor + lightIntensity * diffuseColor);

    gl_FragColor = vec4(finalColor, textureColor.a);
}

`;


  
  // Shader Programs for TILE
// Vertex Shader for Tiles
const vertexShaderSourceTile = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec3 a_normal; // New attribute for normal vectors

uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;
uniform mat3 u_normalMatrix; // New uniform for normal matrix

varying vec2 v_texCoord;
varying vec3 v_normal; // New varying for interpolated normal vectors

void main() {
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
    v_texCoord = a_texCoord;

    // Transform normal to eye space
    v_normal = normalize(u_normalMatrix * a_normal);
}

`;

// Fragment Shader for Tiles
const fragmentShaderSourceTile = `
precision mediump float;

varying vec2 v_texCoord;
varying vec3 v_normal; // New varying for interpolated normal vectors

uniform sampler2D u_texture;

void main() {
    vec2 clampedTexCoord = clamp(v_texCoord, 1.7, 1.0);
    vec4 textureColor = texture2D(u_texture, clampedTexCoord);

    vec3 lightDirection = normalize(vec3(0.1, 9.0, 0.1)); // Adjust light direction
    float lightIntensity = max(dot(v_normal, lightDirection), 0.0); // Lambertian diffuse

    vec3 ambientColor = vec3(0.5, 0.6, 4.9); // Adjust ambient color for the sphere
    vec3 diffuseColor = vec3(1.0, 1.0, 1.0); // Adjust diffuse color for the sphere

    vec3 finalColor = textureColor.rgb * (ambientColor + lightIntensity * diffuseColor);

    gl_FragColor = vec4(finalColor, textureColor.a);
}

`;


  


  // const vertexShaderSourceTile = `
  // attribute vec4 a_position;
  // uniform mat4 u_modelViewMatrix;
  // uniform mat4 u_projectionMatrix;

  // void main() {
  //   // Use a_position, even if it doesn't directly affect gl_Position
  //   gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
  // }
  // `;
  
  // const fragmentShaderSourceTile = `
  //   precision mediump float;
  
  //   void main() {
  //     // Fragment Color
  //     gl_FragColor = vec4(1.0, 1.0 , 0.0, 1.0);
  //   }
  // `;


  
  // Shader Programs for JUMP TILE
  const vertexShaderSourceJumpTile = `
  attribute vec4 a_position;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;
  attribute vec2 a_texCoord;
varying vec2 v_texCoord;

  void main() {
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
    v_texCoord = a_texCoord;
  }
  `;
  
  const fragmentShaderSourceJumpTile = `
  precision highp float;
  varying vec2 v_texCoord;
  uniform sampler2D u_texture;

  void main() {
    // Sample the texture using the texture coordinates
    vec2 clampedTexCoord = clamp(v_texCoord, 1.0, 1.0);
    vec4 textureColor = texture2D(u_texture, clampedTexCoord);

    // Output the texture color with full alpha
    gl_FragColor = textureColor;
}

  `;

  
  
  // Shader Programs for TILE
  const vertexShaderSourceEndTile = `
  attribute vec4 a_position;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;
  attribute vec2 a_texCoord;
varying vec2 v_texCoord;

  void main() {
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
    v_texCoord = a_texCoord;
  }
  `;
  
  const fragmentShaderSourceEndTile = `
  precision highp float;
  varying vec2 v_texCoord;
  uniform sampler2D u_texture;

  void main() {
    // Sample the texture using the texture coordinates
    vec2 clampedTexCoord = clamp(v_texCoord, 1.0, 1.0);
    vec4 textureColor = texture2D(u_texture, clampedTexCoord);

    // Output the texture color with full alpha
    gl_FragColor = textureColor;
}

  `;

 
  // Shader Programs for TILE
  const vertexShaderSourceMovTile = `
  attribute vec4 a_position;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;
  attribute vec2 a_texCoord;
varying vec2 v_texCoord;

  void main() {
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
    v_texCoord = a_texCoord;
  }
  `;
  
  const fragmentShaderSourceMovTile = `
  precision highp float;
  varying vec2 v_texCoord;
  uniform sampler2D u_texture;

  void main() {
    // Sample the texture using the texture coordinates
    vec2 clampedTexCoord = clamp(v_texCoord, 0.2, 1.0);
    vec4 textureColor = texture2D(u_texture, clampedTexCoord);

    // Output the texture color with full alpha
    gl_FragColor = textureColor;
}

  `;

  
  // Shader Programs for TILE
  const vertexShaderSourceJmovTile = `
  attribute vec4 a_position;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;
  attribute vec2 a_texCoord;
varying vec2 v_texCoord;

  void main() {
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
    v_texCoord = a_texCoord;
  }
  `;
  
  const fragmentShaderSourceJmovTile = `
  precision highp float;
  varying vec2 v_texCoord;
  uniform sampler2D u_texture;

  void main() {
    // Sample the texture using the texture coordinates
    vec2 clampedTexCoord = clamp(v_texCoord, 1.0, 1.0);
    vec4 textureColor = texture2D(u_texture, clampedTexCoord);

    // Output the texture color with full alpha
    gl_FragColor = textureColor;
}

  `;




  
  
  // Shader Programs for BOX
  const vertexShaderSourceBox = `
  attribute vec4 a_position;
  attribute vec2 a_texCoord;
  attribute vec3 a_normal; // New attribute for normal vectors
  
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;
  uniform mat3 u_normalMatrix; // New uniform for normal matrix
  
  varying vec2 v_texCoord;
  varying vec3 v_normal; // New varying for interpolated normal vectors
  
  void main() {
      gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
      v_texCoord = a_texCoord;
  
      // Transform normal to eye space
      v_normal = normalize(u_normalMatrix * a_normal);
  }
  `;
  
  const fragmentShaderSourceBox = `
  precision mediump float;

  varying vec2 v_texCoord;
  varying vec3 v_normal; // New varying for interpolated normal vectors
  
  uniform sampler2D u_texture;
  
  void main() {
      vec2 clampedTexCoord = clamp(v_texCoord, 1.9, 1.0);
      vec4 textureColor = texture2D(u_texture, clampedTexCoord);
  
      vec3 lightDirection = normalize(vec3(0.1, 5.0, 0.1)); // Adjust light direction
      float lightIntensity = max(dot(v_normal, lightDirection), 0.0); // Lambertian diffuse
  
      vec3 ambientColor = vec3(0.3, 0.4, 0.5); // Adjust ambient color for the sphere
      vec3 diffuseColor = vec3(1.0, 1.0, 1.0); // Adjust diffuse color for the sphere
  
      vec3 finalColor = textureColor.rgb * (ambientColor + lightIntensity * diffuseColor);
  
      gl_FragColor = vec4(finalColor, textureColor.a);
  }

  `;

    // Shader Programs for BOX
    const vertexShaderSourceMbox = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    attribute vec3 a_normal; // New attribute for normal vectors
    
    uniform mat4 u_modelViewMatrix;
    uniform mat4 u_projectionMatrix;
    uniform mat3 u_normalMatrix; // New uniform for normal matrix
    
    varying vec2 v_texCoord;
    varying vec3 v_normal; // New varying for interpolated normal vectors
    
    void main() {
        gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
        v_texCoord = a_texCoord;
    
        // Transform normal to eye space
        v_normal = normalize(u_normalMatrix * a_normal);
    }
    
    `;



    
   // Fragment shader for the cube
// Fragment shader for the cube with outline
// Fragment shader for the cube with outline
const fragmentShaderSourceMbox = `
precision mediump float;

varying vec2 v_texCoord;
varying vec3 v_normal; // New varying for interpolated normal vectors

uniform sampler2D u_texture;

void main() {
  vec2 clampedTexCoord = clamp(v_texCoord, 1.9, 1.0);
  vec4 textureColor = texture2D(u_texture, clampedTexCoord);

    vec3 lightDirection = normalize(vec3(0.1, 5.0, 0.1)); // Adjust light direction
    float lightIntensity = max(dot(v_normal, lightDirection), 0.0); // Lambertian diffuse

    vec3 ambientColor = vec3(0.3, 0.4, 0.5); // Adjust ambient color for the sphere
    vec3 diffuseColor = vec3(0.9, 1.0, 1.0); // Adjust diffuse color for the sphere

    vec3 finalColor = textureColor.rgb * (ambientColor + lightIntensity * diffuseColor);

    gl_FragColor = vec4(finalColor, textureColor.a);
}

`;




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
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;

  void main() {
    // Use a_position, even if it doesn't directly affect gl_Position
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
  }
  `;
  
  const fragmentShaderSource = `
    precision mediump float;
  
    void main() {
      // Set the fragment color (e.g., white)
      gl_FragColor = vec4(1.0, 0.0 , 0.0, 1.0);
    }
  `;


    // Shader Programs for SPHERE 2
    const vertexShaderSource2 = `
    attribute vec4 a_position;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;

  void main() {
    // Use a_position, even if it doesn't directly affect gl_Position
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
  }
  `;
  
  const fragmentShaderSource2 = `
    precision mediump float;
  
    void main() {
      // Set the fragment color (e.g., white)
      gl_FragColor = vec4(0.0, 1.0 , 0.0, 1.0);
    }
  `;


  
  // Shader Programs for TILE
  const vertexShaderSourceTile = `
  attribute vec4 a_position;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;

  void main() {
    // Use a_position, even if it doesn't directly affect gl_Position
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
  }
  `;
  
  const fragmentShaderSourceTile = `
    precision mediump float;
  
    void main() {
      // Set the fragment color (e.g., white)
      gl_FragColor = vec4(1.0, 1.0 , 0.0, 1.0);
    }
  `;


  
  // Shader Programs for TILE
  const vertexShaderSourceJumpTile = `
  attribute vec4 a_position;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;

  void main() {
    // Use a_position, even if it doesn't directly affect gl_Position
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
  }
  `;
  
  const fragmentShaderSourceJumpTile = `
    precision mediump float;
  
    void main() {
      // Set the fragment color (e.g., white)
      gl_FragColor = vec4(1.0, 0.0 , 0.5, 1.0);
    }
  `;

  
  
  // Shader Programs for TILE
  const vertexShaderSourceEndTile = `
  attribute vec4 a_position;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;

  void main() {
    // Use a_position, even if it doesn't directly affect gl_Position
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
  }
  `;
  
  const fragmentShaderSourceEndTile = `
    precision mediump float;
  
    void main() {
      // Set the fragment color (e.g., white)
      gl_FragColor = vec4(0.1, 1.0 , 0.1, 1.0);
    }
  `;




  
  
  // Shader Programs for BOX
  const vertexShaderSourceBox = `
  attribute vec4 a_position;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;

  void main() {
    // Use a_position, even if it doesn't directly affect gl_Position
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
  }
  `;
  
  const fragmentShaderSourceBox = `
    precision mediump float;
  
    void main() {
      // Set the fragment color (e.g., white)
      gl_FragColor = vec4(0.0, 0.1 , 1.0, 1.0);
    }
  `;
  
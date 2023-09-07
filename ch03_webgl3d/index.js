function main() {
  /*========== Create a WebGL Context ==========*/
  const colorPicker = document.querySelector('#colorPicker');
  const canvas = document.querySelector('#c');
  const gl = canvas.getContext('webgl');
  function checkContext(gl) {
    if (!gl) {
      console.log('WebGL not suported');
    } else {
      console.log('WebGL ready');
    }
  }

  checkContext(gl);

  /*========== Define and Store the Geometry ==========*/

  const squares = [
    // Front face
    -0.5, -0.5, 0.5,  // Vertex 1
     0.5, -0.5, 0.5,  // Vertex 2
     0.5,  0.5, 0.5,  // Vertex 3
    -0.5, -0.5, 0.5,  // Vertex 1
     0.5,  0.5, 0.5,  // Vertex 3
    -0.5,  0.5, 0.5,  // Vertex 4
  
    // Back face
    -0.5, -0.5, -0.5,  // Vertex 5
     0.5, -0.5, -0.5,  // Vertex 6
     0.5,  0.5, -0.5,  // Vertex 7
    -0.5, -0.5, -0.5,  // Vertex 5
     0.5,  0.5, -0.5,  // Vertex 7
    -0.5,  0.5, -0.5,  // Vertex 8
  
    // Top face
    -0.5,  0.5,  0.5,  // Vertex 4
     0.5,  0.5,  0.5,  // Vertex 3
     0.5,  0.5, -0.5,  // Vertex 7
    -0.5,  0.5,  0.5,  // Vertex 4
     0.5,  0.5, -0.5,  // Vertex 7
    -0.5,  0.5, -0.5,  // Vertex 8
  
    // Bottom face
    -0.5, -0.5,  0.5,  // Vertex 1
     0.5, -0.5,  0.5,  // Vertex 2
     0.5, -0.5, -0.5,  // Vertex 6
    -0.5, -0.5,  0.5,  // Vertex 1
     0.5, -0.5, -0.5,  // Vertex 6
    -0.5, -0.5, -0.5,  // Vertex 5
  
    // Right face
     0.5, -0.5,  0.5,  // Vertex 2
     0.5,  0.5,  0.5,  // Vertex 3
     0.5,  0.5, -0.5,  // Vertex 7
     0.5, -0.5,  0.5,  // Vertex 2
     0.5,  0.5, -0.5,  // Vertex 7
     0.5, -0.5, -0.5,  // Vertex 6
  
    // Left face
    -0.5, -0.5,  0.5,  // Vertex 1
    -0.5,  0.5,  0.5,  // Vertex 4
    -0.5,  0.5, -0.5,  // Vertex 8
    -0.5, -0.5,  0.5,  // Vertex 1
    -0.5,  0.5, -0.5,  // Vertex 8
    -0.5, -0.5, -0.5   // Vertex 5
  ];


  const squareColors = [
    // Front face (blue)
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
  
    // Back face (red)
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
  
    // Top face (green)
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
  
    // Bottom face (yellow)
    1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
  
    // Right face (purple)
    1.0, 0.0, 1.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
  
    // Left face (cyan)
    0.0, 1.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
  ];
  





  /*====== Define front-face buffer ======*/
  // buffer
  const origBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, origBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squares), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareColors), gl.STATIC_DRAW);


  function updateCubeColor() {
    const r = parseInt(selectedColor.slice(1, 3), 16) / 255.0;
    const g = parseInt(selectedColor.slice(3, 5), 16) / 255.0;
    const b = parseInt(selectedColor.slice(5, 7), 16) / 255.0;
    
  
    // Update the squareColors array with the new color and random alpha values for each face
    for (let i = 0; i < squareColors.length; i += 24) {
      const randomBlue = Math.random(); // Generate a random alpha value for each face
      
      for (let j = 0; j < 6; j++) {
        squareColors[i + (j * 4)] = r;
        squareColors[i + (j * 4) + 1] = g;
        squareColors[i + (j * 4) + 2] = randomBlue;
      }
    }
  
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareColors), gl.STATIC_DRAW);
  }
  


  /*========== Shaders ==========*/
  /*====== Define shader source ======*/
  const vsSource = /*glsl*/ `
    attribute vec4 aPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    varying lowp vec4 vColor;
    uniform mat4 uProjectionMatrix;

    void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
    vColor = aVertexColor;
    }  
  `;

  const fsSource = /*glsl*/ `
    varying lowp vec4 vColor;

    void main() {
    gl_FragColor = vColor;
  }
`;

  /*====== Create shaders ======*/
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertexShader, vsSource);
  gl.shaderSource(fragmentShader, fsSource);
  /*====== Compile shaders ======*/
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(vertexShader));
    gl.deleteShader(vertexShader);
    return null;
  }
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(fragmentShader));
    gl.deleteShader(fragmentShader);
    return null;
  }

  /*====== Create shader program ======*/
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  /*====== Link shader program ======*/

  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking failed:', gl.getProgramInfoLog(program));
  }

  let cubeRotation = 0.0;
  let then = 0;

  function render(now) {
    now *= 0.001;
    let deltaTime = now - then;
    then = now;

    gl.useProgram(program);

    /*====== Connect the attribute with the vertex shader =======*/

    const posAttribLocation = gl.getAttribLocation(program, 'aPosition');
    gl.bindBuffer(gl.ARRAY_BUFFER, origBuffer);
    gl.vertexAttribPointer(posAttribLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttribLocation);

    const colorAttribLocation = gl.getAttribLocation(program, 'aVertexColor');
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttribLocation);

    // Projection Matrix
    const projMatrixLocation = gl.getUniformLocation(program, 'uProjectionMatrix');
    const fieldOfView = 45 * Math.PI / 180; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = glMatrix.mat4.create();
    
    glMatrix.mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)
    
    gl.uniformMatrix4fv(projMatrixLocation, false, projectionMatrix)
    
    // Rotation Matricies
    const modelMatrixLocation = gl.getUniformLocation(program, 'uModelViewMatrix');
    const modelViewMatrix = glMatrix.mat4.create();
    
    glMatrix.mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -5.0])
    glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation, [0, 0, 1]);
    glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation,[0, 1, 0]); // axis to rotate around (X)

    gl.uniformMatrix4fv(modelMatrixLocation, false, modelViewMatrix);


    // // Translation for culling

    /*========== Drawing ========== */
    gl.clearColor(1, 1, 1, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /*====== Draw the points to the screen ======*/

    const mode = gl.TRIANGLES;
    const first = 0;
    const count = 36;
    gl.drawArrays(mode, first, count);
    cubeRotation += deltaTime;
    requestAnimationFrame(render);
  }


  colorPicker.addEventListener('input', (event) => {
    selectedColor = event.target.value;
    updateCubeColor();
  });

  requestAnimationFrame(render);
}

main();

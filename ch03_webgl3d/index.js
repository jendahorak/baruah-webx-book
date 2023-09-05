function main() {
  /*========== Create a WebGL Context ==========*/
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
  /*====== Define front-face vertices ======*/
  const squares = [
    //front face
    -0.3, -0.3, -0.3, 0.3, -0.3, -0.3, 0.3, 0.3, -0.3, -0.3, -0.3, -0.3, -0.3, 0.3, -0.3, 0.3, 0.3, -0.3,
    // back face
    -0.2, -0.2, 0.3, 0.4, -0.2, 0.3, 0.4, 0.4, 0.3, -0.2, -0.2, 0.3, -0.2, 0.4, 0.3, 0.4, 0.4, 0.3,

    // top face
    -0.3, 0.3, -0.3, 0.3, 0.3, -0.3, -0.2, 0.4, 0.3, 0.4, 0.4, 0.3, 0.3, 0.3, -0.3, -0.2, 0.4, 0.3,
  ];

  const squareColors = [
    0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0,
    1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0,
  ];

  /*====== Define front-face buffer ======*/
  // buffer
  const origBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, origBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squares), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareColors), gl.STATIC_DRAW);

  /*========== Shaders ==========*/
  /*====== Define shader source ======*/
  const vsSource = /*glsl*/ `
    attribute vec4 aPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    varying lowp vec4 vColor;



    void main() {
    gl_Position = uModelViewMatrix * aPosition;
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
    now *= 0.0001;
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

    const modelMatrixLocation = gl.getUniformLocation(program, 'uModelViewMatrix');
    const modelViewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation, [0, 0, 1]);

    gl.uniformMatrix4fv(modelMatrixLocation, false, modelViewMatrix);

    /*========== Drawing ========== */
    gl.clearColor(1, 1, 1, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /*====== Draw the points to the screen ======*/

    const mode = gl.TRIANGLES;
    const first = 0;
    const count = 18;
    gl.drawArrays(mode, first, count);
    cubeRotation += deltaTime;
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

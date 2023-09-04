const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

function checkContext(gl) {
  if (!gl) {
    console.log('WebGL not suported');
  }
}

checkContext(gl);

const vsSource = document.querySelector('#vertex-data').text;
const fsSource = document.querySelector('#fragment-data').text;

// compile shaders into GLSL
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
}

gl.useProgram(program);

// Define the points in the scene
console.log(gl.drawingBufferWidth);
console.log(gl.drawingBufferHeight);

const coordinates = [-0.7, 0.7, 0.7, 0.7, -0.7, 0, 0.7, 0];
const pointsBuffer = gl.createBuffer();
// Connect the empty buffer object to the Gl context
gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);
// Load the vertices into the GL's connected buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordinates), gl.STATIC_DRAW);
// Connect the attribute to the points data currently in the buffer object
let size = 2; // components per iteration (2 because just x,y points)
let type = gl.FLOAT; // data is 32bit floats
let normalize = false;
let stride = 0; // don't skip indices between coordinate pairs;
let offset = 0; // start at beginning of buffer

const pointsAttributeLocation = gl.getAttribLocation(program, 'vertex_points');

gl.vertexAttribPointer(pointsAttributeLocation, size, type, normalize, stride, offset);
gl.enableVertexAttribArray(pointsAttributeLocation);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
// Draw the points on the screen
const mode = gl.TRIANGLE_STRIP;
const first = 0;
const count = 4;
gl.drawArrays(mode, first, count);
// Define the active program of the GL context

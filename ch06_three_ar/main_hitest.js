import * as THREE from 'three';
// global scene vals
var btn, gl, glCanvas, camera, scene, renderer, cube;

// global xr vals
var xrSession = null;
var xrViewerPose;
var hitTestSource = null;
var hitTestSourceRequested = false;

loadScene();
init();

function loadScene() {
  glCanvas = document.createElement('canvas');
  gl = glCanvas.getContext('webgl2', { antialias: true });

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / 2 / window.innerHeight / 2,
    0.01,
    1000
  );

  scene = new THREE.Scene();

  var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  controller = renderer.xr.getController(0);
  controller.addEventListener('select', onSelect);
  scene.add(controller);

  // TODO - continue page 241

  var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  var material = new THREE.MeshPhongMaterial({ color: 0x89cff0 });
  cube = new THREE.Mesh(geometry, material);
  cube.position.y = 0.1;
  cube.position.z = -2;
  cube.position.x = 0;
  scene.add(cube);

  renderer = new THREE.WebGLRenderer({
    canvas: glCanvas,
    context: gl,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);
}

function init() {
  navigator.xr
    .isSessionSupported('immersive-ar')
    .then((isSupported) => {
      if (isSupported) {
        btn = document.createElement('button');
        btn.addEventListener('click', onRequestSession);
        btn.innerHTML = 'Enter AR';
        var header = document.querySelector('header');
        header.appendChild(btn);
      } else {
        navigator.xr.isSessionSupported('inline').then((isSupported) => {
          if (isSupported) {
            console.log('inline suported');
          } else {
            console.log('inline not supported');
          }
        });
      }
    })
    .catch((reason) => {
      console.log(`WebXR not supported: ${reason}`);
    });
}

function onRequestSession() {
  console.log('requesting session');
  navigator.xr
    .requestSession('immersive-ar', { requiredFeatures: ['viewer', 'local'] })
    .then(onSessionStarted)
    .catch((reason) => {
      console.log(`request disabled ${reason.log}`);
    });
}
function onSessionStarted(session) {
  console.log('starting a session');
  btn.removeEventListener('click', onRequestSession);
  btn.addEventListener('click', endXRSession);
  btn.innerHTML = 'STOP AR';
  xrSession = session;
  xrSession.addEventListener('end', onSessionEnd);
  setupWebGLLayer().then(() => {
    renderer.xr.setReferenceSpaceType('local');
    renderer.xr.setSession(xrSession);
    animate();
  });
}

function setupWebGLLayer() {
  return gl.makeXRCompatible().then(() => {
    xrSession.updateRenderState({ baseLayer: new XRWebGLLayer(xrSession, gl) });
  });
}

function animate() {
  renderer.setAnimationLoop(render);
}
function render(time) {
  if (!xrSession) {
    renderer.clear(true, true, true);
    return;
  } else {
    time *= 0.001;
    // cube.translateY((0.2 * Math.sin(time)) / 100);
    // cube.rotateY(Math.PI / 180);
    renderer.render(scene, camera);
  }
}

function endXRSession() {
  if (xrSession) {
    console.log('ending session...');
    xrSession.end().then(onSessionEnd);
  }
}
function onSessionEnd() {
  xrSession = null;
  console.log('session ended ');
  btn.innerHTML = 'START AR';
  btn.removeEventListener('click', endXRSession);
  btn.addEventListener('click', onRequestSession);
}

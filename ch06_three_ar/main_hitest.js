import * as THREE from 'three';
// global scene vals
let btn, gl, glCanvas, camera, scene, renderer, cube;
let controller, reticle;

// global xr vals
let xrSession = null;
let xrViewerPose;
let hitTestSource = null;
let hitTestSourceRequested = false;

loadScene();

function loadScene() {
  // setup WebGL
  glCanvas = document.createElement('canvas');
  gl = glCanvas.getContext('webgl2', { antialias: true });
  // setup Three.js scene
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / 2 / window.innerHeight / 2,
    0.01,
    1000
  );

  scene = new THREE.Scene();
  // add hemisphere light
  var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  // setup Three.js WebGL renderer
  renderer = new THREE.WebGLRenderer({
    canvas: glCanvas,
    context: gl,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);
  let geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 32).translate(
    0,
    0.1,
    0
  );

  // ======================  hittest =========================

  // controller click event listener
  function onSelect() {
    console.log('on select fired...');
    // generate a random color for the geometry
    let material = new THREE.MeshPhongMaterial({
      color: 0xffffff * Math.random(),
    });
    // create the mesh for the geometry and its material
    let mesh = new THREE.Mesh(geometry, material);

    mesh.applyMatrix4(reticle.matrix); // key func
    // randomly set the geometry’s scale
    mesh.scale.y = Math.random() * 2 + 1;
    scene.add(mesh);
  }

  // get controller WebXR Device API through Three.js
  controller = renderer.xr.getController(0);
  controller.addEventListener('select', onSelect);
  scene.add(controller);

  // wtf is reticle
  reticle = new THREE.Mesh(
    new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: '##FFFFFF' })
  );

  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);

  // del the init func
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

  // request immersive-ar session with hit-test
}

function onRequestSession() {
  console.log('requesting session');
  navigator.xr
    .requestSession('immersive-ar', {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['local-floor'],
    })
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

function render(time, frame) {
  if (frame) {
    var referenceSpace = renderer.xr.getReferenceSpace('local');
    var session = frame.session;

    // viewerPose provided by Spatial Tracking Module
    xrViewerPose = frame.getViewerPose(referenceSpace);
    if (hitTestSourceRequested === false) {
      session.requestReferenceSpace('viewer').then((referenceSpace) => {
        session
          .requestHitTestSource({
            space: referenceSpace,
          })
          .then((source) => {
            hitTestSource = source;
          });
      });
      session.addEventListener('end', () => {
        hitTestSourceRequested = false;
        hitTestSource = null;
      });
    }

    if (hitTestSource) {
      let hitTestResults = frame.getHitTestResults(hitTestSource);
      if (hitTestResults.length > 0) {
        let hit = hitTestResults[0];
        reticle.visible = true;
        reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
      } else {
        reticle.visible = false;
      }
    }
  }

  renderer.render(scene, camera);
}

function endXRSession() {
  if (xrSession) {
    xrSession
      .end()
      .then(() => {
        xrSession.ended = true;
        onSessionEnd();
      })
      .catch((reason) => {
        console.log('session not ended because ' + reason);
        onSessionEnd();
      });
  } else {
    onSessionEnd();
  }
}

function onSessionEnd() {
  xrSession = null;
  console.log('session ended');
  btn.innerHTML = 'START AR';
  btn.removeEventListener('click', endXRSession);
  btn.addEventListener('click', onRequestSession);
  window.requestAnimationFrame(render);
}

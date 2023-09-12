import * as THREE from 'three';
import {VRButton} from './VRButton'
let gl, cube, sphere, light, camera, scene, plane;
init()
animate()


function init() {
// create context
    gl = new THREE.WebGLRenderer({antialias: true})
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(window.innerWidth, window.innerHeight)
    gl.xr.enabled = true;
    document.body.appendChild(gl.domElement)
    document.body.appendChild(VRButton.createButton(gl))


 
 // create the scene
    scene = new THREE.Scene() // construct
    scene.background = new THREE.Color(0.3, 0.5, 0.8)
    scene.fog = new THREE.Fog('grey', 1, 90)



    function createCamera(){
        camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000) // define camera 
        scene.add(camera) // add to the scene
        camera.position.set(0,3,20) 
        return camera
    }
    // create camera
    camera = createCamera()
    let group = new THREE.Group()
    group.add(camera)
    group.position.set(0, 0, 0)
    scene.add(group)

 // Objects 
    // loaders
    const textureLoader = new THREE.TextureLoader();

 // create the cube
    const cubeGeometry = new THREE.BoxGeometry(3,3,3)
    const cubeMaterial = new THREE.MeshPhongMaterial({
        color:'red'
    })
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    scene.add(cube)
    cube.position.set(5, 1, 1);

 // Create the Sphere
    const sphereGeometry = new THREE.SphereGeometry(3, 32, 32)
    const sphereNormalMap = textureLoader.load('./textures/sphere_normal.png')
    sphereNormalMap.wrapS = THREE.RepeatWrapping;
    sphereNormalMap.wrapT = THREE.RepeatWrapping;
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color:'white',
        normalMap: sphereNormalMap
    })
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphere)
    sphere.position.set(-5, 1, 1)
 // Create the upright plane

    const planeGeom = new THREE.PlaneGeometry(256, 128)
    const planeMap = textureLoader.load('./textures/pebbles.jpg')
    planeMap.wrapS = THREE.RepeatWrapping;
    planeMap.wrapT = THREE.RepeatWrapping;
    planeMap.repeat.set(16, 16);
    planeMap.minFilter = THREE.NearestFilter;
    planeMap.anisotropy = gl.capabilities.getMaxAnisotropy();

    const planeNormalMap = textureLoader.load('./textures/pebbles_normal.png')
    planeNormalMap.wrapS = THREE.RepeatWrapping;
    planeNormalMap.wrapT = THREE.RepeatWrapping;
    planeNormalMap.minFilter = THREE.NearestFilter;
    planeNormalMap.repeat.set(16, 16);

    const planeMaterial = new THREE.MeshStandardMaterial({
        map: planeMap,
        side:THREE.DoubleSide,
        normalMap: planeNormalMap,
    })

    plane = new THREE.Mesh(planeGeom, planeMaterial)
    scene.add(plane)
    plane.rotation.x = Math.PI / 2;

 //LIGHTS

    const color = 0xffffff;
    const intesity =  .7;
    light = new THREE.DirectionalLight(color, intesity)
    light.target = plane;
    light.position.set(0,30,30);
    scene.add(light)
    scene.add(light.target)


    const ambientColor = 0xffffff;
    const ambientIntesity = 0.2;
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntesity)
    scene.add(ambientLight);


}


function animate() {
   
    gl.setAnimationLoop(render)

}

function render(time) {
    time *= 0.001;
    if (resizeDisplay) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
   }
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.y += 0.01;

    light.position.x = 20*Math.cos(time);
    light.position.y = 20*Math.sin(time);
    gl.render(scene, camera);
}


function resizeDisplay() {
    const canvas = gl.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width != width || canvas.
   height != height;
    if (needResize) {
    gl.setSize(width, height, false);
    }
    return needResize;
   }




import * as THREE from 'three';



function main() {
    // create the context
    const canvas = document.querySelector('#c')
    const gl  = new THREE.WebGL1Renderer({
        canvas,
        antialias: true,  
    })
    // create and set the camera

    const angleOfView = 55;
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
    const nearPlane = 0.1;
    const farPlane = 100;
    const camera = new THREE.PerspectiveCamera(angleOfView, aspectRatio, nearPlane, farPlane)
    camera.position.set(0,8,30);

    
    // create the scene
    const scene = new THREE.Scene();


    // add fog later...
    // GEOMETRY
    // Create the upright plane
    // Create the cube
    // Create the Sphere
    // MATERIALS and TEXTURES
    // LIGHTS
    // MESH
    // DRAW
    // SET ANIMATION LOOP
    // UPDATE RESIZE
   }



   main()
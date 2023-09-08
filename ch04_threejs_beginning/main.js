import * as THREE from 'three';


function resizeGLToDisplaySize(gl){
    const canvas = gl.domElement;
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width != width || canvas.height != height

    if (needResize) {
        gl.setSize(width, height, false)
    }

    return needResize

}



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
    const cubeSize = 4;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    

        // Create the Sphere
    // MATERIALS and TEXTURES

    const cubeMaterial = new THREE.MeshPhongMaterial({
        color: 'pink'
    })

    // LIGHTS
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity)
    scene.add(light)


    // MESH
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(cubeSize, cubeSize, 0)
    scene.add(cube)



    // DRAW
    function draw(){

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;



        if (resizeGLToDisplaySize(gl)){
            const canvas = gl.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix();
        }

        gl.render(scene, camera)

        requestAnimationFrame(draw)
    }

    // SET ANIMATION LOOP
    requestAnimationFrame(draw)

    // UPDATE RESIZE
   }



   main()
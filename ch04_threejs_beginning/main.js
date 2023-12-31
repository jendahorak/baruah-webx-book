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
    scene.background = new THREE.Color(0.3,0.5,0.8)
    

    const fog = new THREE.Fog('gray', 0, 100)
    scene.fog = fog

         
       
    // add fog later...
    // GEOMETRY

    
    // Create the upright plane

    const textureLoader = new THREE.TextureLoader();
    const planeTextureMap = textureLoader.load('./textures/pebbles.jpg')
    planeTextureMap.wrapS = THREE.RepeatWrapping;
    planeTextureMap.wrapT = THREE.RepeatWrapping;
    planeTextureMap.repeat.set(16, 16);
    planeTextureMap.minFilter = THREE.NearestFilter
    planeTextureMap.anisotropy = gl.capabilities.getMaxAnisotropy();



    const planeNormalMap = textureLoader.load('./textures/pebbles_normal.png')
    planeNormalMap.wrapS = THREE.RepeatWrapping
    planeNormalMap.wrapT = THREE.RepeatWrapping
    planeNormalMap.minFilter = THREE.NearestFilter
    planeNormalMap.repeat.set(16,16)

    const planeMaterial = new THREE.MeshLambertMaterial({
        map:planeTextureMap,
        side: THREE.DoubleSide,
        normalMap: planeNormalMap
    })

    const plaeWidth = 256
    const planeHeight = 128
    const planeGeometry = new THREE.PlaneGeometry(plaeWidth, planeHeight)

    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = Math.PI / 2
    scene.add(plane);


    // Create the cube
    const cubeSize = 4;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const cubeMaterial = new THREE.MeshPhongMaterial({
        color: 'pink'
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(cubeSize, cubeSize, 0)
    scene.add(cube)

    
    // Create the Sphere
    const sphereRadius = 3
    const sphereWidthSegments = 32
    const heightSegments = 16
  
    const sphereNormalMap = textureLoader.load('./textures/sphere_normal.png')
    sphereNormalMap.werapS = THREE.RepeatWrapping;
    sphereNormalMap.werapT = THREE.RepeatWrapping;
    
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, sphereWidthSegments, heightSegments)
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 'tan',
        normalMap: sphereNormalMap
    } );
  
    const sphere = new THREE.Mesh( sphereGeometry,sphereMaterial ); 
    sphere.position.set(-sphereRadius, sphereRadius , 0);
    scene.add( sphere );

    // MATERIALS and TEXTURES

    // LIGHTS
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(0,30,30)
    light.target = plane;
    scene.add(light.target)
    scene.add(light)


    const ambientColor = 0xffffff;
    const ambientIntesity = 0.2;
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntesity)
    scene.add(ambientLight)


    // MESH
    // DRAW
    function draw(time){
        time *= 0.001
               

        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        sphere.rotation.y += 0.01;


        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;



        if (resizeGLToDisplaySize(gl)){
            const canvas = gl.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix();
        }


        light.position.x = 20*Math.cos(time);
        light.position.y = 20*Math.sin(time);

        gl.render(scene, camera)

        requestAnimationFrame(draw)
    }

    // SET ANIMATION LOOP
    requestAnimationFrame(draw)

    // UPDATE RESIZE
   }

   main()
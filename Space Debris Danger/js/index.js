var Colors = {
  red: 0xf25346,
  white: 0xdddddd,
  brown: 0x59332e
};

window.addEventListener('load', init, false);

function init() {
  createScene();
  createLights();

  //createSea();
  createSky();

  document.addEventListener('mousemove', handleMouseMove, false);

  loop();
}

var scene,
  camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
  renderer, container,
  hemisphereLight, shadowLight;

function createScene() {
  // Get the width and the height of the screen,
  // use them to set up the aspect ratio of the camera
  // and the size of the renderer.
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  // Create the scene
  scene = new THREE.Scene();

  // Add a fog effect to the scene; same color as the
  // background color used in the style sheet
  scene.fog = new THREE.Fog(0x404078, 400, 950);

  // Create the camera
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 950;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  // Set the position of the camera
  camera.position.z = 200;
  camera.position.y = 1820;

  // Create the renderer
  renderer = new THREE.WebGLRenderer({
    // Allow transparency to show the gradient background
    // we defined in the CSS
    alpha: true,

    // Activate the anti-aliasing; this is less performant,
    // but, as our project is low-poly based, it should be fine :)
    antialias: true
  });

  // Define the size of the renderer; in this case,
  // it will fill the entire screen
  renderer.setSize(WIDTH, HEIGHT);

  // Enable shadow rendering
  renderer.shadowMap.enabled = true;

  // Add the DOM element of the renderer to the
  // container we created in the HTML
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  // Listen to the screen: if the user resizes it
  // we have to update the camera and the renderer size
  window.addEventListener('resize', handleWindowResize, false);
}
var mousePos = {
  x: 0,
  y: 0
};

// now handle the mousemove event
function handleMouseMove(event) {

  // here we are converting the mouse position value received
  // to a normalized value varying between -1 and 1;
  // this is the formula for the horizontal axis:

  var tx = -1 + (event.clientX / WIDTH) * 2;

  // for the vertical axis, we need to inverse the formula
  // because the 2D y-axis goes the opposite direction of the 3D y-axis

  var ty = 1 - (event.clientY / HEIGHT) * 2;
  mousePos = {
    x: tx,
    y: ty
  };

}

function handleWindowResize() {
  // update height and width of the renderer and the camera
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function createLights() {
  // A hemisphere light is a gradient colored light;
  // the first parameter is the sky color, the second parameter is the ground color,
  // the third parameter is the intensity of the light
  hemisphereLight = new THREE.HemisphereLight(0xdddddd, 0x222222, .9);

  // an ambient light modifies the global color of a scene and makes the shadows softer
  ambientLight = new THREE.AmbientLight(0xFFFFFF, .6);
  scene.add(ambientLight);

  // A directional light shines from a specific direction.
  // It acts like the sun, that means that all the rays produced are parallel.
  shadowLight = new THREE.DirectionalLight(0xefffd1, 1.9);

  // Set the direction of the light
  shadowLight.position.set(300, 850, 650);

  // Allow shadow casting
  shadowLight.castShadow = false;

  // define the visible area of the projected shadow
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  // define the resolution of the shadow; the higher the better,
  // but also the more expensive and less performant
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  // to activate the lights, just add them to the scene
  scene.add(hemisphereLight);
  scene.add(shadowLight);
}



Cloud = function() {
  // Create an empty container that will hold the different parts of the cloud
  this.mesh = new THREE.Object3D();

  // create a cube geometry;
  // this shape will be duplicated to create the cloud

  var flag = Math.random();

  if(flag < 0.85){
      var geom = new THREE.TetrahedronBufferGeometry(6+Math.random()*3);
  }
  else if(flag > 0.85 && flag < 0.995){
      var geom = new THREE.OctahedronBufferGeometry(15+Math.random()*6);
  }
  else if(flag > 0.995) {
      var geom = new THREE.DodecahedronBufferGeometry(50+Math.random()*20);
  }

  // create a material; a simple white material will do the trick
  var mat = new THREE.MeshStandardMaterial({
    color: 0x8b95c4,
    specular: 0xe2ffcc,
    shininess: 80,

  });

  // duplicate the geometry a random number of times
  var nBlocs = 3 + Math.floor(Math.random() * 3);
  for (var i = 0; i < 1; i++) {

    // create the mesh by cloning the geometry
    var m = new THREE.Mesh(geom, mat);



    // set the position and the rotation of each cube randomly
    m.position.x = i * 15;
    m.position.y = Math.random() * 10;
    m.position.z = Math.random() * 10;
    m.rotation.z = Math.random() * Math.PI * 2;
    m.rotation.y = Math.random() * Math.PI * 2;

    // set the size of the cube randomly
    var s = .1 + Math.random() * .9;
    m.scale.set(s, s, s);

    // allow each cube to cast and to receive shadows
    m.castShadow = true;
    m.receiveShadow = true;

    // add the cube to the container we first created
    this.mesh.add(m);
  }
}

// Define a Sky Object
Sky = function() {
  // Create an empty container
  this.mesh = new THREE.Object3D();

  // choose a number of clouds to be scattered in the sky
  this.nClouds = 3000;

  // To distribute the clouds consistently,
  // we need to place them according to a uniform angle
  var stepAngle = Math.PI * 2 / this.nClouds ;

  // create the clouds
  for (var i = 0; i < this.nClouds; i++) {
    var c = new Cloud();

    // set the rotation and the position of each cloud;
    // for that we use a bit of trigonometry
    var a = stepAngle * i; // this is the final angle of the cloud
    var h = 2250 + Math.random() * 400; // this is the distance between the center of the axis and the cloud itself

    // Trigonometry!!! I hope you remember what you've learned in Math :)
    // in case you don't:
    // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
    c.mesh.position.y = Math.sin(a) * h;
    c.mesh.position.x = Math.cos(a) * h;

    // rotate the cloud according to its position
    c.mesh.rotation.z = a + (Math.PI);

    // for a better result, we position the clouds
    // at random depths inside of the scene
    c.mesh.position.z = -200 - Math.random() * 600;

    // we also set a random scale for each cloud
  /*  if (Math.random()>(0.7)){

  }*/


  //  var s = 1 + Math.random() * 2;
  //  c.mesh.scale.set(s, s, s);

    // do not forget to add the mesh of each cloud in the scene
    this.mesh.add(c.mesh);
  }
}

// Now we instantiate the sky and push its center a bit
// towards the bottom of the screen

var sky;

function createSky() {
  sky = new Sky();
  sky.mesh.position.y = -600;
  scene.add(sky.mesh);
}


function loop() {
  // Rotate the propeller, the sea and the sky
  //airplane.propeller.rotation.x += 0.3;
  //sea.mesh.rotation.z += .005;
  sky.mesh.rotation.z += .0004;

  // update the plane on each frame

  //sea.moveWaves();

  // render the scene
  renderer.render(scene, camera);

  // call the loop function again
  requestAnimationFrame(loop);
}



function normalize(v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + (pc * dt);
  return tv;
}

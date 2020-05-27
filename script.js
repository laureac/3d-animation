let container;
let camera;
let renderer;
let scene;
let corona;

function init() {
  container = document.querySelector(".scene");
  
  scene = new THREE.Scene();

  const fov = 500;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 3000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 1800);

  const ambient = new THREE.AmbientLight(0x404040, 4);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(50, 50, 100);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  let loader = new THREE.GLTFLoader();
  loader.load("./coronav/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    corona = gltf.scene.children[0];
    
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  corona.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
let container;
let camera;
let renderer;
let scene;
let guitar;

function init() {
  container = document.querySelector(".scene");
  
  scene = new THREE.Scene();

  const fov = 50;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 20, 200);

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
  loader.load("./guitar2/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    guitar = gltf.scene.children[0];
    
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  guitar.rotation.z += 0.004;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
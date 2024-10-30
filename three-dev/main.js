import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

let container, camera, scene, renderer, cube, innerTorus, outerTorus, controls;

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshPhongMaterial({color: 0xdd00aa});
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);

  const innerTorusGeometry = new THREE.TorusGeometry(1, 0.25);
  const innerTorusMaterial = new THREE.MeshPhongMaterial({color: 0xdd0000});
  innerTorus = new THREE.Mesh(innerTorusGeometry, innerTorusMaterial);
  scene.add(innerTorus);

  const outerTorusGeometry = new THREE.TorusGeometry(1.5, 0.25);
  const outerTorusMaterial = new THREE.MeshPhongMaterial({color: 0x0000aa});
  outerTorus = new THREE.Mesh(outerTorusGeometry, outerTorusMaterial);
  scene.add(outerTorus);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  camera.position.set(2, 2, 2);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  cube.position.set(0, 1, 0);
  innerTorus.position.set(0, 1, 0);
  outerTorus.position.set(0, 1, 0);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window); // optional

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.minDistance = 1;
  controls.maxDistance = 5;
}

function animate() {
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;

  innerTorus.rotation.x -= 0.02;
  innerTorus.rotation.y += 0.02;
  innerTorus.rotation.z += 0.02;

  outerTorus.rotation.x += 0.02;
  outerTorus.rotation.y -= 0.02;
  outerTorus.rotation.z -= 0.02;

  renderer.render(scene, camera);
}

window.addEventListener('resize', resize, false);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

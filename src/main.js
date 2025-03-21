import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

//cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

//scene
const scene = new THREE.Scene();

//object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
// mesh.scale.x = 2;

// mesh.rotation.reorder("yxz");
// mesh.rotation.x = 3;
// mesh.rotation.y = Math.PI / 2;

scene.add(mesh);
// mesh.position.normalize();

//group
// const group = new THREE.Group();
// scene.add(group);
// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "cyan" })
// );
// cube1.position.x = -1;
// group.add(cube1);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//axis helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// camera.position.z = 3;
camera.position.set(0, 0, 3);
scene.add(camera);
// camera.lookAt(mesh.position);

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//Time
let time = Date.now();

//Clock
const clock = new THREE.Clock();

//Animation
const tick = () => {
  //clock
  const elapsedTime = clock.getElapsedTime();

  //time
  //   const currentTime = Date.now();
  //   const deltaTime = currentTime - time;
  //   time = currentTime;

  //   console.log(deltaTime);

  //update object
  //   mesh.rotation.y += 0.001 * deltaTime;
  // mesh.rotation.y = elapsedTime;

  //update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  //update controls
  controls.update();

  //renderer
  renderer.render(scene, camera);

  //call tick again on next frame
  window.requestAnimationFrame(tick);
};

tick();

//gsap
// const tl = gsap.timeline();
// tl.to(mesh.position, {
//   duration: 2,
//   delay: 1,
//   x: 2,
// });
// tl.to(mesh.position, {
//   duration: 2,
//   x: 0,
// });

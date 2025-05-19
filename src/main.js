import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import { update } from "three/examples/jsm/libs/tween.module.js";

//Debug
console.log(dat);
const gui = new dat.GUI({ closed: true });

const parameters = {
  color: "#ff0000",
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});
gui.add(parameters, "spin");

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
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
// mesh.scale.x = 2;

// mesh.rotation.reorder("yxz");
// mesh.rotation.x = 3;
// mesh.rotation.y = Math.PI / 2;

scene.add(mesh);

//Debug
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevationY");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
// gui.add(mesh.position, "y", -3, 3, 0.01);

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

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitfullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitRequestFullscreen();
    }
  }
});

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

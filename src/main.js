import "./style.css";
import * as THREE from "three";

//scene
const scene = new THREE.Scene();

//object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(1, 1, 1);
mesh.scale.x = 2;

mesh.rotation.reorder("yxz");
mesh.rotation.x = 3;
mesh.rotation.y = Math.PI / 2;

scene.add(mesh);
mesh.position.normalize();
console.log(mesh.position.length());

const group = new THREE.Group();
scene.add(group);
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "cyan" })
);
cube1.position.x = -1;
group.add(cube1);
//sizes
const sizes = {
  width: 800,
  height: 600,
};

//axis helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 3;
camera.position.set(0, 0, 3);
scene.add(camera);
camera.lookAt(mesh.position);

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

/*
    Map Engine (needs THREE)
    Author: @hit2hat (vk.me/hit2hat)
    Created at: 20.10.2018
 */


const renderer_settings = {
    alpha: true,
    antialias: true,
    stencil: false
};


// ========================
// Prepare container
// ========================
const renderer = new THREE.WebGLRenderer(renderer_settings);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.context.getShaderInfoLog = () => { return ''};
document.getElementById('container').appendChild(renderer.domElement);


// ========================
// Camera
// ========================
CameraControls.install( { THREE: THREE } );
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.z = 500;
const cameraControls = new CameraControls(camera, document.getElementById('root'));
const _dolly = cameraControls.dolly;
cameraControls.dolly = (distance, enableTransition) => {
    let d = Math.abs(distance);
    if (d < 18 || d > 60) return;
    _dolly.call(cameraControls, distance, enableTransition);
};
cameraControls.rotate(0, -1, true);
cameraControls.update();
window.cameraControls = cameraControls;


// ========================
// Scene
// ========================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);


// ========================
// Earth
// ========================
const texture = new THREE.MeshBasicMaterial();
const geometry = new THREE.SphereGeometry(200, 50, 50);
const material = new THREE.MeshPhongMaterial({overdraw: .5,});
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);


// ========================
// Stars (Background)
// ========================
const starsGeometry = new THREE.SphereGeometry(1000);
const starsMaterial = new THREE.MeshBasicMaterial({side: THREE.BackSide});
const stars = new THREE.Mesh(starsGeometry, starsMaterial);
scene.add(stars);


// ========================
// Load Textures (Async | based on callbacks)
// ========================
const textureLoader = new THREE.TextureLoader();
textureLoader.load('assets/stars.png', (texture) => {
    starsMaterial.map = texture;
    textureLoader.load('assets/earth.jpg', (texture) => {
        material.map = texture;
        animate();
    });
});


// ========================
// Light
// ========================
const light = new THREE.DirectionalLight(0xffffff);
light.target = earth;
scene.add(light);


// ========================
// Auto-rotatin''s controller
// ========================
let stopRotating = false;
const wrapper = document.getElementById('root');

wrapper.ontouchstart = wrapper.onmousedown = () => {
    if (!cameraControls.enabled) return;
    stopRotating = true
};

wrapper.ontouchend = wrapper.ontouchcancel = wrapper.onmouseup = () => {
    if (!cameraControls.enabled) return;
    stopRotating = false
};

window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};


// ========================
// Main Render Block
// ========================
const clock = new THREE.Clock();
const render = () => {
    const delta = clock.getDelta();
    cameraControls.update(delta);
    if (!stopRotating) { stars.rotation.y -= .001 / 2 }
    light.position.copy(camera.position);
    renderer.render(scene, camera);
};
const animate = () => { requestAnimationFrame(animate); render() };
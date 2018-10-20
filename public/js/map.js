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

const map_settings = {
    earth_radius: 200
};

let points = [];

const helpers = {
    degToRad: (deg) => {
        return (Math.PI * deg) / 180;
    },
    radToDeg: (rad) => {
        return (rad * 180) / Math.PI;
    },
    rotateToPoint: (lat, lon) => {
        const x = Math.PI / 2 + (lon * (Math.PI / 2) / 90);
        const y = Math.PI / 2 + (-lat * (Math.PI / 2) / 90);
        cameraControls.rotateTo(x, y, true);
        cameraControls.dollyTo(300, true);
    },
    addPoint: (data) => {
        const t = helpers.degToRad(data.lat) + Math.PI / 2;
        const p = helpers.degToRad(data.lon) + Math.PI;

        const x = -map_settings.earth_radius * Math.sin(t) * Math.cos(p);
        const y = -map_settings.earth_radius * Math.cos(t);
        const z = map_settings.earth_radius * Math.sin(t) * Math.sin(p);

        const geometry = new THREE.SphereGeometry(2.5, 50, 50);
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        const point = new THREE.Mesh( geometry, material );
        point.position.x = x;
        point.position.y = y;
        point.position.z = z;
        point.userData = {};
        point.userData.id = data.id;

        points.push(point);
        scene.add(point);
    },
    checkCursor: (event) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const rect = renderer.domElement.getBoundingClientRect();

        mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
        mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

        raycaster.setFromCamera( mouse, camera );

        const intersects = raycaster.intersectObjects(points);
        if (intersects.length > 0) {
            window.react.show_info(intersects[0].object.userData.id);
        }
    }
};
window.helpers = helpers;


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
const geometry = new THREE.SphereGeometry(map_settings.earth_radius, 50, 50);
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
    textureLoader.load('assets/earth2.jpg', (texture) => {
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
// Listener of clicks
// ========================
document.getElementById('root').addEventListener('click', helpers.checkCursor);


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
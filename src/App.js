import React from 'react';
import './styles/map.css';

import MapBoxGL from 'mapbox-gl';
import D3Geo from 'd3-geo';
import * as THREE from 'three';
import CameraControls from 'camera-controls';

MapBoxGL.accessToken = 'pk.eyJ1IjoiY2hlZWF1biIsImEiOiJjaXhmb3o3bTEwMDAzMnRudTJuNjh1eXQ1In0.yO6WeKJwx6yIPoVx5aPavQ';
CameraControls.install( { THREE: THREE } );

class Map extends React.Component {

    state = {
        zoom: 1,
        style: 'satellite',
        map_width: 1200,
        map_height: 1200,
        stopRotating: false
    };

    map = null;
    $map = React.createRef();
    $eMap = React.createRef();
    $container = React.createRef();

    componentDidMount() {
        const dpr = window.devicePixelRatio;

        this.$eMap.current.width = this.state.map_width * dpr;
        this.$eMap.current.height = (this.state.map_height * dpr) / 2;
        this.$map.current.style.width = this.state.map_width + 'px';
        this.$map.current.style.height = this.state.map_height + 'px';

        var renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            stencil: false,
        });
        renderer.setPixelRatio(dpr);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.context.getShaderInfoLog = function(){ return '' };
        this.$container.current.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 500;
        const cameraControls = new CameraControls(camera, renderer.domElement);
        cameraControls.rotate(0, -1, true); // Tilt down to show North pole a bit
        cameraControls.update();

        const _dolly = cameraControls.dolly;
        cameraControls.dolly = function(distance, enableTransition){
            const d = Math.abs(distance);
            if (d < 18 || d > 60) return;
            _dolly.call(cameraControls, distance, enableTransition);
        };

        var scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const texture = new THREE.CanvasTexture(this.$eMap.current);
        texture.minFilter = THREE.LinearFilter;
        const geometry = new THREE.SphereGeometry(200, 50, 50);
        const material = new THREE.MeshPhongMaterial({
            overdraw: .5,
        });
        const earth = new THREE.Mesh(geometry, material);
        scene.add(earth);

        var starsGeometry = new THREE.SphereGeometry(1000);
        var starsMaterial = new THREE.MeshBasicMaterial({
            side: THREE.BackSide,
        });

        var stars = new THREE.Mesh(starsGeometry, starsMaterial);
        scene.add(stars);

        var loader = new THREE.TextureLoader();
        loader.load('galaxystarfield.png', (texture) => {
            texture.needsUpdate = true;
            starsMaterial.map = texture;
        });

        const clock = new THREE.Clock();

        var stopRotating = false;
        setInterval( function render(){
            console.log('render');
            var delta = clock.getDelta();
            cameraControls.update(delta);
            if (!stopRotating ){
                var y = .001;
                // earth.rotation.y += y;
                stars.rotation.y -= y/2;
            }
            //light.position.copy(camera.position);
            renderer.render(scene, camera);
        }, 100);

        this.map = new MapBoxGL.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/' + this.state.style + '-v9?optimize=true',
            center: [0, 0],
            zoom: 1,
            interactive: false,
            renderWorldCopies: false,
            attributionControl: false,
            trackResize: false,
            preserveDrawingBuffer: true,
        });
    }

    render() {
        console.log('Render map');

        return (
            <div>
                <canvas id="equirectangular-map" ref={this.$eMap}/>
                <div id="map" ref={this.$map}/>
                <div id="container" ref={this.$container}/>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <Map/>
        );
    }
}

export default App;
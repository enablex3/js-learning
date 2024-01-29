// I am app.js

import * as THREE from 'three';

// In scope
let renderer;
let camera;
let scene;
let cube;

function main() {
    const canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // move camera back from the origin a little b/c our cube will be at the origin
    camera.position.z = 2;

    scene = new THREE.Scene();

    // our cube geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // cube material (basic)
    //const material = new THREE.MeshBasicMaterial( { color: 0x044aa88} );
    // cube material (not impacted by light in our scene)
    const material = new THREE.MeshPhongMaterial({ color: 0x044aa88});

    // create cube mesh
    cube = new THREE.Mesh(geometry, material);

    // let there be light!
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // add the cube to the scene
    scene.add(cube);

    // render
    //renderer.render(scene, camera);
    // rotate the cube
    requestAnimationFrame(rotateCube);
}

function rotateCube(time) {
    time *= 0.001;

    cube.rotation.x = time;
    cube.rotation.y = time;

    // before rendering, let's adjust the camera so we don't look stretched
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    // determine if we need to resize!
    if (resizeRendererToDisplaySize()) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(rotateCube);
}

function resizeRendererToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth * devicePixelRatio | 0;
    const height = canvas.clientHeight * devicePixelRatio | 0;
    const needsResize = canvas.width !== width || canvas.height !== height;
    if (needsResize) {
        renderer.setSize(width, height, false);
    }
    return needsResize;
}

main();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {debounce, prettyPrint, vectorMax, vectorMin} from "./utils.js"
import SphereCluster from "./sphereCluster.js"
import ConvexHull from "./convexHull.js"
import TwistedTorusPointcloud from "./twistedTorusPointcloud.js"
import {makeDraggable} from "./drag.js"
import '../styles/main.scss'

let scene
let camera
let renderer
let controls
let geometry
let material
let twistedTorusMesh
let twistedTorusHull
let twistedTorusPointcloud
let sphereCluster

document.addEventListener("DOMContentLoaded", (event) => {
    const card = document.querySelector('.card');
    const cardHeader = card.querySelector('.card-header'); // Handle for dragging
    const cardBody = document.querySelector('.card-body');

    makeDraggable(card, cardHeader)
    // makeResizable(cardBody, resizeHandle)

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0000ff)

    const { width:cardWidth, height:cardHeight } = cardBody.getBoundingClientRect()
    camera = new THREE.PerspectiveCamera(75, cardWidth / cardHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();

    renderer.setSize(cardWidth, cardHeight);
    cardBody.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    // Twisted Torus
    geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16); // Customize as needed
    material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true });
    twistedTorusMesh = new THREE.Mesh(geometry, material);
    scene.add(twistedTorusMesh)
    // twistedTorusHull = new ConvexHull(twistedTorusMesh.geometry.attributes.position.array)
    // scene.add(convexHull.mesh)


    const delay = 8
    const resizeObserver = new ResizeObserver(
        debounce(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                console.log(`Resized to: ${width}px x ${height}px`);

                // Update Three.js components
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            }
        }, delay) // Adjust delay as needed
    );

    resizeObserver.observe(cardBody);

    animate()

})


function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

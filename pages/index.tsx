import type { NextPage } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as THREE from 'three';

const Home: NextPage = () => {
  useEffect(() => {
    var manualControl = false;
    var longitude = 0;
    var latitude = 0;
    var savedX: number;
    var savedY: number;
    var savedLongitude: number;
    var savedLatitude: number;

    // panoramas background
    var panoramasArray = ["/images/01.jpg", "/images/02.jpg", "/images/03.jpg", "/images/04.jpg", "/images/05.jpg", "/images/06.jpg"];
    var panoramaNumber = 0;

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (document.querySelector('main')?.children) document.querySelector('main')!.innerHTML = '';
    document.querySelector('main')?.append(renderer.domElement);


    var scene = new THREE.Scene();

    // adding a camera
    var camera: any = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.target = new THREE.Vector3(0, 0, 0);

    // creation of a big sphere geometry
    var sphere = new THREE.SphereGeometry(100, 100, 40);
    sphere.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));

    // creation of the sphere material
    var sphereMaterial = new THREE.MeshBasicMaterial();
    sphereMaterial.map = THREE.ImageUtils.loadTexture(panoramasArray[panoramaNumber])

    // geometry + material = mesh (actual object)
    var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
    scene.add(sphereMesh);

    // listeners
    document.addEventListener("mousedown", onDocumentMouseDown, false);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("mouseup", onDocumentMouseUp, false);

    render();

    function render() {
      requestAnimationFrame(render);
      // limiting latitude from -85 to 85 (cannot point to the sky or under your feet)
      latitude = Math.max(-85, Math.min(85, latitude));
      // moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
      camera.target.x = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.cos(THREE.Math.degToRad(longitude));
      camera.target.y = 500 * Math.cos(THREE.Math.degToRad(90 - latitude));
      camera.target.z = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.sin(THREE.Math.degToRad(longitude));
      camera.lookAt(camera.target);

      // calling again render function
      renderer.render(scene, camera);

    }

    // when the mouse is pressed, we switch to manual control and save current coordinates
    function onDocumentMouseDown(event: MouseEvent) {
      event.preventDefault();
      document.body.style.cursor = 'grabbing';
      manualControl = true;
      savedX = event.clientX;
      savedY = event.clientY;
      savedLongitude = longitude;
      savedLatitude = latitude;
    }

    // when the mouse moves, if in manual contro we adjust coordinates
    function onDocumentMouseMove(event: MouseEvent) {
      if (manualControl) {
        longitude = (savedX - event.clientX) * 0.1 + savedLongitude;
        latitude = (event.clientY - savedY) * 0.1 + savedLatitude;
      }
    }

    // when the mouse is released, we turn manual control off
    function onDocumentMouseUp(event: MouseEvent) {
      document.body.style.cursor = '';
      manualControl = false;
    }

    // pressing a key (actually releasing it) changes the texture map
    document.onkeyup = function (event: KeyboardEvent) {
      const callback = {
          "ArrowLeft"  : leftHandler,
          "ArrowRight" : rightHandler,
      }[event.key]
      callback?.()
      function leftHandler(){
        panoramaNumber = panoramaNumber != 0 ? (panoramaNumber - 1) : panoramasArray.length - 1;
      }
      function rightHandler(){
        panoramaNumber = (panoramaNumber + 1) % panoramasArray.length
      }
      sphereMaterial.map = THREE.ImageUtils.loadTexture(panoramasArray[panoramaNumber])
    }
  }, []);
  return (
    <>
      <Head>
        <title>ThreeJS</title>
        <meta name="description" content="Three.js prototype" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
    </>
  )
}

export default Home

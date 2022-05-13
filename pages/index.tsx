import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import * as THREE from 'three'

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
    var panoramasArray = [
      ["https://nsmnia.github.io/NextJS-3D/images/01.jpg", [["points", "to"], ["points", "to"]]],
      ["https://nsmnia.github.io/NextJS-3D/images/02.jpg", [["points", "to"], ["points", "to"]]],
      ["https://nsmnia.github.io/NextJS-3D/images/03.jpg", [["points", "to"], ["points", "to"]]],
      ["https://nsmnia.github.io/NextJS-3D/images/04.jpg", [["points", "to"], ["points", "to"]]],
      ["https://nsmnia.github.io/NextJS-3D/images/05.jpg", [["points", "to"], ["points", "to"]]],
      ["https://nsmnia.github.io/NextJS-3D/images/06.jpg", [["points", "to"], ["points", "to"]]]
    ];
    var panoramaNumber = 0;

    let renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
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
    sphereMaterial.map = THREE.ImageUtils.loadTexture(panoramasArray[panoramaNumber][0] as string);

    // geometry + material = mesh (actual object)
    var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
    scene.add(sphereMesh);

    // listeners
    document.addEventListener("mousedown", onDocumentMouseDown, false);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("mouseup", onDocumentMouseUp, false);

    // click variables
    const mouse = new THREE.Vector3();
    render();

    function render() {
      requestAnimationFrame(render);
      // limiting latitude from -85 to 85 (cannot point to the sky or under your feet)
      latitude = Math.max(-85, Math.min(85, latitude));
      // moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
      camera.target.x = 500 * Math.sin(THREE.MathUtils.degToRad(90 - latitude)) * Math.cos(THREE.MathUtils.degToRad(longitude));
      camera.target.y = 500 * Math.cos(THREE.MathUtils.degToRad(90 - latitude));
      camera.target.z = 500 * Math.sin(THREE.MathUtils.degToRad(90 - latitude)) * Math.sin(THREE.MathUtils.degToRad(longitude));
      camera.lookAt(camera.target);

      // calling again render function
      renderer.render(scene, camera);
    }

    let drag = false;
    // when the mouse is pressed, we switch to manual control and save current coordinates
    function onDocumentMouseDown(event: MouseEvent) {
      event.preventDefault();
      document.body.style.cursor = 'grabbing';
      manualControl = true;
      savedX = event.clientX;
      savedY = event.clientY;
      savedLongitude = longitude;
      savedLatitude = latitude;
      drag = false
    }

    // when the mouse moves, if in manual contro we adjust coordinates
    function onDocumentMouseMove(event: MouseEvent) {
      if (manualControl) {
        drag = true
        longitude = (savedX - event.clientX) * 0.1 + savedLongitude;
        latitude = (event.clientY - savedY) * 0.1 + savedLatitude;
      }
    }
    let raycaster = new THREE.Raycaster();
    let spriteMaterial = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(
        "https://cywarr.github.io/small-shop/Marker.png"
      )
    });
    let markers = [],
      intersects = [],
      markersCounter = 0;
    // when the mouse is released, we turn manual control off
    function onDocumentMouseUp(e: MouseEvent) {
      document.body.style.cursor = '';
      manualControl = false;
      if (!drag) {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        let marker = new THREE.Sprite(spriteMaterial);
        marker.scale.set(20, 20, 1);
        marker.name = "marker" + markersCounter;
        raycaster.ray.at(210, marker.position);

        scene.add(marker);
        markers.push(marker);
        markersCounter++;
        console.log(scene);
      }
      console.log(drag ? 'drag' : 'click');
      drag = false;
    }
    // pressing a key (actually releasing it) changes the texture map
    document.onkeyup = function (event: KeyboardEvent) {
      const callback = {
        "ArrowLeft": leftHandler,
        "ArrowRight": rightHandler,
      }[event.key]
      callback?.()
      function leftHandler() {
        panoramaNumber = panoramaNumber != 0 ? (panoramaNumber - 1) : panoramasArray.length - 1;
      }
      function rightHandler() {
        panoramaNumber = (panoramaNumber + 1) % panoramasArray.length
      }
      sphereMaterial.map = THREE.ImageUtils.loadTexture(panoramasArray[panoramaNumber][0] as string)
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

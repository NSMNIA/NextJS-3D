import type { NextPage } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as THREE from 'three';

const Home: NextPage = () => {
  useEffect(()=>{
    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    document.querySelector('main')?.append(renderer.domElement);

    function animation( time: any ) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;
      renderer.render( scene, camera );
    }
  }, []);

  return (
    <>
      <Head>
        <title>ThreeJS</title>
        <meta name="description" content="Three.js prototype" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

      </main>
    </>
  )
}

export default Home

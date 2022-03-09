import type { NextPage } from "next";
import * as BABYLON from "babylonjs";
import Head from "next/head";
import { useEffect } from "react";

const Babylon: NextPage = () => {
    useEffect(() => {
        let panoramasArray: string[] = [
            "/images/01.jpg",
            "/images/02.jpg",
            "/images/03.jpg",
            "/images/04.jpg",
            "/images/05.jpg",
            "/images/06.jpg"
        ];
        let panoramaNumber: number = 0;

        let canvas = document.querySelector('canvas') as HTMLCanvasElement;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.style.width = `${window.innerWidth}px`;
        let engine = new BABYLON.Engine(canvas, true, {
            preserveDrawingBuffer: true,
        });

        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0,5,-10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);
        let photoDome = new BABYLON.PhotoDome('testdome', panoramasArray[panoramaNumber], {resolution: 100}, scene);
        scene.debugLayer.show();
        engine.runRenderLoop(function(){
            scene.render();
        })

        window.addEventListener('resize', function() {
            engine.resize();
        });

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
            photoDome = new BABYLON.PhotoDome('testdome', panoramasArray[panoramaNumber], {resolution: 100}, scene);
        }
     }, []);

    return (
        <>
            <Head>
                <title>BabylonJS</title>
                <meta name="description" content="Three.js prototype" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <canvas id="renderCanvas"></canvas>
        </>
    );
};

export default Babylon;

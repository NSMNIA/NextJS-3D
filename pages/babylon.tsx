import type { NextPage } from "next";
import * as BABYLON from "babylonjs";
import { useEffect } from "react";

const Babylon: NextPage = () => {
    useEffect(() => {
        let canvas = document.querySelector('canvas') as HTMLCanvasElement;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.style.width = `${window.innerWidth}px`;
        let engine = new BABYLON.Engine(canvas, true, {
            preserveDrawingBuffer: true,
        });

        let createScene = function() {
            let scene = new BABYLON.Scene(engine);
            let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0,5,-10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, false);
            let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
            let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
            sphere.position.y = 1;
            let ground = BABYLON.Mesh.CreateGround('ground1', 6,6,2, scene,false);
            return scene;
        };

        let scene = createScene();

        engine.runRenderLoop(function(){
            scene.render();
        })

        window.addEventListener('resize', function() {
            engine.resize();
        })
     }, []);

    return (
        <>
            <canvas id="renderCanvas"></canvas>
        </>
    );
};

export default Babylon;

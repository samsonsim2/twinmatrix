import Platforms from "@/components/Platforms";
import Buildings from "@/components/Buildings";
import Test from "@/components/Test";
import Icons from "@/components/Icons";
import Lines from "@/components/Lines";
import Heatmap from "@/components/Heatmap";
import Circulation from "@/components/Circulation";
import React, { useEffect, useMemo, useRef } from 'react'
import { useFrame } from "@react-three/fiber";
import {
    MeshPortalMaterial,
    OrbitControls,
    OrthographicCamera,
    PerspectiveCamera,
} from "@react-three/drei";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
export default function Set({ cameraState }) {
    const cameraRef = useRef(null);
    const mesh = useRef(); const navigateAirport = () => {
        gsap.to(mesh.current.position, {
            z: 10, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
        gsap.to(mesh.current.scale, {
            x: 2,
            y: 2,
            z: 2, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
    };

    const navigateRetail = () => {
        gsap.to(mesh.current.position, {
            x: -10,
            z: -2, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
        gsap.to(mesh.current.scale, {
            x: 2,
            y: 2,
            z: 2, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
    };

    const navigateHome = () => {
        gsap.to(mesh.current.position, {
            x: 0,
            z: 0, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
        gsap.to(mesh.current.scale, {
            x: 1,
            y: 1,
            z: 1, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
    };


    useEffect(() => {
        if (cameraState === 1) {
            navigateAirport()
        } else if (cameraState === 2) {
            navigateRetail()
        } else {
            navigateHome()
        }

    }, [cameraState])




    const items = [
        { id: "item1", name: "Item 1" },
        { id: "item2", name: "Item 2" },
        { id: "item3", name: "Item 3" },
    ];

    useGSAP(() => {
        gsap.to(mesh.current.rotation, {

            y: Math.PI / 18, // 45 degrees in radians
            duration: 10,
            repeat: -1, // Infinite repeat
            yoyo: true, // Reverse the animation
            ease: "power1.inOut",
        });

    }, { scope: mesh });

    return <>
        <OrbitControls />

        <OrthographicCamera
            ref={cameraRef}
            name="Camera"
            makeDefault={true}
            zoom={50}
            far={100000}
            near={-100000}
            up={[0, 1, 0]}
            position={[10, 8, 7]}
            rotation={[-0.78, 1.1, 0.72]}
            scale={1}
        />

        <mesh ref={mesh} position={[0, 0, 0]}>
            <Platforms />
            <Buildings />
            <Icons />
            <Heatmap />
            <Lines />
            <Circulation />
            <Test />
        </mesh>

    </>
}

"use client";
import Image from "next/image";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  MeshPortalMaterial,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Platforms from "@/components/Platforms";
import Buildings from "@/components/Buildings";
import Test from "@/components/Test";
import Icons from "@/components/Icons";
import Lines from "@/components/Lines";
import Heatmap from "@/components/Heatmap";
import Circulation from "@/components/Circulation";
import Set from "@/components/Set";
import React, { useEffect, useMemo, useRef, useState } from "react";
export default function Home() {
  const buttonRef = useRef(null);
  const cameraRef = useRef(null);
  const mesh = useRef(null);
  const [cameraState, setCameraState] = useState(3);

  const items = [
    {
      id: "item1",
      name: "Item 1",
      title: "Smart airports enable seamless journeys",
      sub: "Enhance airport planning and real-time operations through spatial AI",
    },
    {
      id: "item2",
      name: "Item 2",
      title: "Upgrade retail with spatial insights",
      sub: "Extract shopper behaviour in physical space and amplify retail performance",
    },
    {
      id: "item3",
      name: "Item 3",
      title: "The future of cities is spatial-driven",
      sub: "Cities are becoming driven by smart, interconnected, spatial layers",
    },
  ];

  const handleClick = (id: string)  => {
    if (id === "item1") {
      setCameraState(1);
    } else if (id === "item2") {
      setCameraState(2);
    } else {
      setCameraState(3);
    }
  };

  const ButtonList = () => {
    return (
      <>
        {items.map((item) => (
          <button
            key={item.id}
            id={item.id}
            name={item.name}
            ref={buttonRef}
            onClick={() => handleClick(item.id)}
            type="button"
            className="text-gray-900 bg-white border w-6 h-6
  focus:outline-none hover:bg-gray-100 focus:ring-4
   focus:ring-gray-100 font-medium rounded-full text-sm  
    dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
     dark:hover:border-gray-600 dark:focus:ring-gray-700"
          ></button>
        ))}
      </>
    );
  };

  return (
    <main className="bg-red-500 h-screen w-screen relative">
      <section className="absolute top-0 z-30 w-full flex justify-between pt-2 px-5">
        <div>
          <h2 className="font-bold">TMT</h2>
        </div>
        <div className="flex gap-5  text-xs">
          <button>Home</button>
          <button>Jobs</button>
          <button>Contact</button>
        </div>
        <div className="bg-black p-2 rounded-xl text-xs  ">
          <h2 className="text-white">Book a demo</h2>
        </div>
      </section>
      <div className="absolute z-30 bottom-0   w-full flex flex-row  justify-between ">
        <div className="p-8">
          <h1 className="font-bold text-xl">{items[cameraState - 1].title}</h1>
          <h3>{items[cameraState - 1].sub}</h3>
        </div>
        <div className="flex flex-col px-8 gap-2">
          <ButtonList />
        </div>
      </div>

      <div className="h-full w-full">
        <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
          <ambientLight intensity={2.0} />
          <directionalLight position={[1.0, 2.0, 0.0]} />

          <Set cameraState={cameraState} />
          <mesh
            scale={100}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0.0, -0.1, 0.0]}
          >
            <meshStandardMaterial color={"#f1f5f9"} />
            <planeGeometry></planeGeometry>
          </mesh>
          {/* <gridHelper args={[100, 100, `white`, `gray`]} /> */}
        </Canvas>
      </div>
    </main>
  );
}

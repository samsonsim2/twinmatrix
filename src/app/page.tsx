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
import { BlendFunction } from 'postprocessing'
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import Link from "next/link";
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
      title: "The future of cities is spatial-driven.",
      sub: "Cities are becoming driven by smart, interconnected, spatial layers",
    },
  ];

  const handleClick = (id: string) => {
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
            className="text-gray-900 bg-white   w-6 h-6
  focus:outline-none hover:bg-gray-100 focus:ring-4
   focus:ring-gray-100 font-medium rounded-full text-sm  
    dark:bg-gray-800 dark:text-white shadow-md shadow-black" 
          ></button>
        ))}
      </>
    );
  };

  return (
    <main className="h-screen w-screen relative overflow-x-hidden">
      <section className="absolute top-0 z-30 w-full flex justify-between pt-2 px-5 bg-gradient-to-b from-white to-transparent ">
        <div>
          <h2 className="font-bold">TMT</h2>
        </div>
        <div className="flex gap-5  text-xs">
          <button>Home</button>
          <button>Jobs</button>
          <button>Contact</button>
        </div>
        <div className="bg-black p-2 rounded-md text-xs  ">
          <h2 className="text-white">Book a demo</h2>
        </div>
      </section>
      <div className="absolute z-30 bottom-0   w-full flex flex-col   ">
         <div className="flex flex-row px-8 gap-4">
          <ButtonList />
        </div>
        <div className="pb-8 px-8 mt-3 flex-basis-0.25 ">
          <h1 className=" text-3xl text-slate-800 font-bold ">
            {items[cameraState - 1].title}
          </h1>
          <h3 className="  text-slate-800">{items[cameraState - 1].sub}</h3>
        </div>
       
      </div>

      <div className="absolute z-30 top-11 w-full ">
        {/* <h1 className="text-center font-bold text-xl mt-10 text-slate-800 ">
          Humanising the future of spaces
        </h1> */}
      </div>

      <div className="h-full w-full">
        <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
          {/* Your regular scene contents go here, like always ... */}
       
          <ambientLight intensity={2.2} />
          <directionalLight position={[1.0, 2.0, 0.0]} />

          <Set cameraState={cameraState} />
          <mesh
            scale={100}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0.0, -0.1, 0.0]}
          >
            <meshStandardMaterial color={"#F5F5F4"} />
            <planeGeometry></planeGeometry>
          </mesh>
          {/* <gridHelper args={[100, 100, `white`, `gray`]} /> */}
        </Canvas>

        <section className="  h-screen  z-30 w-screen  flex justify-between  align-center  bg-stone-100 flex flex-row  ">
          <div className="basis-1/2 p-20  flex flex-col  justify-center">
            <div>
              <h1 className="font-extrabold pb-5">Our Mission </h1>
              <h3 className="  pb-5">
                Empowering organizations to transform and optimize their
                environments through innovative Spatial Artificial Intelligence
                (SAI), fostering enhanced collaboration, informed and augmented
                decision-making while humanizing data.
              </h3>
              <button className="bg-black p-2 rounded-sm text-xs  ">
                <h2 className="text-white">Learn more</h2>
              </button>
            </div>
          </div>

          <div className="basis-1/2 bg-stone-200"></div>
        </section>

        <section className=" h-screen  z-30 w-screen  flex justify-between  align-center  bg-stone-100 flex flex-row  ">
          <div className="basis-1/2 bg-stone-200"></div>
          <div className="basis-1/2 p-20  flex flex-col  justify-center">
            <div>
              <h1 className="font-extrabold pb-5">Our Purpose </h1>
              <h3 className="  pb-5">
                To revolutionize the way humans and spaces harmonize, creating a
                seamless connection between the physical and digital worlds to
                unlock unprecedented potential towards singularity of the built
                environment.
              </h3>
              <button className="bg-black p-2 rounded-sm text-xs  ">
                <h2 className="text-white">Learn more</h2>
              </button>
            </div>
          </div>
        </section>

        <section className="  h-screen  z-30 w-screen  flex justify-between  align-center  bg-stone-100 flex flex-row  ">
          <div className="basis-1/2 p-20  flex flex-col  justify-center">
            <div>
              <h1 className="font-extrabold pb-5">Our Story</h1>
              <h3 className="  pb-5">
                Founded by Silicon Valley tech visionary, TMT transforms how
                organizations interact with spaces through our innovative
                spatial twins. We are leading the future of spatial
                intelligence, computing, and twinning.
              </h3>
              <button className="bg-black p-2 rounded-sm text-xs  ">
                <h2 className="text-white">Learn more</h2>
              </button>
            </div>
          </div>

          <div className="basis-1/2 bg-stone-200"></div>

        </section>

        
        <footer className="bg-black text-white py-6 h-9 z-30 w-screen">
            <div className="container mx-auto px-8">
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  © {new Date().getFullYear()} Twinmatrix Technologies. All rights
                  reserved.
                </div>
                <div className="flex space-x-4">
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                  <Link href="/privacy">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </footer>
      </div>
    </main>
  );
}

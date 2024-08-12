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
import ContactForm from "@/components/ContactForm";
import Circulation from "@/components/Circulation";
import Set from "@/components/Set";
import { BlendFunction } from "postprocessing";
import React, { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

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
      title: "The future of cities is spatial-driven",
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
            className="text-gray-900 bg-white  w-5 h-5 md:w-10 md:h-10
  focus:outline-none hover:bg-gray-100 focus:ring-4
   focus:ring-gray-100 font-medium rounded-full text-sm  
  shadow-md shadow-black"
          ></button>
        ))}
      </>
    );
  };
  interface SectionProp {
    title: string;
    sub: string;
    imageUrl: string;
    isEven: boolean;
  }

  const sectionContent = [
    {
      id: 1,
      title: "Our Mission",
      sub: `Empowering organizations to transform and optimize their
                environments through innovative Spatial Artificial Intelligence
                (SAI), fostering enhanced collaboration, informed and augmented
                decision-making while humanizing data.`,
      imageUrl: "/textures/park.jpeg",
    },
    {
      id: 2,
      title: "Our Purpose",
      sub: `To revolutionize the way humans and spaces harmonize, creating a
                seamless connection between the physical and digital worlds to
                unlock unprecedented potential towards singularity of the built
                environment.`,
      imageUrl: "/textures/city.jpeg",
    },
    {
      id: 3,
      title: "Our Story",
      sub: `Founded by Silicon Valley tech visionary, TMT transforms how
                organizations interact with spaces through our innovative
                spatial twins. We are leading the future of spatial
                intelligence, computing, and twinning.`,
      imageUrl: "/textures/airport.jpeg",
    },
  ];

  function Section({ title, sub, imageUrl, isEven }: SectionProp) {
    return (
      <section className="  h-screen  z-30 w-screen  flex justify-between  align-center  bg-stone-100 flex flex-row  ">
        {!isEven ? (
          <>
            <div className="sm:basis-1 md:basis-1/2 p-20  flex flex-col  justify-center">
              <div>
                <h1 className="font-extrabold pb-5 text-5xl">{title} </h1>
                <h3 className="  pb-8 sm:text-2xl md:text-lg">{sub}</h3>
                <button className="bg-black p-5 rounded-md sm:text-lg md:text-2xl ">
                  <h2 className="text-white ">Learn more</h2>
                </button>
              </div>
            </div>
            <div className="sm:basis-0 md:basis-1/2 bg-stone-200 flex justify-center ">
              <Image
                src={imageUrl}
                alt="Description of image"
                width={500} // Desired width in pixels
                height={300} // Desired height in pixels
                className="hidden md:block  rounded-lg my-auto"
              />
            </div>
          </>
        ) : (
          <>
            <div className="sm:basis-0 md:basis-1/2 bg-stone-200 flex justify-center ">  <Image
              src={imageUrl}
              alt="Description of image"
              width={500} // Desired width in pixels
              height={300} // Desired height in pixels
              className="hidden md:block  rounded-lg my-auto"
            /></div>
          
            <div className="sm:basis-1 md:basis-1/2 p-20  flex flex-col  justify-center">
              <div>
                <h1 className="font-extrabold pb-5 text-5xl">{title} </h1>
                <h3 className="  pb-8 sm:text-2xl md:text-lg">{sub}</h3>
                <button className="bg-black p-5 rounded-md sm:text-lg md:text-2xl ">
                  <h2 className="text-white ">Learn more</h2>
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    );
  }

  function SectionList(): JSX.Element {
    return (
      <>
        {sectionContent.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            sub={section.sub}
            imageUrl={section.imageUrl}
            isEven={index % 2 === 1}
          />
        ))}
      </>
    );
  }

  return (
    <main className="h-screen w-screen relative overflow-x-hidden bg-stone-100 ">
      <section className="  absolute top-0 z-30 w-full flex justify-between pt-2 px-5 bg-gradient-to-b from-white to-transparent ">
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
        <div className="pb-12 px-8 mt-3 flex-basis-0.25 bg-gradient-to-t from-white to-transparent ">
          <h1 className=" text-xl md:text-4xl text-slate-800 font-bold ">
            {items[cameraState - 1].title}
          </h1>
          <h3 className=" text-sm  md:text-2xl text-slate-800">
            {items[cameraState - 1].sub}
          </h3>
        </div>
      </div>

      <div className="h-full w-full  ">
        <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
          <ambientLight intensity={2.2} />
          <directionalLight position={[1.0, 2.0, 0.0]} />

          <Set cameraState={cameraState} />
          <mesh
            scale={100}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0.0, -0.1, 0.0]}
          >
            {/* <meshStandardMaterial color={"#e0e0e0"} />   */}
            <meshStandardMaterial color={"grey"} />
            <planeGeometry></planeGeometry>
          </mesh>
        </Canvas>

        <SectionList />
        <ContactForm />

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

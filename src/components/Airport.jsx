import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { DoubleSide } from 'three';
 
export default function Airport({props,cameraState}) {
  const { nodes, materials } = useGLTF('/models/Airport.gltf')

  const mesh = useRef(); 
    
  const revealAirport = () => {
      gsap.to(mesh.current.position, {
          y:7,        
          duration: 2,
          ease: "power1.inOut",
      });
       
  };

  const hideAirport = () => {
    gsap.to(mesh.current.position, {
        y:0,        
        duration: 2,
        ease: "power1.inOut",
    });
     
};

  useEffect(() => {
    if (cameraState === 1) {
       revealAirport()
    }  
     else{
        hideAirport()
    }

}, [cameraState])
  return (
    <group {...props} dispose={null} scale={0.25}>
      <mesh
       ref={mesh}
        castShadow
        receiveShadow
        geometry={nodes.Airport_1.geometry}
        material={nodes.Airport_1.material}
        position={[0,0,0]}
      > <meshStandardMaterial color={"white"} transparent={true} opacity={0.9} /></mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Airport-Mat'].geometry}
        material={materials.Mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Airport-Mat_1'].geometry}
        material={materials.Mat}
        
      ><meshBasicMaterial color={"#BABABA"} side={DoubleSide}/></mesh>
    </group>
  )
}

useGLTF.preload('/models/Airport.gltf')

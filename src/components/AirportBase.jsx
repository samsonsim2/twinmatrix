
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { DoubleSide } from 'three'
 
export default function AirportBase(props) {
  const { nodes, materials } = useGLTF('/models/AirportBase.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AirportBase.geometry}
        
        scale={0.25}
      ><meshBasicMaterial color={"grey"} side={DoubleSide}/></mesh>
    </group>
  )
}

useGLTF.preload('/models/AirportBase.gltf')
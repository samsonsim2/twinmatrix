import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Buildings(props) {
  const { nodes, materials } = useGLTF('/models/Buildings.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh scale={0.008}
         castShadow
         receiveShadow
         geometry={nodes.Buildings.geometry}
         material={nodes.Buildings.material}
         
      >
        <meshStandardMaterial  color="white"/>
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/Buildings.gltf')
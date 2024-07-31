import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Buildings(props) {
  const { nodes, materials } = useGLTF('/models/Buildings.gltf')
  return (
    <group {...props} dispose={null} scale={0.008}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['Buildings-Mat3'].geometry}
      material={materials['Mat.3']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['Buildings-Mat2'].geometry}
      material={materials['Mat.2']}
    />
  </group>
  )
}

useGLTF.preload('/models/Buildings.gltf')
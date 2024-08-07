import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Furniture(props) {
  const { nodes, materials } = useGLTF('/models/Furniture.gltf')
  return (
    <group {...props} dispose={null} scale={0.25}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Furniture.geometry}
        material={nodes.Furniture.material}
      ><meshStandardMaterial color={"#f2f2f2"}/></mesh>
    </group>
  )
}

useGLTF.preload('/models/Furniture.gltf')

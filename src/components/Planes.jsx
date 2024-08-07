import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Planes(props) {
  const { nodes, materials } = useGLTF('/models/Planes.gltf')
  return (
    <group {...props} dispose={null} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Planes.geometry}
        material={nodes.Planes.material}
        scale={0.25}
      ><meshStandardMaterial color={"white"}/></mesh>
    </group>
  )
}

useGLTF.preload('/models/Planes.gltf')

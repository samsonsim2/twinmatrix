import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Grass(props) {
  const { nodes, materials } = useGLTF('/models/Grass.gltf')
  return (
    <group {...props} dispose={null}>
    <group position={[0,0.1,0]} scale={0.008}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Grass-Mat'].geometry}
        material={materials.Mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Grass-Mat1'].geometry}
        material={materials['Mat.1']}
      />
    </group>
  </group>
  )
}

useGLTF.preload('/models/Grass.gltf')
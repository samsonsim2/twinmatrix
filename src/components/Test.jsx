
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { DoubleSide } from 'three'
 
export default function Test(props) {
  const { nodes, materials } = useGLTF('/models/Test.gltf')
  const facadeMaterial= <meshStandardMaterial color="red" side={DoubleSide}/>
  return (
    <group {...props} dispose={null} scale={0.008}>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Facade.geometry}
        material={facadeMaterial}
      >  <meshStandardMaterial color={"#f9f9f9"}  opacity={0.5} transparent={true}/></mesh> */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Beams_and_Column.geometry}
        material={facadeMaterial}
        position={[18.998, 16.229, 503.332]}
       > <meshStandardMaterial color={"#1F51FF"} side={DoubleSide}/></mesh>
    </group>
  )
}

useGLTF.preload('/models/Test.gltf')
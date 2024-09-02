import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GUI } from 'dat.gui'
useEffect
import * as THREE from "three";
export default function Grass(props) {
  const { nodes, materials } = useGLTF('/models/Grass.gltf')
  const grass=useRef()
  const water=useRef()
  const geometryBaseColor = {
    grass: "#c9e4be",
    water:"#c6d6ff"
  }

  const uniforms= { 
    color: { value: new THREE.Color(geometryBaseColor.hex) }
  }

 
  useEffect(() => {
    const gui =new GUI({
      width : 100
  }); 
    const colorFolder = gui.addFolder("Grass") 
    const grassColor = colorFolder.addColor(geometryBaseColor, "grass")
    grassColor.onChange((value) => {
     grass.current.material.color = new THREE.Color(value)
    })

    const waterColor = colorFolder.addColor(geometryBaseColor, "water")
    waterColor.onChange((value) => {
    water.current.material.color = new THREE.Color(value)
    })


    return () => {
      gui.destroy()
    }
  }, []);
  return (
    <group {...props} dispose={null} scale={0.25}>
    <group position={[0, 1, 0]}>
      <mesh ref={water}
        castShadow
        receiveShadow
        geometry={nodes['Grass-Mat5'].geometry}
  
       >
          <meshBasicMaterial color={"#c6d6ff"}  side={THREE.DoubleSide}/>
       </mesh>
      <mesh ref={grass}
        castShadow
        receiveShadow
        geometry={nodes['Grass-Mat'].geometry}
 
       >
        <meshBasicMaterial color={"#d1efbf"} side={THREE.DoubleSide}/>
       </mesh>
    </group>
  </group>
  )
}

useGLTF.preload('/models/Grass.gltf')

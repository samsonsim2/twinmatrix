
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GUI } from 'dat.gui'
import * as THREE from "three";
export default function Tower(props) {
  const { nodes, materials } = useGLTF('/models/Tower.gltf')
  const tower= useRef()
  const geometryBaseColor = {
    color: "#ffffff",
 
  }

  const uniforms= { 
    color: { value: new THREE.Color(geometryBaseColor.hex) }
  }

 
  useEffect(() => {
    const gui =new GUI({
      width : 100
  }); 
    const colorFolder = gui.addFolder("Tower") 
    const towerColor = colorFolder.addColor(geometryBaseColor, "color")
    towerColor.onChange((value) => {
      tower.current.material.color = new THREE.Color(value)
    })

 

    return () => {
      gui.destroy()
    }
  }, []);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tower.geometry}
        
        scale={0.25}
        ref={tower}
      ><meshStandardMaterial color={"white"}/></mesh>
    </group>
  )
}

useGLTF.preload('/models/Tower.gltf')

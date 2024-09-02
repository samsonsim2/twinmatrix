
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { DoubleSide } from 'three'
import { GUI } from 'dat.gui'
import * as THREE from "three";
export default function Base(props) {
  const { nodes, materials } = useGLTF('/models/Base.gltf')
  const base = useRef()
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
    const colorFolder = gui.addFolder("Base") 
    const baseColor = colorFolder.addColor(geometryBaseColor, "color")
   baseColor.onChange((value) => {
      base.current.material.color = new THREE.Color(value)
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
        geometry={nodes.Base.geometry} 
        scale={0.25}
        ref={base}
        
       ><meshStandardMaterial color={"#ffffff"} side={DoubleSide}/></mesh>
    </group>
  )
}

useGLTF.preload('/models/Base.gltf')

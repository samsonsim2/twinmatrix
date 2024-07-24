
import React, { useRef ,useMemo} from 'react'
import { useGLTF } from '@react-three/drei'
import { DoubleSide } from 'three'
import { useFrame } from '@react-three/fiber';
const fragmentShader = `
varying vec2 vUvs; 
uniform float u_time;
 
 
 
void main() {
  vec3 colorA =  vec3(0.3,0.5,1.0);
  vec3 colorB = vec3(1.000,0.777,0.052);
  
  vec3 blue = vec3(0.7, 0.8, 1.0);   
  float speed = 3.0;
  float opacity = step(0.5,abs(sin(vUvs.y * 1000.0)));
  float sinWave = abs(sin(vUvs.x * 10.0 + (u_time * speed)) - 1.) ;
  vec3 color = vec3(sinWave);
  color = mix(colorA,colorB,color);
  
  gl_FragColor = vec4(color,opacity);
}

`;

const vertexShader = `
varying vec2 vUvs; 
void main() {
    vec4 localPosition = vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * localPosition;
    vUvs = uv;
}
`
export default function Circulation(props) {
  const { nodes, materials } = useGLTF('/models/Circulation.gltf')
  const mesh = useRef();
  const uniforms = useMemo(
      () => ({
          u_time: {
              value: 0.0,
          },

      }), []
  );
  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
});
  return (
    <group {...props} dispose={null}>
      <mesh
      ref={mesh}
      scale={0.008}
        castShadow
        receiveShadow
        geometry={nodes.Circulation.geometry}
        material={nodes.Circulation.material}
      ><shaderMaterial side={DoubleSide} fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} transparent={true}/></mesh>
    </group>
  )
}

useGLTF.preload('/models/Circulation.gltf')
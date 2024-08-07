import React, { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

const fragmentShader = `
varying vec2 vUvs; 
uniform float u_time;
 
 
 
void main() {
  vec3 colorB =  vec3(1.0,1.0,1.0);
  vec3 colorA = vec3(0,0,1);
  vec3 blue = vec3(0.784, 0.314, 1);   
  float speed = 4.0;
  float sinWave =   sin(vUvs.x * 10.0 + (u_time * speed) );
  vec3 color = mix(colorA,colorB,sinWave);
  
  gl_FragColor = vec4(color, 0.1);
}

`;
// const fragmentShader = `
// varying vec2 vUvs; 
// uniform float u_time;
 
 
 
// void main() {
//   vec3 blue = vec3(0.784, 0.314, 1);   
//   float speed = 4.0;
//   float sinWave = step(0.5,abs(sin(vUvs.x * 50.0 + (u_time * speed)) - 1.)) ;
//   vec3 color = vec3(sinWave) * blue;
  
//   gl_FragColor = vec4(color, sinWave * 0.4 );
// }

// `;
const vertexShader = `
varying vec2 vUvs; 
void main() {
    vec4 localPosition = vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * localPosition;
    vUvs = uv;
}
`
export default function Collaboration(props) {
    const { nodes, materials } = useGLTF('/models/Collaboration.gltf')
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
        <group {...props} dispose={null} scale={0.25}>
            <mesh
                ref={mesh}
                castShadow
                receiveShadow
                geometry={nodes.Collaboration.geometry}
                material={nodes.Collaboration.material}
            > <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent={true} opacity={0.2}/>
            </mesh>
        </group>
    )
}

useGLTF.preload('/models/Collaboration.gltf')

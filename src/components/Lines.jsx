import React, { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

const fragmentShader = `
varying vec2 vUvs; 
uniform float u_time;
 
 
 
void main() {
  vec3 blue = vec3(0.7, 0.8, 1.0);   
  float speed = 10.0;
  float sinWave = step(0.5,abs(sin(vUvs.x * 80.0 + (u_time * speed)) - 1.)) ;
  vec3 color = vec3(sinWave) * blue;
  
  gl_FragColor = vec4(color, sinWave);
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

export default function Lines(props) {
    const { nodes, materials } = useGLTF('/models/Lines.gltf')
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
                geometry={nodes.Lines.geometry}

            >
                <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent={true} />
            </mesh>
        </group>
    )
}

useGLTF.preload('/models/Lines.gltf')
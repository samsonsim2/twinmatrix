import React, { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const fragmentShader = `

vec3 hash( vec3 p ) // replace this by something better
{
	p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
			  dot(p,vec3(269.5,183.3,246.1)),
			  dot(p,vec3(113.5,271.9,124.6)));

	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec3 p )
{
    vec3 i = floor( p );
    vec3 f = fract( p );

    
    // cubic interpolant
    vec3 u = f*f*(3.0-2.0*f);
     

    return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ), 
                          dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                     mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ), 
                          dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
                mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ), 
                          dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                     mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ), 
                          dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
}
 

varying vec2    vUvs;
uniform float u_time;
 
float fbm(vec3 p, int octaves, float persistence, float lacunarity){
    float amplitude = 0.01;
    float frequency = 0.5;
    float total = 0.0;
    float normalization = 0.0;

    for (int i=0; i< octaves; i++){
        float noiseValue = noise(p* frequency);
        total += noiseValue * amplitude;
        normalization += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
    }

    total /= normalization;

    return total;
}

 
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
void main(void) {
    
    vec3 colorB =  vec3(1, 0.655, 0);
    vec3 colorA = vec3(1,1,0);

    vec3 coords = vec3(vUvs * 10.0, u_time * 0.4); 
    float noiseSample = 0.0;
    noiseSample = map(fbm(coords, 16, 0.5, 1.0),-1.0, 1.0, 0.0, 1.0 );    
    noiseSample = smoothstep(0.4,0.55,noiseSample);
     

    // float level = (noiseSample * 1.5) * 3.14159265 / 2.0;
    // vec3 col;
    // col.r = sin(level);
    // col.g = sin(level * 1.5);
    // col.b = cos(level * 2.0);

    vec3 color = mix(colorA,colorB,vec3(noiseSample));

 
    gl_FragColor = vec4(color, 0.7 );
} 
`

const vertexShader = `
varying vec2 vUvs; 
void main() {
    vec4 localPosition = vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * localPosition;
    vUvs = uv;
}
`
// const fragmentShader = `
    
//     varying vec2    vUvs;
//     uniform float u_time;
    
//     float rand(vec2 co) {
//         return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
//     }

//     void main() {
//         vec2 st = vUvs;
//         st.x += u_time * 0.1; // Shift in x direction over time
//         st *= 40.0; // Number of squares along each axis, reduce to space out squares
//         vec2 ipos = floor(st); // integer position
//         vec2 fpos = fract(st); // fractional position
        
//         // Random size for each square
//         float randSize = rand(ipos) * 0.5 + 0.75; // Sizes between 0.75 and 1.25
        
//         // Centering the squares and spacing them out
//         vec2 center = vec2(0.5);
//         vec2 dist = (abs(fpos - center) / randSize) * vec2(1.2); // Scale distances by random size
        
//         float color = step(0.5, dist.x) + step(0.5, dist.y);
//         color = 1.0 - color; // Inverting the color to make squares white

//          vec3 greenColor =  vec3(0.773, 1, 0.498);
//         vec3 finalColor = vec3(color) * greenColor;
//         gl_FragColor = vec4(finalColor, color * 0.7);
//     }
//   `

export default function Heatmap2(props) {
    const { nodes, materials } = useGLTF('/models/Heatmap2.gltf')
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
        <group {...props} dispose={null} scale={0.008}>
            <mesh
                ref={mesh}
                castShadow
                receiveShadow
                geometry={nodes.Heatmap2.geometry}

            ><shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} transparent={true} emissiveIntensity={10.0}  /></mesh>
        </group>
    )
}

useGLTF.preload('/models/Heatmap2.gltf')
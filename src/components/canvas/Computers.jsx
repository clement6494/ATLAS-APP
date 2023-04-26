import {Suspense , useEffect , useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';


const Computers = () => {

  const dumbbell = useGLTF('./3Dmodels/dumbbells/scene.gltf')

  return (
    <mesh>
        <hemisphereLight intensity={1.55}
        groundColor="black" />

        <pointLight intensity={1} />

        <primitive
        object={dumbbell.scene}
        scale={10}
        
        
        />


    </mesh>
  )
}

const ComputersCanvas = () => {
  return (

    <Canvas
    frameloop='demand'
    
    camera={{ position: [20, 3, 5], fov: 50 }}
    gl={{preserveDrawingBuffer: true}}
    >
        <OrbitControls enableZoom={false} />
        <Computers />

    </Canvas>
  )

}
export default ComputersCanvas
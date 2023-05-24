import {Suspense , useEffect , useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';


const Dumbbell = () => {

  const dumbbell = useGLTF('./3Dmodels/dumbbells/scene.gltf')

  return (
    <mesh>
        <hemisphereLight intensity={1}
        groundColor="white" />

        <pointLight intensity={100} 
        position={ [5,10,-20] }/>

        <pointLight intensity={100} 
        position={ [5,10,20] }/>

        <primitive
        object={dumbbell.scene}
        scale={100}
        
        
        />


    </mesh>
  )
}



const DumbbellCanvas = () => {
  return (

    <Canvas className='z-0'
    frameloop='demand'
    
    camera={{ position: [25, 50, 10], fov: 50 }}
    gl={{preserveDrawingBuffer: true}}
    >
       <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2} />
        <Dumbbell />
        </Suspense>

        <Preload all />
    </Canvas>
  )

}
export {Dumbbell, DumbbellCanvas}
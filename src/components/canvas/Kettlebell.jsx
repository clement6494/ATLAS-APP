import {Suspense , useEffect , useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';


const Kettlebell = () => {

  const Kettlebell = useGLTF('./3Dmodels/Kettlebell/scene.gltf')

  return (
    <mesh>
        <hemisphereLight intensity={1}
        groundColor="white" />

        <pointLight intensity={100} 
        position={ [5,10,-20] }/>

        <pointLight intensity={100} 
        position={ [5,10,20] }/>

        <primitive
        object={Kettlebell.scene}
        scale={100}
        
        
        />


    </mesh>
  )
}

const KettlebellCanvas = () => {
  return (

    <Canvas
    frameloop='demand'
    
    camera={{ position: [20, 3, 5], fov: 50 }}
    gl={{preserveDrawingBuffer: true}}
    >
       <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2} />
        <Kettlebell />
        </Suspense>

        <Preload all />
    </Canvas>
  )

}
export default KettlebellCanvas
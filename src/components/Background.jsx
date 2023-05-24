import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import {styles} from './styles';
import { DumbbellCanvas } from './canvas';
import { KettlebellCanvas } from './canvas';
/**import { ComputerCanvas } from './canvas' ; */

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from './Loader';


const Dumbbell = () => {

  const dumbbell = useGLTF('./3Dmodels/dumbbells/scene.gltf')

  return (
    <mesh>


        <primitive
        object={dumbbell.scene}
        scale={10}
        
        
        />


    </mesh>
  )
}

const Kettlebell = () => {


const Kettlebell = useGLTF('./3Dmodels/Kettlebell/scene.gltf')

return (
  <mesh  >


      <primitive  
      object={Kettlebell.scene}
      scale={50}
      position={ [0,-6,3] }
      rotation={ [0,-10,0] }
      
      
      />


  </mesh>
)
}

function RotatingTorus() {

  const myMesh= useRef();
  


  useFrame(({clock}) => {
    const a= clock.getElapsedTime()
    myMesh.current.rotation.x= a * 0.5
    myMesh.current.rotation.y= a* 0.3
    myMesh.current.rotation.z= a * 0.2
    
  });

  return (
    <mesh ref={myMesh} >
    <torusGeometry args={ [ 2 , 0.5, 25, 70] }  />
    <meshNormalMaterial color='red'  />

  </mesh>
  )


}


const BackgroundScene = () => {



  

  return (
    <div className='canvas-container'   > 
      
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
        <Dumbbell/>
        
        </Suspense>
        <RotatingTorus/>
        <hemisphereLight intensity={1}
      groundColor="white" />

      <pointLight intensity={100} 
      position={ [5,10,-20] }/>

      <pointLight intensity={100} 
      position={ [5,10,20] }/>
        <Preload all />
    </Canvas>
   
    </div>



      
    
  )
}

export default BackgroundScene
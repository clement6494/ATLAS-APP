import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import {styles} from './styles';
import { DumbbellCanvas } from './canvas';
import { KettlebellCanvas } from './canvas';
/**import { ComputerCanvas } from './canvas' ; */

import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Preload, ScrollControls, useGLTF, useScroll } from '@react-three/drei';
import CanvasLoader from './Loader';

/** loading of the objects */
const Dumbbell = ({ ...props }) => {
  const scroll = useScroll()
  const dumbbell = useGLTF('./3Dmodels/dumbbells/scene.gltf')

  useFrame((state) => {
   
    // The offset is between 0 and 1, you can apply it to your models any way you like
    const offset = 1 - scroll.offset
    
    state.camera.position.set(Math.sin(offset) * -10, (Math.atan(offset * Math.PI * 10-30) + Math.atan(offset * Math.PI * 10-20) + Math.atan(offset * Math.PI * 10-10) ) * 5, Math.cos((offset * Math.PI) / 3) * -10)
    

    state.camera.lookAt(0, 0, 0);



    console.log(state.camera.position)
  })

  return (
    <mesh>


        <primitive object={dumbbell.scene} {...props} />


    </mesh>
  )
}

const Kettlebell = ({ ...props }) => {


const Kettlebell = useGLTF('./3Dmodels/Kettlebell/scene.gltf')

return (
  <mesh  >


      <primitive  object={Kettlebell.scene} {...props} />


  </mesh>
)
}

function RotatingTorus() {

  const myMesh= useRef();
  


  useFrame(({clock}) => {
    const a= clock.getElapsedTime()
    myMesh.current.rotation.x= a * 0.09
    myMesh.current.rotation.y= a* 0.1
    myMesh.current.rotation.z= a * 0.1
    
  });

  return (
    <mesh ref={myMesh} >
    <torusGeometry args={ [ 2 , 0.5, 25, 70] }  />
    <meshNormalMaterial color='red'  />

  </mesh>
  )


}
/************************************** */

/** handling of the camera movements */

const CameraControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useFrame(() => {
    controlsRef.current.update();
  });

  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
};




/**************************************** */

const BackgroundScene = () => {



  return (
    <div className='canvas-container'   > 
      
      <Canvas camera={{ position: [0, 0, 10] }} onWheel={(e) => 
      {console.log('wheel spins')
        }
      
    }

    
    
    gl={{preserveDrawingBuffer: true}}
    >
      
      <pointLight intensity={100} 
      position={ [5,10,-20] }/>

      <pointLight intensity={100} 
      position={ [5,10,20] }/>
      <OrbitControls enableZoom={false} />
       <Suspense fallback={<CanvasLoader />}>
        <ScrollControls horizontal pages={2} >

            <Dumbbell  scale={10} position={[0, -3, 0]}/>
            <Kettlebell scale={50} position={[50, -3, 0]}/>
            <RotatingTorus/>
          </ScrollControls>
        </Suspense>
        
        <hemisphereLight intensity={1}
      groundColor="white" />


        <Preload all />
    </Canvas>
   
    </div>



      
    
  )
}

export default BackgroundScene
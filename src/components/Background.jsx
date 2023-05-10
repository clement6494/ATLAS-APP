import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import {styles} from './styles';
import { DumbbellCanvas } from './canvas';
import { KettlebellCanvas } from './canvas';
/**import { ComputerCanvas } from './canvas' ; */

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';



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

  const [mainHeight, setMainHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setMainHeight(window.innerHeight - 100);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
 

  return (
    <div class='canvas-container' style={{ height: mainHeight }}  > 
    <Canvas>


        <RotatingTorus/>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={10} />


    </Canvas>
   
    </div>


      /** 
      <div className= {`${styles.paddingX} absolute inset-0 top-[120px]
      max-w-7x1 mx-auto flex flex-col items-start gap-5 z-0`} >

        <DumbbellCanvas  />


        <KettlebellCanvas  />


      </div>
    */
      
    
  )
}

export default BackgroundScene
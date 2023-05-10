import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import {styles} from './styles';
import { DumbbellCanvas } from './canvas';
import { KettlebellCanvas } from './canvas';
/**import { ComputerCanvas } from './canvas' ; */

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';






const BackgroundScene = () => {

  
 

  return (
    <div id='canvas-container' className='h-[100%]' > 
    <Canvas>

        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={10} />

        <mesh>
          <torusGeometry args={ [ 2 , 1, 2, 70] } />
          <meshNormalMaterial color='red'  />
        </mesh>



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
import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';


import { OrbitControls, Preload, ScrollControls, useGLTF, useScroll,Text, useTexture, Center, Decal, Text3D, Billboard,Svg } from '@react-three/drei';




const Section3 = ({...props}) => {
  const myMesh= useRef();
  return(
   <mesh ref={myMesh}  {...props}>
     <Billboard>
 
      <group>

        
      </group>
     </Billboard>
   </mesh>
  )
 }

export default Section3
import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';


import { OrbitControls, Preload, ScrollControls, useGLTF, useScroll,Text, useTexture, Center, Decal, Text3D, Billboard,Svg } from '@react-three/drei';




const Section2 = ({...props}) => {
  const myMesh= useRef();
 return(
  <mesh ref={myMesh}  {...props}>
    <Billboard

      follow
      position={[10,-8,0]}
      lockZ={false}
      >
        <Center>
      <Text fontSize={1}> {Services} </Text>
      
      </Center>
    </Billboard>
  </mesh>
 )
}

export default Section2;

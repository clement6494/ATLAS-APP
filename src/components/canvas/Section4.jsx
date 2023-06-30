import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';


import { OrbitControls, Preload, ScrollControls, useGLTF, useScroll,Text, useTexture, Center, Decal, Text3D, Billboard,Svg } from '@react-three/drei';



const Atlas = ({ ...props }) => {

  const pointLightRef = useRef();
  const Atlas = useGLTF('./3Dmodels/atlas/scene.gltf')
  
  return (
    <mesh  >
  
        <primitive  object={Atlas.scene} position={[12, -43, 0]} scale={0.03} rotation={[0, -2, 0]}  />
        <pointLight intensity={2} 
      position={ [5,-50,-20] } ref={pointLightRef} />
        <pointLight position={[10,30,10]} intensity={2}    />
        
        
    </mesh>
  )
  }
  

const Links = ({ ...props }) => {
  const handleClick = () => {
    console.log('click');
  };
  
  return(

<>
  <Svg 
    onClick={handleClick }
    fillMaterial={{wireframe: false}}
    position={[20,-40,0]}
    rotation={[0,-2,0]}
    scale={0.01 }
    src="https://threejs.org/examples/models/svg/tiger.svg"
    strokeMaterial={{
      wireframe: false
    }}/>

<Svg 
    onClick={handleClick }
    fillMaterial={{wireframe: true}}
    position={[20,-40,0]}
    rotation={[0,-2,0]}
    scale={4 }
    src="./svg/twitter.svg"
    strokeMaterial={{
      wireframe: true
    }}/>


  <gridHelper
    args={[
      160,
      10
    ]}
    rotation={[
      1.5707963267948966,
      0,
      0
    ]}
  />
</>
  )
  }

const Section4 = ({...props}) => {
  return (
      
    
      
      <>
      <Links/>
      <Atlas  {...props} />
      <Center rotation={[0, -1.2, 0]} position={[10, -42, 0]}>
        
    
        
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={0.7}
          
          font="/Inter_Bold.json"
          >
          {`Contact\nUs now!`}
          <meshNormalMaterial />
        </Text3D>

      </Center>
      
    
    </>
  );
};

export default Section4
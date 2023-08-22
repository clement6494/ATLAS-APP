import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';


import { Sparkles,OrbitControls, Preload, ScrollControls,Float, useGLTF, useScroll,Text, useTexture, Center, Decal, Text3D, Billboard,Svg } from '@react-three/drei';



const Atlas = ({ ...props }) => {

  const pointLightRef = useRef();
  const Atlas = useGLTF('./3Dmodels/atlas/scene.gltf')
  
  return (
    <mesh {...props} >
  
        <primitive  object={Atlas.scene} scale={0.1} position={[0,-7,5]} rotation-x={-0.5}   />
        <pointLight intensity={2} 
      position={ [5,-50,-20] } ref={pointLightRef} />
        <pointLight position={[10,30,10]} intensity={2}    />
        <Sparkles
        position-y={0}
        color="white"
        count={100}
        noise={1}
        opacity={1}
        scale={10}
        size={5}
        speed={0.3}
        />
        
        
    </mesh>
  )
  }
  

const Links = ({ ...props }) => {
  const handleClick = () => {
    console.log('click');
    window.open('https://www.instagram.com/halvor.j');

  };
  
  return(

<>
<Float
position={[20,-38,2]}
rotation-y={-Math.PI / 2}
speed={1.5} // Animation speed, defaults to 1
rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
floatIntensity={6} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
//floatingRange={[1, 1.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
>
  <Svg 
    onClick={handleClick }
    fillMaterial={{wireframe: false}}
    scale={0.01 }
    src="./svg/instagram.svg"
    strokeMaterial={{
      wireframe: false
    }}/>
</Float>
<Svg 
    onClick={handleClick}
    fillMaterial={{wireframe: true}}
    position={[20,-37,0]}
    rotation-y={-Math.PI / 2}
    scale={4 }
    src="./svg/twitter.svg"
    strokeMaterial={{
      wireframe: true
    }}/>

</>
  )
  }

const Section4 = ({...props}) => {
  return (
      
    
      
      < >
      <Links {...props} />
      <Atlas  {...props} />
    
      <Center {...props} position={[0,0,55]}>
        
    
      
        
        
      <Float >
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
            {`Contact`}
            <meshStandardMaterial
            color="#FF8F20"
             />
          </Text3D>
          <Float
          floatIntensity={0.5}
          speed={0.5}
          >
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
              {`\nUs now!`}
              <meshStandardMaterial
            color="#FF8F20"
             />
            </Text3D>
          </Float>
      </Float>

      </Center>
      
    
    </>
  );
};

export default Section4
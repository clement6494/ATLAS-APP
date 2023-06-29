import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

import {styles} from './styles';
import {Section1 , Section2, Section3,Section4,Section5} from './canvas';
/**import { ComputerCanvas } from './canvas' ; */

import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Preload, ScrollControls, useGLTF, useScroll,Text, useTexture, Center, Decal, Text3D, Billboard } from '@react-three/drei';
import CanvasLoader from './Loader';

/** loading of the objects */
const Dumbbell = ({ ...props }) => {
  

  return (
    <mesh>
      <primitive  object={Dumbbell.scene} {...props} />

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

const Section = ({text, ...props}) => {
  const myMesh= useRef();
 return(
  <mesh ref={myMesh}  {...props}>
    <Billboard

      follow
      position={[10,-8,0]}
      lockZ={false}
      >
      <Text fontSize={1}> {text} </Text>
    </Billboard>
  </mesh>
 )

}
 
function RotatingTorus({text, ...props}) {

  const myMesh= useRef();
  
  

  useFrame(({clock}) => {
    const a= clock.getElapsedTime()
    myMesh.current.rotation.x= a * 0.09
    myMesh.current.rotation.y= a* 0.1
    myMesh.current.rotation.z= a * 0.1
    
  });

  return (
    <mesh ref={myMesh}  {...props}>
    <torusGeometry args={ [ 2 , 0.5, 25, 70] }  />
    <meshNormalMaterial color='red'  />
    <Text 
    fontSize= {0.5}
    > {text}  </Text>

  </mesh>
  )


}

const LeftButton = ( {...props}) => {
  
  const myMesh= useRef();
  
  
  return(
    <mesh  ref={myMesh} {...props}
    onClick={
      console.log('go left')
    }
    
    >
      <boxGeometry args={[0.5,0.5,0.5]} />
      <meshNormalMaterial color='red' />
    </mesh>

  )
}

const RightButton = ( {...props}) => {
  const myMesh= useRef()
  
    
  return(
    <mesh   ref={myMesh}
    onPointerOver={
      console.log('fucked up')
    }
    {...props}>
      <boxGeometry args={[0.5,0.5,0.5]} />
      <meshNormalMaterial color='red' />
    </mesh>
    )
}





const Programs = () => {


  return (

    <group>
      <group>
        <LeftButton position={[10,-30, -4]} ></LeftButton>
        <RightButton position={[10,-30, 4]}></RightButton>
        
      </group>
      <group>
        <fog attach="fog" args={['#202025', 0, 80]} />
        <Cloud count={2} radius={20} />
      </group>
    </group>
  )

}


const Cloud = ({ count = 1, radius = 10, ...props }) => {
  const group = useRef()
  const theta = useMemo(() => Math.PI * 2 / count, [count])
  useFrame((state) => {
    const a = state.clock.getElapsedTime()
    group.current.rotation.y = Math.cos(a / 2) * Math.PI
  })
  return (
    <group ref={group} {...props}>
      {Array(count).fill().map((_, i) => (
        <mesh key={i} position={[Math.sin(theta * i) * radius, 0, Math.cos(theta * i) * radius]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="white" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}
/* ********************************************** */
//*******************   SCENE    ******************* */
/****************************************
 * 
/************************************** */

/** handling of the camera movements */


const CameraAnimation = ({ section }) => {
  const targetPosition = useRef({ x: 5, y: 0 , z: 0 });
  
  useFrame((state) => {
    
    const step = 0.1;
    targetPosition.current.y = -10 * section;
    
    state.camera.position.lerp(targetPosition.current, step);
    state.camera.lookAt(1000,-30,0);
    
  });
  
  return null;
};

function Scene({ margin = 0.5 }) {
  const { width, height } = useThree((state) => state.viewport)
  return (
    <>
      <Center bottom right position={[-width / 2 + margin, height / 2 - margin, 0]}>
        <Text3D letterSpacing={-0.06} size={0.5} >
          top left
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
      <Center top left position={[width / 2 - margin, -height / 2 + margin, 0]}>
        <Text3D letterSpacing={-0.06} size={0.5} >
          bottom right
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
      <Center rotation={[-0.5, -0.25, 0]}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1.5}
          >
          {`hello\nworld`}
          <meshNormalMaterial />
        </Text3D>

      </Center>
    </>
  )
}



/**************************************** */

const BackgroundScene = () => {
  const [section, setSection] = useState(0);
  const [isHandlingWheel, setIsHandlingWheel] = useState(false);
  
  
  const handleWheel = (e) => {
    if (isHandlingWheel) {
      return; // Exit the function if it is already being handled
    }

    setIsHandlingWheel(false);
    
    
    const { deltaY } = e;
    const end = 4;
    if (deltaY >0 && section < end) {
      setSection((section) => section + 1);
      setIsHandlingWheel(true);              // wait to change section on each different srcolls
    setTimeout(() => {
      setIsHandlingWheel(false);
    }, 200);
    } else if (deltaY <0 && section > 0) {                 //go to next section
        setSection((section) => section - 1);
        setIsHandlingWheel(true);
    setTimeout(() => {
      setIsHandlingWheel(false);
    }, 200);
      
    } else if (section == end) {
      setSection((section) => section + 1);  // camera shake if end reached
      setTimeout(() => {
        setSection((section) => section - 1);
      }, 20);

    }
    
    

    
    console.log(section)
  };



  
  return (
    <div className='canvas-container'   > 
      
      <Canvas onWheel={handleWheel}
      
    gl={{preserveDrawingBuffer: true}}
    > 

      <perspectiveCamera   target={[100, -30, 0]}  />
      <CameraAnimation section={section} />
      <gridHelper/>

      <OrbitControls enableZoom={false} />
       <Suspense fallback={<CanvasLoader />}>
            
            <Section position={[10, 0, 0]} text={'who we are'}/>
            <Section position={[10, -10, 0]} text={'services'}/>
            <Section position={[10, -20, 0]} text={'section 3'}/>
            
            <Section4 position={[10, -40, 0]}/>
            
            <RotatingTorus position={[0, 10, 0]}/>

        </Suspense>
        
        <hemisphereLight intensity={1}
      groundColor="white" />


        <Preload all />
        
    </Canvas>
   
    </div>
      
  )
}

export default BackgroundScene
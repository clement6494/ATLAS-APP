import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import {styles} from './styles';
import { DumbbellCanvas } from './canvas';
import { KettlebellCanvas } from './canvas';
/**import { ComputerCanvas } from './canvas' ; */

import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Preload, ScrollControls, useGLTF, useScroll,Text } from '@react-three/drei';
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

function RotatingTorus({...props}) {

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
    <Text>  section</Text>

  </mesh>
  )


}
/************************************** */

/** handling of the camera movements */


const CameraAnimation = ({ section }) => {
  const targetPosition = useRef({ x: 0, y: 0 , z: 0 });
  
  useFrame((state) => {
    
    const step = 0.1;
    targetPosition.current.y = -10 * section;
    state.camera.position.lerp(targetPosition.current, step);
    
  });

  return null;
};




/**************************************** */

const BackgroundScene = () => {
  const [section, setSection] = useState(0);
  
  
  
  const handleWheel = (e) => {
    const { deltaY } = e;
    
    if (deltaY >0 && section <= 5) {
      setSection((section) => section + 1);
    } else if (deltaY <0 && section > 0) {
      setSection((section) => section - 1);
    }

    
    console.log(section)
  };



  
  return (
    <div className='canvas-container'   > 
      
      <Canvas onWheel={handleWheel}
      
    gl={{preserveDrawingBuffer: true}}
    >
      <CameraAnimation section={section} />
      <gridHelper/>
      <pointLight intensity={100} 
      position={ [5,10,-20] }/>

      <pointLight intensity={100} 
      position={ [5,10,20] }/>
      <OrbitControls enableZoom={false} />
       <Suspense fallback={<CanvasLoader />}>
            
            <RotatingTorus position={[0, 0, 0]}/>
            <RotatingTorus position={[0, -10, 0]}/>
            <RotatingTorus position={[0, -20, 0]}/>
            <RotatingTorus position={[0, -30, 0]}/>
            <RotatingTorus position={[0, -40, 0]}/>


        </Suspense>
        
        <hemisphereLight intensity={1}
      groundColor="white" />


        <Preload all />
        
    </Canvas>
   
    </div>
      
  )
}

export default BackgroundScene
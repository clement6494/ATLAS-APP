import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';

import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';

import { Plane,  SpotLight, useDepthBuffer , useVideoTexture, OrbitControls, Preload, ScrollControls, useGLTF, useScroll,Text, useTexture, Center, Decal, Text3D, Billboard,Svg } from '@react-three/drei';



const films = {
  'Sintel': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'Big Buck Bunny': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'Elephant Dream': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'For Bigger Blazes': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'For Bigger Joy Rides': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
}

const Screen = ({src}) => {

  const [video, setVideo] = useState()
  const ratio = 10.5/29.7
  const width = 6
  const radius = 4
  const z = 4

  const r = useMemo(() => (video ? video.videoWidth / video.videoHeight : ratio), [video, ratio])

  return (
    <Center top position-z={z}>
      <Plane args={[ width, width / r ]} >
        <Suspense fallback={<meshStandardMaterial side={useThree.DoubleSide} wireframe />}>
          <VideoMaterial src={src} setVideo={setVideo} />
        </Suspense>
      </Plane>
    </Center>
  )


}

const VideoMaterial = ({ src, setVideo }) =>{
  
  const texture = useVideoTexture(src);
  texture.wrapS = 1000
  texture.wrapT = 1000
  texture.repeat.x = -1
  texture.offset.x = 1
  texture.loop = 1


  useEffect(() => {
    // Move setVideo inside the useEffect hook
    setVideo?.(texture.image);
  }, [texture.image, setVideo]);

  return <meshBasicMaterial 
          side={useThree.DoubleSide} 
          map={texture} 
          toneMapped={false} 
          

          />
}



const Section3 = ({...props}) => {
  const depthBuffer = useDepthBuffer({ frames: 1 })
  
  const [stream, setStream] = useState(new MediaStream())
const title1 = useRef();
const title2 = useRef();
const title3 = useRef();
const title4 = useRef();

const text1 = useRef();
const text2 = useRef();
const text3 = useRef();
const text4 = useRef();


  const { url } =  {
      value: films['Sintel'],
      options: films
    }
 
  
  return(
   <mesh   {...props}>


      <group 
      position={[0, 0, -3.5]} 
      rotation-y={-Math.PI / 2}
      onPointerOver={(e) => {
        e.object.position.z=2
        title1.current.position.z=6.5
        title1.current.position.y=9

      }}
      onPointerOut={(e) => {e.object.position.z=0
        title1.current.position.z=5
        title1.current.position.y=1.5

      }}       

      >       

              <Screen 
              src={'./videos/batch_process_190.mp4'}
              />

              <Text ref={title1}
                
                fontSize={0.8}
                color="white"
                
                anchorX="center"
                anchorY="bottom-baseline"
              >
                Performance
              </Text>
            </group>

            <group 
            position={[0, 0,3.5]} 
            rotation-y={-Math.PI / 2}
            
            onPointerOver={(e) => {
              e.object.position.z=2;
              
            
            
            }}
            onPointerOut={(e) => {e.object.position.z=0}}    
            
            >
              <Screen src={'./videos/PXL_20230515_134040482.mp4'} />


              <Text ref={title2}
                fontSize={1}
                color="white"
                position={[0, 1.5, 5]}
                anchorX="center"
                anchorZ="middle"
              >
                {`Remise\nen Forme`}
              </Text>

            </group>

      <group position={[0, 0,10.5]} rotation-y={-Math.PI / 2}
      onPointerOver={(e) => {e.object.position.z=2
        e.object.position.x=-2
      }}
      onPointerOut={(e) => {e.object.position.z=0
        e.object.position.x=0
      }}   
      
      >
              <Screen src={'./videos/PXL_20230610_150928399.mp4'} />
              <Text ref={title3}
                fontSize={1}
                color="white"
                position={[0, 1.5, 5]}
                anchorX="center"
                anchorY="middle"
              >
                Force
              </Text>
            </group>

            <group position={[0, 0,-10.5]} rotation-y={-Math.PI / 2}
            onPointerOver={(e) => {e.object.position.z=2
              e.object.position.x=2
              
            }}
            onPointerOut={(e) => {e.object.position.z=0
              e.object.position.x=0
            }}   
            >
              <Screen src={'./videos/batch_process_164.mp4'} />
              <Text ref={title4}
                fontSize={1}
                color="white"
                position={[0, 1.5, 5]}
                anchorX="center"
                anchorY="middle"
              >
                {`Street\nWorkout`}
              </Text>
            </group>           

   </mesh>
  )
 }

export default Section3



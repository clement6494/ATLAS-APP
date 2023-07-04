import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';

import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';

import { Plane, useVideoTexture, OrbitControls, Preload, ScrollControls, useGLTF, useScroll,Text, useTexture, Center, Decal, Text3D, Billboard,Svg } from '@react-three/drei';



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

  const texture = useVideoTexture('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
  texture.wrapS = useThree.RepeatWrapping
  texture.wrapT = useThree.RepeatWrapping
  texture.repeat.x = -1
  texture.offset.x = 1

  setVideo?.(texture.image)

  return <meshStandardMaterial side={useThree.DoubleSide} map={texture} toneMapped={false} transparent opacity={0.9} />
}


const Section3 = ({...props}) => {
  const myMesh= useRef();
  const [stream, setStream] = useState(new MediaStream())
  
  const { url } =  {
      value: films['Sintel'],
      options: films
    }
 
  
  return(
   <mesh ref={myMesh}  {...props}>

      <group  position={[1, 0,-3.5]} rotation-y={-3.14/2} >
        
        <Center>
        <Screen src={url} />
        <Text fontSize={1}> Performance </Text>

        </Center>

      </group>

      <group position={[1, 0,3.5]} rotation-y={-3.14/2}  >
      <Center>
        <Screen src={url} />
        <Text fontSize={1}> {`Remise\nen Forme`} </Text>

        </Center>
      </group>
      <group position={[1, 0,10.5]} rotation-y={-3.14/2}  >
      <Center>
        <Screen src={url} />
        <Text fontSize={1}> Force </Text>

        </Center>
      </group>
      <group position={[1, 0,-10.5]} rotation-y={-3.14/2}  >
      <Center>
        <Screen src={url} />
        <Text fontSize={1}> {`Street\nen Lifting`} </Text>

        </Center>
      </group>
   </mesh>
  )
 }

export default Section3



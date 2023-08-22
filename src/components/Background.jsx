import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

import {styles} from './styles';
import {Section1 , Section2, Section3,Section4,Section5} from './canvas';
/**import { ComputerCanvas } from './canvas' ; */

import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import {Svg, OrbitControls, Preload, ScrollControls, useGLTF, useScroll,Text, useTexture, Center, Decal, Text3D, Billboard } from '@react-three/drei';
import CanvasLoader from './Loader';

/** loading of the objects */
const Gym = ({ ...props }) => {
  
  const Gym = useGLTF('./3Dmodels/gym_complex/gym_complex.glb')
  return (
    <mesh>
      <primitive  object={Gym.scene} {...props} />
      <pointLight intensity={0.1} 
      position={ [5,-50,-20] }  />
        <pointLight position={[10,30,10]} intensity={0.5}    />
    </mesh>
  )
}

const Kettlebell = ({ ...props }) => {


const Kettlebell = useGLTF('./3Dmodels/Kettlebell/scene.gltf')

return (
  <mesh  >

      <primitive  object={Kettlebell.scene} {...props} />
      <meshNormalMaterial color='red'  />

  </mesh>
)
}

const Section = ({text,hero, ...props}) => {
  const myMesh= useRef();
 return(
  <mesh ref={myMesh}  {...props}>
     <Center>
      <Text position-y={2} fontSize={1} color={"white"}
                          outlineWidth={0.01}
                          outlineColor="black"
                          outlineOpacity={0.6}> {text} </Text>
      <Text fontSize={0.15} color={"white"}
                    
                    outlineWidth={0.01}
                    outlineColor="black"
                    outlineOpacity={0.6}
      
      > {hero} </Text>
      </Center>
    
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

const WordMap = ({ words, dimensions }) => {
  const wordMeshes = useRef([]);

  useFrame(() => {
    const elapsedTime = window.performance.now() * 0.001;

    wordMeshes.current.forEach((mesh, index) => {
      const xPosition = (elapsedTime + index) % (dimensions.rows * dimensions.spacing)*(-1)**index;
      mesh.position.setX(xPosition);
    });
  });

  return (
    <group rotation-y={Math.PI / 2} position={[-8,-28,0]}  rotation-x={Math.PI / 3.5} >
      
        {words.map((word, index) => (
          <mesh
            key={index}
            position={[
              -dimensions.width / 2 + (index % dimensions.columns) * dimensions.spacing,
              index*dimensions.height / 2,
              0,
            ]}
            ref={(mesh) => (wordMeshes.current[index] = mesh)}
          >
              <Text fontSize={5} color="black" > {word} </Text>
          </mesh>
        ))}
      
    </group>
  );
};

const Wallpaper = () => {

  const wordList = ['FORCE/ PERSEVERANCE/ RESPECT/', 'DETERMINATION/ PASSION/ COURAGE/', 'TRAVAIL/ PERSEVERANCE/ PASSION/ COURAGE/', 
  'RESPECT/ DETERMINATION/ PASSION/ COURAGE/', 'COURAGE/ FORCE/ PERSEVERANCE/ RESPECT/','PERSEVERANCE/ FORCE/ PERSEVERANCE/ RESPECT/','PASSION/ RESPECT/',
  'FORCE/ PERSEVERANCE/ RESPECT/',
  'DETERMINATION/ PASSION/ COURAGE/',
'PERSEVERANCE/',];
  const mapDimensions = {
    width: 5,
    height: 9,
    columns: 3,
    rows: 10, // Adjust this based on the desired number of rows for the loop
    spacing: 1,
  };

  return <WordMap words={wordList} dimensions={mapDimensions} />;

  }
/*
const Wallpaper = () => {
  const words = [
    { text: 'FORCE /', color: 'black', offset: 0 },
    { text: 'DETERMINATION /', color: 'transparent',offset: 7},
    { text: 'DISCIPLINE /', color: 'black' ,offset: 22},
    { text: 'PASSION /', color: 'transparent',offset: 34 },
    { text: 'PERSEVERANCE /', color: 'black',offset: 43 },
    { text: 'COURAGE /', color: 'transparent' ,offset: 57},
    { text: 'RESPECT /', color: 'black',offset: 66 },
    { text: 'TRAVAIL /', color: 'transparent',offset: 75 },
    
  ];
  
  const wordSpacing = 5.5; // Adjust the spacing between words

  return (
    <group rotation-y={Math.PI / 2} position={[-15,0,20]} rotation-x={Math.PI / 3.5}>
      {words.map((word, index) => (
        <Text
          key={index}
          color={word.color}
          outlineColor="black"
          position={[word.offset*wordSpacing, 0, 0]} // Evenly space the words          fontSize={3}
          maxWidth={200}
          outlineWidth={0.02}
          outlineOpacity={1}
          anchorX="left"
          fontSize={10}

          
        >
          {word.text}
        </Text>
      ))}
    </group>
  );
};*/
/* ********************************************** */
//*******************   SCENE    ******************* */
/****************************************
 * 
/************************************** */

/** handling of the camera movements */


const CameraAnimation = ({ section }) => {
  const targetPosition = useRef({ x: 10, y: 0 , z: 0 });
  const targets = [ 
    {x: 0,y:1,z:-7},
    {x: 10,y:1,z:0},
    {x: 0,y:30,z:0},
    {x: 0,y:0,z:30},
    {x: 0,y:0,z:60},
    {x: 0,y:0,z:70},
   ];

   useEffect(() => {
    targetPosition.current = { ...targets[section] };
  }, [section]);

  useFrame((state) => {
    
    const step = 0.1;
    
    state.camera.position.lerp(targetPosition.current, step);
    state.camera.lookAt(0,1,0);
    
    
  });

  if (section==1)
  {return(<>
          <color attach="background" args={['#f0f0f0']} />
          <Wallpaper />
  </>
  )}
  else 
  {return null;}
  
  
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

const Content = () => {

  const { width, height } = useThree((state) => state.viewport)
  const margin = 0.5 ;

  return (
  <Center top left position={[width / 2 - margin, -height / 2 + margin, 0]} rotation-y={[-3.14/2]}>
  <Text3D letterSpacing={-0.06} size={0.5} font="/Inter_Bold.json">
    bottom right
    <meshStandardMaterial color="white" />
  </Text3D>
</Center>
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

  const hero0=`Des programmes adaptés à tes objectifs et capacités
  \n associés à une routine d’échauffement et d’étirement. 
  \nMon programme sera fait pour toi.`


  const hero1=`
  \n\n  ·Des programmes d'entraînement personnalisés, allant du renforcement et plans de remise en forme complets à la préparation d'athlète pour des échéances.
  \n  ·Un suivi mensuel comprenant des programmes personnalisés et adaptés chaque semaine, des retours sur la techniques quotidiens ainsi que des conseils nutritionnels pour l'optimisation de la performance. 
  \n  ·Des sessions de coaching individuelles pour des conseils et une correction de mouvements en présentiel.
  \n  ·Des cours en téléconférence sur la morpho-anatomie et la physiologie du corps par rapport à l'entraînement.
  \n\n·Je travaille avec des clients de tous horizons, qu'il s'agisse d'athlètes, de personnes occupées
  \n qui cherchent à intégrer l'exercice dans leur emploi du temps chargé, de personnes
  \n cherchant à perdre du poids ou à se remettre en forme après une blessure.
  `

  


  
  return (
    <div className='canvas-container'   > 
      
      <Canvas onWheel={handleWheel}
      
    gl={{preserveDrawingBuffer: true}}
    > 

      <perspectiveCamera />
      <CameraAnimation section={section} />

      

      
       <Suspense fallback={<CanvasLoader />}>
             
                    
            <Gym    position={[2.5, 0, 0]} />
            <fog attach="fog" args={['#000000', 30, 50]}/>
            <Section position={[0, 2, -2]} rotation-y={Math.PI} text={'Tu recherches '} hero={hero0}/>
            <Section position={[5, 2, 0]} rotation-y={Math.PI / 2} text={'services'} hero={hero1}/>

            <Section3 position={[0, 15,0]} />
            <Section position={[10, -20, 0]} text={'section 4'}/>
            
            <Section4 position={[0, 0, 50]}/>
            
            <Content/>
            
        </Suspense>
        
        <hemisphereLight intensity={1}
      groundColor="white" />


        <Preload all />
        
    </Canvas>
   
    </div>
      
  )
}

export default BackgroundScene
import React from 'react';
import { Text3D,Center } from '@react-three/drei';

const Section2 = ({...props}) => {
  return (
    
<Center rotation={[0, -1, 0]}  {...props}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1}
          
          font="/Inter_Bold.json"
          >
          {`Contact\nUs!`}
          <meshNormalMaterial />
        </Text3D>

      </Center>
    
  );
};

export default Section2;

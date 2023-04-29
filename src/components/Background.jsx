import React from 'react';
import { motion } from 'framer-motion';

import {styles} from '../styles';
import { DumbbellCanvas } from './canvas';
import { KettlebellCanvas } from './canvas';
/**import { ComputerCanvas } from './canvas' ; */

const Hero = () => {
  return (
    
      <div className= {`${styles.paddingX} absolute inset-0 top-[120px]
      max-w-7x1 mx-auto flex flex-col items-start gap-5`} >

        <DumbbellCanvas  />


        <KettlebellCanvas  />


      </div>

      
    
  )
}

export default Hero
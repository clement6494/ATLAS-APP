import React from 'react';
import { motion } from 'framer-motion';

import {styles} from '../styles';
import { DumbbellCanvas } from './canvas';
import { KettlebellCanvas } from './canvas';
/**import { ComputerCanvas } from './canvas' ; */

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className= {`${styles.paddingX} absolute inset-0 top-[120px]
      max-w-7x1 mx-auto flex flex-row items-start gap-5`} >

        <DumbbellCanvas/>


      </div>

      
    </section>
  )
}

export default Hero
import React from 'react';
import { motion } from 'framer-motion';

import {styles} from './styles';

/**import { ComputerCanvas } from './canvas' ; */

const Hero = () => {
  return (
    <section className='section1'>
      <div className= {`${styles.paddingX} absolute inset-0 top-[120px]
      max-w-7x1 mx-auto flex flex-row items-start gap-5`} >

        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full  bg-[#915eff]'/>
          <div  className='w-1 sm:h-80 h-40  violet-gradient'/>
        </div>
        <div >
        <h1 className={`${styles.heroHeadText}`} >  <span className='text-[#915eff]'>Atlas </span> Gym </h1>
        <p className={`${styles.heroSubText} mt-2 text-white-100`} > 
            Des programmes évolutifs <br className='sm:block hidden'/> adaptés aux besoins et objectifs de chacuns
        </p>
        </div>

      </div>

      
    </section>
  )
}

export default Hero
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import {styles} from './styles';

function Programs() {
  
    return (
      <div className='section3'>
        
        <div className=' transparent-black-gradient rounded-xl min-w-[200px] px-[2em]' >
        <h2 className={`${styles.heroHeadText}`} >Programmes</h2>
        <p> Mes programmes sont adaptés à chaque individus,<br className='sm:block hidden'/>
         suivant ses objectifs, sa morphologie, ses disponibilité, budget etc. 
        <br className='sm:block hidden'/> Je propose cependant 3 aces majeurs, pour vous guider.
        </p>
        </div > 
        <div className=' flex flex-row justify-center items-center mt-5 gap-4 '>
          <div className=' transparent-black-gradient rounded-xl px-[2em]'>
            <h3>Remise en forme</h3>
            <p>description</p>
          </div>

          <div className=' transparent-black-gradient rounded-xl px-[2em]'>
            <h3>Street-lifting</h3>
            <p>description</p>
          </div>

          <div className=' transparent-black-gradient rounded-xl px-[2em]' >
            <h3>Power-lifting</h3>
            <p>description</p>
          </div>

        </div>





      </div>
    )
}

export default Programs

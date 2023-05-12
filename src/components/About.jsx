import React from 'react'
import {styles} from './styles';

const About = () => {
  return (
    <div className='section2'>
      <div>
        <h1 className={`contact-text ${styles.heroHeadText}`} > Choisir Atlas Gym c'est... </h1>
      </div>
      
      <div className='flex direction-row gap-4 px-[2em]'>
        <div>
          <svg></svg>
          <h3 className='text-slate-200  uppercase py-4'>une application</h3>
          <p>Notre application vous permet d'avoir accès a vos programmes d'entrainements et votre évolution n'importe où.
            Ainsi que de communiquer avec votre coach à tout moment.

          </p>
        </div>
        <div>
          <svg></svg>
          <h3 className='text-slate-200  uppercase py-4'> des programmes évolutifs</h3>
          <p>
            des programmes qui s'adaptent en fonction de vos progrès et de votre emploi du temps.
          </p>
        </div>
        <div>
          <svg></svg>
          <h3 className='text-slate-200  uppercase py-4'>un accompagnement personnalisé</h3>
          <p>envoyez-vos performances et ressentis après chaque entrainement, pour que nos coachs puissent vous aidez à progresser plus rapidement.</p>
        </div>
        <div>
          <svg></svg>
          <h3 className='text-slate-200  uppercase py-4'>des résultats garantis</h3>
          <p>
            Nous vous garantissons des résultats en fonction de vos objectifs dès le premier mois, si ils ne sont pas a la hauteur de vos attentes nous vous remboursons.
          </p>
        </div>
      </div>




    </div>
  )
}

export default About
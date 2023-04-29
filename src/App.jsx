import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, BackgroundScene } from './components';
function App() {
  

  return (
    <BrowserRouter> 
      <div className='relative z-0 bg-primary'>
        <BackgroundScene >
        <div className='bg-hero-patternbg-cover bg-no-repeat bg-center '>
          <Navbar />
          <Hero></Hero>
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />

        </div>
        </BackgroundScene>
      </div>
    </BrowserRouter>
  )
}

export default App

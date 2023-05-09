import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, BackgroundScene, Programs } from './components';
function App() {
  

  return (
    <BrowserRouter> 
      <div id='body' className='relative z-0 '>
        <BackgroundScene className='fixed z-0 top-0 ' />
        <div className='bg-hero-patternbg-cover bg-no-repeat bg-center '>
          <Navbar />
          <Hero></Hero>
        </div>
        
        
        <div className='relative z-0'>
        <About />
        <Programs />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
          <Contact />
          <StarsCanvas />

        </div>
        
      </div>
    </BrowserRouter>
  )
}

export default App

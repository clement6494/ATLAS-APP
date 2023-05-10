import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, BackgroundScene, Programs } from './components';
function App() {
  

  

  return (
    <BrowserRouter> 

      <div id='body' className='relative z-0 '>
        
        <BackgroundScene/>
      
      </div>
    </BrowserRouter>
  )
}

export default App

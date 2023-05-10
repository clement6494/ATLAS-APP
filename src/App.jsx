import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, BackgroundScene, Programs, Footer } from './components';
function App() {
  

  

  return (
    <BrowserRouter> 

      <div id='body' className='relative '>
        <div></div>
        
        <BackgroundScene/>
        <Footer data-visible='true'/>
      </div>
    </BrowserRouter>
  )
}

export default App

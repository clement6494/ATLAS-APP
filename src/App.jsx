import {Suspense,  useState, useEffect  } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, BackgroundScene, Programs, Footer } from './components';


import CanvasLoader from './components/Loader';

function App() {
  
  const [mainHeight, setMainHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setMainHeight(window.innerHeight );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  

  return (
    <BrowserRouter> 
      <Suspense fallback={<CanvasLoader />}>
      <div className='content-wrapper' style={{ height: mainHeight }} >
        <Navbar/>
        <div className="section-wrapper">
          <BackgroundScene/>
          <Contact/>
        </div>
        
        <Footer data-visible='true'/>
      </div>
      </Suspense>


    </BrowserRouter>
  )
}

export default App

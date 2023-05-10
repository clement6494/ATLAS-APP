import { useState, useEffect  } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, BackgroundScene, Programs, Footer } from './components';
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

      <div className='content-wrapper' style={{ height: mainHeight }} >
        <Navbar/>
        <div className="section-wrapper">
        <BackgroundScene/>
        </div>
        <Footer data-visible='true'/>
      </div>
    </BrowserRouter>
  )
}

export default App

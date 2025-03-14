import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';

import { styles } from "./styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {

  const [active, setActive] = useState("");
  const [toggle, setToggle ] = useState(false);

  return (
    <div className='header' >
    <nav  className={`
    ${styles.paddingX} w-full 
    flex items-center  
    `}  > 

      <div className='w-full flex justify-between
      items-center max-w-7x1 mx-auto' >
        <Link
        to="/"
        className='flex items-center gap-2'
        onClick={() => {
          setActive("");
          window.scrollTo(0,0);
          }}
        >
          <img src={logo} alt="logo" className='w-10 h-10 
          object-contain' />
          <p className='text-white text-[18px] font bold cursor-pointer flex '>
            Atlas &nbsp;
          <span className='sm:block hidden'> | Coaching </span></p>
 

          </Link>

          <ul className='list-none hidden sm:flex flex-row gap-10' >
            {navLinks.map((Link) => (
              <li key={Link.id} className= {`${active === Link.title
                ? "text-white"
                : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(Link.title)}
              >
                  <a href={`#${Link.id}`} > {Link.title}</a>
              </li>
            ))}


          </ul>
          
          <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          <div className={`${!toggle ? 'hidden':'flex' } p-6 black-gradient 
          absolute top-20 right-0 mx-4 my-2  min-w-[140px] z-10 rounded-xl `}>
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(Link.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>



          </div>



      </div>


    </nav>
    </div>
  );
};
/**          <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(Link.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div> */


export default Navbar 
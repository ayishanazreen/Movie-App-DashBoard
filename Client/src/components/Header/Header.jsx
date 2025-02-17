import React from 'react';
import './Header.css';
import {useLocation} from 'react-router-dom'

const Header = () => {
  const location =useLocation();
  const isNoBgPage=['/', '/login', '/signup'].includes(location.pathname);
  console.log(isNoBgPage)
    return (
    <>
        <header className= {isNoBgPage ? 'header-container-nobg' : 'header-container'}>
        <div className='title-div'>
        <img src='./film-icon.webp' className='icon-movie'></img>
        <h1 className={isNoBgPage? 'heading-nobg' : 'heading'}>FilmConnect</h1>
        </div>
      </header>
    </>
  )
}

export default Header

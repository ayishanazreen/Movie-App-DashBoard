import React from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useMode } from '../../Hooks/useMode';
import { useAuth } from '../../Hooks/useAuth';
import { useMovies } from '../../Hooks/useMovies';


const Header = () => {
  const {setButtonShow, buttonShow}=useMovies();
  const navigate=useNavigate();
  const {  logOut}=useAuth();
  const {isMode, ToggleMode,}=useMode();
  const onHandleLogout =()=>{
    logOut();
    setButtonShow(false);
    navigate("/");
  }
  return (
    <>
      <header className={isMode? 'header-dark-container': 'header-light-container'}>
        <div className='title-div'>
        <img src='/film-icon.webp' className='icon-movie'></img>
        <h1 className='heading'>FilmConnect</h1>
        </div>
        <div className='btns-div'>
        <button className={isMode ? 'light-mode-btn' : "dark-mode"} onClick={ToggleMode}> {isMode? <MdDarkMode size={28}/> : <MdLightMode size={28}/> } </button>
        {buttonShow ? <button className='logout-btn' onClick={onHandleLogout}>Log Out</button>: ''}
        </div>
      </header>
    </>
  )
}
export default Header;

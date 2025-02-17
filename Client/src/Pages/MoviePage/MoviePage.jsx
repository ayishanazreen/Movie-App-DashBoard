import React from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';
import './MoviePage.css'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MovieForm from './MovieForm/MovieForm';
import SideBarWrapper from '../../components/Sidebar/SideBarWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const MoviePage = () => {

  return (
    <>
 
    <div className="movie-container"> 
      <SideBarWrapper>
      <Header/>
  
       <MovieForm/>
        <ToastContainer position="top-center" autoClose={3000}/>
        <Footer/>
      </SideBarWrapper>
    </div>
   
    </>
  )
}

export default MoviePage

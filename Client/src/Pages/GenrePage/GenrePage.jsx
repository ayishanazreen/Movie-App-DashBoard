import React from 'react';
import './GenrePage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBarWrapper from '../../components/Sidebar/SideBarWrapper';
import GenreList from './GenreList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GenrePage = () => {
  return (
    <>
  
    <div className="genre-container"> 
      <SideBarWrapper>
      <Header/>
      <h1 className='genre-heading'>List Your Favouritre Genre</h1>
      <GenreList/>
         <ToastContainer position="top-center" autoClose={3000}/>
         <Footer/>
     </SideBarWrapper>
    </div>
   
    </>
  )
}

export default GenrePage

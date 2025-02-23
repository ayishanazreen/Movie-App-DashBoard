import React, { useEffect, useState } from 'react'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './HomePage.css'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBarWrapper from '../../components/Sidebar/SideBarWrapper';
import MovieList from './MovieList';
import axios from 'axios';
import MovieHomePage from '../MoviePage/movieHomePage';
const API_URL =import.meta.env.VITE_API_URL;

const HomePage = () => {
    const [username, setUsername]=useState();
    const token=localStorage.getItem("token");

  useEffect(()=>{
    const fetchProfile =async()=>{
    const response=await axios.get(`${API_URL}/home`, {
      headers:{
        authorization:`Bearer ${token}`
      }
    });
    setUsername(response.data.user.name)
    }


    fetchProfile();
  }, []);
  
  return (
    <>
    <div className='main-div col-md-6 col-sm-12'>
        <SideBarWrapper>
         <Header/>
         <MovieHomePage/>
         <h1>Welcome <span className='username'>{username}</span></h1>
         <MovieList/>
         <ToastContainer position="top-center" autoClose={3000}/>
         <Footer/>
        </SideBarWrapper >
     </div>
    </>
  )
}

export default HomePage

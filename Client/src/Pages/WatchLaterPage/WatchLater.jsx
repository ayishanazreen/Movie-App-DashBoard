import React, { useState,useEffect, useContext } from 'react';
import './Watchlater.css';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
const API_URL="http://localhost:3006";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { CiBookmarkRemove } from "react-icons/ci";
import { WatchlaterContext } from '../../context/WatchLaterContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import SideBarWrapper from '../../components/Sidebar/SideBarWrapper';

const Watchlater = () => {
     const [movies, setMovies]=useState([]);
     const navigate=useNavigate();
     //const {idArray}=useContext(WatchlaterContext);


     const getStars=(rating)=>{
         const stars=[];
             for(let i=1;i<=5;i++){
                 if(i<=rating){
                     stars.push(<FaStar key={i} color='gold'/>)
                 }
                 else if(i-0.5 ===rating){
                     stars.push(<FaStarHalfAlt key={i} color='gold'/>)
                 }
                 else{
                     stars.push(<FaRegStar key={i} color='gray'/>)
                 } }
                 return stars;
             };

        
const handleRemoveWatchLater= async(id)=>
{
    try {
        console.log(id, "id of movie to delete in front end")
          const token= localStorage.getItem("token")
          const response=await axios.delete(`${API_URL}/home/watch-later/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
          })
          if(response.status===200  && response.data.message==="deleted")
            {
             console.log("watch toast triggered")
             toast.success("Movie deleted successfully");
             setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
            }
            else
            {
                toast.error("Failed to delete the movie");
            }   
        } catch (error) 
            {
               console.error(error);
               toast.error("Error deleting movie. Please try again."); 
            }
                
}
         

    const fetchMovie = async()=>{
        try {
          const token=localStorage.getItem('token')
          const response=await axios(`${API_URL}/home/watch-later`, {
            headers:{
              Authorization: `Bearer ${token}`
            }
          });
          console.log("response fron watch later backend on get request",response);
          const fetchedMovies=response.data.user.watchLater;
         // console.log(fetchedMovies,"fetched movies ================")
        
          setMovies(fetchedMovies? fetchedMovies : <p>No Movies selected</p>);
        } catch (error) {
          console.log(error)
          
        }
      }

      useEffect(()=>{
        fetchMovie();
        console.log(movies)
      }, []);


  return (
    <>
      <SideBarWrapper>
        <Header/>

        <div className='watch-later-div'>
        <h1 className='heading'>Watch Later</h1>
        <div className='watch-later-content'>
        {movies.length > 0 ? ( movies.map((movie)=> (
                 <div className='movie-cards' key={movie._id}>
                     <img src={`http://localhost:3006${movie.imageUrl}`} alt='movie.title' className='movie-image' onError={(e) => e.target.src = '/delete.png'}/>
                     <h1>{movie.title}</h1>
                     -----------------------------
                     <p>Rating : {getStars(movie.rating)}</p>
                     <p>Genre:  {Array.isArray(movie.genre) ? movie.genre.map(g=>g.name).join(", ") : "N/A"}</p>
                     <div className='btns-div'>
                     <button onClick={()=>handleRemoveWatchLater(movie._id)}  className='laterBtn'><CiBookmarkRemove size={25}/></button>
                     </div>
                   
                 </div>
 
             ))  ) : <p>No movies in Watch List</p>}
       </div>
        </div>
        <ToastContainer position="top-center" autoClose={3000}/>
        <Footer/>
        </SideBarWrapper>
      
    </>
  )
}

export default Watchlater

import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MovieList.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import EditPage from '../EditPage/EditPage';
const API_URL="http://localhost:3006";
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { MdOutlineWatchLater } from "react-icons/md";
import { WatchlaterContext } from '../../context/WatchLaterContext';



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
    
const MovieList = () => {
  const {logout} =useContext(AuthContext);
  const {addToWatchLater}=useContext(WatchlaterContext)
 
  const navigate=useNavigate();
    const [movies, setMovies]=useState([])

    const fetchMovie=async(req,res)=>{
      try {
        const token=localStorage.getItem('token')
        const response=await axios.get(`${API_URL}/home`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        console.log("response fron backend on get request",response)
        setMovies(response.data.movies);
      } catch (error) {
        console.log(error)
        if(error.response && error.response.status===401){
          toast.error("Session Expired");

          setTimeout(()=>{
            logout();
            navigate('/login')
          }, 3000);
         
        }
        
      }
    }

  

    const handleEdit=async (id)=>{
        navigate(`/edit/${id}`);
    }

    const handleWatchLater =async(movieId)=>{
      const token=localStorage.getItem("token")
      try {
        const response=await axios.put(`${API_URL}/home/watch-later`, {movieId} ,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response.data.user._id)
        toast.success("Added to Watch Later List")
        
      } catch (error) {
        console.log(error)
        
      }
      
    }
    const handleDelete=async (id)=>{
      try {
        const response=await axios.delete(`${API_URL}/movies/${id}`)
        if(response.status===200){
          toast.success("Movie deleted successfully");
          fetchMovie();
        }
        else{
          toast.error("Failed to delete the movie", { autoClose: 3000 });
        }
        
        
        
      } catch (error) {
        console.error(error);
        toast.error("Error deleting movie. Please try again.", { autoClose: 3000 }); 
      }
        
    }
  
    useEffect(()=>{ 
      fetchMovie();
    }, []);


  return (
    <div className='home-content'>
            {movies.map((movie)=> (
                <div className='movie-cards' key={movie._id}>
                    <img src={`http://localhost:3006${movie.imageUrl}`} alt='movie.title' className='movie-image' onError={(e) => e.target.src = '/delete.png'}/>
                    <h1>{movie.title}</h1>
                    -----------------------------
                    <p>Rating : {getStars(movie.rating)}</p>
                    <p>Genre:  {Array.isArray(movie.genre) ? movie.genre.map(g=>g.name).join(", ") : "N/A"}</p>
                    <div className='btns-div'>
                    <button onClick={()=>handleEdit(movie._id)} className='editBtn'>Edit</button>
                    <button onClick={()=>handleDelete(movie._id)}  className='deleteBtn'>Delete</button>
                    <button onClick={()=>handleWatchLater(movie._id)}  className='laterBtn'><MdOutlineWatchLater size={25} /></button>
                    </div>
                  
                </div>

            ))}
         
    </div>
  )
}

export default MovieList

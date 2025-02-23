import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MovieList.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import EditPage from '../EditPage/EditPage';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { MdOutlineWatchLater } from "react-icons/md";
import { WatchlaterContext } from '../../context/WatchLaterContext';
const API_URL =import.meta.env.VITE_API_URL;
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
  //const {addToWatchLater}=useContext(WatchlaterContext);
  const [selectedGenre, setSelectedGenre]=useState("");
  const [filterGenre, setFilterGenre]=useState([])
  const [selectedRating, setSelectedRating] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5);
 
  const navigate=useNavigate();
    const [movies, setMovies]=useState([])


    const handleSelectedRating = (event) => {
      const value=Number(event.target.value);
      console.log(value, "====value")
      setSelectedRating((prevRating)=> prevRating.includes(value)? prevRating.filter((r)=> r !== value): [...prevRating, value])
    };


    const fetchMovie=async(req,res)=>{
      try {
        const token=localStorage.getItem('token')
        const response=await axios.get(`${API_URL}/home`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
       //console.log("response fron backend on get request",response.data.movies);
       if (response.data.movies.length > 0) {
        setMovies(response.data.movies); 
        setFilteredMovies(response.data.movies); 
      }

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

    useEffect(()=>{ 
      fetchMovie();
    }, []);


    //useEffect on filteration
    useEffect(()=>{
        let filtered=[...movies]; 
       
       if(selectedGenre && selectedGenre !== "full-genre"){
        console.log(selectedGenre)
        filtered= filtered.filter((movie) => movie.genre?.some((g) => g.name === selectedGenre));
       }
      

      if(selectedRating.length > 0) {
        filtered= filtered.filter((movie)=>selectedRating.includes(movie.rating) )
      }

      setFilteredMovies(filtered);
      setCurrentPage(1);


    }, [selectedGenre, selectedRating, movies]);


    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  //pagination
  const handleNextPage = () => {
     if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
     }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };



 // Effect on fetching Genres
    useEffect(()=>{
      const fetchGenre =async()=>{
        try {
          const response=await axios.get(`${API_URL}/genre`);
          setFilterGenre(response.data.genres);
        } catch (error) {
         console.log(error); 
        }
       
    }

    fetchGenre();
    console.log(filterGenre)
    
    }, []);

  

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

    const handleClearClick=()=>{
      setSelectedGenre(""); 
      setSelectedRating([]); 
      setFilteredMovies(movies);

    }

  return (
    <>
    <div className='filter-div'>  
       <select value={selectedGenre} onChange={(event)=> setSelectedGenre(event.target.value)}>
          <option value="full-genre">Select a genre</option>
        {Array.isArray(filterGenre) && filterGenre.length>0 && filterGenre.map((gen) => (
          <option key={gen._id} value={gen.name}>{gen.name}</option>
      ))}
       </select>

       <div className='ratings-div'>
        <label className='rating-label'>Ratings : </label>
        {[1,2,3,4,5].map((star)=> (
          <div key={star}>
              <input type='checkbox' value={star} onChange={handleSelectedRating} checked={selectedRating.includes(star)}/>
              <label> {star} stars</label>
          </div>
        ))}


       </div>
       <button className='clear-btn' onClick={handleClearClick}>Clear</button>
    </div>
    <div className='home-content'>
            {currentMovies.map((movie)=> (
                <div className='movie-cards' key={movie._id}>
                    <img src={`${API_URL}/${movie.imageUrl}`} alt='movie.title' className='movie-image' onError={(e) => e.target.src = '/delete.png'}/>
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


  <div className='pagination'>
    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
    <span>Page {currentPage} of {totalPages}</span>
    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
</div>
    </>
  )
}

export default MovieList

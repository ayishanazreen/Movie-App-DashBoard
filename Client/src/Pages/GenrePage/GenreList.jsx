import React from 'react';
import './GenreList.css';
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL =import.meta.env.VITE_API_URL;

const GenreList = () => {
    const [genres, setGenres]=useState([]);
    const [genreInput, setGenreInput]=useState("");
    const [existingGenre, setExistingGenre]=useState([])

    const handleGenreChange =(event)=>{
        setGenreInput(event.target.value)
    }

    const handleAddGenre= async()=>{
        if(!genreInput.trim()){
            console.log("genre cannot be empty");
            return;
        }
        if (Array.isArray(existingGenre) && existingGenre.includes(genreInput.trim())){
            toast.error("Genre already exists", {
                position: "top-right",
                style: { fontSize: "20px", padding: "20px", width: "500px"}, // Increase width and font size
                autoClose: 3000,
              });
              setGenreInput("");
              return;

        }
        try {
            const response=await axios.post(`${API_URL}/genre`, {genre:genreInput})
            fetchGenre();
            setGenreInput("");
            toast.success("Genre Added Successfully", {
                      position: "top-right",
                      style: { fontSize: "20px", padding: "20px", width: "500px" }, // Increase width and font size
                      autoClose: 3000,
                    });

        } catch (error) {
            console.log(error)
        }
    }

    const fetchGenre =async()=>{
        try {
        const response=await axios.get(`${API_URL}/genre`);
        if (Array.isArray(response.data.genres)){
            setGenres(response.data.genres);
            setExistingGenre(response.data.genres.map((genre) =>genre.name))
        }
        else {
            console.error("Genres is not in response")
        }
            
        } catch (error) {
            console.error("error fetching genre");
            alert("Failed to fetch genres. Please try again later.");
        }
        
       
    }

    const handleDeleteGenre = async(genre)=>{
        try {
           const response=await axios.delete(`${API_URL}/genre`, {
            params:{
                genre,
            }  })
            if(Array.isArray(response.data.genres)){
                setGenres(response.data.genres);
            }
           toast.error("Genre deleted Successfully", {
            position: "top-right",
            style: { fontSize: "20px", padding: "20px", width: "500px" }, // Increase width and font size
            autoClose: 3000,
          });
           fetchGenre();
        } catch (error) {
           console.log(error)
        }
       }

    useEffect(()=>{
        fetchGenre();
    },[]);


  return (
    <>
       <div className='genre-content'>
       <div className='genre-form'>
       <label htmlFor="genre">Add Genre </label>
       <input type="text" id='genre' placeholder='Add new genre' value={genreInput} onChange={handleGenreChange}/>
       <button onClick={handleAddGenre} className='add-genre-btn'>Add Genre</button>
       </div>
       <div className='genre-list-div'>
        {genres.length > 0 ? ( genres.map((gen)=> 
        
        <div key={gen.id} className='genre-box'>
        <a className='close-btn' onClick={()=>handleDeleteGenre(gen.name)}><img src='./delete.png' style={{ "width": "20px", "height": "20px"}}/></a>
         <p>{gen.name}</p> 
        </div>
     )) 
        : (<p>No genres available</p>)}
      
       </div>
    </div>
    </>
  )
}

export default GenreList

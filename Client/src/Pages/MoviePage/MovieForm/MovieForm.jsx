import React ,{useEffect, useState}from 'react';
import axios from 'axios';
import './MovieForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const API_URL="http://localhost:3006";

const MovieForm = () => {
    const [imagePreview, setImagePreview]=useState(null);
    const fileInputRef=useRef(null);
    const [genres, setGenres]=useState([])
    const [movie, setMovie]=useState({
      title: "",
      rating:"1",
      genre:[],
      image:null,
    })

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
        


//fetching genres 
useEffect(()=>{
  const fetchGenre =async()=>{
    try {
      const response=await axios.get(`${API_URL}/genre`);
      setGenres(response.data.genres) 
    } catch (error) {
     console.log(error); 
    }
   
}
fetchGenre();

}, []);
  


  //POST 
    const handleAddMovie=async()=>{
      try {
        if(!movie.title || movie.genre.length === 0 || !movie.image){
          console.log("data is missing")
          return;
        }
        const validGenres = movie.genre.map(genreName => {
          const genre=genres.find(g=> g.name===genreName)
          return genre? genre._id : null}).filter(id => id);

          console.log(validGenres);
        const formData=new FormData();
        formData.append('title', movie.title);
        formData.append('rating', movie.rating);
        formData.append('genre', validGenres.join(','));
        formData.append('image', movie.image);
  
        
        const response=await axios.post(`${API_URL}/movies`, formData, 
          { headers:
            {
              'Content-Type': 'multipart/form-data'
            },
          });
        console.log(response.data)


        //toast notify

        toast.success("Movie Added Successfully", {
          position: "top-right",
          style: { fontSize: "20px", padding: "20px", width: "500px"  }, // Increase width and font size
          autoClose: 3000,
        });
        

        //Resetting state after submission
        setMovie({
          title: "",
          rating:"",
          genre:[],
          image:null,
        })
        setImagePreview(null);

        if(fileInputRef.current){
          fileInputRef.current.value="";
        }

        document.querySelectorAll("input[type=checkbox]").forEach(checkbox => {checkbox.checked =false});

      } catch (error) {
        console.log(error) 
      }
   }
  
  
    const handleFileChange=(event)=>{
      setMovie((prevMovie)=> ({...prevMovie, image: event.target.files[0]}))
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
    const handlingRatingChange=(event)=>{
      const rating =event.target.value;
      console.log(rating);
      setMovie((prevMovie)=> ({...prevMovie, rating}))
  
    }
  
    const handleGenreChange=(event)=>{
      const {value, checked}=event.target;
  
      const currentGenre= Array.isArray(movie.genre)? movie.genre: [];
      if(checked){
        
        setMovie({...movie, genre: [...currentGenre, value] })
      }
      else{
        setMovie({...movie, genre: currentGenre.filter((genreName)=> genreName!==value)})
      }
  
    }
  
    const handleChange =(e)=>{
      setMovie({...movie, [e.target.name]: e.target.value});
    }


    const handleDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        fileInputRef.current.files = event.dataTransfer.files;
        setImagePreview(URL.createObjectURL(file));
      }
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleTriggerFile =() => { 
      fileInputRef.current.click();
    }


  return (
    <div className='movie-content'>
      <h1>Add Your Movie</h1>
    <div className='movie-form'>
    <label htmlFor="file" className="upload-icon">Upload your image here</label>

    <input
      type="file" 
      id="file" 
      aceept="image/*"
      onChange={handleFileChange} 
      ref={fileInputRef}  
      style={{ display: 'none' }}
    />

     <div className="drop-zone" onDrop={handleDrop}  onDragOver={handleDragOver} onClick={handleTriggerFile}>
          <i className="fas fa-cloud-upload-alt fa-3x"  ></i>
          <p className='upload-text'>Upload a photo</p>
          <p>Drag & Drop your image here</p>
        </div>
        {imagePreview && <img src={imagePreview} alt="Movie Preview" className='previewImage' />}


    <label htmlFor="title">Title: </label>
    <input type="text" id='title' placeholder='Enter the movie title..' value={movie.title} name="title" onChange={handleChange}/>


    <div className='rating-container'>
    <label htmlFor="rating" >Rating:</label> 
    <p className='rating-number'>{getStars(movie.rating)}</p>
    </div>
    <input type="range" min="1" max="5" step="1" id="rating" value={movie.rating} onChange={handlingRatingChange}/> 
    
   

    <label>Genre: </label>

    <div className="genre-options">
      {Array.isArray(genres) && genres.length>0 && genres.map((genre) => {
        return (
        <div key={genre._id}>
           <input type="checkbox" id={genre.name} value={genre.name} onChange={handleGenreChange}/> 
           <label htmlFor={genre.name} >{genre.name} </label>
        </div>
      );
})}
   </div>
    {/* <input type="checkbox" id='comedy' value="comedy" onChange={handleGenreChange}/> <label htmlFor="comedy">Comedy</label>

  
    <input type="checkbox" id='action' value="action" onChange={handleGenreChange}/>   <label htmlFor="action">Action</label>

   
    <input type="checkbox" id='drama' value="drama" onChange={handleGenreChange}/>  <label htmlFor="drama">Drama</label>

    <input type="checkbox" id='horror' value="horror" onChange={handleGenreChange}/>  <label htmlFor="horror">Horror</label> */}
    
    <button className='addBtn' onClick={handleAddMovie}>Add</button>
    </div>
  
 </div>
  )
}

export default MovieForm

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './EditForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:3006";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [imagePreview, setImagePreview] = useState(null);
  const [orgImagePreview, setOrgImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [genres, setGenres] = useState([]);
  const [movie, setMovie] = useState({
    title: "",
    rating: "1",
    genre: [],
    image: null,
  });
  const [orgMovie, setOrgMovie] = useState({
    title: "",
    rating: "1",
    genre: [],
    image: null,
  });


  // Get star icons based on the rating
  const getStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      if (i + 1 <= rating) return <FaStar key={i} color="gold" />;
      if (i + 0.5 === rating) return <FaStarHalfAlt key={i} color="gold" />;
      return <FaRegStar key={i} color="gray" />;
    });
  };

  // Fetch movie details
  const fetchMovie = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies/${id}`);
      
      const genreNames = response.data.genre.map((genre) => genre.name);
     
      setMovie({
        title: response.data.title,
        rating: response.data.rating,
        genre: genreNames,
        image: null,
      });

      setOrgMovie({
        title: response.data.title,
        rating: response.data.rating,
        genre: genreNames,
        image: null,

      })


      setImagePreview(response.data.imageUrl ? `${API_URL}${response.data.imageUrl}` : null);
      setOrgImagePreview(response.data.imageUrl ? `${API_URL}${response.data.imageUrl}` : null);


    } catch (error) {
      console.log("Error fetching movie data", error);
    }
  };

  // Fetch available genres
  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${API_URL}/genre`);
      setGenres(response.data.genres);
    } catch (error) {
      console.log("Error fetching genres", error);
    }
  };

  useEffect(() => {
    if (id) fetchMovie();
    fetchGenres();
  }, [id]);




  // Handle movie updates
  const handleEditMovie = async () => {
    const hasChanges= movie.title!==orgMovie.title ||
     movie.rating !==orgMovie.rating ||
      JSON.stringify(movie.genre) !== JSON.stringify(orgMovie.genre)||   
        imagePreview !== orgImagePreview;

        if(!hasChanges){
          toast.info("No changes detected.", { autoClose: 2000 });
          setTimeout(() => navigate("/home"), 2000); // Navigate after toast
          return;
      
        }
    
    try {
      const formData = new FormData();
      formData.append('title', movie.title);
      formData.append('rating', movie.rating);

      const genreObjectIds = movie.genre.map(genreName => {
        const genre = genres.find(g => g.name === genreName);
        return genre ? genre._id : null;
      }).filter(id => id !== null);
  
      formData.append('genre', genreObjectIds.join(',')); 
  

      if (imagePreview) {
        const imageFile = imagePreview.startsWith('blob:') 
          ? await convertBlobUrlToFile(imagePreview) 
          : imagePreview;
        formData.append('image', imageFile);
      }
     const token=localStorage.getItem('token')
      await axios.put(`${API_URL}/home/edit/${id}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization':`Bearer ${token}` 
        },
      });
      toast.success("Movie updated successfully", {
        position: "top-right", 
        style: { fontSize: "20px", padding: "20px", width: "500px" },
        autoClose: 3000,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating movie", error);
      toast.error("Error updating movie", { autoClose: 3000 });
    }
  };

  // Convert Blob URL to File object
  const convertBlobUrlToFile = async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], "image.jpg", { type: blob.type });
  };

  const handleFileChange = (event) => {
    setMovie((prevMovie) => ({ ...prevMovie, image: event.target.files[0] }));
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleRatingChange = (event) => {
    setMovie((prevMovie) => ({ ...prevMovie, rating: event.target.value }));
  };

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    setMovie((prevMovie) => {
      const updatedGenres = checked
        ? [...prevMovie.genre, value]
        : prevMovie.genre.filter((genre) => genre !== value);
      return { ...prevMovie, genre: updatedGenres };
    });
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

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

  const handleTriggerFile = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="movie-content">
      <h1>Edit Movie</h1>
      <div className="movie-form">
        <label htmlFor="file" className="upload-icon">Upload your image here</label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <div className="drop-zone" onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleTriggerFile}>
          <i className="fas fa-cloud-upload-alt fa-3x"></i>
          <p className="upload-text">Upload a photo</p>
          <p>Drag & Drop your image here</p>
        </div>
        {imagePreview && <img src={imagePreview} alt="Movie Preview" className="previewImage" />}
        
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={movie.title}
          placeholder="Enter the movie title.."
          onChange={handleChange}
        />
        
        <div className="rating-container">
          <label htmlFor="rating">Rating:</label>
          <p className="rating-number">{getStars(movie.rating)}</p>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          id="rating"
          value={movie.rating}
          onChange={handleRatingChange}
        />

        <label>Genre: </label>
        <div className="genre-options">
          {genres.map((genre) => (
            <div key={genre._id}>
              <input
                type="checkbox"
                id={genre.name}
                value={genre.name}
                checked={movie.genre.includes(genre.name)}
                onChange={handleGenreChange}
              />
              <label htmlFor={genre.name}>{genre.name}</label>
            </div>
          ))}
        </div>

        <button className="edit-form-Btn" onClick={handleEditMovie}>Save</button>
      </div>
    </div>
  );
};

export default EditForm;

import React from "react";
import "./SearchList.css";
import {useMovies} from "../../Hooks/useMovies";
export const SearchList = ({ searchList }) => {
const {IMAGE_BASE_URL} =useMovies();
  return (
    <div className='main-container'>
      <div className='movie-container'>
      {searchList.map((movie)=>(
          <div key={movie.id} className='movie-item'>
          <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt='movie.title' className='movie-image'/>
          <h3>{movie.title}</h3>
          </div>    
      ))}
    </div>
    </div>
  );
};
import React from 'react';
import './MovieList.css';
import { useMode } from '../../Hooks/useMode';
import {useMovies} from '../../Hooks/useMovies';

const MovieList = ({movies}) => {
  const { IMAGE_BASE_URL}=useMovies();
  const {isMode}=useMode();
  
  if (!Array.isArray(movies) || movies.length === 0) {
    return <p>No movies available</p>;
  }

  return (
    <div>
      <div className={isMode? "movie-light-container" : 'movie-container'}>
        {movies.map((movie)=>(
            <div key={movie.id} className='movie-item'>
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt='movie.title' className='movie-image'/>
            <h3>{movie.title}</h3>
            </div>    
        ))}
      </div>
    </div>
  )
}

export default MovieList

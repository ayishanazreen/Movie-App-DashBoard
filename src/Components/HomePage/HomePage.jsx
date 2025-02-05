import React,{useState, useEffect} from 'react';
import axios from "axios";
import './HomePage.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import MovieList from './MovieList';
import { useMode } from '../../Hooks/useMode';
import { useMovies } from '../../Hooks/useMovies';

const HomePage = () => {
    const API_URL ="https://api.themoviedb.org/3/movie/popular?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&page=1"
    
    // const [buttonShow, setButtonShow] =useState(false);
    // const [movies,setMovies]=useState([]);
    const {stateMovies, fetchApi}=useMovies(); //using movieContext
    const [searchInput, setSearchInput]=useState("");
    const [searchResults, setSearchResults]=useState([]);
     const {isMode}=useMode();

    // const fetchApi = async()=>{
    //     try {
    //         const response=await axios.get(API_URL);
    //         const movieList =response.data.results || [];
    //         setMovies(movieList); 
    //         setButtonShow(true);  
    //     } catch (error) {
    //         console.error(error);
    //     }   
    // }
    const onSearchResults=(results)=>
      {
        setSearchResults(results);
      }

  const onHandleSearch = (value)=>{
      setSearchInput(value);
  }

  useEffect(()=>{
      if(!searchInput.trim()){
        fetchApi(API_URL);
      }
    }, [searchInput]);
  return (
    <div className='main-content'>
    <div className={isMode? 'main-home-container': 'home-dark-container'}>
      <Header/>
      <Search onHandleSearch={onHandleSearch} 
      searchInput={searchInput} 
      onSearchResults={onSearchResults}
      API_URL={API_URL} />

      {searchInput.trim() && searchResults.length > 0 ? (
        <MovieList movies={searchResults}/>
      ) : (
        <MovieList movies={stateMovies} />
      )}
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage

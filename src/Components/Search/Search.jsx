import React, { useEffect, useState } from 'react';
import './Search.css';
import axios from 'axios';
import {SearchList} from './SearchList';
import { useDebounce } from '../../Hooks/useDebounce';
import { useMode } from '../../Hooks/useMode';

const Search = ({onHandleSearch, searchInput, onSearchResults }) => {
   const [searchList, setSearchList]=useState([]);
   const API_KEY = "d3449ff6ec0c027623bf6b6f5fff78b3";
    const BASE_URL = "https://api.themoviedb.org/3";
    // const API_URL ="https://api.themoviedb.org/3?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&page=1"
    
    const debouncedValue=useDebounce(searchInput, 2000); //Accessing comp using debounce hook
    const {isMode}=useMode();
    const fetchList = async(query)=>{
      try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
            query: query,
            page: 1,
          },
        });
        setSearchList(response.data.results || []);
        onSearchResults(response.data.results);
    }
    catch(error){
      console.error(error);
    }
  }
  //Debouncing
      useEffect(()=>{
            if(debouncedValue && debouncedValue.trim()){
                fetchList(debouncedValue);
            }
            else if (!debouncedValue.trim()){
              setSearchList([]);
              onSearchResults([]);
            }  
      }, [debouncedValue]);

  return (
    <div className={isMode? 'search-light-container' : 'search-container' }>
      <input type='text' placeholder='search here....'
       onChange={(event) => onHandleSearch(event.target.value)} 
       value={searchInput}/>
    </div>

  )
}

export default Search

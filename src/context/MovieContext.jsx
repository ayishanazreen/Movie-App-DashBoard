import { createContext, useState } from "react";
import axios from "axios";
export const MovieContext=createContext();

export const MovieProvider =({children})=>{
   const [stateMovies,setStateMovies] = useState([]);
   const [buttonShow, setButtonShow] =useState(false);
   const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; 

    const fetchApi = async(API_URL)=>{
           try {
               const response=await axios.get(API_URL);
               const responseList =response.data.results || [];
               setStateMovies(responseList); 
               setButtonShow(true);  
           } catch (error) {
               console.error(error);
           }   
       }

   return (
        <MovieContext.Provider value={{stateMovies, fetchApi, setButtonShow, buttonShow, IMAGE_BASE_URL}}>
           {children}
       </MovieContext.Provider>
    );
}

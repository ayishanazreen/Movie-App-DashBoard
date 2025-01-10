import React, { createContext, useEffect, useState } from 'react'

export const AuthContext=createContext();


export const AuthProvider=({children})=>{
   const [auth, setAuth]=useState(false);
   const [buttonShow, setButtonShow] =useState(false);

   const logOut=()=>{
    localStorage.removeItem("authToken");
    setAuth(false);
   };

   const logIn=()=>{
     const token="1234";
     localStorage.setItem("authToken", token);
     setAuth(true);
     setButtonShow(false);
   };

   useEffect(()=>{
      const token=localStorage.getItem("authToken");
      if(token){
         setAuth(true);
      }
   },[]);

 return <AuthContext.Provider value={{auth, logIn, logOut}}>
    {children}
</AuthContext.Provider>
}
import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL =import.meta.env.VITE_API_URL;

 
const LoginForm = () => {
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const navigate=useNavigate();
  const[forgotPassword, setForgotPassword]=useState(false);
  const {auth,login}=useContext(AuthContext)
  

//   const onHandleSubmit=async(e)=>{
//     e.preventDefault(); 
//     try {
//       const response =await axiosInstance.post("/login", {
//         username,
//         password,
//         },
//         {
//         withCredentials: true });
//       if(response.data.accessToken){
//         localStorage.setItem("token",response.data.accessToken);
//         toast.success("Successfully logged")
//         navigate('/profile');
//       }
//       else
//       {
//         toast.error(response.data.message)
//       }
      
//     } catch (error) {
  
//      console.log(error) 
//     }
//   }

//  const handleForgotPassword =()=>
//   {
//    setForgotPassword(true);
//    navigate('/forgotPassword');
//   }

//   const handleSignUp=()=>{
//     navigate('/sign-up');
//   }


  // useEffect(()=>{
  //   logIn();
  // },[logIn])

  const handleLogin = async()=>{
    try {
      if(!username){
        toast.error("Username is required");
        return;
      }

      if(!password){
        toast.error("password is required");
        return;
      }
      const response=await axios.post(API_URL,{
        username,
        password,
      })
      //console.log(response);
    
      if(response.status===200 && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        login(response.data.accessToken);
        toast.success("successfully logged")
        navigate('/home'); 
      } 
      }
   catch (error) {
    if(error.response && ( error.response.status===400) || error.response.status===401){
      toast.error("Provide valid credentials")
    }
    else {
      toast.error("An error occurred. Please try again.");
    }
      console.log(error)
    } 
   }
    const handleSignup=()=>{
      navigate('/signup')
    }



  return (
    <>
      <div className='movie-login'> 
        <div className='login-container'>
          <div className='login-items'>
            <h1>Log In</h1>
            <input type='text' name='username' placeholder='Your Username' onChange={(event)=>setUsername(event.target.value)}/>
            <input type='text' name="password" placeholder='Password' onChange={(event)=>setPassword(event.target.value)}/>
            <button type='submit'onClick={handleLogin}>Log In</button>
            <a><p>Forgot Password? </p></a>
            <p className='signup-link' onClick={handleSignup} >New to Debug Media? Sign up now.</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default LoginForm

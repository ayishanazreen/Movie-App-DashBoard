import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Hooks/useAuth';
 
const LoginForm = () => {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const navigate=useNavigate();
  const {logIn}=useAuth();
  const[forgotPassword, setForgotPassword]=useState(false);

  const onHandleSubmit=()=>{
    if (email ==="test" && password ==="test")
    {
      logIn(); 
      navigate("/home");
    }
    // else{
    // //  console.log("invaild credentials");
    //  navigate("/");
    // }
  }

 const handleForgotPassword =()=>
  {
   setForgotPassword(true);
   navigate('/forgotPassword');
  }

  const handleSignUp=()=>{
    navigate('/sign-up');
  }

  return (
    <>
      <div className='movie-login'> 
        <div className='login-container'>
          <div className='login-items'>
            <h1>Sign In</h1>
            <input type='text' name='email' placeholder='Email or Phone Number' onChange={(event)=>setEmail(event.target.value)}/>
            <input type='text' name="passowrd" placeholder='Password' onChange={(event)=>setPassword(event.target.value)}/>
            <button type='submit' onClick={onHandleSubmit}>Sign In</button>
            <a onClick={handleForgotPassword}><p>Forgot Password? </p></a>
            <p className='signup-link' onClick={handleSignUp}>New to Debug Media? Sign up now.</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default LoginForm

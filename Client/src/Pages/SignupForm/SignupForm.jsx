import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './SignupForm.css'
import axios from 'axios';
const API_URL="http://localhost:3006/users"

export const SignupForm = () => {
    const navigate = useNavigate();
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")

 
    const handleSignup = async()=>{
      try {
        console.log(name);
      const response=await axios.post(`${API_URL}/signup`, {
        name,
        email,
        username,
        password
      });
      console.log(response);
      if(response.status===201){
        navigate("/home");
      }
      } catch (error) {
        res.status(500).json({message:"server error"})
      }

    }
    const handleBacktoLogin = () =>
      {
        navigate('/login');
      }
  return (
    <div className='sign-up-container'>
      <div className='sign-up-form'>
         <div className='sign-up-items'>
             <h1>Sign Up Now</h1>
                <label> Name</label>
                <input type='text' placeholder='Enter Your Name' value={name}   id='name' onChange={(e) => setName(e.target.value)}/>

                 <label> Email</label>
                 <input type='email' placeholder='Enter Your email' value={email} id='email' onChange={(e) => setEmail(e.target.value)}/>

                 <label> Username</label>
                 <input type='text' placeholder='Enter Your username'  value={username} id='username' onChange={(e) => setUsername(e.target.value)}/>

                 <label> Password</label>
                 <input type='text' placeholder='Enter New Password' value={password}  id='password' onChange={(e) => setPassword(e.target.value)}/>
      

                 <button className='sign-up-btn' onClick={handleSignup}>Sign Up</button>
                 <a onClick={handleBacktoLogin} className='back-login-link'><p >Back to Login</p></a>
             </div>
        </div>
    </div>
  )
}

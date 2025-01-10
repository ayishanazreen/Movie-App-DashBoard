import React from 'react'
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css'

export const SignUpForm = () => {
    const navigate=useNavigate();
    const handleBacktoLogin=()=>{
        navigate('/');
       }
  return (
    <div className='sign-up-container'>
      <div className='sign-up-form'>
         <div className='sign-up-items'>
             <h1>Sign Up Now</h1>
             <label> Name</label>
                <input type='text' placeholder='Enter Your name' />

                 <label> Email</label>
                 <input type='email' placeholder='Enter Your Email' />

                 <label> Password</label>
                 <input type='text' placeholder='Enter New Password'/>
      
                 <label> Confirm Password</label>
                 <input type='text' placeholder='Enter Password Again'/>
                 <button className='sign-up-btn'>Sign Up</button>
                 <a onClick={handleBacktoLogin} className='back-login-link'><p >Back to Login</p></a>
              </div>
            </div>
    </div>
  )
}

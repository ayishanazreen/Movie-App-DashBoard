import React, { useContext } from 'react';
import './ForgotPassword.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {  useNavigate } from 'react-router-dom';
import { useMode } from '../../Hooks/useMode';

const ForgotPassword = () => {
    const navigate=useNavigate();
    const {isMode}=useMode();

   const handleBacktoLogin=()=>{
    navigate('/');
   }
  return (
    <>
        <div className={isMode? 'forgotPassword-light-container': 'forgotPassword-container'}>
        <Header/>
            <div className='forgot-form'>
              <div className='forgot-items'>
                <div className='forgot-input-div'>
                <h1>Reset Your Password</h1>
                 <label> Email</label>
                 <input type='email' placeholder='Enter Your Email' />

                 <label> New Password</label>
                 <input type='text' placeholder='Enter New Passowrd'/>
      
                 <label> Confirm Password</label>
                 <input type='text' placeholder='Enter Password Again'/>
                 <button className='forgot-password-btn'>Change Password</button>
                 <a onClick={handleBacktoLogin}><p className='back-login-link'>Back to Login</p></a>
                 </div> 
              </div>
            </div>
            <Footer/>
        </div>
        
        
    </>
  )
}

export default ForgotPassword;

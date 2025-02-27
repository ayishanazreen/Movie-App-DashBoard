import React, { useState } from 'react';
const API_URL =import.meta.env.VITE_API_URL;
import axios from 'axios';
import './ResetPassword.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
const ResetPassword = () => {
    const [resetCode, setResetCode]=useState("")
    const [newPassword, setNewPassword] =useState("");
    const [matchPassword, setMatchPassword]=useState(true);
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
     try {
        if(newPassword && matchPassword && resetCode) {
            const response= await axios.post(`${API_URL}/reset-password`, {
                data:{
                    resetPassword: newPassword,
                    resetCode
                }
            });
            toast.success("Password reset successful", {autoClose:3000});
            navigate("/login");
        }
        else{
            toast.error("Password do not match", {autoClose:3000})
        }
     } catch (error) {
        toast(error.response.data.message, {autoClose:3000})
     }
    }

    const handleMatching =(e)=>{
        const value=e.target.value;
        if(newPassword !== value)
            setMatchPassword(false)
        else
           setMatchPassword(true)
} 
  return (
    <>
       <Header/> 
       <div className='reset-div'>
        <div className='reset-form'>
        <h1>Reset Your Password</h1>
            <div className='reset-fields'>
            <form>
              <label>Verification code</label>
              <input type='text' onChange={(e)=> setResetCode(e.target.value)} autoComplete="username" />

              <label>New Password</label>
              <input type='password' onChange={(e)=> setNewPassword(e.target.value)} autoComplete="new-password"/>

              <label>Confirm Password</label>
              <input type='password' onChange={(e) => handleMatching(e)} autoComplete="new-password" />
              {!matchPassword && <p style={{ color: "red" }}>Passwords do not match!</p>}
              <button onClick={handleSubmit}>Reset Password</button>
            </form>
            </div>

        </div>

       </div>
    </>
  )
}

export default ResetPassword

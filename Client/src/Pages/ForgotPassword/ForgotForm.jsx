import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './ForgotForm.css'
import { toast } from 'react-toastify'
import axios from 'axios';
const API_URL =import.meta.env.VITE_API_URL;
const ForgotForm = () => {
    const navigate=useNavigate();
    const [email, setEmail]=useState("")

    const handleInputChange =(e)=>{
        setEmail(e.target.value)
    }

    const handleSubmitBtn=async()=>{
        if(!email){
           toast.dismiss();
           toast.error("Email is required", {autoClose:3000});
            return;
        }

        try {
            const response= await axios.post(`${API_URL}/forgot-password`, {
             data: {email}
         });
         console.log(response);
         if(response.status===200){
          toast.dismiss();
            toast.success(
                "Your reset code has been sent successfully, Plese check your inbox", {autoClose:3000});
              navigate('/reset-password')
         }
         else{
          toast.dismiss();
          toast.error(response.data.message,  {autoClose:3000});
         }
    
            
        } catch (error) {
          if (error.response) {
            console.log(error.response); 
            toast.dismiss();
            toast.error(error.response.data.message , {autoClose:3000}); // Show error message from response
        } else {
            console.log("An unexpected error occurred:", error);
            toast.dismiss();
            toast.error("An unexpected error occurred, please try again later." , {autoClose:3000});
        }
            
        }
    }
    return (
        <>
          <div className='forgot-div'> 
            <div className='forgot-form'>
                   <h1>Forgot Password</h1>
              <div className='forgot-items'>
                <div className='email-section'>
                <label htmlFor='email'>Email</label>
                <input type='text' name='email' placeholder='Your Email' id="email" onChange={handleInputChange}/>
                <button type='submit' className='check-email-btn' onClick={handleSubmitBtn}>Check Email</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
export default ForgotForm

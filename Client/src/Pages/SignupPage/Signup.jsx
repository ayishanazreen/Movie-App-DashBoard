import React from 'react';
import { SignupForm } from '../SignupForm/SignupForm';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Signup.css'

const Signup = () => {
  return (
    <div>
       <div className="signup-page-div">
        <Header/>
        <SignupForm/>
        </div>
    </div>
  )
}

export default Signup


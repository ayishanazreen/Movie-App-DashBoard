import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './SignUp.css';
import {SignUpForm} from './SignUpForm';
import { useMode } from '../../Hooks/useMode';

const SignUp = () => {
   
    const {isMode}=useMode();

  return (
    <>
        <div className={isMode? 'sign-up-light-page-container' : 'sign-up-page-container'}>
        <Header/>
        <SignUpForm/>
        <Footer/>
        </div>
       
        
    </>
  )
}

export default SignUp

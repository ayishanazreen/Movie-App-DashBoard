import React from 'react';
import './LoginPage.css';
import LoginForm from './LoginForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { useMode } from '../../Hooks/useMode';

const LoginPage = () => {
  const {auth}=useAuth();
  const {isMode}=useMode();
  const token=localStorage.getItem("authToken");
  if(auth||token){
    return <Navigate to='/home'/>
  }
  return (
    <div className={isMode? 'dark-container' :'main-container'}>
      <Header/>
      <LoginForm/>
      <Footer/>
   </div>
  )
}

export default LoginPage

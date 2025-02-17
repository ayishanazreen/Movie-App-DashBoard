import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoginForm from './LoginForm';
import './Login.css'

const Login = () => {
  return (
    <>
       <div className="login-page-div">
        <Header/>
        <LoginForm/>
        </div>
    </>
  )
}

export default Login

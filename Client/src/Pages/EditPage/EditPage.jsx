import React from 'react';
import './EditPage.css'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBarWrapper from '../../components/Sidebar/SideBarWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditForm from './EditForm/EditForm';

const EditPage = () => {

  return (
    <>
   
    <div className="edit-container"> 
      <SideBarWrapper>
        <Header/>
        <EditForm/>
        <ToastContainer position="top-center" autoClose={3000}/>
        <Footer/>
       </SideBarWrapper>
    </div>

    </>
  )
}

export default EditPage

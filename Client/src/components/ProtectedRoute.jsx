import React, { useContext, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({allowedRoles}) => {
    const {auth}=useContext(AuthContext);
    const role=localStorage.getItem("role");

    if(!auth){
        return <Navigate to="/"/>
    }

    if(allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/home" replace />;
    }
    
        return <Outlet/>

}

export default ProtectedRoute

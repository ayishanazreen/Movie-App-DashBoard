import React, { useContext, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = () => {
    const {auth}=useContext(AuthContext)

    if(!auth){
        return <Navigate to="/"/>
    }
    else
        return <Outlet/>

}

export default ProtectedRoute

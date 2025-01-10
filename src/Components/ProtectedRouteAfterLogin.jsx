import React from 'react'

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const ProtectedRouteAfterLogin = () => {
    const {auth}=useAuth();
    if(auth){
        return <Navigate to='/home'/>
    }
    return <Outlet/>
}

export default ProtectedRouteAfterLogin;

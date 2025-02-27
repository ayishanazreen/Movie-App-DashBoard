import React, {useContext} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRouteAfterLogin = () => {
        const {auth}=useContext(AuthContext);
        const location=useLocation();
        console.log("ProtectedRouteAfterLogin - auth:", auth);
        if(auth===true) 
        {
         return <Navigate to='/home' state={{ from: location }}  replace/>
        }
         else
         {
         return <Outlet/>
        }
}

export default ProtectedRouteAfterLogin;

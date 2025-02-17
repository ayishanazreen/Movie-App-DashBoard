import React, {useContext} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRouteAfterLogin = () => {
        const {auth}=useContext(AuthContext);

        if(auth) 
         {
          return <Navigate to='/home' replace/>
        }
        else 
        {
        return <Outlet/>
        }
 
}

export default ProtectedRouteAfterLogin;

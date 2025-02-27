
import './App.css'
import EditPage from './Pages/EditPage/EditPage';
import GenrePage from './Pages/GenrePage/GenrePage';
import HomePage from './Pages/HomePage/HomePage';
import MoviePage from './Pages/MoviePage/MoviePage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Pages/SignupPage/Signup';
import Login from './Pages/LoginPage/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteAfterLogin from './components/ProtectedRouteAfterLogin';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { WatchLaterProvider } from './context/WatchLaterContext';
import Watchlater from './Pages/WatchLaterPage/WatchLater';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ForgotPassword/ResetPassword';

function App() {
 

  return (
  <BrowserRouter>
  <AuthProvider>
  <WatchLaterProvider>
    <Routes>

    <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path='' element={<ProtectedRoute allowedRoles={["user", "admin"]}/>}>
          <Route path='/home' element={<HomePage/>}></Route>
          <Route path='/genre' element={<GenrePage/>}></Route>
          <Route path='/watch-later' element={<Watchlater/>}></Route>
      </Route>


      <Route path='' element={<ProtectedRoute allowedRoles={["admin"]}/>}>
         <Route path='/edit/:id' element={<EditPage/>}></Route>
         <Route path='/movies' element={<MoviePage/>}></Route>
      </Route>
   
      <Route path='' element={<ProtectedRouteAfterLogin/>}>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
          <Route path='/reset-password' element={<ResetPassword/>}></Route>
      </Route>
    </Routes>
    </WatchLaterProvider>
    </AuthProvider>
    <ToastContainer position="top-right" />
  </BrowserRouter> 
  )
}

export default App

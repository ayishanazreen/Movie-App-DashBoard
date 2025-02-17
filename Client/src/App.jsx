
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
import Watchlater from './Pages/WatchLaterPage/Watchlater';

function App() {
 

  return (
  <BrowserRouter>
  <AuthProvider>
  <WatchLaterProvider>
    <Routes>

    <Route path="/" element={<Navigate to="/login" replace />} />



      <Route path='' element={<ProtectedRoute/>}>
          <Route path='/home' element={<HomePage/>}></Route>
          <Route path='/movies' element={<MoviePage/>}></Route>
          <Route path='/genre' element={<GenrePage/>}></Route>
          <Route path='/edit/:id' element={<EditPage/>}></Route>
          <Route path='/watch-later' element={<Watchlater/>}></Route>

      </Route>

         
          
      <Route path='' element={<ProtectedRouteAfterLogin/>}>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
      </Route>


    

    </Routes>
    </WatchLaterProvider>
    </AuthProvider>
    <ToastContainer position="top-right" autoClose={3000}/>
  </BrowserRouter>
    
  )
}

export default App

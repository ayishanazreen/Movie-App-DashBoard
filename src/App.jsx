import './App.css';
import HomePage from './Components/HomePage/HomePage';
import LoginPage from './Components/LoginPage/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { MovieProvider } from './context/MovieContext';
import { ModeProvider } from './context/ModeContext';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import SignUp from './Components/SignUp/SignUp';
import ProtectedRouteAfterLogin from './Components/ProtectedRouteAfterLogin';

function App() {
  return (
    
    <BrowserRouter>
    <AuthProvider>
    <MovieProvider>
    <ModeProvider>
    <Routes>

      <Route path="" element={<ProtectedRouteAfterLogin/>}>
        <Route path="/" element={<LoginPage/>}></Route>
      </Route>

      <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
      <Route path="/sign-up" element={<SignUp/>}></Route>
         
      <Route element={<ProtectedRoute/>}>
        <Route path="/home" element={<HomePage/>}></Route>
      </Route>

    </Routes>
    </ModeProvider>
    </MovieProvider>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App

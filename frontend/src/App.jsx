
import './App.css'
import NavBar from "./components/NavBar"
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SettingPage from './pages/SettingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {Toaster} from "react-hot-toast"

function App() {

  const {authUser,checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser);

  if(isCheckingAuth && !authUser ) return (
    <>
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    </>
  )

  return (
      <div>
        <NavBar/> 
      <Routes>
        <Route path="/" element = {authUser? <HomePage/>: <Navigate to="/login"/>} />
        <Route path="/signup" element = {!authUser? <SignupPage/>: <Navigate to="/"/>} />
        <Route path="/login" element = {<LoginPage/>} />
        <Route path="/profile" element = {authUser? <ProfilePage/>: <Navigate to="/login"/>} />
        <Route path="/setting" element = {<SettingPage/>} />
      </Routes>
      <Toaster/>
      </div>
  )
}

export default App

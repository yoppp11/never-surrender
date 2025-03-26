import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './index.css'
import CreateAppointment from './pages/CreateAppointment.jsx'
import DoctorDetail from './pages/DoctorDetail.jsx'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function PrivateRoute({children}){
  const token = localStorage.getItem('access_token')
  return token ? children : <Navigate to='/login'/>
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/doctors/:doctorId' element={<DoctorDetail/>}/>
      <Route path='/appointments/:doctorId' element={<CreateAppointment/>}/>
    </Routes>
  </BrowserRouter>

  // <StrictMode>
  //   <App />
  // </StrictMode>,
)

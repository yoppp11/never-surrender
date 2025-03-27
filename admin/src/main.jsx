import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Login from './pages/Login.jsx'
import AppointmentsPage from './pages/AppointmentsPage.jsx'
import ChatRoom from './components/ChatRoom.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes >
      <Route path='/' element={<AppointmentsPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/chats/:appointmentId' element={<ChatRoom/>}/>
    </Routes>
  </BrowserRouter>
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)

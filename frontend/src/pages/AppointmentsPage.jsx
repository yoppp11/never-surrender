import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Navbar from "../components/Navbar"
import http from "../helpers/http"
import './styles/AppointmentsPage.css'

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(()=> {
        async function fetchAppointments(){
            try {
                const token = localStorage.getItem('access_token')
                if (!token) {
                    navigate('/login')
                    return
                }


                const response = await http({
                    method: 'GET',
                    url: '/appointments',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAppointments(response.data)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }

        fetchAppointments()
    }, [navigate])

    async function handlePayment(appointmentId){
        try {
            const token = localStorage.getItem('access_token')
            if (!token) {
                navigate('/login')
                return
            }

            const response = await http({
                method: 'PATCH',
                url: `/appointments/${appointmentId}/`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response)
            setAppointments(prev => prev.filter(app => app.id !== appointmentId))
        } catch (error) {
            console.log(error)
        }
    }

    function formatDate(dateString){
        return dayjs(dateString).format('dddd, D MMMM YYYY')
    }

    if (isLoading) {
        return (
          <div className="appointments-container">
            <Navbar />
            <div className="loading">Memuat daftar appointment...</div>
          </div>
        );
      }
    
    return (
        <>
            <div className="appointments-container">
      <Navbar />
      
      <div className="appointments-content">
        <h1>Daftar Appointment Saya</h1>
        
        {appointments.length === 0 ? (
          <div className="empty-appointments">
            <p>Anda belum memiliki appointment</p>
            <button 
              onClick={() => navigate('/')}
              className="find-doctor-button"
            >
              Cari Dokter
            </button>
          </div>
        ) : (
          <div className="appointments-list">
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <h3 className="doctor-name">{appointment.Doctor.name}</h3>
                  <span className="specialization">{appointment.Doctor.specialization}</span>
                </div>
                
                <div className="appointment-details">
                  <div className="detail-item">
                    <span className="detail-label">Tanggal:</span>
                    <span className="detail-value">{formatDate(appointment.date)}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Waktu:</span>
                    <span className="detail-value">{appointment.time}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Keluhan:</span>
                    <span className="detail-value">{appointment.symptoms}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status ${appointment.status}`}>
                      {appointment.status === 'pending_payment' ? 'Menunggu Pembayaran' : 'Selesai'}
                    </span>
                  </div>
                
                </div>
                {appointment.status === 'pending_payment' && (
                  <button 
                    onClick={() => handlePayment(appointment.id)}
                    className="payment-button"
                  >
                    Bayar Sekarang
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
        </>
    )
}
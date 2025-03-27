import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Button from "../components/Button"
import Navbar from "../components/Navbar"
import http from "../helpers/http"
import './styles/AppointmentsPage.css'
import Swal from "sweetalert2"

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

            console.log('klik1');
            
            await http({
                method: 'PATCH',
                url: `/appointments/${appointmentId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('klik2');

            console.log(response)
            setAppointments(prev => prev.filter(app => app.id !== appointmentId))
            // navigate('/appointments')
        } catch (error) {
            setError('Gagal melakukan pembayaran');
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

      if (error) {
        return (
          <div className="appointments-container">
            <Navbar />
            <div className="error-message">{error}</div>
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
            {appointments.map(el => (
              <div key={el.id} className="appointment-card">
                <div className="appointment-header">
                  <h3 className="doctor-name">{el.Doctor.name}</h3>
                  <span className="specialization">{el.Doctor.specialization}</span>
                </div>
                
                <div className="appointment-details">
                  <div className="detail-item">
                    <span className="detail-label">Tanggal:</span>
                    <span className="detail-value">{formatDate(el.date)}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Waktu:</span>
                    <span className="detail-value">{el.time}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Keluhan:</span>
                    <span className="detail-value">{el.symptoms}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status ${el.status}`}>
                      {el.status === 'pending_payment' ? 'Menunggu Pembayaran' : 'Selesai'}
                    </span>
                  </div>
                
                </div>
                {el.status === 'pending_payment' && (
                  <Button
                    onClick={async (e) => {
                        try {
                            const token = localStorage.getItem('access_token')
                            if (!token) {
                                navigate('/login')
                                return
                            }
                
                            console.log('klik1');
                            console.log(el.id);
                            
                            const response = await http({
                                method: 'PATCH',
                                url: `/appointments/${el.id}`,
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                            console.log('klik2');
                
                            console.log(response)
                            setAppointments(prev => prev.filter(app => app.id !== el.id))
                            Swal.fire({
                                icon: 'success',
                                title: 'Pembayaran Berhasil',
                                text: 'Pembayaran Anda Berhasil',
                              })
                            // navigate('/appointments')
                        } catch (error) {
                            setError('Gagal melakukan pembayaran');
                            console.log(error)
                        }
                    }
                    }
                    className="payment-button"
                  >
                    Bayar Sekarang
                  </Button>
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
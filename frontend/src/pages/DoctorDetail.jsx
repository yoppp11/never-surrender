import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import '../App.css'
import Button from "../components/Button"
import Navbar from "../components/Navbar"
import http from "../helpers/http"

export default function DoctorDetail(){
    const {doctorId} = useParams()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null) 

    useEffect(()=> {
        async function fetchDoctorDetails(){
            try {
                const token = localStorage.getItem('access_token')
                if(!token){
                    navigate('/login')
                    return
                }

                const response = await http({
                    method: 'GET',
                    url: `/doctors/${doctorId}`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                })
                setDoctor(response.data)
                console.log(doctor.schedule["sabtu"])
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }

        fetchDoctorDetails()
    }, [doctorId, navigate])

    if(isLoading){
        return (
            <div className="doctor-detail-container">
                <Navbar />
                <div className="loading">Memuat data dokter...</div>
            </div>
        )
    }

    return (
        <>
            <div className="doctor-detail-container">
                <Navbar />

                <div className="doctor-detail-content">
                    <div className="doctor-profile">
                        <div className="doctor-image">
                            <img src={doctor.photoUrl} alt={doctor.name} />
                        </div>

                        <div className="doctor-info">
                            <h1 className="doctor-name">{doctor.name}</h1>
                            <p className="doctor-specialization">{doctor.specialization}</p>

                            <div className="doctor-meta">
                                <div className="meta-item">
                                    <span className="meta-label">Rating</span>
                                    <span className="meta-value">5</span>
                                </div>

                                <div className="meta-item">
                                    <span className="meta-label">Pengalaman</span>
                                    <span className="meta-value">5 tahun</span>
                                </div>

                                <Button className="consultation-button" onClick={()=> {
                                    navigate(`/appointments/${doctorId}`)
                                }}>
                                    Mulai Konsultasi
                                </Button>
                            </div>
                        </div>

                        <div className="doctor-details">
                            <div className="detail-section">
                                <h2 className="section-title">Tentang Dokter</h2>
                                <p className="section-content">
                                    {doctor.bio}
                                </p>
                            </div>

                            <div className="detail-section">
                                <h2 className="section-title">Jadwal Praktik</h2>
                                <div className="schedule-container">
                                    {
                                        Object.keys(doctor.schedule).map((el, ind) => {
                                            const time = doctor.schedule[el] + ' '
                                            return (
                                            <div key={ind} className="schedule-item">
                                                <span className="schedule-day">{el}</span>
                                                <span className="schedule-time">{time}</span>
                                            </div>
                                            )
                                        })
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
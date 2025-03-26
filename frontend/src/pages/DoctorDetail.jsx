import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
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
            } catch (error) {
                console.log(error);
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
                                    {doctor.schedule?.length > 0 ? (
                                        doctor.schedule.map((el, ind) => (
                                            <div key={ind} className="schedule-item">
                                                <span className="schedule-day">{Object.keys(el)}</span>
                                                <span className="schedule-time">{Object.values(el)}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="schedule-item">
                                                <span className="schedule-day">Senin - Jumat</span>
                                                <span className="schedule-time">08:00 - 16:00</span>
                                            </div>
                                        </>
                                    )
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
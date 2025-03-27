import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import http from "../helpers/http";
import Chats from "./Chats";
import Navbar from "./Navbar";

export default function ChatRoom(){
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointment = async () => {
        try {
            const response = await http({
                method: 'GET',
                url: `/appointments/${appointmentId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const data = response.data
            
            if (!data) {
            navigate('/appointments');
            return;
            }
            
            setAppointment(data);
        } catch (error) {
            console.error("Error fetching appointment:", error);
            navigate('/appointments');
        } finally {
            setLoading(false);
        }
        };

        fetchAppointment();
    }, [appointmentId, navigate]);

    if (loading) {
        return (
        <div className="chatroom-container">
            <Navbar />
            <div className="loading">Memuat data konsultasi...</div>
        </div>
        );
    }

    if (!appointment) {
        return (
        <div className="chatroom-container">
            <Navbar />
            <div className="not-found">Data konsultasi tidak ditemukan</div>
        </div>
        );
    }
    return (
        <div className="chatroom-container">
            <Navbar />
            
            <div className="chatroom-content">
                <div className="appointment-info">
                <h2>Konsultasi dengan {appointment.Doctor.name}</h2>
                <p>Spesialis: {appointment.Doctor.specialization}</p>
                <p>Tanggal: {new Date(appointment.date).toLocaleDateString('id-ID')}</p>
                <p>Waktu: {appointment.time}</p>
                <p>Keluhan: {appointment.symptoms}</p>
                </div>
                
                <Chats
                appointmentId={appointmentId}
                patientId={appointment.patientId}
                doctorId={appointment.Doctor.id}
                />
            </div>
        </div>
    )
}
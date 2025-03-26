import dayjs from 'dayjs';
// import 'dayjs/locale/id';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import '../App.css';
import http from '../helpers/http';
import Navbar from '../components/Navbar';

dayjs.locale('id')

export default function CreateAppointment(){
    const {doctorId} = useParams()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        day: '',
        date: '',
        time: '',
        symptoms: ''
    })
    const [avaibleDates, setAvaibleDates] = useState([])
    const [avaibleTimes, setAvaibleTimes] = useState([])

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
            } finally {
                setIsLoading(false)
            }
        }

        fetchDoctorDetails()
    }, [doctorId, navigate])

    useEffect(()=> {
        if(formData.day){
            const dates = []
            const daysMap = {
                'minggu': 0,
                'senin': 1,
                'selasa': 2,
                'rabu': 3,
                'kamis': 4,
                'jumat': 5,
                'sabtu': 6
            }

            const targetDay = daysMap[formData.day.toLowerCase()]
            const today = dayjs()

            for(let i = 0; i < 28; i++){
                const date = today.add(i, 'day')
                if(date.day() === targetDay){
                    dates.push(date.format('YYYY-MM-DD'))
                }
            }

            setAvaibleDates(dates)
            setFormData(prev => ({...prev, date: '', time: ''}))

        }
    }, [formData.day])

    useEffect(()=> {
        if(formData.day && doctor?.schedule){
            const times = doctor.schedule[formData.day] || []
            setAvaibleTimes(times)
            setFormData(prev => ({...prev, time: ''}))
        }
    }, [formData.day, doctor])

    function handleChange(e){
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e){
        e.preventDefault()

        try {
            const token = localStorage.getItem('access_token')
            if(!token){
                navigate('/login')
                return
            }

            await http({
                method: 'POST',
                url: `/appointments/${doctorId}`,
                data: {
                    doctorId,
                    date: formData.date,
                    time: formData.time,
                    symptoms: formData.symptoms
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return (
          <div className="appointment-container">
            <Navbar />
            <div className="loading">Memuat data dokter...</div>
          </div>
        );
      }

    return (
        <div className="appointment-container">
            <Navbar />
            
            <div className="appointment-content">
                <h1>Buat Janji dengan {doctor.name}</h1>
                <p className="doctor-specialty">{doctor.specialization}</p>
                
                <form onSubmit={handleSubmit} className="appointment-form">
                {error && <div className="form-error">{error}</div>}
                
                <div className="form-group">
                    <label htmlFor="day">Hari Praktik</label>
                    <select
                    id="day"
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Pilih Hari</option>
                    {doctor.schedule && Object.keys(doctor.schedule).map(day => (
                        <option key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                        </option>
                    ))}
                    </select>
                </div>
                
                {formData.day && (
                    <div className="form-group">
                    <label htmlFor="date">Tanggal</label>
                    <select
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Pilih Tanggal</option>
                        {avaibleDates.map(date => (
                        <option key={date} value={date}>
                            {dayjs(date).format('dddd, D MMMM YYYY')}
                        </option>
                        ))}
                    </select>
                    </div>
                )}
                
                {formData.day && formData.date && (
                    <div className="form-group">
                    <label htmlFor="time">Waktu</label>
                    <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Pilih Waktu</option>
                        {avaibleTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="symptoms">Keluhan</label>
                    <textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    placeholder="Deskripsikan keluhan Anda"
                    required
                    />
                </div>
                
                <button type="submit" className="submit-button">
                    Buat Janji
                </button>
                </form>
            </div>
        </div>
    )
}
import './styles/DoctorCard.css'

export default function DoctorCard({doctor}){
    return (
        <div className="doctor-card">
            <div className="doctor-image">
                <img src={doctor.photoUrl || 'https://via.placeholder.com/150'} alt={doctor.name} />
            </div>
            <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialization">{doctor.specialization}</p>
                <div className="doctor-meta">
                <span className="doctor-rating">⭐ {doctor.rating || '5.0'}</span>
                <span className="doctor-experience">{doctor.experience || '5'} tahun pengalaman</span>
                </div>
                {/* <p className="doctor-hospital">{doctor.hospital || 'Rumah Sakit Umum'}</p> */}
                <button className="doctor-button">Buat Janji</button>
            </div>
        </div>
    )
}
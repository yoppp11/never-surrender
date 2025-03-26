import { Link } from 'react-router';
import './styles/DoctorCard.css';

export default function DoctorCard({doctor}){
    const nf = new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        style: 'currency'
    })

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
                <span className="doctor-fee">{nf.format(doctor.fee) || 'Rp 50.000'}</span>
                </div>
                {/* <p className="doctor-hospital">{doctor.hospital || 'Rumah Sakit Umum'}</p> */}
                <Link to={`/${doctor.id}`} className="doctor-button">Lihat Detail</Link>
            </div>
        </div>
    )
}
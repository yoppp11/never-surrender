import { useNavigate } from "react-router";
import './styles/Navbar.css';

export default function Navbar(){
    const navigate = useNavigate()

    function handleLogout(){
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-brand">MediCare</h1>
                <div className="navbar-menu">
                <button className="navbar-button" onClick={() => navigate('/')}>Home</button>
                <button className="navbar-button" onClick={() => navigate('/appointments')}>Appointments</button>
                <button className="navbar-button" onClick={() => navigate('/profile')}>Profile</button>
                <button className="navbar-button logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}
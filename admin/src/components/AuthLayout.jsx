import gifVector from '../assets/Telemedicina.gif';
import Logo from "./Logo";
import './styles/AuthLayout.css';

export default function AuthLayout({children}){
    return (
        <div className="auth-container">
            <div className="auth-left-panel">
                <div>
                <h2 className="left-panel-title">Selamat Datang</h2>
                <img src={gifVector} alt="gif" height={500}/>
                <p className="left-panel-description">
                    Kami menyediakan layanan kesehatan terbaik untuk Anda dan keluarga.
                    Bergabunglah dengan kami untuk pengalaman kesehatan yang lebih baik.
                </p>
                </div>
            </div>
            <div className="auth-right-panel">
                <div className="auth-form-container">
                <Logo />
                {children}
                </div>
            </div>
        </div>
    )
}
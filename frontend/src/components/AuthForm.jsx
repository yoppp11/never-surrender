import { Link } from "react-router";
import Button from "./Button";
import InputField from "./InputField";
import './styles/AuthForm.css';

export default function AuthForm(props){
    const {
        formData = {},
        errors = {},
        handleChange,
        handleSubmit,
        isLogin,
        isLoading,
        switchAuthMode,
      } = props;

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
                <InputField
                label="Nama Lengkap"
                type="text"
                placeholder="Masukkan nama lengkap"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                error={errors.name}
                />
            )}

            <InputField
                label="Email"
                type="email"
                placeholder="Masukkan email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <InputField
                label="Password"
                type="password"
                placeholder="Masukkan password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />

            {!isLogin && (
                <InputField
                label="Phone"
                type="number"
                placeholder="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                error={errors.phone}
                />
            )}

            {isLogin && (
                <div className="forgot-password-link">
                <Link >Lupa password?</Link>
                </div>
            )}

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Memproses...' : isLogin ? 'Masuk' : 'Daftar'}
            </Button>

            <div className="auth-divider">
                <span>atau</span>
            </div>

            <Button className="button-google">
                {isLogin ? 'Masuk dengan Google' : 'Daftar dengan Google'}
            </Button>

            <p className="auth-switch-text">
                {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                <Link onClick={switchAuthMode}>
                {isLogin ? 'Daftar sekarang' : 'Masuk sekarang'}
                </Link>
            </p>
        </form>
    )
}
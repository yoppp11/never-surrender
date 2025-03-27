import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import http from "../helpers/http";
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
        switchAuthMode
      } = props;

      const navigate = useNavigate();

      async function handleCredentialResponse(response){
        console.log(response.credential);
        try {
            const result = await http({
                method: 'POST',
                url: '/google',
                data: {
                    googleToken: response.credential
                }
            })

            Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Login successfully",
                showConfirmButton: false,
                timer: 1500
              });

            console.log(result);

            localStorage.setItem('access_token', result.data.access_token)

            navigate('/')
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                icon: 'error'
            })
        }
      }

    useEffect(()=> {
        google.accounts.id.initialize({
            client_id: "106969522313-er8dglrbm7is6o8k9lad92fgmnkakcsm.apps.googleusercontent.com",
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("google-btn"),
            { theme: "outline", size: "medium"}  // customization attributes
          );
          google.accounts.id.prompt()
    }, [])

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

            {isLogin && (
                <>
                    <div className="auth-divider">
                        <span>atau</span>
                    </div>

                    <Button className="button-google" id="google-btn">
                        {'Masuk dengan Google'}
                    </Button>
                </>

            )}


            <p className="auth-switch-text">
                {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                <Link onClick={switchAuthMode}>
                {isLogin ? 'Daftar sekarang' : 'Masuk sekarang'}
                </Link>
            </p>
        </form>
    )
}
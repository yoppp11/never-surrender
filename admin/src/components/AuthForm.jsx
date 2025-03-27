import { useNavigate } from "react-router";
import Button from "./Button";
import InputField from "./InputField";
import './styles/AuthForm.css';

export default function AuthForm(props){
    const {
        name,
        // formData = {},
        errors = {},
        handleChange,
        handleSubmit,
        isLogin,
        isLoading
      } = props;

      const navigate = useNavigate();

    return (
        <form className="auth-form" onSubmit={handleSubmit}>

            <InputField
                label="Secret Code"
                type="password"
                placeholder="Masukkan kode rahasia"
                name="name"
                value={name}
                onChange={handleChange}
                error={errors.nama}
            />

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Memproses...' : isLogin ? 'Masuk' : 'Daftar'}
            </Button>
        </form>
    )
}
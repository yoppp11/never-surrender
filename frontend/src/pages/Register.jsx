import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import '../App.css';
import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";
import http from "../helpers/http";

export default function Register(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
      });
      const [errors, setErrors] = useState({});
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate();
    
      function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    async function handleSubmit(e){
        e.preventDefault()

        try {
            const response = await http({
                method: 'POST',
                url: '/register',
                data: {
                    name: formData.name, 
                    email: formData.email, 
                    phone: formData.phone, 
                    password: formData.password
                }
            })

            Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Register successfully",
                showConfirmButton: false,
                timer: 1500
              });

            console.log(response);
            navigate('/login')
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error'
            })
        }
    }

    const switchToLogin = (e) => {
        e.preventDefault();
        navigate('/login');
      };

    return (
        <AuthLayout>
            <AuthForm
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLogin={false}
                isLoading={isLoading}
                switchAuthMode={switchToLogin}
            />
        </AuthLayout>
    )
}
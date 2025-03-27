import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import '../App.css';
import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";
import http from "../helpers/http";

export default function Login(){
    const [formData, setFormData] = useState({
        nama: '',
      });
      const [name, setName] = useState('');
      const [errors, setErrors] = useState({});
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate();
    
      function handleChange (e){
        //   const { name, value } = e.target;
        //   console.log(value);
        // setFormData({
        //   ...formData,
        //   [name]: value,
        // });
        setName(e.target.value)
      };

    async function handleSubmit(e){
        e.preventDefault()

        try {
            const response = await http({
                method: 'POST',
                url: '/admin',
                data: {
                    name
                }
            })

            Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Login successfully",
                showConfirmButton: false,
                timer: 1500
              });

            console.log(response);

            localStorage.setItem('access_token', response.data.access_token)

            navigate('/')
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error'
            })
        }
    }

    

    return (
        <AuthLayout>
            <AuthForm
                formData={formData}
                name={name}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLogin={true}
                isLoading={isLoading}
            />
        </AuthLayout>
    )
}
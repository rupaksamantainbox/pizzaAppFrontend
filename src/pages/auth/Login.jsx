import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/AuthSlice';
import LoginPresentation from './LoginPresentation';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    function handleUserInput(e) {
        const {name, value} = e.target;
        setLoginData({
         ...loginData,
         [name]: value
        })
    }

    async function handleFormSubmit(e){
        e.preventDefault()
        console.log(loginData)
         // Add validations for the form input
         if(!loginData.email || !loginData.password) {
            toast.error("Missing values from the form")
            return;
        }

        // check email
        if(!loginData.email.includes('@') || !loginData.email.includes('.')) {
            toast.error("Invalid email address")
            return;
        }

        const apiReponse = await dispatch(login(loginData));
        
        if(apiReponse.payload.data.success){
            navigate('/');
        }
    }


  return (
    <LoginPresentation handleFormSubmit={handleFormSubmit} handleUserInput={handleUserInput}></LoginPresentation>
  )
}

export default Login
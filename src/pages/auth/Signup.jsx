import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom'
import SignupPresentation from './SignupPresentation';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signUpState, setSignUpState] = useState({
        firstName: '',
        email: '',
        mobileNumber: '',
        password: ''
    })

    function handleUserInput(e) {
        const {name, value} = e.target;
        setSignUpState({
         ...signUpState,
         [name]: value
        })
    }

    async function handleFormSubmit(e){
        e.preventDefault()

         // Add validations for the form input
         if(!signUpState.email || !signUpState.mobileNumber || !signUpState.password || !signUpState.firstName) {
            toast.error("Missing values from the form")
            return;
        }

        if(signUpState.firstName.length < 5 || signUpState.firstName.length > 20) {
            toast.error("First name should be atleast 5 characters long and maximum 20 characters long")
            return;
        }

        // check email
        if(!signUpState.email.includes('@') || !signUpState.email.includes('.')) {
            toast.error("Invalid email address")
            return;
        }

        // check mobile number length to be between 10-12
        if(signUpState.mobileNumber.length < 10 || signUpState.mobileNumber.length > 12) {
            toast.error("Mobile number should be between 10-12 characters")
            return;
        }

        const apiReponse = await dispatch(createAccount(signUpState));
        if(apiReponse.payload.data.success){
            navigate('/auth/login');
        }
    }

    return (
        <SignupPresentation
        handleUserInput={handleUserInput}
        handleFormSubmit={handleFormSubmit}
        />
    )
   
}

export default Signup
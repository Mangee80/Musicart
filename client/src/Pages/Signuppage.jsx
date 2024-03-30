import React from 'react'
import Header from '../Components/SigninSignupHeader/Header';
import RegisterForm from '../Components/Signup/Signup';

export const Signuppage = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Header />
        <RegisterForm />
    </div>
  )
}
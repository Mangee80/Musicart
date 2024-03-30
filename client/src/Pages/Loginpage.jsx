import React from 'react'
import Header from '../Components/SigninSignupHeader/Header';
import LoginForm from '../Components/Login/Login';

export const Loginpage = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Header />
        <LoginForm />
    </div>
  )
}
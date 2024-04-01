import React from 'react'
import Header from '../Components/SigninSignupHeader/Header';
import RegisterForm from '../Components/Signup/Signup';
import Footer from '../Components/Footer/footer'

export const Signuppage = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Header />
        <RegisterForm />
        <Footer />
    </div>
  )
}
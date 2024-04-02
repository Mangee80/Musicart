import React from 'react'
import Header from '../Components/SigninSignupHeader/Header';
import LoginForm from '../Components/Login/Login';
import Footer from '../Components/Footer/footer'
export const Loginpage = () => {
  
  const currentroute = 'login';
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Header />
        <LoginForm />
        
        <Footer currentPage={currentroute}/>
    </div>
  )
}
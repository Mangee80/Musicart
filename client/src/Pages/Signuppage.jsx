import React from 'react'
import Header from '../Components/SigninSignupHeader/Header';
import RegisterForm from '../Components/Signup/Signup';
import SearchBar from '../Components/Searchbar/Searchbar';
import Footer from '../Components/Footer/footer'

export const Signuppage = () => {
  const currentroute = 'signup';
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <SearchBar currentRoute={currentroute}/>
        <Header />
        <RegisterForm />
        
        <Footer currentPage={currentroute}/>
    </div>
  )
}
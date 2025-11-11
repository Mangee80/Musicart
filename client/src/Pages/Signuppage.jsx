import React from 'react'
import Header from '../Components/SigninSignupHeader/Header';
import RegisterForm from '../Components/Signup/Signup';
import SearchBar from '../Components/Searchbar/Searchbar';
import Footer from '../Components/Footer/footer'

export const Signuppage = () => {
  const currentroute = 'signup';
  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative'}}>
        <SearchBar currentRoute={currentroute}/>
        <Header />
        <div style={{flex: 1}}>
          <RegisterForm />
        </div>
        <Footer currentPage={currentroute}/>
    </div>
  )
}
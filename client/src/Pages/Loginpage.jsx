import React from 'react'
import Header from '../Components/SigninSignupHeader/Header';
import LoginForm from '../Components/Login/Login';
import SearchBar from '../Components/Searchbar/Searchbar';
import Footer from '../Components/Footer/footer'
export const Loginpage = () => {
  
  const currentroute = 'login';
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <SearchBar currentRoute={currentroute}/>
        <Header />
        <LoginForm />
        
        <Footer currentPage={currentroute}/>
    </div>
  )
}
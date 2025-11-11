import React from 'react'
import Header from '../Components/SigninSignupHeader/Header';
import LoginForm from '../Components/Login/Login';
import SearchBar from '../Components/Searchbar/Searchbar';
import Footer from '../Components/Footer/footer'
export const Loginpage = () => {
  
  const currentroute = 'login';
  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative'}}>
        <SearchBar currentRoute={currentroute}/>
        <Header />
        <div style={{flex: 1}}>
          <LoginForm />
        </div>
        <Footer currentPage={currentroute}/>
    </div>
  )
}
import React from 'react'
import Header from '../Components/Navbar/Navbar';
import CheckoutPage from '../Components/Checkout/Checkout';
import SearchBar from '../Components/Searchbar/Searchbar';
import Footer from '../Components/Footer/footer'

export const Checkoutpage = () => {
  const currentroute = 'checkout';
  const currentRoute = '/Checkout';
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <SearchBar />
      <Header currentRoute={currentRoute}/>
      <CheckoutPage />
      <Footer currentPage={currentroute}/>
    </div>
  )
}
import React from 'react'
import Header from '../Components/Navbar/Navbar';
import ProductDetail from '../Components/Details/Productdetail';
import SearchBar from '../Components/Searchbar/Searchbar';
import Footer from '../Components/Footer/footer'

export const Productdetailpage = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <SearchBar />
        <Header />
        <ProductDetail />
        <Footer />
    </div>
  )
}
import React from 'react'
import Header from '../Components/Navbar/Navbar';
import ProductSection from '../Components/Inventory/Products';
import SearchBar from '../Components/Searchbar/Searchbar';
import Footer from '../Components/Footer/footer'

export const Home = () => {
  const currentroute = 'home';
  const currentRoute = '';
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <SearchBar />
        <Header currentRoute={currentRoute}/>
        <ProductSection />
        <Footer currentPage={currentroute}/>
    </div>
  )
}
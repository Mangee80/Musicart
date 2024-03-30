import React from 'react'
import Header from '../Components/Navbar/Navbar';
import Cart from '../Components/Cart/Cart';
import SearchBar from '../Components/Searchbar/Searchbar';

export const Cartpage = () => {
  const currentRoute = '/View Cart';
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <SearchBar />
      <Header currentRoute={currentRoute}/>
      <Cart />
    </div>
  )
} 
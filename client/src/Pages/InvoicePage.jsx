import React from 'react'
import Header from '../Components/Navbar/Navbar';
import InvoiceList from '../Components/Invoice/InvoiceList';
import SearchBar from '../Components/Searchbar/Searchbar';
import Footer from '../Components/Footer/footer'

export const Invoicepage = () => {
  const currentroute = 'invoice';
  const currentRoute = '/Invoices';
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <SearchBar currentRoute={currentroute}/>
      <Header currentRoute={currentRoute}/>
      <InvoiceList />
      <Footer currentPage={currentroute}/>
    </div>
  )
}
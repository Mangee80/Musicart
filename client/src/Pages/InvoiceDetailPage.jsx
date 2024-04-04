import React from 'react'
import Header from '../Components/Navbar/Navbar';
import InvoiceDetails from '../Components/Invoice/InvoiceDetail';
import SearchBar from '../Components/Searchbar/Searchbar';
import Footer from '../Components/Footer/footer'

export const Invoicedetailpage = () => {
  const currentroute = 'invoice';
  const currentRoute = '/InvoiceDetail';
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <SearchBar currentRoute={currentroute}/>
      <Header currentRoute={currentRoute}/>
      <InvoiceDetails />
      <Footer currentPage={currentroute}/>
    </div>
  )
}
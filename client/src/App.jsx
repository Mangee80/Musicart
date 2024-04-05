import { Routes, Route } from "react-router-dom";
import { Loginpage } from './Pages/Loginpage'
import { Signuppage } from './Pages/Signuppage'
import { Productdetailpage } from './Pages/ProductDetailPage'
import { Home } from './Pages/Homepage'
import { Cartpage } from './Pages/Cartpage'
import { Checkoutpage } from './Pages/Checkoutpage'
import { Invoicepage } from './Pages/InvoicePage'

import { ThanksPage } from './Pages/Thankspage'

import { Invoicedetailpage } from './Pages/InvoiceDetailPage'
import './App.css'
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Signuppage />} />
      <Route path="/" element={<Home />}/>
      <Route path="/cart" element={<Cartpage />}/>
      <Route path="/detail/:id" element={<Productdetailpage />}/>
      <Route path="/thanks" element={<ThanksPage />}/>
      <Route path="/invoice" element={<Invoicepage />}/>
      <Route path="/checkout" element={<Checkoutpage />}/>
      <Route path="/invoice/:id" element={<Invoicedetailpage />} />
    </Routes>
  );
}

export default App;

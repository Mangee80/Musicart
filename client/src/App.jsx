import { Routes, Route } from "react-router-dom";
import { Loginpage } from './Pages/Loginpage'
import { Signuppage } from './Pages/Signuppage'
import { Productdetailpage } from './Pages/ProductDetailPage'
import { Home } from './Pages/Homepage'
import { Cartpage } from './Pages/Cartpage'
import './App.css'
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Signuppage />} />
      <Route path="/" element={<Home />}/>
      <Route path="/cart" element={<Cartpage />}/>
      <Route path="/detail" element={<Productdetailpage />}/>
    </Routes>
  );
}

export default App;
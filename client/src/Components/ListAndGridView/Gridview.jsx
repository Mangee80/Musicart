import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from "react-icons/md";

const ProductGrid = ({ musicGadgets }) => {
  const navigate = useNavigate();
  const addToCart = async (event, productId) => {
    event.stopPropagation();
    try {
      const userId = localStorage.getItem('userID');
      if (!userId) {
        navigate('/login')
        return;
      }
      const response = await fetch('https://musicart-9bam.vercel.app/api/cart/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1, userId })
      });
      if (!response.ok) {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const goToProductDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="product-list">
      {musicGadgets.map((gadget) => (
        <div key={gadget._id} className="product-card" onClick={() => goToProductDetail(gadget._id)}>
          <img src={gadget.imageUrl} alt={`${gadget.Company} ${gadget.model}`} />
          <div className="product-title">{gadget.Company} {gadget.model}</div>
          <div className="product-price">₹{gadget.Price}</div>
          <div style={{ color: '#555', fontSize: '0.97rem', marginBottom: '0.7rem' }}>{gadget.Colour} | {gadget.HeadphoneType}</div>
          <button onClick={e => { e.stopPropagation(); addToCart(e, gadget._id); }} style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <MdOutlineAddShoppingCart size={22} /> Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

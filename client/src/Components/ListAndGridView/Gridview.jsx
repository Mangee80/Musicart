import React, { useState, useEffect } from 'react';
import styles from './ProductGrid.module.css';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from "react-icons/md";

const ProductGrid = ({ musicGadgets }) => {
  const navigate = useNavigate();
  const addToCart = async (event, productId) => {
    
    event.stopPropagation(); // Prevent the event from bubbling up
    try {
      const userId = localStorage.getItem('userID'); // Assuming you store the user ID in localStorage
      if (!userId) {
        // Handle case when user is not logged in
        console.log('User is not logged in');
        navigate('/login')
        return;
      }

      // Construct the fetch request
      const response = await fetch('https://musicart-9bam.vercel.app/api/cart/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: 1, userId }) // Include userID in the request body
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Assuming the response contains a success message
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

   // Function to navigate to product detail page
   const goToProductDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={styles.productGrid}>
      {musicGadgets.map((gadget) => (
        <div key={gadget.id} className={styles.productCard} onClick={() => goToProductDetail(gadget._id)}>
          <div className={styles.productImage}>
            <img src={gadget.imageUrl} alt={`${gadget.Company} ${gadget.model}`} />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>
              <span>{gadget.Company}</span>
              <span className={styles.productNameSpace}></span>
              <span>{gadget.model}</span>
            </h3>
            <p className={styles.productPrice}><span style={{marginRight: '0.3rem'}}>Price -</span><span>₹ </span> {gadget.Price}</p>
            <p className={styles.productColor}>{gadget.Colour}<span style={{ margin: '0rem 0.5rem' }}>|</span>{gadget.HeadphoneType}</p>
            <div className={styles.addToCart} onClick={(e) => addToCart(e, gadget._id)}>
              <MdOutlineAddShoppingCart size={34} style={{
                color: 'rgba(29, 112, 0, 1)',
                borderRadius: '50%',
                boxShadow: '0px 0px 10px black',
                padding: '7px',
                backgroundColor: 'white'
              }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default ProductGrid;

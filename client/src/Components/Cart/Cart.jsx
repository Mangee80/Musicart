import React, { useState, useEffect } from 'react';
import styles from './Cart.module.css';
import { BiShoppingBag } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';

const CartItem = ({ item, onUpdateQuantity }) => {
  const handleQuantityChange = (event) => {
    onUpdateQuantity(item.productId._id, parseInt(event.target.value, 10));
  };

  return (
    <>
    
      <div className={styles.cartItem}>
        <img src={item.productId.imageUrl} alt={item.productId.model} className={styles.cartItemImage} />
        <div className={styles.cartItemDetails}>
          <div style={{display: 'flex', gap: '10px', marginBottom: '0.88rem', width: '15rem'}}>
            <p style={{fontSize: '1.5rem', fontWeight: '500'}}>{item.productId.Company}</p>
            <h3 style={{fontSize: '1.5rem', fontWeight: '500'}}>{item.productId.model}</h3>
          </div>
          <p style={{fontSize: '1rem', color: 'rgba(162, 162, 162, 1)', marginBottom: '0.4rem'}}>Colour : {item.productId.Colour}</p>
          
          
          
          <p style={{fontSize: '1rem', color: 'rgba(162, 162, 162, 1)'}}>In Stock</p>
        </div>
        <div>
          <p style={{fontSize: '1.3rem', fontWeight: '500', marginBottom: '1rem'}}>Price</p> 
          
          
          <p style={{fontSize: '1rem'}}>₹{item.productId.Price}</p>
        </div>
        <div className={styles.select}>
          <p style={{fontSize: '1.3rem', fontWeight: '500', marginBottom: '1rem'}}>Quantity</p>
          <select
            value={item.quantity}
            onChange={handleQuantityChange}
            className={styles.quantitySelect}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p style={{fontSize: '1.3rem', fontWeight: '500', marginBottom: '1rem'}}>Total</p>
          <p style={{fontSize: '1rem'}}>₹{item.productId.Price * item.quantity}</p>
        </div>
      </div>

      <div className={styles.responsiveCartItem}>
        <img src={item.productId.imageUrl} alt={item.productId.model} className={styles.cartItemImage} />
        <div className={styles.cartItemDetails}>
          <div style={{display: 'flex', gap: '5px', marginBottom: '0.7rem', width: '15rem'}}>
            <p style={{fontSize: '1.3rem', fontWeight: '400'}}>{item.productId.Company}</p>
            <h3 style={{fontSize: '1.3rem', fontWeight: '400'}}>{item.productId.model}</h3>
          </div>
          <p style={{fontSize: '1.6rem', fontWeight: '500', marginBottom: '0.54rem'}}>₹{item.productId.Price}</p>
          <p style={{fontSize:  '1rem', color: 'rgba(0, 0, 0, 1)', marginBottom: '0.11rem'}}>Colour : {item.productId.Colour}</p>
          <p style={{fontSize: '1rem', color: 'rgba(0, 0, 0, 1)', marginBottom: '0.4rem'}}>In Stock</p>
          <p>Convenience Fee <span style={{marginLeft: '0.8rem'}}>₹45</span></p>
        </div>
      </div>
    </>
  );
};


const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Define totalPrice state
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    if (items.length === 0 || totalQuantity === 0) {
      alert('Your cart is empty! Please add items to your cart before proceeding to checkout.');
      return;
    }
    navigate('/checkout');
  };
  useEffect(() => {
    // Fetch items from the backend and setItems
    fetch(`${API_BASE_URL}/api/cart/user-cart`, {
      headers: {
        'x-user-id': localStorage.getItem('userID')
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (Array.isArray(data)) { // Check if the data is an array
          setItems(data); // Set the items if the response contains an array
        } else {
          // Handle unexpected format or empty response
          console.error('Unexpected response format:', data);
          setItems([]); // Ensure items is set to an empty array to avoid errors in rendering
        }
        setLoading(false);
        
        // 🔄 Refresh navbar cart count after cart loads
        if (window.updateCartCount) {
          window.updateCartCount();
        }
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      });
  }, []);
  
  const onUpdateQuantity = async (productId, newQuantity) => {
    try {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        console.error('User ID not found');
        return;
      }
  
      const response = await fetch(`${API_BASE_URL}/api/cart/update-cart-item`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, productId, newQuantity }), // Include userID in the request body
      });
  
      if (response.ok) {
        // Update the quantity in the frontend
        const updatedItems = items.map(item => {
          if (item.productId._id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setItems(updatedItems);
        
        // 🔄 Refresh navbar cart count after quantity update
        if (window.updateCartCount) {
          window.updateCartCount();
        }
      } else {
        console.error('Failed to update cart item quantity');
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };
  
  // Calculate total quantity and total amount dynamically whenever items change
  useEffect(() => {
    const calculatedTotalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const calculatedTotalPrice = items.reduce((total, item) => total + (item.productId.Price * item.quantity), 0);
    setTotalPrice(calculatedTotalPrice); // Update totalPrice state
    
    setTotalQuantity(calculatedTotalQuantity);
    // Do something with totalQuantity and totalPrice
  }, [items]); // Trigger the effect whenever items change
  

  // Render loading indicator if loading is true
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render cart items when loading is false
  return (
    <>
      <div className={styles.cartContainer}>
        <button onClick= {handleBack} className={styles.backtoProduct}>Back to products</button>
        <IoArrowBack onClick= {handleBack} className={styles.backbutton}/>
        <div className={styles.myCartHeading}>
          <BiShoppingBag size={50}/>
          <p>My Cart</p>
        </div>
        <div style={{display: 'flex'}}>
          <div>
            <div className={`${styles.cartItems} ${items.length === 1 ? styles.cartItemsSingle : ''}`}>
              {items.map((item) => (
                <CartItem key={item.productId._id} item={item} onUpdateQuantity={onUpdateQuantity} />
              ))}
            </div>
            <div style={{display: 'flex', gap:'30rem', marginLeft: '20rem', marginTop: '1rem'}}>
              <p style={{fontWeight: 'bold'}}>{totalQuantity} item</p>
              <p style={{fontWeight: 'bold'}}>{totalPrice}</p>
            </div>
          </div>
          <div className={`${styles.border} ${items.length === 1 ? styles.borderSingle : ''}`}></div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className={styles.cartTotalPrice}>
              <p style={{fontSize: '1.3rem', fontWeight: '500', marginBottom: '1.7rem'}}>PRICE DETAILS</p>
              
              <div style={{display: 'flex', gap: '5.5rem'}}>
                <div style={{display: 'flex', flexDirection:'column', gap: '1rem'}}>
                  <p>Total MRP</p><p>Discount on MRP</p><p>Convenience Fee</p>
                </div>
                <div style={{display: 'flex', flexDirection:'column', gap: '1rem'}}>
                  <p>{totalPrice}</p><p>0</p><p>50</p>
                </div>
              </div>
            </div>
            <div className={styles.cartTotal}>
              <p>Total Amount <span style={{marginLeft: '5rem'}}>₹{totalPrice + 50}</span></p>
              <button className={styles.checkoutButton} onClick={handleCheckout}>PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.responsiveContainer}>
        <div style={{backgroundColor: 'rgba(219, 219, 219, 1)'}}>
          <div className={styles.cartItems}>
            {items.map((item) => (
              <CartItem key={item.productId._id} item={item} onUpdateQuantity={onUpdateQuantity} />
            ))}
          </div>
          <p style={{marginLeft: '10rem', marginTop: '0.5rem', padding: '0.8rem 1rem', width: '10rem', fontSize: '1.3rem'}}>Total : <span style={{marginLeft: '1.7rem',fontWeight: 'bold'}}>{totalPrice}</span></p>
        </div>
        <div className={styles.cartTotal}>
          
          <p style={{fontSize: '1.6rem', fontWeight: '400', marginTop: '0.8rem'}}>Total Amount <span style={{marginLeft: '1rem', fontWeight: 'bold'}}>₹{totalPrice + 45}</span></p>
          <button className={styles.checkoutButton} onClick={handleCheckout}>PLACE ORDER</button>
        </div>
      </div>
    </>
  );
};

export default Cart;

import React, { useState, useEffect } from 'react';
import styles from './Cart.module.css';
import { BiShoppingBag } from "react-icons/bi";

const CartItem = ({ item, onUpdateQuantity }) => {
  const handleQuantityChange = (event) => {
    onUpdateQuantity(item.productId._id, parseInt(event.target.value, 10));
  };

  return (
    <div className={styles.cartItem}>
      <img src={item.productId.imageUrl} alt={item.productId.model} className={styles.cartItemImage} />
      <div className={styles.cartItemDetails}>
        <div style={{display: 'flex', gap: '10px', marginBottom: '0.88rem'}}>
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
  );
};


const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the backend and setItems
    fetch('http://localhost:5000/api/cart/user-cart', {
      headers: {
        'x-user-id': localStorage.getItem('userID')
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setItems(data); // Set the items if the response contains an 'items' array
        } else {
          // Handle unexpected format or empty response
          console.error('Unexpected response format:', data);
          setItems([]); // Ensure items is set to an empty array to avoid errors in rendering
        }
        setLoading(false);
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
  
      const response = await fetch('http://localhost:5000/api/cart/update-cart-item', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, productId, newQuantity }), // Include userID in the request body
      });
  
      if (response.ok) {
        // Update the quantity in the frontend
        const updatedItems = items.map(item => {
          if (item.productId._id === productId) { // Adjusted to access the product ID
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setItems(updatedItems);
      } else {
        console.error('Failed to update cart item quantity');
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const totalPrice = items.reduce((total, item) => total + item.productId.Price * item.quantity, 0);

  // Render loading indicator if loading is true
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render cart items when loading is false
  return (
    <div className={styles.cartContainer}>
      <button className={styles.backtoProduct}>Back to products</button>
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
          <div style={{display: 'flex'}}>
            <p>totalItems</p>

            <p>totalSum</p>
          </div>
        </div>
        <div className={`${styles.border} ${items.length === 1 ? styles.borderSingle : ''}`}></div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div className={styles.cartTotalPrice}>
            <p>PRICE DETAILS</p>
            
            <div style={{display: 'flex', gap: '2rem'}}>
              <div style={{display: 'flex', flexDirection:'column', gap: '10px'}}>
                <p>Total MRP</p><p>Discount on MRP</p><p>Convenience Fee</p>
              </div>
              <div style={{display: 'flex', flexDirection:'column', gap: '10px'}}>
                <p>3500</p><p>0</p><p>50</p>
              </div>
            </div>
          </div>
          <div className={styles.cartTotal}>
            Total Amount: ₹{totalPrice}
            <button className={styles.checkoutButton}>Checkout</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Cart;

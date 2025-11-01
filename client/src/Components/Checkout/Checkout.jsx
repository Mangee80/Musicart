import React, { useState, useEffect } from 'react';
import styles from './Checkout.module.css';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { API_BASE_URL } from '../../config/apiConfig';
function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item for details
  const [deliveryAddress, setDeliveryAddress] = useState(''); // State to store delivery address input
  const [paymentOption, setPaymentOption] = useState('payOnDelivery'); // State to store selected payment option
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages

  const navigate = useNavigate();
  useEffect(() => {
    const userID = localStorage.getItem('userID'); // Retrieve the user ID from localStorage
    if (!userID) {
      setError('User ID is required');
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart/user-cart`, {
          method: 'GET',
          headers: {
            'x-user-id': userID, // Include the user ID in the request headers
          },
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        setError('Failed to load cart items');
      }
    
    };

    fetchCartItems();
  }, []);
  
  
  

  
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    const userId = localStorage.getItem('userID');

    try {
      const response = await fetch(`${API_BASE_URL}/api/checkout/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deliveryAddress,
          paymentOption,
          userID: userId
        })
      });

      if (!response.ok) throw new Error('Failed to place order');
      const data = await response.json();
      if(data) { 
        navigate('/thanks');
      }
      // Handle success (e.g., redirect to a thank you page)
    } catch (error) {
      setError('An error occurred while placing your order');
    } finally {
      setLoading(false);
    }
  };
  const totalPrice = cartItems.reduce((total, item) => total + item.productId.Price * item.quantity, 0);

  const handleBack = () => {
    navigate('/cart');
  };

  return (
    <div className={styles.container}>
      <button onClick= {handleBack} className={styles.backtoProduct}>Back to cart</button>
      <IoArrowBack onClick= {handleBack} className={styles.backbutton}/>
      <p className={styles.myCartHeading}>Checkout</p>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutForm}>
          <div className={styles.labelField} style={{display:'flex', margin: '0.3rem 0rem', borderBottom: '2px solid rgba(225, 225, 225, 1)'}}>
            <p className={styles.fieldLabel}>1. Delivery address</p>
            <div className={styles.fields}>
              <p className={styles.userName} >{localStorage.getItem('MusicCartUsername')}</p>
              <textarea
                className={styles.textareaSelect}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your delivery address"
              />
            </div>
          </div>
          <div className={styles.labelField} style={{display:'flex', margin: '0.3rem 0rem', borderBottom: '2px solid rgba(225, 225, 225, 1)'}}>
            <p className={styles.fieldLabel}>2. Payment method</p>
            <div className={styles.fields}>
              <select
                className={styles.Select}
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value)}
              >
                <option value="" disabled selected hidden>Mode of payment</option>
                <option value="payOnDelivery">Pay on Delivery</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
              </select>
            </div>
          </div>
          <div className={styles.labelField} style={{display:'flex', margin: '0.5rem 0rem', paddingBottom: '1rem', borderBottom: '2px solid rgba(225, 225, 225, 1)'}}>
            <p className={styles.fieldLabel}>3. Review items and delivery</p>
            <div className={styles.fields} style={{display:'flex', flexDirection: 'column'}}>
              <div className={styles.gridContainer}>
                {cartItems.map((item, index) => (
                  <img
                    key={index}
                    src={item.productId.imageUrl} // Access imageUrl from productId
                    alt={item.productId.model} // Access model from productId
                    onClick={() => handleItemClick(item)}
                    className={styles.gridContainerImg}
                  />
                ))}
              </div>
              <div>
                {selectedItem && (
                  <div className={styles.itemDetails}>
                    
                    <div style={{display: 'flex', gap: '10px', marginBottom: '0.3rem'}}>
                      <p style={{fontSize: '1.3rem', fontWeight: '500'}}>{selectedItem.productId.Company}</p>
                      <h3 style={{fontSize: '1.3rem', fontWeight: '500'}}>{selectedItem.productId.model}</h3>
                    </div>
                    <p style={{fontSize: '0.88rem', color: 'rgba(162, 162, 162, 1)', marginTop: '0.4rem'}}>Colour : {selectedItem.productId.Colour}</p>
                    <p className={styles.inStock} style={{fontSize: '1rem', color: 'rgba(162, 162, 162, 1)', marginBottom: '0.4rem'}}>In Stock</p>
                    <p style={{fontSize: '1rem', marginTop: '0.3rem', color: 'rgba(0, 0, 0, 1)'}}>Estimated delivery : <br/>Monday — FREE Standard Delivery</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.bottomPlaceOrder}>
             <button 
                onClick={handlePlaceOrder}
                disabled={loading}
              >
              Place your order 
              </button>
             <div>
                <p style={{fontSize: '1rem', color: 'rgba(181, 43, 0, 1)'}}>Order Total : ₹{totalPrice} </p>
                <p style={{fontSize: '13px', color: 'rgba(0, 0, 0, 1)'}}>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
             </div>
          </div>  
        </div>
        <div className={styles.sidePlaceOrder} style={{borderRadius: '0.5rem', height: 'auto', maxHeight: '43vh'}}>
          <div style={{padding: '1rem',borderBottom: '1.5px solid rgba(225, 225, 225, 1)'}}>
            <p className={styles.orderSummary} style={{ marginBottom: '1rem', padding: '1rem', color: 'rgba(181, 43, 0, 1)'}}>Order Total : <span  style={{ marginLeft: '1rem'}}>₹{totalPrice + 45}</span></p>
            <button
              className={styles.button}
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place your order'}
            </button>
            {error && <p className={styles.error}>{error}</p>}
            
            <p align="center" style={{fontSize: '13px', fontWeight: '500' , margin: '0.7rem 1rem', marginBottom: '0rem'}}>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
          </div>
          <div style={{ padding: '1rem', borderBottom: '1.5px solid rgba(225, 225, 225, 1)'}}>
            <p style={{fontSize: '1.3rem', fontWeight: '500',  marginBottom: '1.3rem'}}>Order Summary</p>
            <div style={{display: 'flex', gap: '8rem'}}>
              <div>
                <p style={{marginBottom: '0.5rem', width: '5rem', color: 'rgba(121, 121, 121, 1)'}}>Items :</p><p style={{width: '5rem' , color: 'rgba(121, 121, 121, 1)'}}>Delivery :</p>
              </div>
              <div>
                <p style={{marginBottom: '0.5rem', color: 'rgba(121, 121, 121, 1)'}}>₹{totalPrice}</p><p style={{color: 'rgba(121, 121, 121, 1)'}}>₹45.00</p>
              </div>
            </div>
          </div>
          <p className={styles.orderTotal} style={{ marginBottom: '1rem', padding: '1rem', color: 'rgba(181, 43, 0, 1)'}}>Order Total : <span  style={{ marginLeft: '1rem'}}>₹{totalPrice + 45}</span></p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

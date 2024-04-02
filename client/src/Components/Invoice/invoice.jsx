import React, { useState, useEffect } from 'react';
import styles from './Checkout.module.css';

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item for details
  const [deliveryAddress, setDeliveryAddress] = useState(''); // State to store delivery address input
  const [paymentOption, setPaymentOption] = useState('payOnDelivery'); // State to store selected payment option
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    const userID = localStorage.getItem('userID'); // Retrieve the user ID from localStorage
    if (!userID) {
      setError('User ID is required');
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cart/user-cart', {
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
  useEffect(() => {
    console.log(cartItems); // Log the updated value of cartItems
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    const userId = localStorage.getItem('userID');

    try {
      const response = await fetch('/api/checkout', {
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
      // Handle success (e.g., redirect to a thank you page)
    } catch (error) {
      setError('An error occurred while placing your order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backtoProduct}>Back to cart</button>
      <p className={styles.myCartHeading}>Checkout</p>
      <div style={{display:'flex'}}>
        <div className={styles.checkoutForm}>
          <div style={{display:'flex', margin: '0.3rem 0rem', borderBottom: '2px solid rgba(225, 225, 225, 1)'}}>
            <p className={styles.fieldLabel}>1. Delivery address</p>
            <div className={styles.fields}>
              <p style={{marginBottom: '4px',marginLeft: '0.7rem', fontSize: '0.85rem', color: 'rgba(121, 121, 121, 1)'}}>{localStorage.getItem('MusicCartUsername')}</p>
              <textarea
                className={styles.textareaSelect}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your delivery address"
              />
            </div>
          </div>
          <div style={{display:'flex', margin: '0.3rem 0rem', borderBottom: '2px solid rgba(225, 225, 225, 1)'}}>
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
          <div style={{display:'flex', margin: '0.5rem 0rem', paddingBottom: '1.3rem', borderBottom: '2px solid rgba(225, 225, 225, 1)'}}>
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
                    <p style={{fontSize: '17px', color: 'rgba(162, 162, 162, 1)', marginBottom: '0.4rem'}}>Colour : {selectedItem.productId.Colour}</p>
                    <p style={{fontSize: '1rem', color: 'rgba(0, 0, 0, 1)'}}>Estimated delivery : <br/>Monday — FREE Standard Delivery</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.bottomTotal}>
             <button 
                onClick={handlePlaceOrder}
                disabled={loading}
              >
              Place your order 
              </button>
             <div>
                <p style={{fontSize: '1rem', color: 'rgba(181, 43, 0, 1)'}}>Order Total : ₹3545.00 </p>
                <p style={{fontSize: '13px', color: 'rgba(0, 0, 0, 1)'}}>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
             </div>
          </div>  
        </div>
        <div>
          <button
            className={styles.button}
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
            {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

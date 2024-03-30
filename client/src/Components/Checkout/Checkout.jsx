import React, { useState, useEffect } from 'react';
import styles from './CheckoutPage.module.css';

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
        const response = await fetch('/api/user-cart', {
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
        <div>
            <h1 className={styles.header}>Welcome, {localStorage.getItem('MusicCartUsername')}</h1>
            <div>
                <p></p>
                <textarea
                className={styles.textareaSelect}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your delivery address"
                />
            </div>
            <div>
                <p></p>
                <select
                className={styles.textareaSelect}
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value)}
                >
                    <option value="payOnDelivery">Pay on Delivery</option>
                    <option value="upi">UPI</option>
                    <option value="card">Card</option>
                </select>
            </div>
            <div>
                <p></p>
                <div className={styles.gridContainer}>
                    {cartItems.map((item, index) => (
                        <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.name}
                        onClick={() => handleItemClick(item)}
                        className={styles.gridContainerImg}
                        />
                    ))}
                </div>
                <div>
                    {selectedItem && (
                        <div className={styles.itemDetails}>
                            <h3>{selectedItem.name}</h3>
                            <p>{selectedItem.description}</p>
                            <p>Price: {selectedItem.price}</p>
                            {/* Add other product details */}
                        </div>
                    )}
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
            
            <div>
                
            </div>  
        </div>
    </div>
  );
}

export default CheckoutPage;

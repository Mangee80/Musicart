import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import invoice from '../../assets/invoice.png';
import invoiceicon from '../../assets/invoiceicon.png';
import styles from './Style.module.css';

function InvoiceList() {
  const [checkouts, setCheckouts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
    

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const userID = localStorage.getItem('userID'); // Get the user ID from localStorage
        const response = await fetch(`http://localhost:5000/api/checkout/checkouts/${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch checkouts');
        }
        const data = await response.json();
        setCheckouts(data);
      } catch (error) {
        console.error('Error fetching checkouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckouts();
  }, []);
  const userName = localStorage.getItem('MusicCartUsername');
  
  
  const handleViewDetails = (id) => {
    navigate(`/invoice/${id}`);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        
        <div className={styles.container}>
          <div>
            <button className={styles.backtoProduct}>Back to Home</button>
            <div style={{display: 'flex'}}>
              <div className={styles.imgIconContainer}>
                <img src={invoiceicon} alt="invoiceicon" />
              </div>
            </div>
            <p className={styles.invoiceHeading}>My Invoices</p>
          </div>
          <div className={styles.checkoutsContainer}>
            {checkouts.map((checkout) => (
              <div className={styles.checkout} key={checkout._id}>
                <div style={{display: 'flex', gap: '1.5rem'}}>
                  <div className={styles.imgContainer}>
                    <img src={invoice} alt="invoice" />
                  </div>
                  <div>
                    <p style={{marginBottom: '0.4rem'}}>{userName}</p>
                    <p style={{width: '20rem', fontSize: '0.85rem'}}>{checkout.deliveryAddress}</p>
                  </div>
                </div>
                <button className={styles.viewInvoiceButton}onClick={() => handleViewDetails(checkout._id)}>View Invoice</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceList;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './InvoiceDetail.module.css'

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);


  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`https://musicart-9bam.vercel.app/api/checkout/invoice/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch invoice');
        }
        const data = await response.json();
        setInvoice(data);
      } catch (error) {
        setError('Error fetching invoice');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const totalPrice = invoice.products.reduce((total, product) => {
    return total + (product.Price * product.quantity);
  }, 0);
  
  return (
    <div className={styles.container}>
      <button className={styles.backtoProduct}>Back to cart</button>
      <p className={styles.myCartHeading}>Checkout</p>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutForm}>
          <div className={styles.labelField} style={{display:'flex', margin: '0.3rem 0rem', borderBottom: '2px solid rgba(225, 225, 225, 1)'}}>
            <p className={styles.fieldLabel}>1. Delivery address</p>
            <div className={styles.fields}>
                <p className={styles.userName} >{localStorage.getItem('MusicCartUsername')}</p>
                <p className={styles.textareaSelect}>{invoice.deliveryAddress}</p>
            </div>
          </div>
          <div className={styles.labelField} style={{display:'flex', margin: '0.3rem 0rem', borderBottom: '2px solid rgba(225, 225, 225, 1)'}}>
            <p className={styles.fieldLabel}>2. Payment method</p>
            <div className={styles.fields}>
              <div className={styles.Select}>{invoice.paymentOption}</div>
            </div>
          </div>
          <div className={styles.labelField} style={{display:'flex', margin: '0.5rem 0rem', paddingBottom: '1.3rem', borderBottom: '2px solid rgba(225, 225, 225, 1)'}}>
            <p className={styles.fieldLabel}>3. Review items and delivery</p>
            <div className={styles.fields} style={{display:'flex', flexDirection: 'column'}}>
              <div className={styles.gridContainer}>
                {invoice.products.map((product, index) => (
                  <img
                    key={index}
                    src={product.product.imageUrl} // Access imageUrl from product object
                    alt={product.product.model} // Access model from product object
                    onClick={() => handleItemClick(product.product)} // Pass product object to handleItemClick
                    className={styles.gridContainerImg}
                  />
                ))}
              </div>
              <div>
                {selectedItem && (
                  <div className={styles.itemDetails}>
                  
                  <div style={{display: 'flex', gap: '10px', marginBottom: '0.3rem'}}>
                    <p style={{fontSize: '1.3rem', fontWeight: '500'}}>{selectedItem.Company}</p>
                    <h3 style={{fontSize: '1.3rem', fontWeight: '500'}}>{selectedItem.model}</h3>
                  </div>
                  <p style={{fontSize: '17px', color: 'rgba(162, 162, 162, 1)', marginTop: '0.4rem'}}>Colour : {selectedItem.Colour}</p>
                  <p className={styles.inStock}style={{fontSize: '17px', color: 'rgba(162, 162, 162, 1)', marginBottom: '0.4rem'}}>In Stock</p>
                  <p style={{fontSize: '1rem', color: 'rgba(0, 0, 0, 1)'}}>Estimated delivery : <br/>Monday — FREE Standard Delivery</p>
                  </div>
                )}
              </div>
            </div>
          </div>  
        </div>
        <div className={styles.sidePlaceOrder} style={{borderRadius: '0.5rem', height: '30vh', maxHeight: '43vh'}}>
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

export default InvoiceDetails;

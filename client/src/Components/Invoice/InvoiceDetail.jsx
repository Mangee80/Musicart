import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`/api/invoice/${id}`);
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

  return (
    <div>
      <h2>Invoice Details</h2>
      {invoice && (
        <div>
          <p>Invoice ID: {invoice._id}</p>
          <p>User Name: {localStorage.getItem('MusicCartUsername')}</p>
          <p>Delivery Address: {invoice.deliveryAddress}</p>
          <p>Payment Option: {invoice.paymentOption}</p>
          <h3>Products:</h3>
          <ul>
            {invoice.products.map((product) => (
              <li key={product._id}>
                {product.product.name} - Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InvoiceDetails;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InvoicePage() {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const userID = localStorage.getItem('userID'); // Get the user ID from localStorage
        const response = await fetch(`/api/checkouts/${userID}`);
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
      <h1>Invoice Page</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {checkouts.map((checkout) => (
            <div key={checkout._id}>
              <p>User Name: {userName}</p>
              <p>Delivery Address: {checkout.deliveryAddress}</p>
              <button onClick={() => handleViewDetails(checkout._id)}>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InvoicePage;

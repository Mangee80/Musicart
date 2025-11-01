import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { PiPhoneCallThin } from "react-icons/pi";
import musicart from '../../assets/musicart.png'
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';

import { MdOutlineAddShoppingCart } from "react-icons/md";

function Header({ currentRoute }) {
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('MusicCartUsername');
    if (storedUserData) {
      setUserData({ name: storedUserData });
    }
  }, []);


  const [totalItems, setTotalItems] = useState(0);

  const fetchCartItems = async () => {
    try {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        setTotalItems(0);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/cart/user-cart`, {
        headers: {
          'x-user-id': userID,
        }
      });

      if (!response.ok) {
        console.log('Cart is empty or user not found');
        setTotalItems(0);
        return;
      }

      const items = await response.json();
      
      // Calculate TOTAL QUANTITY (sum of all item quantities)
      // Example: 2 products with quantity 3 and 2 = total 5
      const totalItemsCount = items.reduce((total, item) => total + (item.quantity || 0), 0);
      setTotalItems(totalItemsCount);
    } catch (error) {
      console.log('Error fetching cart items:', error);
      setTotalItems(0);
    }
  };

  useEffect(() => {
    // Fetch cart items only when component mounts and when userData changes
    fetchCartItems();

    // Optional: Set up a longer interval (30 seconds) for periodic updates
    const interval = setInterval(fetchCartItems, 30000);

    return () => clearInterval(interval);
  }, [userData]); // Only re-run when userData changes

  // Make fetchCartItems available globally for other components
  useEffect(() => {
    window.updateCartCount = fetchCartItems;
    return () => {
      delete window.updateCartCount;
    };
  }, []);

  const isLoggedIn = userData !== null;
  // Function to handle logout
  const handleLogout = () => {
    // Clearing values from localStorage on logout
    window.localStorage.setItem("user", '');
    window.localStorage.setItem("userID", '');
    window.localStorage.setItem("MusicCartUsername", '');
    window.localStorage.setItem("token", '');
    window.location.href = '/login'; // Redirect to the login page
  }

  function getUserInitials() {
    if (userData) {
      const nameParts = userData.name.split(' ');
      return nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();
    }
    return null;
  }
  const navigateToInvoicePage = () => {
    navigate('/invoice');
  };
  return (
    <div className={styles.header}>
      <div className={styles.headerAuthentication}>
        <div style={{display: 'flex', marginLeft:'2%'}}>
          <PiPhoneCallThin size={18} color="white"/><p style= {{color:'white', fontSize: '10.8px', paddingTop:'3px', marginLeft:'5px'}}>912121131313</p>
        </div>
        <p style= {{position: 'absolute',left: '40%',top: '0.58%',color:'white', fontSize: '13px'}}>Get 50% off on selected items<span style= {{color:'white', fontSize: '17px', margin: '0px 10px'}}>|</span>Shop Now</p>
        {(currentRoute === '' && !isLoggedIn) && (
          <div style={{ display: 'flex', marginRight: '3%', color: 'white' }}>
              <p onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Login</p>
              <span style={{ color: 'white', fontSize: '17px', margin: '0px 10px' }}>|</span>
              <p onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>Signup</p>
          </div>
        )}
        {(currentRoute !== '' && isLoggedIn) && (
          <p style={{color: 'white', marginRight: '2rem', cursor: 'pointer'}} onClick={handleLogout}>Logout</p>
        )}

      </div>
      <div className={styles.headerContent}>
        <div style={{display: 'flex'}}>
          <div className={styles.img_container}>
              <img src={musicart} alt="musicartlogo" />
          </div>
          <h1 className={styles.h1}>Musicart</h1>
          <p className={styles.routeText}>
            Home
            {/* Renders the "View Invoice" span only if currentRoute is empty */}
            {currentRoute === '' && <span style={{ marginLeft: '10px', cursor: 'pointer'}} onClick={navigateToInvoicePage}>Invoice</span>}
            {/* Always renders the currentRoute span */}
            {currentRoute !== '' && <span style={{ marginLeft: '5px' }}>{currentRoute}</span>}
          </p>
        </div>

        <div style={{display: 'flex'}}>
          {/* Show cart button and user avatar when logged in and on home page */}
          {isLoggedIn && currentRoute === '' && (
            <>
              <div className={`${styles.viewCartButton}`} onClick={() => navigate('/cart')}>
                <MdOutlineAddShoppingCart size={18}/> 
                <p style={{marginLeft: '5px', marginTop: '3px'}}>
                  View Cart 
                  {totalItems > 0 && <span style={{backgroundColor: '#ff4444', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', marginLeft: '5px'}}>{totalItems}</span>}
                </p>
              </div>
              <div className={styles.userAvatar} onClick={() => setShowDropdown(!showDropdown)}>
                {getUserInitials()}
                {showDropdown && (
                  <div className={styles.dropdownMenu}>
                    <p>{userData.name}</p>
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Show cart button for non-logged in users on other pages (except detail page) */}
          {!isLoggedIn && currentRoute !== '' && currentRoute !== '/detail' && currentRoute !== 'Invoice' && (
            <div className={`${styles.viewCartButton} ${styles.visible}`} onClick={() => navigate('/login')}>
              <MdOutlineAddShoppingCart size={18}/> 
              <p style={{marginLeft: '5px', marginTop: '3px'}}>
                View Cart 
                {totalItems > 0 && <span style={{backgroundColor: '#ff4444', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', marginLeft: '5px'}}>{totalItems}</span>}
              </p>
            </div>
          )}

          {/* Show cart button for logged in users on other pages (except Invoice and home) */}
          {isLoggedIn && currentRoute !== '' && currentRoute !== 'Invoice' && (
            <div className={`${styles.viewCartButton} ${styles.visible}`} onClick={() => navigate('/cart')}>
              <MdOutlineAddShoppingCart size={18}/> 
              <p style={{marginLeft: '5px', marginTop: '3px'}}>
                View Cart 
                {totalItems > 0 && <span style={{backgroundColor: '#ff4444', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', marginLeft: '5px'}}>{totalItems}</span>}
              </p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default Header;

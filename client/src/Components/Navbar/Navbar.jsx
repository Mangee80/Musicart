import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { PiPhoneCallThin } from "react-icons/pi";
import musicart from '../../assets/musicart.png'
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userID = localStorage.getItem('userID');
        if (!userID) {
          console.error('User ID not found');
          return;
        }

        const response = await fetch('https://musicart-9bam.vercel.app/api/cart/user-cart', {
          headers: {
            'x-user-id': userID,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const items = await response.json();
        const totalItemsCount = items.reduce((total, item) => total + item.quantity, 0);
        setTotalItems(totalItemsCount);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    const interval = setInterval(fetchCartItems, 1000); // Fetch cart items every second

    return () => clearInterval(interval); // Clear interval on component unmount
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
          <p className={styles.routeText}>Home <span style={{marginLeft: '5px'}}>{currentRoute}</span></p>
        </div>

        <div style={{display: 'flex'}}>
          {isLoggedIn && currentRoute === '' && (
            <>
              <div className={`${styles.viewCartButton}`} onClick={() => navigate('/cart')}>
                <MdOutlineAddShoppingCart size={18}/> <p style={{marginLeft: '5px', marginTop: '3px'}}>View Cart <span>{totalItems}</span></p>
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

          {!isLoggedIn && currentRoute !== '' &&  currentRoute !== '/detail' && (
            <div className={`${styles.viewCartButton} ${styles.visible}`} onClick={() => navigate('/login')}>
              <MdOutlineAddShoppingCart size={18}/> <p style={{marginLeft: '5px', marginTop: '3px'}}>View Cart <span>{totalItems}</span></p>
            </div>
          )}

          {!['Invoice',''].includes(currentRoute) && (
            <div className={`${styles.viewCartButton} ${styles.visible}`} onClick={() => navigate('/cart')}>
              <MdOutlineAddShoppingCart size={18}/> <p style={{marginLeft: '5px', marginTop: '3px'}}>View Cart <span>{totalItems}</span></p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default Header;

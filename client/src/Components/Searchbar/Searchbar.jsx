import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import styles from './Search.module.css';
import musicart from '../../assets/musicart.png'

function SearchBar({ currentRoute }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Sync search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlSearchQuery = searchParams.get('search') || '';
    setSearchQuery(urlSearchQuery);
  }, [location.search]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    navigate(`/?search=${encodeURIComponent(value)}`);
  };

  const handleSearchBarFocus = () => {
    navigate('/');
  };

  return (
    <div>
      {currentRoute === 'login' || currentRoute === 'thanks' || currentRoute === 'signup' || currentRoute === 'invoice' ||  currentRoute === 'checkout' ? (
        <div className={styles.header}>
            <div className={styles.img_container}>
                <img src={musicart} alt="musicartlogo" />
            </div>
            <h1 className={styles.h1}>Musicart</h1>
        </div>
      ) : (
        <div className={styles.searchBar}>
          <CiSearch size={25} className={styles.icon} />
          <input
            type="text"
            placeholder="Search Musicart"
            onFocus={handleSearchBarFocus}
            onChange={handleSearchChange}
            value={searchQuery}
            style={{ color: '#000', backgroundColor: 'white' }}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;

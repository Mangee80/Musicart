import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import styles from './Search.module.css';
import musicart from '../../assets/musicart.png'

function SearchBar({ currentRoute }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    navigate(`/?search=${encodeURIComponent(event.target.value)}`);
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
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;

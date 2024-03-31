import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import styles from './Search.module.css';

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
      {currentRoute === '/login' || currentRoute === '/cart' ? (
        <div className="divA">
          {/* Content for divA */}
        </div>
      ) : (
        <div className="divB">
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
        </div>
      )}
    </div>
  );
}

export default SearchBar;

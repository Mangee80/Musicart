import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Search.module.css'
import { CiSearch } from "react-icons/ci";

function SearchBar() {
  const navigate = useNavigate(); // Use useNavigate hook
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    navigate(`/?search=${encodeURIComponent(event.target.value)}`); // Update URL with search query using navigate
  };

  // Function to handle when search bar is focused
  const handleSearchBarFocus = () => {
    navigate('/'); // Navigate to the home route using navigate
  };

  return (
    <div className={styles.searchBar}>
      <CiSearch size={25} className={styles.icon}/>
      <input 
        type="text" 
        placeholder="Search Musicart"
        onFocus={handleSearchBarFocus} // Handle when search bar is focused
        onChange={handleSearchChange} 
        value={searchQuery} 
      />
    </div>
  );
}

export default SearchBar;

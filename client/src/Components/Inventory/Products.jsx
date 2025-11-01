import React, { useState, useEffect } from 'react';
import ProductGrid from '../ListAndGridView/Gridview';
import ProductList from '../ListAndGridView/Listview';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import { API_BASE_URL } from '../../config/apiConfig';

import banner from '../../assets/soundwave.png';
import banner2 from '../../assets/banner2.png'; // ✅ girl image

import headphone1 from '../../assets/h1.png';
import headphone2 from '../../assets/h2.png';
import headphone3 from '../../assets/h3.png';
import headphone4 from '../../assets/h4.png';

import { BsGridFill } from "react-icons/bs";
import { TfiViewListAlt } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";

function ProductSection() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const [sortLabel, setSortLabel] = useState('Sort');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    navigate(`/?search=${encodeURIComponent(event.target.value)}`);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
  };

  const handleSortChange = (option) => {
    setSelectedSortOption(option);
    setSortLabel(option || 'Sort');
    fetchSortedProducts(products, option);
  };

  const fetchProducts = (filters) => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search');

    let url, method;

    if (searchQuery) {
      url = `${API_BASE_URL}/api/products/search/${encodeURIComponent(searchQuery)}`;
      method = 'GET';
    } else if (Object.keys(filters).length > 0) {
      url = `${API_BASE_URL}/api/products/filter`;
      method = 'POST';
    } else {
      url = `${API_BASE_URL}/api/products/all`;
      method = 'GET';
    }

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: method === 'POST' ? JSON.stringify({ filters: filters }) : undefined
    })
    .then(response => response.json())
    .then(data => {
      console.log('Fetched products:', data);
      setProducts(data);
    })
    .catch(error => console.error('Error:', error));
  };

  const fetchSortedProducts = (products, sortOption) => {
    fetch(`${API_BASE_URL}/api/products/sort`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sortOption })
    })
    .then(response => response.json())
    .then(data => setProducts(data))
    .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    if (selectedSortOption) {
      fetchSortedProducts(selectedSortOption);
    } else {
      fetchProducts(selectedFilters);
    }
  }, [selectedFilters, selectedSortOption, searchQuery]);

  const filters = [
    { label: "Headphone Type", options: ["Featured", "In-Ear", "On-Ear", "Over-Ear"] },
    { label: "Company", options: ["Featured", "Sony", "Bose", "Apple", "Sennheiser", "Audio-Technica", "JBL"] },
    { label: "Colour", options: ["Featured", "Black", "White", "Blue"] },
    { label: "Price", options: ["Featured", "₹0 - ₹10,000", "₹10,000 - ₹20,000", "₹20,000 - ₹35,000", "₹35,000+"] }
  ];

  const sortBy = { label: "Sort by: Featured", options: ["Featured", "Price: Lowest", "Price: Highest", "Name: (A-Z)", "Name: (Z-A)"] };

  return (
    <div className="product-section">
      
      {/* 🔷 Banner Section */}
      <div className="container1">
        <img src={banner} alt="banner" />

        <div className="banner-right-image">
          <img src={banner2} alt="girl" />
        </div>

        <div className="headphone-circle-container">
          <div className="headphone-circle"><img src={headphone1} alt="HP1" /></div>
          <div className="headphone-circle"><img src={headphone2} alt="HP2" /></div>
          <div className="headphone-circle"><img src={headphone3} alt="HP3" /></div>
          <div className="headphone-circle"><img src={headphone4} alt="HP4" /></div>
        </div>

        <p className="bannerDetail">Grab upto 50% off on<br />Selected headphones</p>
      </div>

      {/* 🧩 Filter & Sort */}
      <div className='feturesSection'>
        {/* Left: View Buttons */}
        <div className="left-controls">
          <div className="view-buttons">
            <div 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <BsGridFill />
            </div>
            <div 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <TfiViewListAlt />
            </div>
          </div>
        </div>
        {/* Center: Search Bar */}
        <div className="center-search">
          <CiSearch size={22} className="icon-inline" />
          <input 
            type="text" 
            placeholder="Search by Product Name"
            onChange={handleSearchChange} 
            value={searchQuery} 
          />
        </div>
        {/* Right: Sort and Filters */}
        <div className="right-controls">
          <div className="sort-compact">
            <span className="sort-icon" title="Sort">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 7h14M5 12h10M7 17h6" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <select value={selectedSortOption} onChange={(e) => handleSortChange(e.target.value)}>
              <option value="" disabled>{sortLabel}</option>
              {sortBy.options.map((option, index) => (
                <option value={option} key={index}>{option}</option>
              ))}
            </select>
          </div>
          <div className="filters-group">
            <span className="filters-heading">Filters</span>
            {filters.map((filter, index) => (
              <select key={index} onChange={(e) => handleFilterChange(filter.label.replace(/\s/g, ""), e.target.value)}>
                <option value="">{filter.label}</option>
                {filter.options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            ))}
          </div>
        </div>
      </div>

      {/* 🧾 Product View */}
      <div className="product-list">
        {viewMode === 'grid' ? <ProductGrid musicGadgets={products} /> : <ProductList musicGadgets={products} />}
      </div>

    </div>
  );
}

export default ProductSection;
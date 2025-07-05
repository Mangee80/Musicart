import React, { useState, useEffect } from 'react';
import ProductGrid from '../ListAndGridView/Gridview';
import ProductList from '../ListAndGridView/Listview';
import { useNavigate } from 'react-router-dom';
import './Products.css';

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
    fetchSortedProducts(products, option);
  };

  const fetchProducts = (filters) => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search');

    let url, method;

    if (searchQuery) {
      url = `https://musicart-9bam.vercel.app/api/products/search/${encodeURIComponent(searchQuery)}`;
      method = 'GET';
    } else if (Object.keys(filters).length > 0) {
      url = 'https://musicart-9bam.vercel.app/api/products/filter';
      method = 'POST';
    } else {
      url = 'https://musicart-9bam.vercel.app/api/products/all';
      method = 'GET';
    }

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: method === 'POST' ? JSON.stringify({ filters }) : undefined
    })
    .then(response => response.json())
    .then(data => setProducts(data))
    .catch(error => console.error('Error:', error));
  };

  const fetchSortedProducts = (products, sortOption) => {
    fetch('https://musicart-9bam.vercel.app/api/products/sort', {
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
    { label: "Headphone Type", options: ["Featured", "In-ear headphone", "On-ear headphone", "Over-ear headphone"] },
    { label: "Company", options: ["Featured", "JBL", "Sony", "Boat", "Zebronics", "Marshall", "Ptron"] },
    { label: "Colour", options: ["Featured", "Blue", "Black", "White", "Brown"] },
    { label: "Price", options: ["Featured", "₹0 - ₹1,000", "₹1,000 - ₹10,000", "₹10,000 - ₹20,000"] }
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

      {/* 🔍 Search Bar */}
      <CiSearch size={25} className="icon" />
      <input 
        type="text" 
        placeholder="Search by Product Name"
        onChange={handleSearchChange} 
        value={searchQuery} 
      />

      {/* 🧩 Filter & Sort */}
      <div className='feturesSection'>
        <div style={{ display: 'flex', width: '80%' }}>
          <div className="view-buttons">
            <div onClick={() => setViewMode('grid')}><BsGridFill /></div>
            <div onClick={() => setViewMode('list')}><TfiViewListAlt /></div>
          </div>

          <div className="filter-section">
            {filters.map((filter, index) => (
              <div key={index}>
                <select onChange={(e) => handleFilterChange(filter.label.replace(/\s/g, ""), e.target.value)}>
                  <option value="">{filter.label}</option>
                  {filter.options.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: '20%' }}>
          <div className="sort-by">
            <select onChange={(e) => handleSortChange(e.target.value)}>
              <option value="" disabled selected>{sortBy.label}</option>
              {sortBy.options.map((option, index) => (
                <option value={option} key={index}>{option}</option>
              ))}
            </select>
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
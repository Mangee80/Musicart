import React, { useState, useEffect } from 'react';
import ProductGrid from '../ListAndGridView/Gridview';
import ProductList from '../ListAndGridView/Listview';
import { useNavigate } from 'react-router-dom';
import './Products.css'

import banner from '../../assets/banner.png';
import FeedbackForm from '../ListAndGridView/FeedbackForm';
import banner2 from '../../assets/banner2.png';
import { BsGridFill } from "react-icons/bs";
import { TfiViewListAlt } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import feedback from "../../assets/feedback.png"
function ProductSection() {
  
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    navigate(`/?search=${encodeURIComponent(event.target.value)}`); // Update URL with search query using navigate
  };

   // Function to handle filter select change
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
  };
  const handleSortChange = (option) => {
    setSelectedSortOption(option);
    fetchSortedProducts(products, option);
  };
  // Function to fetch products based on selected filters and sorting option
  // Function to fetch products based on selected filters, sorting option, and search query
  const fetchProducts = (filters) => {
    // Get the search query from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search');
    
    let url;
    let method;
    
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: method === 'POST' ? JSON.stringify({ filters }) : undefined
    })
    .then(response => response.json())
    .then(data => {
      setProducts(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };


  // Function to fetch sorted products based on sort option
  const fetchSortedProducts = (products, sortOption) => {
    fetch('https://musicart-9bam.vercel.app/api/products/sort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sortOption })
    })
    .then(response => response.json())
    .then(data => {
      // Update products state with sorted products
      setProducts(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

 // Fetch all products when component mounts
 useEffect(() => {
    if (selectedSortOption) {
      fetchSortedProducts(selectedSortOption);
    } else {
      fetchProducts(selectedFilters);
    }
  }, [selectedFilters, selectedSortOption]); // Run effect whenever selectedFilters or selectedSortOption changes


  // Define arrays for filter options
  const filters = [
    { label: "Headphone Type", options: ["Featured", "In-ear headphone", "On-ear headphone", "Over-ear headphone"] },
    { label: "Company", options: ["Featured", "JBL", "Sony", "Boat", "Zebronics", "Marshall", "Ptron"] },
    { label: "Colour", options: ["Featured", "Blue", "Black", "White", "Brown"] },
    { label: "Price", options: ["Featured", "₹0 - ₹1,000", "₹1,000 - ₹10,000", "₹10,000 - ₹20,000"] }
  ];
  const sortBy = { label: "Sort by: Featured", options: ["Featured", "Price: Lowest", "Price: Highest", "Name: (A-Z)", "Name: (Z-A)"] };

  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="product-section">
      <div className="container1">
          <img src={banner} alt="banner" />
      </div>
      <div className="container2">
          <img src={banner2} alt="banner2" />
      </div>
      <p className='bannerDetail'>Grab upto 50% off on Selected headphones</p>
      {/* Searchbar */}
      <CiSearch size={25} className="icon"/>
      <input 
        type="text" 
        placeholder="Search by Product Name"
        onChange={handleSearchChange} 
        value={searchQuery} 
      />

      <div className='feturesSection'>
        {/* View Buttons */}
        <div className="view-buttons">
          <div onClick={() => setViewMode('grid')}><BsGridFill /></div>
          <div onClick={() => setViewMode('list')}><TfiViewListAlt /></div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          {filters.map((filter, index) => (
            <div key={index} className={`${filter.label.toLowerCase().replace(" ", "-")}`}>
              <select onChange={(e) => handleFilterChange(filter.label.replace(/\s/g, ""), e.target.value)}>
                <option value="">{`${filter.label}`}</option>
                {filter.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Sort By Select Menu */}
        <div className="sort-by">
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="" disabled selected>{sortBy.label}</option>
            {sortBy.options.map((option, index) => (
              <option value={option} key={index}>{option}</option>
            ))}
          </select>
        </div>


      </div> 
      <div className="feedback" onClick={toggleForm}>
        <img src={feedback} alt="feedback" />
        {showForm && <FeedbackForm onClose={toggleForm} />}
      </div>

      {/* Product Listing based on view mode */}
      <div className="product-list">
        {viewMode === 'grid' ? <ProductGrid musicGadgets={products} /> : <ProductList musicGadgets={products} />}
      </div>

    </div>
  );
}

export default ProductSection;
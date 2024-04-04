import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Set initial selectedImage to null

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };  
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/product/${id}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              setProduct(data);
              setSelectedImage(data.imageUrl); // Set selectedImage after product data is fetched
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
  }, [id]);

  if (!product) {
      return <div>Loading...</div>;
  }
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStar key={i} style={{ color: 'rgba(255, 214, 0, 1)' }} />);
    }
  
    if (hasHalfStar) {
      stars.push(<IoStarHalf key={fullStars} style={{ color: 'rgba(255, 214, 0, 1)' }} />);
    }
  
    return stars;
  };


  return (
    <div className={styles.productDetailsContainer}>
      <button className={styles.backtoProduct}>Back to products</button>

      <p className={styles.featureHeading}>{product.featureHeading}</p>
      <div className={styles.imageInfoContainer}>
        <div>
          <div className={styles.productMainImage}>
            <img src={selectedImage} alt={product.model} />
          </div>
          <div className={styles.productImagesContainer}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.model}
                className={selectedImage === image ? styles.selected : ''}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productName}>{product.Company}<span>{product.model}</span></p>
          <div className={styles.reviews}>
            <div>
              {renderStars(product.reviews.overallRating)}
            </div>
            <p style={{marginTop: '1px', marginLeft: '10px'}}>({product.reviews.totalReviews} Customer reviews)</p>
          </div>          
          <p style={{fontSize: '1.1rem', fontWeight: '500', marginTop: '5px',marginBottom: '5px'}}><strong>Price:</strong> {product.Price}</p>
          <p style={{fontSize: '1.1rem', fontWeight: '300', marginTop: '5px',marginBottom: '10px'}}>{product.Colour}<span style={{ margin: '0rem 0.5rem' }}>|</span>{product.HeadphoneType}</p>
                    
          <p>About this item</p>
          <ul className={styles.detailsList}>
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <p style={{fontSize: '1.1rem', marginTop: '2rem',marginBottom: '5px'}}><span style={{fontWeight: '500'}}>Available</span> - In Stock</p>
          <p style={{fontSize: '1.1rem', marginTop: '7px'}}><span style={{fontWeight: '500'}}>Brand</span> - {product.Company}</p>
          <div className={styles.buttons}>
            <button>Add to cart</button>
            <button style={{backgroundColor: 'rgba(255, 184, 0, 1)'}}>Buy Now</button>            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

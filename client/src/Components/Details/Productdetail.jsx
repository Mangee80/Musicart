import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";

const ProductDetail = () => {
  // const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Set initial selectedImage to null

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };  
  const productId = '6605d6ebb0a5937dd5f8bc62';
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/product/${productId}`)
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
  }, [productId]);

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
      <button>xyz</button>

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
          <div style={{display: 'flex', gap: '0.5rem', flexDirection: 'column'}}>
            <button>yzx</button>
            <button>zxy</button>            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

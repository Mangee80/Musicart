import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import ReviewComponent from '../Review/ShowReview'
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import  Reviewform from "../Review/ReviewForm"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Set initial selectedImage to null

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };  
  
  useEffect(() => {
    fetch(`https://musicart-9bam.vercel.app/api/products/product/${id}`)
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

  const addToCart = async () => {
    try {
      const userId = localStorage.getItem('userID');
      if (!userId) {
        // If user is not logged in, navigate to the login route
        navigate('/login');
        return;
      }

      // Construct the fetch request to add item to cart
      const response = await fetch('https://musicart-9bam.vercel.app/api/cart/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id, quantity: 1, userId }),
      });

      if (response.ok) {
        // If item added to cart successfully, you can provide feedback to the user
        console.log('Item added to cart successfully');
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBuyNow = () => {
    // Call addToCart function to add item to cart
    addToCart();

    // After adding item to cart, navigate to the cart page
    navigate('/cart');
  };
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.productDetailsContainer}>
      <button onClick= {handleBack} className={styles.backtoProduct}>Back to products</button>
      <IoArrowBack onClick= {handleBack} className={styles.backbutton}/>
      <p className={styles.featureHeading}>{product.featureHeading}</p>
      <div style={{display: 'flex'}}>
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
            <div className={styles.responsiveproductDetailsContainer}>
              {/* Carousel Component */}
              <Carousel
                showArrows={false}
                dynamicHeight={true}
                showStatus={false} // Hides the current image counter
                showIndicators={true} // Shows the dots at the bottom
                showThumbs={false} // Hides thumbnail strip at the bottom
                selectedItem={0} // Index of the image to start with
                useKeyboardArrows={true} // Allows arrow key navigation
                swipeable={true} // Allows swipe action on touch devices
                emulateTouch={true} // Allows swipe action on mouse click and drag
              >
                {product.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={product.model} />
                  </div>
                ))}
              </Carousel>
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
            <p className={styles.responsivefeatureHeading}>{product.featureHeading}</p>         
            <p className={styles.prices} style={{ fontWeight: '500', marginTop: '5px',marginBottom: '5px'}}><strong>Price:</strong> ₹{product.Price}</p>
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
              <button onClick={addToCart}>Add to cart</button>
              <button style={{ backgroundColor: 'rgba(255, 184, 0, 1)' }} onClick={handleBuyNow}>Buy Now</button>            
            </div>
          </div>
        </div>
        <div className={styles.review}>
          <ReviewComponent /> <Reviewform />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

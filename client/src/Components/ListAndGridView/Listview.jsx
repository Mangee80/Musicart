import React from 'react';
import styles from './ProductList.module.css';

export const ProductList = ({musicGadgets}) => {

  return (
    <ul className={styles.productList}>
      {musicGadgets.map((gadget) => (
        <li key={gadget._id} className={styles.productItem}>
          <div className={styles.productImage}>
            <img src={gadget.imageUrl} alt={`${gadget.Company} ${gadget.model}`} />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>
              <span>{gadget.Company}</span>
              <span className={styles.productNameSpace}></span>
              <span>{gadget.model}</span>
            </h3>
            <p className={styles.productPrice}>₹{gadget.Price}</p>
            <p className={styles.productColor}>{gadget.Colour}<span style={{ margin: '0rem 0.5rem' }}>|</span>{gadget.HeadphoneType}</p>
            <p className={styles.itemDetail}>{gadget.featureHeading}</p>
            <button></button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ProductList;
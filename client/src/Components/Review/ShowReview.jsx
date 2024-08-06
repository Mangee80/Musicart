// ReviewComponent.js
import React from 'react';
import styles from './ReviewComponent.module.css'; // Import the CSS module
import { VscVerified } from "react-icons/vsc";
import { LuThumbsDown } from "react-icons/lu";
import { LuThumbsUp } from "react-icons/lu";
import profile from '../../assets/userprofile.png'
const ReviewComponent = ({ review }) => {
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.userInfo}>
        <div style={{display: 'flex', flex:'1'}}>
          <img src={profile} className={styles.avatar} />
          <div className={styles.userName}>John Doe</div>
        </div>
        <div className={styles.totalRating}>★★★★☆</div>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{flex:'1'}} className={styles.boldHeading}>Cool</div>
        <span className={styles.certifiedUser}><VscVerified style={{ fontWeight: 700, fontSize: '1rem' }} size={18}  /> Verified User</span>
      </div>
      <div className={styles.detailedReview}>{review}</div>
      <div className={styles.footer}>
        <span className={styles.reviewDate}>May 8, 2024</span>
        <div className={styles.likeDislike}>
          <LuThumbsUp />
          <LuThumbsDown />
        </div>
      </div>
    
    </div>
  );
};

export default ReviewComponent;

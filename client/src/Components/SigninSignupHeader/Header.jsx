import React from 'react'
import styles from './header.module.css';

import musicart from '../../assets/musicart.png'

const Header = () => {
  return (
    
    <div className={styles.header}>
        <div className={styles.img_container}>
            <img src={musicart} alt="musicartlogo" />
        </div>
        <h1 className={styles.h1}>Musicart</h1>
    </div>

  )
}
export default Header;
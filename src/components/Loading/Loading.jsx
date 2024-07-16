import React from 'react';
import styles from './css/Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}>
        <div className={styles.upperHalf}></div>
        <div className={styles.lowerHalf}></div>
        <div className={styles.centerCircle}></div>
        <div className={styles.centerButton}></div>
      </div>
      
      <p>Loading...</p>
    </div>
  );
};

export default Loading;

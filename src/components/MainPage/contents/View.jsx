import React from 'react';
import styles from './css/View.module.css';

export default function View() {
  const getSparkleClass = (index) => {
    const classes = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    return classes[Math.floor(index / 4)];
  };

  return (
    <div className={styles.container}>
      <ul className={styles.moon}>
        <li className={styles.crater}></li>
        <li className={styles.crater}></li>
        <li className={styles.crater}></li>
      </ul>
      <ul className={styles.mountainRange}>
        {Array(11).fill().map((_, index) => (
          <li key={index} className={styles.mountain}></li>
        ))}
      </ul>
      <ul className={styles.forest}>
        {Array(3).fill().map((_, index) => (
          <li key={index} className={styles.hill}></li>
        ))}
      </ul>
      <ul className={styles.sparkles}>
        {Array(32).fill().map((_, index) => (
          <li key={index} className={`${styles.sparkle} ${styles[getSparkleClass(index)]}`}></li>
        ))}
      </ul>
      <div className={styles.grass}>
        <div className={styles.pokemon}>
          <div className={styles.poke} id="bulbasaur">
            <div className={styles.ear}></div>
            <div className={styles.ear}></div>
            <div className={styles.head}></div>
            <div className={styles.leg}></div>
            <div className={styles.bulbaBody}></div>
            <div className={styles.bulbs}>
              <div className={styles.bulb}></div>
            </div>
          </div>
          <div className={styles.poke} id="pikachu">
            <div className={styles.ear}></div>
            <div className={styles.ear}></div>
            <div className={styles.hand}></div>
            <div className={styles.pikaBody}></div>
            <div className={styles.head}></div>
            <div className={styles.pikaTail}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

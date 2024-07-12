// Encyclopedia.jsx

import React from 'react';
import styles from './css/encyclopedia.module.css'; // CSS Modules 스타일을 불러옵니다

export default function Encyclopedia() {
  return (
    <html>
      <h1>Pokemon Card Encyclopedia (TCG)</h1>
      <div className={styles.container}>
        <div className={styles.colorlessContainer}>
        <div className={`${styles.typeContainer} ${styles.colorless}`}>
          <div className={styles.colorlessImage}></div>
        </div>
          <p>Colorless</p>
        </div>
        <div className={styles.darknessContainer}>
        <div className={`${styles.typeContainer} ${styles.darkness}`}>
          <div className={styles.darknessImage}></div>
        </div>
          <p>Darkness</p>
</div>
<div className={styles.dragonContainer}>
        <div className={`${styles.typeContainer} ${styles.dragon}`}>
          <div className={styles.dragonImage}></div>
        </div>
          <p>Dragon</p>
</div>
<div className={styles.fairyContainer}>
        <div className={`${styles.typeContainer} ${styles.fairy}`}>
          <div className={styles.fairyImage}></div>
        </div>
          <p>Fairy</p>
</div>
<div className={styles.fightingContainer}>
        <div className={`${styles.typeContainer} ${styles.fighting}`}>
          <div className={styles.fightingImage}></div>
        </div>
          <p>Fighting</p>
</div>
<div className={styles.fireContainer}>
        <div className={`${styles.typeContainer} ${styles.fire}`}>
          <div className={styles.fireImage}></div>
        </div>
          <p>Fire</p>
</div>
<div className={styles.grassContainer}>
        <div className={`${styles.typeContainer} ${styles.grass}`}>
          <div className={styles.grassImage}></div>
        </div>
          <p>Grass</p>
</div>
<div className={styles.lightningContainer}>
        <div className={`${styles.typeContainer} ${styles.lightning}`}>
          <div className={styles.lightningImage}></div>
        </div>
          <p>Lightning</p>
</div>
<div className={styles.metalContainer}>
        <div className={`${styles.typeContainer} ${styles.metal}`}>
          <div className={styles.metalImage}></div>
        </div>
          <p>Metal</p>
</div>
<div className={styles.psychicContainer}>
        <div className={`${styles.typeContainer} ${styles.psychic}`}>
          <div className={styles.psychicImage}></div>
        </div>
          <p>Psychic</p>
</div>
<div className={styles.waterContainer}>
        <div className={`${styles.typeContainer} ${styles.water}`}>
          <div className={styles.waterImage}></div>
        </div>
          <p>Water</p>
          </div>
      </div>
    </html>
  );
}

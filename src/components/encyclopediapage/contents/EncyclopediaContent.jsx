// Encyclopedia.jsx

import React from 'react';
import styles from './css/encyclopedia.module.css'; // CSS Modules 스타일을 불러옵니다

export default function Encyclopedia() {
  return (
    <html>
      <h1>Pokemon Card Encyclopedia (TCG)</h1>
      <div className={styles.container}>
        <div className={styles.colorlessContainer}>
        <a href='colorless'className={`${styles.typeContainer} ${styles.colorless}`}>
          <div className={styles.colorlessImage}></div>
        </a>
          <p>Colorless</p>
        </div>
        <div className={styles.darknessContainer}>
        <a href='darkness' className={`${styles.typeContainer} ${styles.darkness}`}>
          <div className={styles.darknessImage}></div>
        </a>
          <p>Darkness</p>
</div>
<div className={styles.dragonContainer}>
        <a href='dragon' className={`${styles.typeContainer} ${styles.dragon}`}>
          <div className={styles.dragonImage}></div>
        </a>
          <p>Dragon</p>
</div>
<div className={styles.fairyContainer}>
        <a href='fairy' className={`${styles.typeContainer} ${styles.fairy}`}>
          <div className={styles.fairyImage}></div>
        </a>
          <p>Fairy</p>
</div>
<div className={styles.fightingContainer}>
        <a href='fighting' className={`${styles.typeContainer} ${styles.fighting}`}>
          <div className={styles.fightingImage}></div>
        </a>
          <p>Fighting</p>
</div>
<div className={styles.fireContainer}>
        <a href='fire' className={`${styles.typeContainer} ${styles.fire}`}>
          <div className={styles.fireImage}></div>
        </a>
          <p>Fire</p>
</div>
<div className={styles.grassContainer}>
        <a href='grass' className={`${styles.typeContainer} ${styles.grass}`}>
          <div className={styles.grassImage}></div>
        </a>
          <p>Grass</p>
</div>
<div className={styles.lightningContainer}>
        <a href='lightning' className={`${styles.typeContainer} ${styles.lightning}`}>
          <div className={styles.lightningImage}></div>
        </a>
          <p>Lightning</p>
</div>
<div className={styles.metalContainer}>
        <a href='metal' className={`${styles.typeContainer} ${styles.metal}`}>
          <div className={styles.metalImage}></div>
        </a>
          <p>Metal</p>
</div>
<div className={styles.psychicContainer}>
        <a href='psychic' className={`${styles.typeContainer} ${styles.psychic}`}>
          <div className={styles.psychicImage}></div>
        </a>
          <p>Psychic</p>
</div>
<div className={styles.waterContainer}>
        <a href='water' className={`${styles.typeContainer} ${styles.water}`}>
          <div className={styles.waterImage}></div>
        </a>
          <p>Water</p>
          </div>
      </div>
      <div className={styles.pokemonImage}>
        <span>z...z..zZz...       </span>
      </div>
    </html>
  );
}

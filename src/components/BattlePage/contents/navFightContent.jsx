import React from 'react';
import styles from './css/fight.module.css';

const FightNavBar = ({ types, typeBackgroundImages, handleTypeClick }) => {
  const typeColors = {
    Colorless: '#949495',
    Darkness: '#4C4948',
    Dragon: '#535CA8',
    Fairy: '#DAB4D4',
    Fighting: '#E09C40',
    Fire: '#E56C3E',
    Grass: '#66A945',
    Lightning: '#FBB917',
    Metal: '#69A9C7',
    Psychic: '#DD6B7B',
    Water: '#5185C5',
  };

  return (
    <div className={styles.nav}>
      {/* 모든 타입 */}
      <div className={styles.allTypeBtn}>
        <a href="#" onClick={() => handleTypeClick('')} className={styles.allTypes}></a><p className={styles.customFont}>all</p>
      </div>

      {/* 각 타입 */}
      {types.map(type => (
        <div key={type} className={styles.typeContainer}>
          <div className={styles.navTypesAll}>
            <div>
              {/* <div className={styles.navTypes} style={{ backgroundColor: typeColors[type] }}> */}
                <div className={styles.navTypes}>
                <a
                  href="#"
                  onClick={() => handleTypeClick(type)}
                  style={{ backgroundImage: typeBackgroundImages[type] }}
                  className={styles.typeLink}
                  ></a>
              </div>
            </div>
            <p className={`${styles.typeName} ${styles[type]} ${styles.customFont}`}>{type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FightNavBar;
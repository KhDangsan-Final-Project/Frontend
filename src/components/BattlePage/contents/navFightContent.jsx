import React from 'react';
import styles from './css/fight.module.css';

const NavFightContent = ({ types, handleTypeClick, selectedType, typeBackgroundImages }) => {

  const handleClick = (type) => {
    if (selectedType === type) {
      handleTypeClick(''); 
    } else {
      handleTypeClick(type);
    }
  };

  return (
    <div className={styles.nav}>
      {/* 각 타입 버튼 */}
      {types.map(type => (
        <div key={type} className={styles.typeContainer}>
          <div className={styles.navTypesAll}>
            <div>
              <div className={styles.navTypes}>
                <a
                  href="#"
                  onClick={() => handleClick(type)}
                  style={{ backgroundImage: typeBackgroundImages[type] }}
                  className={`${styles.typeLink} ${selectedType === type ? styles.selected : ''}`}
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

export default NavFightContent;

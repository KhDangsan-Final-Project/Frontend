import React, { useState, useEffect } from 'react';
import styles from './css/SliderText.module.css';

export default function SliderText({ pokemonData }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pokemonData.length);
  const handlePrev = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + pokemonData.length) % pokemonData.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pokemonData.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [pokemonData.length]);

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        {pokemonData.map((pokemon, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentImageIndex ? styles['slide-active'] : styles['slide-exit']}`}
          >
            <div className={styles.textContainer}>
              <div className={`${styles.header} ${styles[`${pokemon.name}Text`]}`}>
                {pokemon.name}
              </div>
              <h2 className={`${styles.type} ${styles[`${pokemon.name}Text`]}`}>{pokemon.type} 타입</h2>
              <div className={styles.description}>{pokemon.description}</div>
            </div>
          </div>
        ))}
        <div className={styles.slide}>
          <div className={styles.noneSliderContainer}>
            <div className={styles.categoryTitle}>Category</div>
            <div className={styles.categoryTitle}>Ability</div>
          </div>
        </div>
        {pokemonData.map((pokemon, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentImageIndex ? styles['slide-active'] : styles['slide-exit']}`}
          >
            <div className={styles.category}>
              <div className={styles.subtext}>{pokemon.category}</div>
              <div className={styles.subtext}>{pokemon.ability}</div>
            </div>
          </div>
        ))}
        {pokemonData.map((pokemon, index) => (
          <div
            key={index}
            className={`${styles.slide2} ${index === currentImageIndex ? styles['slide-active2'] : styles['slide-exit2']}`}
          >
            <div
              className={styles.imageContainer}
              style={{ backgroundColor: pokemon.backgroundColor }}
            >
              <img src={pokemon.image} alt={pokemon.name} className={styles.pokemonImage} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles.arrow} onClick={handlePrev}>⬅</button>
        <button className={styles.arrow} onClick={handleNext}>➡</button>
      </div>
    </div>
  );
}

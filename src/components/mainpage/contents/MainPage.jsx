import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/MainPage.module.css';

const pokemonNames = ['pikachu', 'charmander', 'meltan'];
const pokemonKoreanNames = { pikachu: '피카츄', charmander: '파이리', meltan: '멜탄' };
const pokemonTypeTranslations = { electric: '전기', fire: '불꽃', steel: '강철' };

export default function MainPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const dataPromises = pokemonNames.map(async (name) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const speciesResponse = await axios.get(response.data.species.url);
        const description = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'ko').flavor_text;
        const category = speciesResponse.data.genera.find(genus => genus.language.name === 'ko').genus;
        const type = response.data.types.map(typeInfo => pokemonTypeTranslations[typeInfo.type.name] || typeInfo.type.name).join(', ');
        const abilities = response.data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

        return {
          image: response.data.sprites.front_default,
          name: pokemonKoreanNames[name],
          type,
          description,
          category,
          abilities,
          className: `${name}Wrapper`,
          textClassName: `${name}Text`
        };
      });

      const data = await Promise.all(dataPromises);
      setPokemonData(data);
    };

    fetchPokemonData();
  }, []);

  const handleNext = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pokemonData.length);
  const handlePrev = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + pokemonData.length) % pokemonData.length);

  return (
    <div className={styles.container}>
      <div className={styles.sliderWrapper}>
        <div className={styles.slider} style={{ transform: `translateY(-${currentImageIndex * 100}vh)` }}>
          {pokemonData.map((pokemon, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.textContainer}>
                <header className={`${styles.header} ${styles[pokemon.textClassName]}`}>{pokemon.name}</header>
                <h2 className={`${styles.type} ${styles[pokemon.textClassName]}`}>{pokemon.type}</h2>
                <div className={styles.description}>{pokemon.description}</div>
                <footer className={styles.footer}>
                  <div>카테고리: {pokemon.category}</div>
                  <div>능력: {pokemon.abilities}</div>
                </footer>
              </div>
              <div className={`${styles.imageContainer} ${styles.right}`}>
                <div className={`${styles.imageWrapper} ${styles[pokemon.className]}`}>
                  <img src={pokemon.image} alt={pokemon.name} className={styles.pokemonImage} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.arrow} onClick={handlePrev}>⬅</button>
        <button className={styles.arrow} onClick={handleNext}>➡</button>
      </div>
    </div>
  );
}

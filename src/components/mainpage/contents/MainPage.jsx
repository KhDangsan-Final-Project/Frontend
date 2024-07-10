import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/MainPage.module.css';

const pokemonNames = ['pikachu', 'charmander', 'meltan'];
const pokemonKoreanNames = { pikachu: '피카츄', charmander: '파이리', meltan: '멜탄' };
const pokemonTypeTranslations = { electric: '전기', fire: '불꽃', steel: '강철' };

export default function MainPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const data = await Promise.all(pokemonNames.map(async (name) => {
        const { data: pokemon } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const { data: species } = await axios.get(pokemon.species.url);

        const description = species.flavor_text_entries.find(entry => entry.language.name === 'ko').flavor_text;
        const category = species.genera.find(genus => genus.language.name === 'ko').genus;
        const type = pokemon.types.map(typeInfo => pokemonTypeTranslations[typeInfo.type.name] || typeInfo.type.name).join(', ');
        const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
        const image = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

        return {
          id: pokemon.id,
          image,
          name: pokemonKoreanNames[name],
          type,
          description,
          category,
          abilities,
        };
      }));

      setPokemonData(data);
    };

    fetchPokemonData();
  }, []);

  const handleNext = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pokemonData.length);
  const handlePrev = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + pokemonData.length) % pokemonData.length);

  return (
    <div className={styles.container}>
      <div className={styles.sliderWrapper}>
        <div className={styles.slider}>
          {pokemonData.map((pokemon, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === currentImageIndex ? styles['slide-active'] : styles['slide-exit']}`}
            >
              <div className={styles.textContainer}>
                <div className={`${styles.header} ${styles[`${pokemonNames[index]}Text`]}`}>
                  {pokemon.name}
                </div>
                <h2 className={`${styles.type} ${styles[`${pokemonNames[index]}Text`]}`}>{pokemon.type}</h2>
                <div className={styles.description}>{pokemon.description}</div>
                <footer className={styles.footer}>
                  <div>
                    <div className={`${styles.category} ${styles[`${pokemonNames[index]}Category`]}`}>카테고리</div>
                    <div>{pokemon.category}</div>
                  </div>
                  <div>
                    <div className={`${styles.category} ${styles[`${pokemonNames[index]}Category`]}`}>능력</div>
                    <div>{pokemon.abilities}</div>
                  </div>
                </footer>
              </div>
              <div className={styles.imageContainer}>
                <div className={`${styles.imageWrapper} ${styles[`${pokemonNames[index]}Wrapper`]}`}>
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

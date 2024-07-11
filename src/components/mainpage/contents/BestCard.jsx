import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/BestCard.module.css';

const API_URL = 'https://api.pokemontcg.io/v2/cards';

export default function BestCard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const pokemonNames = ['pikachu', 'squirtle', 'bulbasaur', 'charmander'];
      const requests = pokemonNames.map(name => 
        axios.get(API_URL, {
          params: {
            q: `name:${name}`,
            pageSize: 20
          }
        })
      );

      const responses = await Promise.all(requests);
      const fetchedCards = responses.map(response => response.data.data[5]);
      setCards(fetchedCards);
    };

    fetchCards();
  }, []);

  return (
    <div className={styles.bestCardContainer}>
      <header className={styles.header}>인기 카드</header>
      <div className={styles.cards}>
        {cards.map((card) => (
          <div key={card.id} className={`${styles.card} ${styles[card.types[0].toLowerCase()]}`}>
            <div className={styles.cardContent}>
              <img className={styles.pokeimg} src={card.images.large} alt={card.name} />
              <div className={styles.cardInfo}>
                <h2>{card.name}</h2>
                <p>번호: #{card.number}</p>
                <p>서브타입: {card.subtypes.join(', ')}</p>
                <p>타입: {card.types.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

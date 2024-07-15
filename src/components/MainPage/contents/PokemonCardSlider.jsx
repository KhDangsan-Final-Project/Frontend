import React from 'react';
import usePokemonCards from './hook/usePokemonCards';
import styles from './css/PokemonCardSlider.module.css';
import Loading from '../../Loading/Loding';

const PokemonCardSlider = () => {
  const { cards, loading } = usePokemonCards();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>초심자 카드</h1>
      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <PokemonCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};  

const PokemonCard = ({ card }) => {
  const typeColorClass = styles[card.types[0].toLowerCase()];

  return (
    <div className={`${styles.card} ${typeColorClass}`}>
      <img src={card.images.large} alt={card.name} className={styles.cardImage} />
      <div className={styles.cardName}>{card.name}</div>
      <div className={styles.cardType}>{card.types[0]} 타입</div>
    </div>
  );
};

export default PokemonCardSlider;
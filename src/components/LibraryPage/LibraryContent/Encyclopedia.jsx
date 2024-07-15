import React, { useState } from 'react';
import usePokemonCards from './hook/usePokemonCards';
import usePokemonDetails from './hook/usePokemonDetails';
import styles from './css/Encyclopedia.module.css';

export default function Encyclopedia() {
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonCards = usePokemonCards(currentPage);
    const pokemonDetails = usePokemonDetails(pokemonCards);

    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

    return (
        <div className={styles.encyclopedia}>
            <div className={styles.none} />
            <h1 className={styles.title}>CARD LIBRARY</h1>
            <div className={styles.cardContainer}>
                {pokemonCards.map((card) => {
                    const detail = pokemonDetails[card.id] || {};
                    return (
                        <div className={styles.container} key={card.id}>
                            <div className={styles.cardImg}>
                                <img src={card.images.large} alt={card.name} className={styles.cardImage} />
                            </div>
                            <div className={styles.cardInfo}>
                                <div className={styles.cardName}>이름: {detail.name}</div>
                                <div className={styles.cardType}>타입: {detail.types}</div>
                                <div className={styles.cardAbility}>기술: {detail.abilities}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>이전</button>
                <button onClick={handleNextPage}>다음</button>
            </div>
        </div>
    );
}

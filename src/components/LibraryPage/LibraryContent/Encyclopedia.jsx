import React, { useState } from 'react';
import usePokemonCards from './hook/usePokemonCards';
import usePokemonDetails from './hook/usePokemonDetails';
import styles from './css/Encyclopedia.module.css';
import Loading from '../../Loading/Loding';

export default function Encyclopedia() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedType, setSelectedType] = useState('');
    const { pokemonCards, loading: cardsLoading } = usePokemonCards(currentPage, selectedType);
    const { pokemonDetails, loading: detailsLoading } = usePokemonDetails(pokemonCards);

    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    const handleTypeChange = (type) => {
        setSelectedType(type);
        setCurrentPage(1); // 타입 변경 시 페이지를 초기화합니다.
    };

    const isLoading = cardsLoading || detailsLoading;

    return (
        <div className={styles.encyclopedia}>
            <div className={styles.none}></div>
            <h1 className={styles.title}>CARD LIBRARY</h1>
            <div className={styles.typeContainer}>
                <button onClick={() => handleTypeChange('')} className={styles.typeButton}></button>
                <button onClick={() => handleTypeChange('Colorless')} className={styles.typeColorless}></button>
                <button onClick={() => handleTypeChange('Grass')} className={styles.typeGrass}></button>
                <button onClick={() => handleTypeChange('Fire')} className={styles.typeFire}></button>
                <button onClick={() => handleTypeChange('Water')} className={styles.typeWater}></button>
                <button onClick={() => handleTypeChange('Lightning')} className={styles.typeLightning}></button>
                <button onClick={() => handleTypeChange('Psychic')} className={styles.typePsychic}></button>
                <button onClick={() => handleTypeChange('Fighting')} className={styles.typeFighting}></button>
                <button onClick={() => handleTypeChange('Darkness')} className={styles.typeDarkness}></button>
                <button onClick={() => handleTypeChange('Metal')} className={styles.typeMetal}></button>
                <button onClick={() => handleTypeChange('Fairy')} className={styles.typeFairy}></button>
                <button onClick={() => handleTypeChange('Dragon')} className={styles.typeDragon}></button>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
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
            )}
            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>이전</button>
                <button onClick={handleNextPage}>다음</button>
            </div>
        </div>
    );
}

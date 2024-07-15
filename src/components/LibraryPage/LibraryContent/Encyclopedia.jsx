import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/Encyclopedia.module.css'; // Make sure to create and style this CSS module

const fetchPokemonCards = async (pageSize = 50, page = 1) => {
    const response = await axios.get(`https://api.pokemontcg.io/v2/cards?pageSize=${pageSize}&page=${page}`, {
    });
    return response.data.data;
};

export default function Encyclopedia() {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadPokemonCards = async () => {
            const cards = await fetchPokemonCards(50, currentPage);
            setPokemonCards(cards);
        };

        loadPokemonCards();
    }, [currentPage]);

    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

    return (
        <div className={styles.encyclopedia}>
            <h1 className={styles.title}>포켓 카드 백과사전</h1>
            <div className={styles.cardContainer}>
                {pokemonCards.map((card) => (
                    <img src={card.images.large} alt={card.name} className={styles.cardImage} />
                ))}
            </div>
            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>이전</button>
                <button onClick={handleNextPage}>다음</button>
            </div>
        </div>
    );
}

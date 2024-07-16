import { useState, useEffect } from 'react';
import fetchPokemonCards from './fetchPokemonCards';

const usePokemonCards = (currentPage, selectedType, pokemonId) => {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadPokemonCards = async () => {
            setLoading(true);
            try {
                const { cards, totalPages } = await fetchPokemonCards(currentPage, selectedType, pokemonId);
                setPokemonCards(cards);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Error fetching Pokémon cards:', error);
            }
            setLoading(false);
        };

        loadPokemonCards();
    }, [currentPage, selectedType, pokemonId]);

    return { pokemonCards, loading, totalPages };
};

export default usePokemonCards;

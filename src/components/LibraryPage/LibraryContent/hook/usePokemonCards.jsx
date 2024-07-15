import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchPokemonCards = async (startId, endId) => {
    const response = await axios.get(`https://api.pokemontcg.io/v2/cards`, {
        params: {
            q: `nationalPokedexNumbers:[${startId} TO ${endId}]`,
            pageSize: endId - startId + 1
        }
    });
    return response.data.data;
};

const usePokemonCards = (currentPage) => {
    const [pokemonCards, setPokemonCards] = useState([]);

    useEffect(() => {
        const loadPokemonCards = async () => {
            const startId = (currentPage - 1) * 50 + 1;
            const endId = currentPage * 50;
            const cards = await fetchPokemonCards(startId, endId);
            setPokemonCards(cards);
        };

        loadPokemonCards();
    }, [currentPage]);

    return pokemonCards;
};

export default usePokemonCards;

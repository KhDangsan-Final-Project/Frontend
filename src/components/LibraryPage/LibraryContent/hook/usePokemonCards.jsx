import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchPokemonCards = async (currentPage, selectedType) => {
    const startId = (currentPage - 1) * 25 + 1;
    const endId = currentPage * 25;
    const query = selectedType
        ? `types:${selectedType}`
        : `nationalPokedexNumbers:[${startId} TO ${endId}]`;

    const response = await axios.get(`https://api.pokemontcg.io/v2/cards`, {
        params: {
            q: query,
            pageSize: 25
        }
    });
    return response.data.data;
};

const usePokemonCards = (currentPage, selectedType) => {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPokemonCards = async () => {
            setLoading(true);
            const cards = await fetchPokemonCards(currentPage, selectedType);
            setPokemonCards(cards);
            setLoading(false);
        };

        loadPokemonCards();
    }, [currentPage, selectedType]);

    return { pokemonCards, loading };
};

export default usePokemonCards;

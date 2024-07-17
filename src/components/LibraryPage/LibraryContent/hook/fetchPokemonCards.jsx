import axios from 'axios';

const fetchPokemonCards = async (currentPage, selectedType, pokemonId) => {
    const startId = (currentPage - 1) * 25 + 1;
    const endId = currentPage * 25;
    let query = selectedType
        ? `types:${selectedType}`
        : `nationalPokedexNumbers:[${startId} TO ${endId}]`;

    if (pokemonId) {
        query = `nationalPokedexNumbers:${pokemonId}`;
    }

    try {
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards`, {
            params: {
                q: query,
                pageSize: 25
            }
        });
        const totalCards = response.data.totalCount;
        const totalPages = Math.ceil(totalCards / 25);
        return {
            cards: response.data.data,
            totalPages
        };
    } catch (error) {
        console.error('Error fetching Pokémon cards:', error);
        throw error;
    }
};

export default fetchPokemonCards;

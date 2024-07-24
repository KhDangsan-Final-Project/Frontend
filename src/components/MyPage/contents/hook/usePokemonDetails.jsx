import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchTypeInKorean = async (typeUrl) => {
    try {
        const { data: typeData } = await axios.get(typeUrl);
        const koreanName = typeData.names.find(name => name.language.name === 'ko')?.name;
        return koreanName || typeData.name;  // Default to English name if Korean name is not found
    } catch (error) {
        console.error('Error fetching type data:', error);
        return 'Unknown';
    }
};

const fetchAbilityInKorean = async (abilityUrl) => {
    try {
        const { data: abilityData } = await axios.get(abilityUrl);
        const koreanName = abilityData.names.find(name => name.language.name === 'ko')?.name;
        return koreanName || abilityData.name;  // Default to English name if Korean name is not found
    } catch (error) {
        console.error('Error fetching ability data:', error);
        return 'Unknown';
    }
};

const fetchPokemonDetails = async (id) => {
    try {
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const speciesResponse = await axios.get(pokemonResponse.data.species.url);

        const name = speciesResponse.data.names.find(name => name.language.name === 'ko')?.name || 'Unknown';

        const types = await Promise.all(pokemonResponse.data.types.map(async (typeInfo) => {
            return await fetchTypeInKorean(typeInfo.type.url);
        }));

        const abilities = await Promise.all(pokemonResponse.data.abilities.map(async (abilityInfo) => {
            return await fetchAbilityInKorean(abilityInfo.ability.url);
        }));

        return { name, types: types.join(', '), abilities: abilities.join(', ') };
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        return { name: 'Unknown', types: 'Unknown', abilities: 'Unknown' };
    }
};

const usePokemonDetails = (pokemonCards) => {
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPokemonDetails = async () => {
            setLoading(true);
            const details = {};
            const fetchDetailsPromises = pokemonCards.map(async (card) => {
                const id = card.pokemonNum;
                if (id) {
                    const detail = await fetchPokemonDetails(id);
                    details[id] = detail;
                }
            });
            await Promise.all(fetchDetailsPromises);
            setPokemonDetails(details);
            setLoading(false);
        };

        if (pokemonCards.length > 0) {
            loadPokemonDetails();
        } else {
            setLoading(false);
        }
    }, [pokemonCards]);

    return { pokemonDetails, loading };
};

export default usePokemonDetails;
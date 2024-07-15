import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokemonCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      
        const responses = await Promise.all([
          axios.get('https://api.pokemontcg.io/v2/cards?q=name:pikachu'),
          axios.get('https://api.pokemontcg.io/v2/cards?q=name:charmander'),
          axios.get('https://api.pokemontcg.io/v2/cards?q=name:squirtle'),
          axios.get('https://api.pokemontcg.io/v2/cards?q=name:bulbasaur'),
        ]);

        setCards(responses.map(response => response.data.data[5]));
        setLoading(false);
      
    };

    fetchCards();
  }, []);

  return { cards, loading };
};

export default usePokemonCards;

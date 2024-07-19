import { useState, useEffect } from 'react';
import axios from 'axios';

//------------------------------------------------폐기--------------------------------------------------
const usePokemonCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      console.log('Fetching Pokemon cards...');
      const responses = await Promise.all([
        axios.get('https://api.pokemontcg.io/v2/cards?q=name:pikachu'),
        axios.get('https://api.pokemontcg.io/v2/cards?q=name:charmander'),
        axios.get('https://api.pokemontcg.io/v2/cards?q=name:squirtle'),
        axios.get('https://api.pokemontcg.io/v2/cards?q=name:bulbasaur'),
      ]);

      const fetchedCards = responses.map(response => response.data.data[5]);
      console.log('Pokemon cards fetched:', fetchedCards);
      setCards(fetchedCards);
      setLoading(false);
    };

    fetchCards();
  }, []);

  return { cards, loading };
};

export default usePokemonCards;

import { useState, useEffect } from 'react';

const useFightContent = (API_KEY, PAGE_SIZE) => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const typeBackgroundImages = {
    Colorless: 'url(/img/types/colorless.png)',
    Darkness: 'url(/img/types/darkness.png)',
    Dragon: 'url(/img/types/dragon.png)',
    Fairy: 'url(/img/types/fairy.png)',
    Fighting: 'url(/img/types/fighting.png)',
    Fire: 'url(/img/types/fire.png)',
    Grass: 'url(/img/types/grass.png)',
    Lightning: 'url(/img/types/lightning.png)',
    Metal: 'url(/img/types/metal.png)',
    Psychic: 'url(/img/types/psychic.png)',
    Water: 'url(/img/types/water.png)',
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('https://api.pokemontcg.io/v2/types', {
          headers: {
            'X-Api-Key': API_KEY
          }
        });
        const data = await response.json();
        setTypes(data.data);
      } catch (error) {
        alert('타입 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchTypes();
  }, [API_KEY]);

  useEffect(() => {
    setPage(1);
    fetchCards(true);
  }, [searchTerm, selectedType, API_KEY]);

  useEffect(() => {
    if (page > 1) {
      fetchCards();
    }
  }, [page]);

  const fetchCards = async (reset = false) => {
    try {
      setLoading(true);
      let url = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${PAGE_SIZE}`;
      if (searchTerm) {
        url += `&q=name:${encodeURIComponent(searchTerm)}`;
      } else if (selectedType) {
        url += `&q=types:${selectedType}`;
      }

      const response = await fetch(url, {
        headers: {
          'X-Api-Key': API_KEY
        }
      });
      const data = await response.json();
      setCards(prevCards => reset ? data.data : [...prevCards, ...data.data]);
      setHasMore(data.data.length === PAGE_SIZE);
    } catch (error) {
      console.error('카드 데이터를 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const handleCardClick = (card) => {
    if (selectedCount < 3 && !selectedCards.some(selectedCard => selectedCard.id === card.id)) {
      setSelectedCards(prevSelected => [...prevSelected, card]);
      setSelectedCount(prevCount => prevCount + 1);
    }
  };

  const handleRemoveCard = (cardId) => {
    setSelectedCards(prevSelected => prevSelected.filter(card => card.id !== cardId));
    setSelectedCount(prevCount => prevCount - 1);
  };

  const getAverageHp = (cards) => {
    if (cards.length === 0) return 0;
    const totalHp = cards.reduce((acc, card) => acc + parseInt(card.hp, 10), 0);
    return totalHp / cards.length;
  };

  const getRandomEnemyPokemons = () => {
    const userAverageHp = getAverageHp(selectedCards);

    const eligiblePokemons = cards
      .filter(card => !selectedCards.some(selectedCard => selectedCard.id === card.id))
      .filter(card => parseInt(card.hp, 10) <= userAverageHp);

    if (eligiblePokemons.length === 0) return [];

    const shuffledCards = eligiblePokemons.sort(() => 0.5 - Math.random());
    let selectedEnemies = [];
    let totalHp = 0;

    for (let i = 0; i < shuffledCards.length; i++) {
      const card = shuffledCards[i];
      const cardHp = parseInt(card.hp, 10);

      if ((totalHp + cardHp) / (selectedEnemies.length + 1) <= userAverageHp) {
        selectedEnemies.push({
          ...card,
          miniImage: card.images.small,
        });
        totalHp += cardHp;

        if (selectedEnemies.length === 3) break;
      }
    }

    if (selectedEnemies.length === 0 && shuffledCards.length > 0) {
      selectedEnemies.push({
        ...shuffledCards[0],
        miniImage: shuffledCards[0].images.small,
      });
    }

    console.log('Random Enemy Pokemons:', selectedEnemies);
    return selectedEnemies;
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return {
    cards,
    searchTerm,
    selectedType,
    types,
    page,
    loading,
    selectedCards,
    selectedCount,
    typeBackgroundImages,
    hasMore,
    setSearchTerm,
    handleChange,
    handleTypeClick,
    handleCardClick,
    handleRemoveCard,
    loadMore,
    getRandomEnemyPokemons,
  };
};

export default useFightContent;

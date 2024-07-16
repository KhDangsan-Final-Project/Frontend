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

    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(inputValue);
    if (hasKorean) {
      alert('한글 입력은 허용되지 않습니다.');
      setSearchTerm('');
    }
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

  const getRandomEnemyPokemons = () => {
    const randomPokemon = [];
    const shuffledCards = cards.sort(() => 0.5 - Math.random());
    let count = 0;
    let index = 0;

    while (count < 3 && index < shuffledCards.length) {
      const card = shuffledCards[index];
      if (!selectedCards.some(selectedCard => selectedCard.id === card.id)) {
        randomPokemon.push({
          ...card,
          miniImage: card.images.small
        });
        count++;
      }
      index++;
    }

    return randomPokemon;
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

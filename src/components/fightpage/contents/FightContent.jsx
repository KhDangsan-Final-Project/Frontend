import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './css/fight.module.css';

function FightContent() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const navigate = useNavigate();
  const API_KEY = '80664291-49e4-45b1-a1eb-cf4f0c440dde'; // 사용자의 API 키로 대체 필요
  const PAGE_SIZE = 20;

  // 이미지 경로 설정
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
    // 다른 타입들에 대한 이미지 경로 추가
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

  const sendBattlePokemon = () => {
    const selectedPokemon = selectedCards.slice(0, 3);
    const selectedPokemonWithMiniImages = selectedPokemon.map(card => ({
      ...card,
      miniImage: card.images.small
    }));
    localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemonWithMiniImages));
    
    const randomEnemyPokemon = getRandomEnemyPokemons();
    localStorage.setItem('enemyPokemon', JSON.stringify(randomEnemyPokemon));

    navigate('/battle');
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

  return (
    <div className={styles.App}>
      <h1>가져갈 포켓몬 카드를 3장 선택하세요 (중복 선택 불가)</h1>
      <Link to="/encyclopedia">도감페이지로 이동</Link>
      <div>
        <input
          type="text"
          placeholder="포켓몬 검색"
          value={searchTerm}
          onChange={handleChange}
        />
        <div className={`${styles.typeContainer} ${styles[selectedType.toLowerCase()]}`}>
          <a href="#" onClick={() => handleTypeClick('')} style={{ backgroundImage: 'url(/img/pokeball.png)' }}>모든 타입</a>
          {types.map(type => (
            <a
              key={type}
              href="#"
              onClick={() => handleTypeClick(type)}
              style={{ backgroundImage: typeBackgroundImages[type] || 'none' }}
              className={styles.typeLink}
            >
              {type}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.cardContainer}>
        {cards.length > 0 ? (
          cards.map(card => (
            <div key={card.id} className={styles.card} onClick={() => handleCardClick(card)}>
              <img src={card.images.small} alt={card.name} />
              <h2>{card.name}</h2>
              <p>타입: {card.types.join(', ')}</p>
              <p>HP: {card.hp}</p>
              {card.attacks && (
                <div className={styles.cardAttack}>
                  <h3>공격 기술</h3>
                  {card.attacks.map((attack, index) => (
                    <div key={index} className={styles.attack}>
                      <p><strong>{attack.name}</strong></p>
                      <p>피해: {attack.damage}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>카드를 찾을 수 없습니다.</p>
        )}
      </div>
      {loading && <p>로딩 중...</p>}
      {!loading && cards.length > 0 && (
        <button onClick={loadMore}>더 불러오기</button>
      )}
      {selectedCards.length > 0 && (
        <div className={styles.selectedCards}>
          <h2>선택된 포켓몬 카드</h2>
          <button onClick={sendBattlePokemon}>결정</button>
          <div className={`${styles.selectedCardContainer} ${styles.myCardArea}`}>
            {selectedCards.map(card => (
              <div key={card.id} className={`${styles.card} ${styles.selectedCard}`}>
                <img src={card.images.small} alt={card.name} />
                <h2>{card.name}</h2>
                <p>타입: {card.types.join(', ')}</p>
                <p>HP: {card.hp}</p>
                {card.attacks && (
                  <div className={styles.cardAttack}>
                    <h3>공격 기술</h3>
                    {card.attacks.map((attack, index) => (
                      <div key={index} className={styles.attack}>
                        <p><strong>{attack.name}</strong></p>
                        <p>피해: {attack.damage}</p>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => handleRemoveCard(card.id)}>제거</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => navigate('/encyclopedia')}>도감 페이지로 가기</button>
      <div className={styles.card2}></div>
      <div className={styles.card2}></div>
      <style className={styles.hover}></style>
    </div>
  );
}

export default FightContent;

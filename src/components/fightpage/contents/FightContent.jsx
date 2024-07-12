import React, { useEffect, useState } from 'react';
import { Route, useNavigate,Link } from 'react-router-dom';
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

  // 포켓몬 카드 타입 목록을 불러오는 함수
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

  // 검색어와 선택된 타입에 따라 페이지를 1로 초기화하고 카드를 불러오는 함수
  useEffect(() => {
    setPage(1);
    fetchCards(true);
  }, [searchTerm, selectedType, API_KEY]);

  // 페이지 번호가 변경될 때마다 카드를 추가로 불러오는 함수
  useEffect(() => {
    if (page > 1) {
      fetchCards();
    }
  }, [page]);

  // 카드 데이터를 불러오는 함수
  const fetchCards = async (reset = false) => {
    try {
      setLoading(true);
      let url = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${PAGE_SIZE}`;
      if (searchTerm) {
        url += `&q=name:${encodeURIComponent(searchTerm)}`; // 한글 검색어 처리
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

  // 검색어 변경 시 호출되는 함수
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    // 입력된 값에 한글이 포함되어 있는지 검사
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(inputValue);
    if (hasKorean) {
      alert('한글 입력은 허용되지 않습니다.');
      // 한글 입력이 감지되면 검색어를 초기화할 수도 있습니다.
      setSearchTerm('');
    }
  };

  // 카드 클릭 시 선택된 카드 목록에 추가하는 함수
  const handleCardClick = (card) => {
    if (selectedCount < 3 && !selectedCards.some(selectedCard => selectedCard.id === card.id)) {
      setSelectedCards(prevSelected => [...prevSelected, card]);
      setSelectedCount(prevCount => prevCount + 1);
    }
  };

  // 선택된 카드 목록에서 제거하는 함수
  const handleRemoveCard = (cardId) => {
    setSelectedCards(prevSelected => prevSelected.filter(card => card.id !== cardId));
    setSelectedCount(prevCount => prevCount - 1);
  };

  // 선택된 포켓몬 카드를 로컬 스토리지에 저장하고 배틀 페이지로 이동하는 함수
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

  // 적 포켓몬 데이터를 랜덤으로 선택하는 함수
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

  // 더 많은 카드를 불러오는 함수
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Return 부분에 추가된 버튼
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
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
        >
          <option value="">모든 타입</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
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

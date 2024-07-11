import React, { useEffect, useState } from 'react';
// import styles from './fight.module.css';

function FightContent() {
    //카드 데이터 배열 관리
  const [cards, setCards] = useState([]);
  // 검색어 데이터
  const [searchTerm, setSearchTerm] = useState('');
  // 선택된 카드 타입
  const [selectedType, setSelectedType] = useState('');
  //타입 목록
  const [types, setTypes] = useState([]);
  // 현재 페이지 번호
  const [page, setPage] = useState(1);
  //데이터 로딩 상태
  const [loading, setLoading] = useState(false);
  //api 키
  const API_KEY = 'YOUR_API_KEY';  // 여기에 API 키를 입력하세요.
  // 페이지당 카드 수
  const PAGE_SIZE = 20; 

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
        console.error('Error fetching the types:', error);
      }
    };

    fetchTypes();
  }, [API_KEY]);

  const fetchCards = async (reset = false) => {
    try {
      setLoading(true);
      let url = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${PAGE_SIZE}`;
      if (searchTerm) {
        url += `&q=name:${searchTerm}`;
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
      console.error('Error fetching the cards:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchCards(true);
  }, [searchTerm, selectedType, API_KEY]);

  useEffect(() => {
    if (page > 1) {
      fetchCards();
    }
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <h1>Pokémon TCG Cards</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a Pokémon"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
        >
          <option value="">Select Type</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="card-container">
        {cards.length > 0 ? (
          cards.map(card => (
            <div key={card.id} className="card">
              <img src={card.images.small} alt={card.name} />
              <h2>{card.name}</h2>
              <p>{card.set.name}</p>
              <p>Type: {card.types.join(', ')}</p>
              {card.attacks && (
                <div>
                  <h3>Attacks</h3>
                  {card.attacks.map((attack, index) => (
                    <div key={index} className="attack">
                      <p><strong>{attack.name}</strong></p>
                      <p>Damage: {attack.damage}</p>
                      <p>{attack.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No cards found</p>
        )}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && cards.length > 0 && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}

export default FightContent;


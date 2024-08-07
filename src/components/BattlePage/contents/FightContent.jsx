import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/fight.module.css';
import useFightContent from './hooks/useFightContent';
import NavFightContent from './navFightContent';
import UserInfoFightContent from './UserInfoFightContent';
import RankFightContent from './RankFightContent';

// TCG 카드 하나만 가져오는 함수
const fetchTcgCard = async (pokemonName) => {
  const url = `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`;
  try {
    const response = await axios.get(url);
    if (response.status === 200 && response.data.data.length > 0) {
      return response.data.data[0]; // 첫 번째 카드 데이터만 반환
    }
    throw new Error(`Card not found for ${pokemonName}`);
  } catch (error) {
    return null;
  }
};

// 여러 포켓몬의 카드를 가져오는 함수
const fetchTcgCards = async (pokemonList) => {
  if (pokemonList.length === 0) return [];

  try {
    const requests = pokemonList.map(pokemon =>
      fetchTcgCard(pokemon.englishName)
    );
    const results = await Promise.all(requests);
    const cards = results.filter(card => card !== null); // 유효한 카드만 필터링
    const updatedCards = cards.map(card => {
      const pokemon = pokemonList.find(p => p.englishName === card.name);
      return {
        ...card,
        serverKoreanName: pokemon ? pokemon.koreanName : card.name
      };
    });
    return updatedCards;
  } catch (error) {
    return [];
  }
};

function FightContent({ token }) {
  const API_KEY = '80664291-49e4-45b1-a1eb-cf4f0c440dde';
  const PAGE_SIZE = 20;
  const navigate = useNavigate();
  const [receivedData, setReceivedData] = useState(null);
  const [nickname, setNickname] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [tcgCards, setTcgCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [ws, setWs] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [matchWin, setMatchWin] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    cards,
    types,
    loading,
    selectedCards,
    selectedCount,
    typeBackgroundImages,
    hasMore,
    handleChange,
    handleCardClick,
    handleRemoveCard,
    loadMore,
    getRandomEnemyPokemons,
  } = useFightContent(API_KEY, PAGE_SIZE);

  useEffect(() => {
    if (token) {
      const ws = new WebSocket('wss://teeput.synology.me:30112/ms2/token');

      ws.onopen = () => {
        ws.send(JSON.stringify({ token }));
      };

      ws.onmessage = async function(event) {
        try {
          const data = JSON.parse(event.data);
          setMatchWin(data.matchWin);
          setNickname(data.nickname);
          setReceivedData(data);
          setPokemonList(data.pokemonList || []);

          if (data.pokemonList) {
            const cards = await fetchTcgCards(data.pokemonList);
            setTcgCards(cards);
            setFilteredCards(cards.slice(0, PAGE_SIZE)); // 첫 페이지 데이터
          }
        } catch (error) {
        }
      };

      ws.onerror = function(event) {
      };

      ws.onclose = () => {
      };

      setWs(ws);

      return () => {
        ws.close();
      };
    }
  }, [token]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterCards(selectedType, term);
  };

  const filterCards = (type, searchTerm) => {
    const filtered = tcgCards.filter(card =>
      (type === '' || card.types.includes(type)) && 
      (card.serverKoreanName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      card.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCards(filtered.slice(0, PAGE_SIZE * currentPage)); // 현재 페이지 데이터
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    filterCards(type, searchTerm);
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
    navigate(`/battle?matchWin=${matchWin}&nickname=${nickname}`);
  };

  const handleDecisionClick = () => {
    const confirmMove = window.confirm('이동하시겠습니까?');
    if (confirmMove) {
      const battlePokemons = getRandomEnemyPokemons();
      localStorage.setItem('battlePokemons', JSON.stringify(battlePokemons));
      sendBattlePokemon();
    }
  };

  const handleLoadMore = async () => {
    setCurrentPage(prevPage => prevPage + 1);
    filterCards(selectedType, searchTerm);
  };

  return (
    <div className={styles.App}>
      <div className={styles.backgroundWrapper}>
        <div className={styles.overlay}>
          <input
            type="text"
            placeholder="포켓몬 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.pokemonSearch}
          />
          <NavFightContent
            types={types}
            handleTypeClick={handleTypeClick}
            selectedType={selectedType}
            typeBackgroundImages={typeBackgroundImages}
          />
          <div className={styles.container}>
            <div className={styles.loadingBar}>
              {!loading && filteredCards.length > 0 && hasMore && (
                <button onClick={handleLoadMore} className={styles.button}>: 더 불러오기 :</button>
              )}
              <div className={styles.cardContainer}>
                {loading ? (
                  <p className={styles.p}>로딩 중...</p>
                ) : filteredCards.length > 0 ? (
                  filteredCards.map(card => (
                    <div key={card.id} className={styles.card} onClick={() => handleCardClick(card)}>
                      <img src={card.images.small} alt={card.serverKoreanName} />
                      <h2 className={styles.h2}>{card.serverKoreanName}</h2>
                      <p className={styles.p}>타입: {card.types ? card.types.join(', ') : '알 수 없음'}</p>
                      <p className={styles.p}>HP: {card.hp}</p>
                      {card.attacks && (
                        <div className={styles.cardAttack}>
                          <h3 className={styles.h2}>공격 기술</h3>
                          {card.attacks.map((attack, index) => (
                            <div key={index} className={styles.attack}>
                              <p className={styles.p}><strong>{attack.name}</strong></p>
                              <p className={styles.p}>피해: {attack.damage}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  !loading && <p className={styles.p}></p>
                )}
              </div>
            </div>
            <div className={`${styles.selectedCards} ${styles.myCardArea}`}>
              <h4 style={{ color: 'white' }} className={styles.h4}> : : : 선택된 포켓몬 카드 : : :</h4>
              {selectedCards.length > 0 && (
                <button onClick={handleDecisionClick} className={styles.button}>: 결정 :</button>
              )}
              <div className={styles.selectedCardContainer}>
                {selectedCards.map(card => (
                  <div key={card.id} className={`${styles.card} ${styles.selectedCard}`}>
                    <img src={card.images.small} alt={card.serverKoreanName} />
                    <h2 className={styles.p}>{card.serverKoreanName}</h2>
                    <p className={styles.p}>타입: {card.types ? card.types.join(', ') : '알 수 없음'}</p>
                    <p className={styles.p}>HP: {card.hp}</p>
                    {card.attacks && (
                      <div className={styles.cardAttack}>
                        <h3 className={styles.p}>공격 기술</h3>
                        {card.attacks.map((attack, index) => (
                          <div key={index} className={styles.attack}>
                            <p className={styles.p}><strong>{attack.name}</strong></p>
                            <p className={styles.p}>피해: {attack.damage}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <button onClick={() => handleRemoveCard(card.id)} className={styles.button}>: 제거 :</button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.conponents}>
              <UserInfoFightContent token={token} />
              <RankFightContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FightContent;

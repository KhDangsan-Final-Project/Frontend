import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/fight.module.css';
import useFightContent from './hooks/useFightContent';
import FightNavBar from './navFightContent';
import UserInfoFightContent from './UserInfoFightContent';
import RankFightContent from './RankFightContent';

function FightContent({ token }) {
  const API_KEY = '80664291-49e4-45b1-a1eb-cf4f0c440dde';
  const PAGE_SIZE = 20;
  const navigate = useNavigate();
  const [receivedData, setReceivedData] = useState(null);
  const [roomNumber, setRoomNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [tcgCards, setTcgCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [ws, setWs] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    cards,
    selectedType,
    types,
    page,
    loading,
    selectedCards,
    selectedCount,
    typeBackgroundImages,
    hasMore,
    handleChange,
    handleTypeClick,
    handleCardClick,
    handleRemoveCard,
    loadMore,
    getRandomEnemyPokemons,
  } = useFightContent(API_KEY, PAGE_SIZE);

  useEffect(() => {
    if (token) {
      const ws = new WebSocket('ws://localhost:30115/ms2/token');

      ws.onopen = () => {
        console.log('Connected to WebSocket');
        ws.send(JSON.stringify({ token }));
      };

      ws.onmessage = function(event) {
        console.log('Message from server by FightContent:', event.data);
        try {
          const data = JSON.parse(event.data);

          setNickname(data.nickname);
          setReceivedData(data);
          setRoomNumber(data.roomNumber);
          setPokemonList(data.pokemonList || []);
          
          if (data.pokemonList) {
            fetchTcgCards(data.pokemonList);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onerror = function(event) {
        console.error('WebSocket error:', event);
      };

      ws.onclose = () => {
        console.log('Disconnected from WebSocket');
      };

      setWs(ws);

      return () => {
        ws.close();
      };
    }
  }, [token]);

  const fetchTcgCards = async (pokemonList) => {
    try {
      // Create requests to fetch TCG cards for each Pokémon in the list
      const requests = pokemonList.map(pokemon =>
        axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${pokemon.englishName}`)
      );

      // Await responses for all requests
      const responses = await Promise.all(requests);
      
      // Extract card data from responses
      const cards = responses.map(response => response.data.data[0]);

      // Update card data with Korean names
      const updatedCards = cards.map(card => {
        const pokemon = pokemonList.find(p => p.englishName === card.name);
        return {
          ...card,
          serverKoreanName: pokemon ? pokemon.koreanName : card.name // Use 'serverKoreanName'
        };
      });

      // Update state with TCG cards and filtered cards
      setTcgCards(updatedCards);
      setFilteredCards(updatedCards);
    } catch (error) {
      console.error('Error fetching TCG cards:', error);
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filter cards based on search term
    const filtered = tcgCards.filter(card =>
      card.serverKoreanName.toLowerCase().includes(term.toLowerCase()) || // Filter by Korean name
      card.name.toLowerCase().includes(term.toLowerCase()) // Filter by English name
    );
    setFilteredCards(filtered);
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
    navigate(`/battle?roomId=${roomNumber}&nickname=${nickname}`);
  };

  const handleDecisionClick = () => {
    const confirmMove = window.confirm('이동하시겠습니까?');
    if (confirmMove) {
      const battlePokemons = getRandomEnemyPokemons();
      localStorage.setItem('battlePokemons', JSON.stringify(battlePokemons));
      sendBattlePokemon();
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.backgroundWrapper}>
        <video autoPlay muted loop className={styles.backgroundVideo}>
          <source src='/video/background.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay}>
          <input
            type="text"
            placeholder="포켓몬 검색"
            value={searchTerm}
            onChange={handleSearchChange} // Use the new search handler
            className={styles.pokemonSearch}
          />
          <FightNavBar
            types={types}
            typeBackgroundImages={typeBackgroundImages}
            handleTypeClick={handleTypeClick}
          />
          <div className={styles.container}>
            <div className={styles.loadingBar}>
              {!loading && filteredCards.length > 0 && hasMore && (
                <button onClick={loadMore} className={styles.button}>: 더 불러오기 :</button>
              )}
              <div className={styles.cardContainer}>
                {filteredCards.length > 0 ? (
                  filteredCards.map(card => (
                    <div key={card.id} className={styles.card} onClick={() => handleCardClick(card)}>
                      <img src={card.images.small} alt={card.serverKoreanName} />
                      <h2 className={styles.h2}>{card.serverKoreanName}</h2> {/* Use 'serverKoreanName' */}
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
                  <p className={styles.p}>카드를 찾을 수 없습니다.</p>
                )}
                {loading && <p className={styles.p}>로딩 중...</p>}
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
                    <h2 className={styles.p}>{card.serverKoreanName}</h2> {/* Use 'serverKoreanName' */}
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

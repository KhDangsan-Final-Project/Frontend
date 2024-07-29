import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/fight.module.css';
import useFightContent from './hooks/useFightContent';
import FightNavBar from './navFightContent';
import UserInfoFightContent from './UserInfoFightContent';
import Chat from './Chat';
import RankFightContent from './RankFightContent';

function FightContent({ token }) {
  const API_KEY = '80664291-49e4-45b1-a1eb-cf4f0c440dde';
  const PAGE_SIZE = 20;
  const navigate = useNavigate();
  const [receivedData, setReceivedData] = useState(null);
  const [roomNumber, setRoomNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [pokemonList, setPokemonList] = useState([]); // pokemonList 상태 추가
  const [ws, setWs] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const {
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
  } = useFightContent(API_KEY, PAGE_SIZE);

  useEffect(() => {
    if (token) {
      const ws = new WebSocket('ws://192.168.20.54:8090/ms2/token');

      ws.onopen = () => {
        console.log('Connected to WebSocket');
        ws.send(JSON.stringify({ token }));
      };

      ws.onmessage = function(event) {
        console.log('Message from server by FightContent:', event.data);
        try {
          const data = JSON.parse(event.data);
          console.log("onmessage data:", data);
          console.log(data.pokemonList);
          console.log(data.pokemonNum);

          setNickname(data.nickname);

          if (Array.isArray(data.pokemonNum)) {
            setPokemonList(data.pokemonNum); // pokemonList 상태에 리스트 저장
          }

          handleReceivedData(data.roomNumber);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onerror = function(event) {
        console.error('WebSocket error:', event);
        console.log('WebSocket readyState:', ws.readyState);
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

  const handleReceivedData = (data) => {
    setReceivedData(data);
    setRoomNumber(data);
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
        localStorage.setItem('battlePokemons', JSON.stringify(battlePokemons)); // 배틀 포켓몬 저장
        sendBattlePokemon();
      }
  };

  const toggleChat = () => {
    console.log('채팅 열기 상태:', showChat);
    setShowChat(prevShowChat => !prevShowChat);
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
            onChange={handleChange}
            className={styles.pokemonSearch}
          />
          <FightNavBar
            types={types}
            typeBackgroundImages={typeBackgroundImages}
            handleTypeClick={handleTypeClick}
          />
          {/* <button onClick={toggleChat} className={styles.button}>
            {showChat ? ': 숨기기 :' : ': 채팅 열기 :'}
          </button> */}
          <div className={styles.container}>

<div className={styles.loadingBar}>
              {!loading && cards.length > 0 && hasMore && (
                <button onClick={loadMore} className={styles.button}>: 더 불러오기 :</button>
              )}
            <div className={styles.cardContainer}>
              {cards.length > 0 ? (
                cards.map(card => (
                  <div key={card.id} className={styles.card} onClick={() => handleCardClick(card)}>
                    <img src={card.images.small} alt={card.name} />
                    <h2 className={styles.h2}>{card.name}</h2>
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
                    <img src={card.images.small} alt={card.name} />
                    <h2 className={styles.p}>{card.name}</h2>
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
              <RankFightContent/>
              {/* <SettingFightContent onReceiveData={handleReceivedData} token={token} />
              <p className={styles.p}>ROOM ID : {JSON.stringify(receivedData)}</p> */}
            </div>
            <div>
              {showChat && <Chat nickname={nickname} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FightContent;

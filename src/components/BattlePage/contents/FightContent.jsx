import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/fight.module.css';
import useFightContent from './hooks/useFightContent';
import FightNavBar from './navFightContent';
import UserInfoFightContent from './UserInfoFightContent';
import SettingFightContent from './SettingFightContent';

function FightContent({ token }) {
  const API_KEY = '80664291-49e4-45b1-a1eb-cf4f0c440dde';
  const PAGE_SIZE = 20;
  const navigate = useNavigate();
  const [receivedData, setReceivedData] = useState(null);
  const [roomNumber, setRoomNumber] = useState('');
  const [ws, setWs] = useState(null);

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

  const handleReceivedData = (data) => {
    setReceivedData(data);
    setRoomNumber(data);
    console.log('받은 데이터:', data);
  };

  useEffect(() => {
    if (token) {
      const ws = new WebSocket('ws://192.168.20.54:8090/ms2/token');

      ws.onopen = () => {
        console.log('Connected to WebSocket');
        ws.send(JSON.stringify({ token }));
      };

      ws.onmessage = function(event) {
        console.log('Message from server:', event.data);
        try {
          const data = JSON.parse(event.data);
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

  const sendBattlePokemon = () => {
    const selectedPokemon = selectedCards.slice(0, 3);
    const selectedPokemonWithMiniImages = selectedPokemon.map(card => ({
      ...card,
      miniImage: card.images.small
    }));
    localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemonWithMiniImages));

    const randomEnemyPokemon = getRandomEnemyPokemons();
    localStorage.setItem('enemyPokemon', JSON.stringify(randomEnemyPokemon));

    navigate(`/battle?roomId=${roomNumber}`);
  };

  const handleDecisionClick = () => {
    if (roomNumber) {
      alert(`방 번호: ${roomNumber}`);
      

      const confirmMove = window.confirm('이동하시겠습니까?');
      if (confirmMove) {
        const battlePokemons = getRandomEnemyPokemons();
        localStorage.setItem('battlePokemons', JSON.stringify(battlePokemons)); // 배틀 포켓몬 저장
        sendBattlePokemon();
      } else {
        console.log('이동 취소');
      }
    } else {
      alert('방 번호를 입력해주세요.');
    }
  };

  return (
    <div className={styles.App}>
      <div>
        <input
          type="text"
          placeholder="포켓몬 검색"
          value={searchTerm}
          onChange={handleChange}
        />
        <FightNavBar
          types={types}
          typeBackgroundImages={typeBackgroundImages}
          handleTypeClick={handleTypeClick}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          {cards.length > 0 ? (
            cards.map(card => (
              <div key={card.id} className={styles.card} onClick={() => handleCardClick(card)}>
                <img src={card.images.small} alt={card.name} />
                <h2>{card.name}</h2>
                <p>타입: {card.types ? card.types.join(', ') : '알 수 없음'}</p>
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
          {loading && <p>로딩 중...</p>}
          {!loading && cards.length > 0 && hasMore && (
            <button onClick={loadMore}>더 불러오기</button>
          )}
        </div>
        <div className={`${styles.selectedCards} ${styles.myCardArea}`}>
          <h4>선택된 포켓몬 카드</h4>
          {selectedCards.length > 0 && (
            <button onClick={handleDecisionClick}>결정</button>
          )}
          <div className={styles.selectedCardContainer}>
            {selectedCards.map(card => (
              <div key={card.id} className={`${styles.card} ${styles.selectedCard}`}>
                <img src={card.images.small} alt={card.name} />
                <h2>{card.name}</h2>
                <p>타입: {card.types ? card.types.join(', ') : '알 수 없음'}</p>
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
        <div className={styles.conponents}>
          <UserInfoFightContent token={token} />
          <SettingFightContent onReceiveData={handleReceivedData} token={token} />
          <p>받은 데이터: {JSON.stringify(receivedData)}</p>
        </div>
      </div>
      <div className={styles.card2}></div>
      <style className={styles.hover}></style>
      <div className={styles.tokenDisplay}>
      </div>
    </div>
  );
}

export default FightContent;

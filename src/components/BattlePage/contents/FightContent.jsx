import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './css/fight.module.css';
import useFightContent from './hooks/useFightContent';
import FightNavBar from './navFightContent';
import SettingContainer from './SettingFightContent';

function FightContent() {
  const API_KEY = '80664291-49e4-45b1-a1eb-cf4f0c440dde'; // API 키 확인
  const PAGE_SIZE = 20;
  const navigate = useNavigate();
  
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
        {/* myCardArea */}
        <div className={`${styles.selectedCards} ${styles.myCardArea}`}>
          <h4>선택된 포켓몬 카드</h4>
          {selectedCards.length > 0 && (
            <button onClick={sendBattlePokemon}>결정</button>
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
        <SettingContainer />
 
      </div>
      <div className={styles.card2}></div>
      <style className={styles.hover}></style>
    </div>
  );
}

export default FightContent;
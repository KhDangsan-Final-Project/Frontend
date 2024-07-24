import React, { useEffect, useState } from 'react';
import styles from './css/battle.module.css';
import usePokemonBattle from './hooks/useBattle';
import Chat from './Chat';
import UserInfoFightContent from './UserInfoFightContent';
import { useLocation } from 'react-router-dom';

const getTypeLogo = (type) => {
  // 포켓몬 타입 로고 이미지 경로를 반환하는 함수
  return null;
};

const getTypeLogoContainerClass = (type) => {
  // 포켓몬 타입에 따라 로고 컨테이너 클래스 반환
  return null;
};

function Battle({ token }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get('roomId');

  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState([]);
  const [showAttacks, setShowAttacks] = useState(false);
  const [useSmallImages, setUseSmallImages] = useState(true);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState(null);

  const {
    handleFightClick,
    handleAttack,
    toggleSmallImages,
    selectEnemyPokemon
  } = usePokemonBattle(roomId);

  useEffect(() => {
    const loadPokemonData = () => {
      const selectedPokemonData = localStorage.getItem('selectedPokemon');
      const enemyPokemonData = localStorage.getItem('enemyPokemon');

      if (selectedPokemonData) {
        const parsedSelectedPokemon = JSON.parse(selectedPokemonData);
        setSelectedPokemon(parsedSelectedPokemon);

        const totalHP = parsedSelectedPokemon.reduce((sum, pokemon) => sum + pokemon.hp, 0);
        const averageHP = totalHP / parsedSelectedPokemon.length;

        if (enemyPokemonData) {
          const parsedEnemyPokemon = JSON.parse(enemyPokemonData);
          const filteredEnemyPokemon = parsedEnemyPokemon.filter(pokemon => pokemon.hp <= averageHP);
          setEnemyPokemon(filteredEnemyPokemon);
        }
      }
    };

    loadPokemonData();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));
  }, [selectedPokemon]);

  useEffect(() => {
    localStorage.setItem('enemyPokemon', JSON.stringify(enemyPokemon));
  }, [enemyPokemon]);

  const handlePlayerPokemonClick = (pokemon) => {
    setSelectedPlayerPokemon(pokemon);
  };

  const handleEnemyPokemonClick = (pokemon) => {
    setSelectedEnemy(pokemon);
  };

  const handleAttackClick = (damage) => {
    if (selectedEnemy) {
      const updatedEnemyPokemon = enemyPokemon.map(pokemon => {
        if (pokemon.id === selectedEnemy.id) {
          // HP가 0이면 카드에 애니메이션 클래스 추가
          const newPokemon = { ...pokemon, hp: Math.max(pokemon.hp - damage, 0) };
          if (newPokemon.hp === 0) {
            newPokemon.isFading = true;
          }
          return newPokemon;
        }
        return pokemon;
      });
      setEnemyPokemon(updatedEnemyPokemon);
    }
  };

  const renderPokemonCards = (pokemons, isEnemy) => {
    return pokemons.length > 0 ? (
      pokemons.map((pokemon) => (
        !pokemon.isRemoved && (
          <div
            key={pokemon.id}
            className={`${styles.pokemonCard} ${pokemon.isFading ? styles.fadeOut : ''} ${isEnemy && selectedEnemy && selectedEnemy.id === pokemon.id ? styles.selectedEnemy : ''}`}
            onClick={() => isEnemy ? handleEnemyPokemonClick(pokemon) : handlePlayerPokemonClick(pokemon)}
          >
            <img src={useSmallImages ? pokemon.images.card : pokemon.images.small} alt={pokemon.name} className={styles.myCard} />
            <div className={styles.pokemonCardInfo}>
              <div className={styles.types}>
                {pokemon.types.map((type, index) => (
                  <div key={index} className={`${styles.typeLogoContainer} ${getTypeLogoContainerClass(type)}`}>
                    <img src={getTypeLogo(type)} alt={type} className={styles.typeLogo} />
                  </div>
                ))}
                <h2 className={styles.pokemonName}>{pokemon.name}</h2>
              </div>
              <div className={styles.hpBarContainer}>
                <div className={styles.hpBar} style={{ width: `${(pokemon.hp / pokemon.maxHp) * 100}%` }}>
                  HP: {pokemon.hp}
                </div>
              </div>
              {showAttacks && pokemon.attacks && selectedPlayerPokemon && selectedPlayerPokemon.id === pokemon.id && (
                <div className={styles.pokemonAttacks}>
                  {pokemon.attacks.map((attack, index) => (
                    <button key={index} className={styles.attackButton} onClick={() => handleAttackClick(attack.damage)}>
                      <div className={styles.attack}>
                        <p><strong>{attack.name}</strong></p>
                        <p>피해: {attack.damage}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      ))
    ) : (
      <p>{isEnemy ? '적 포켓몬이 없습니다.' : '선택된 포켓몬이 없습니다.'}</p>
    );
  };

  const handleFightClickWrapper = () => {
    setShowAttacks(true);
    handleFightClick();
  };

  return (
    <div className={styles.App}>
      <h1>Room ID: {roomId}</h1>
      <div className={styles.stage}>
        <div className={styles.enemyContainer}>
          <h2>적 포켓몬</h2>
          {renderPokemonCards(enemyPokemon, true)}
        </div>
        <div className={styles.body}>
          <div className={styles.vs}>VS</div>
        </div>
        <div className={styles.selectedPokemonContainer}>
          <h2>내 포켓몬</h2>
          {renderPokemonCards(selectedPokemon, false)}
        </div>
      </div>
      <div className={styles.footer}>
        <UserInfoFightContent token={token} />
        <div className={styles.margin}>
          <Chat roomId={roomId} token={token} />
        </div>
        <div className={styles.menu}>
          <button onClick={handleFightClickWrapper}>Fight</button>
          <button onClick={toggleSmallImages}>
            {useSmallImages ? '큰 이미지로 보기' : '작은 이미지로 보기'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Battle;

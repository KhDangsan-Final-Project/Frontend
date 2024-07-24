import React, { useEffect, useState } from 'react';
import styles from './css/battle.module.css';
import usePokemonBattle from './hooks/useBattle';
import Chat from './Chat';
import { useLocation } from 'react-router-dom';
import UserInfoFightContent from './UserInfoFightContent';

const getTypeLogo = (type) => {
  // 포켓몬 타입 로고 이미지 경로를 반환하는 함수
  // 실제 구현 필요
  return null;
};

const getTypeLogoContainerClass = (type) => {
  // 포켓몬 타입에 따라 로고 컨테이너 클래스 반환
  // 실제 구현 필요
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
    setShowAttacks(true);
  };

  const handleEnemyPokemonClick = (pokemon) => {
    setSelectedEnemy(pokemon);
    selectEnemyPokemon(pokemon);
  };

  const handleAttackClick = (damage) => {
    if (selectedEnemy) {
      const updatedEnemyPokemon = enemyPokemon.map(pokemon => {
        if (pokemon.id === selectedEnemy.id) {
          const newPokemon = { ...pokemon, hp: Math.max(pokemon.hp - damage, 0) };
          if (newPokemon.hp === 0) {
            newPokemon.isFading = true;
            setTimeout(() => {
              setEnemyPokemon(prev => prev.filter(p => p.id !== newPokemon.id));
            }, 1000);
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
            <img 
              src={useSmallImages ? pokemon.miniImage : pokemon.images.small} 
              alt={pokemon.name} 
              className={`${styles.myCard} ${pokemon.isFading ? styles.hiddenImage : ''}`} 
            />
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
          <h2>플레이어 포켓몬</h2>
          {renderPokemonCards(selectedPokemon, false)}
        </div>
      </div>
      <div>

      <UserInfoFightContent />
      <Chat />
          {selectedPokemon.length > 0 && (
            <button onClick={handleFightClickWrapper}>전투 시작</button>
          )}
          </div>
    </div>
  );
}

export default Battle;

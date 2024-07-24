import React, { useEffect, useState } from 'react';
import styles from './css/battle.module.css';
import usePokemonBattle from './hooks/useBattle';
import Chat from './Chat';
import { useLocation, useNavigate } from 'react-router-dom';
import UserInfoFightContent from './UserInfoFightContent';
import BattleTrainer from './BattleTrainer';

const getTypeLogo = (type) => {
  return `/img/types/${type}.png`;
};

const getTypeLogoContainerClass = (type) => {
  switch (type) {
    case 'Dragon':
      return styles.dragon;
    case 'Fairy':
      return styles.fairy;
    case 'Fighting':
      return styles.fighting;
    case 'Fire':
      return styles.fire;
    case 'Grass':
      return styles.grass;
    case 'Lightning':
      return styles.lightning;
    case 'Metal':
      return styles.metal;
    case 'Psychic':
      return styles.psychic;
    case 'Water':
      return styles.water;
    case 'Colorless':
      return styles.colorless;
    case 'Darkness':
      return styles.darkness;
    default:
      return ''; // 기본값은 빈 문자열
  }
}

function Battle({ token }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get('roomId');

  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState([]);
  const [showAttacks, setShowAttacks] = useState(false);
  const [useSmallImages, setUseSmallImages] = useState(true);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState(null);
  const [isBattleFinished, setIsBattleFinished] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로딩 완료 상태

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

  useEffect(() => {
    if (isBattleFinished && enemyPokemon.length === 0) {
      alert('챔피언 ALDER 와의 \n승부에서 이겼다!');
      const battlePage = window.confirm('메인 화면으로 이동하시겠습니까?');
      if (battlePage) {
        navigate('/fight'); // fightContent 페이지로 이동
      }
    }
  }, [isBattleFinished, enemyPokemon, navigate]);

  useEffect(() => {
    // 포켓몬이 모두 로딩된 후 알림 띄우기
    if (selectedPokemon.length > 0 && enemyPokemon.length > 0) {
      setIsDataLoaded(true);
    }
  }, [selectedPokemon, enemyPokemon]);

  useEffect(() => {
    if (isDataLoaded) {
      alert('챔피언 ALDER가 \n승부를 걸어왔다!');
    }
  }, [isDataLoaded]);

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
    setIsBattleFinished(false); // 전투 시작 시에는 전투가 완료되지 않은 상태로 설정
    handleFightClick();
  };

  useEffect(() => {
    // 게임 진행 중일 때의 로직
    if (enemyPokemon.length === 0) {
      setIsBattleFinished(true); // 적 포켓몬이 모두 제거되면 전투가 완료된 상태로 설정
    }
  }, [enemyPokemon]);

  return (
    <div className={styles.App}>
      {/* <h1>Room ID: {roomId}</h1> */}
      <div className={styles.stage}>
        <div className={styles.enemyContainer}>
          <div><h2>ALDER's pokemons</h2></div>
          {renderPokemonCards(enemyPokemon, true)}
        </div>
        <div className={styles.body}>
          <div className={styles.vs}>VS</div>
        </div>
        <div className={styles.selectedPokemonContainer}>
          <div><h2>player pokemons</h2></div>
          {renderPokemonCards(selectedPokemon, false)}
        </div>
      </div>
      <div>
        <BattleTrainer/>
        <Chat />
        <UserInfoFightContent token={token} />
        {selectedPokemon.length > 0 && (
          <button onClick={handleFightClickWrapper}>전투 시작</button>
        )}
      </div>
    </div>
  );
}

export default Battle;

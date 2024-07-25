import React, { useEffect, useState } from 'react';
import styles from './css/battle.module.css';
import usePokemonBattle from './hooks/useBattle';
import Chat from './Chat';
import { useLocation, useNavigate } from 'react-router-dom';
import UserInfoFightContent from './UserInfoFightContent';
import BattleTrainer from './BattleTrainer';
import useAI from './hooks/useAI';

// 타입에 따라 다른 스타일을 적용하는 함수
const getTypeLogo = (type) => {
  return `/img/types/${type}.png`;
};

// 타입에 따라 다른 스타일을 적용하는 함수
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
      return '';
  }
};

// 공격 데미지에서 숫자만 추출하는 함수
const getCleanDamageValue = (damage) => {
  const cleanDamage = damage.replace(/[^0-9]/g, '');
  return cleanDamage ? parseInt(cleanDamage, 10) : 0;
};

function Battle({ token }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get('roomId');
  const nickname = queryParams.get('nickname');
  const matchWin = parseInt(queryParams.get('matchWin'), 10);
  const [isHighlighted, setIsHighlighted] = useState(true);


  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState([]);
  const [showAttacks, setShowAttacks] = useState(false);
  const [useSmallImages, setUseSmallImages] = useState(true);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState(null);
  const [isBattleFinished, setIsBattleFinished] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true);

  const {
    handleFightClick,
    handleAttack,
    toggleSmallImages,
    selectEnemyPokemon,
  } = usePokemonBattle(roomId);

  useAI(selectedPokemon, enemyPokemon, setSelectedPokemon, setEnemyPokemon, playerTurn, setPlayerTurn,getCleanDamageValue);

  // 포켓몬 데이터 로드
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



  // 포켓몬 데이터를 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));
  }, [selectedPokemon]);

  useEffect(() => {
    localStorage.setItem('enemyPokemon', JSON.stringify(enemyPokemon));
  }, [enemyPokemon]);

  // 전투 종료 시 처리
  useEffect(() => {
    if (isBattleFinished && enemyPokemon.length === 0) {

      if (token) {
        const ws = new WebSocket('ws://192.168.20.54:8090/ms2/update');

        ws.onopen = () => {
          console.log('Connected to WebSocket for updating matchWin');
          ws.send(JSON.stringify({ token, matchWin: matchWin }));
        };

        ws.onclose = () => {
          console.log('WebSocket closed after updating matchWin');
        };
      }

      alert('챔피언 ALDER 와의 \n승부에서 이겼다!');
      alert('싸움이 끝나고 나의 마음에\n상쾌한 바람이 지나갔다 . . .');
      alert('우리의 싸움을\n다음 스텝으로의 발판 삼아 나아가라! !');
      alert(`${nickname} 는 상금으로 0원을 손에 넣었다!`);
      const battlePage = window.confirm('메인 화면으로 이동하시겠습니까?');
      if (battlePage) {
        navigate('/fight');
      }
    }
  }, [isBattleFinished, enemyPokemon, matchWin, nickname, token, navigate]);

  useEffect(() => {
    if (selectedPokemon.length > 0 && enemyPokemon.length > 0) {
      setIsDataLoaded(true);
    }
  }, [selectedPokemon, enemyPokemon]);

  useEffect(() => {
    if (isDataLoaded && enemyPokemon.length > 0) {
      alert('챔피언 ALDER가 \n승부를 걸어왔다!');
      alert('"먼저 공격할 차례"를 얻었다!');
    }
  }, [isDataLoaded]);

  const handlePlayerPokemonClick = (pokemon) => {
    if (!playerTurn) return;
    setSelectedPlayerPokemon(pokemon);
    setShowAttacks(true);
  };

  const handleEnemyPokemonClick = (pokemon) => {
    if (!playerTurn) return;
    setSelectedEnemy(pokemon);
    selectEnemyPokemon(pokemon);
  };

  const handleAttackClick = (damage) => {
    if (!playerTurn || !selectedEnemy) return;
    const updatedEnemyPokemon = enemyPokemon.map((pokemon) => {
      if (pokemon.id === selectedEnemy.id) {
        const newPokemon = { ...pokemon, hp: Math.max(pokemon.hp - damage, 0) };
        if (newPokemon.hp === 0) {
          newPokemon.isFading = true;
          setTimeout(() => {
            setEnemyPokemon((prev) => prev.filter((p) => p.id !== newPokemon.id));
          }, 1000);
        }
        return newPokemon;
      }
      return pokemon;
    });
    setEnemyPokemon(updatedEnemyPokemon);
    setPlayerTurn(false);
  };

  const renderPokemonCards = (pokemons, isEnemy) => {
    return pokemons.length > 0 ? (
      pokemons.map((pokemon) => (
        
        !pokemon.isRemoved && (
          <div
            key={pokemon.id}
            className={`${styles.pokemonCard} ${pokemon.isFading ? styles.fadeOut : ''} ${isEnemy && selectedEnemy && selectedEnemy.id === pokemon.id ? styles.selectedEnemy : ''}`}
            onClick={() => (isEnemy ? handleEnemyPokemonClick(pokemon) : handlePlayerPokemonClick(pokemon))}
          >
            <img
              src={useSmallImages ? pokemon.miniImage : pokemon.images.small}
              alt={pokemon.name}
              className={`${styles.myCard} ${pokemon.isFading ? styles.hiddenImage : ''}${isHighlighted ? styles.highlighted : ''}`}
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
                <div
                  className={`${styles.hpBar} ${pokemon.hp < pokemon.maxHp ? styles.hpBarAnimated : ''}`}
                  style={{ width: `${(pokemon.hp / pokemon.maxHp) * 100}%` }}
                >
                  HP: {pokemon.hp}
                </div>
              </div>
              {showAttacks && pokemon.attacks && selectedPlayerPokemon && selectedPlayerPokemon.id === pokemon.id && (
                <div className={styles.pokemonAttacks}>
                  {pokemon.attacks.map((attack, index) => (
                    <button key={index} className={styles.attackButton} onClick={() => handleAttackClick(getCleanDamageValue(attack.damage))}>
                      <div className={styles.attack}>
                        <p><strong>{attack.name}</strong></p>
                        <p>피해: {getCleanDamageValue(attack.damage)}</p>
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

  // 적 포켓몬이 모두 사라졌을 때 전투 종료
  useEffect(() => {
    if (enemyPokemon.length === 0) {
      setIsBattleFinished(true);
    }
  }, [enemyPokemon]);

  // 플레이어의 포켓몬이 모두 사라졌을 때 처리
  useEffect(() => {
    if (enemyPokemon.length > 0 && selectedPokemon.length === 0) {
      alert(`${nickname} 에게는 더 이상 \n싸울 수 있는 포켓몬이 없다!`);
      alert('. . .  . . .  . . .  \n. . .  . . .  . . .');
      alert(`${nickname}는 눈앞이 캄캄해졌다!`);
      navigate('/fight');
    }
  }, [selectedPokemon, navigate]);

  return (
    <div className={styles.App}>
      <div className={styles.stage}>
        <div className={styles.enemyContainer}>
          <div><h2>ALDER's pokemons</h2></div>
          {renderPokemonCards(enemyPokemon, true)}
        </div>
        <div className={styles.body}>
          <div className={styles.vs}></div>
        </div>
        <div className={styles.selectedPokemonContainer}>
          <div><h2>{nickname} pokemons</h2></div>
          {renderPokemonCards(selectedPokemon, false)}
        </div>
      </div>
      <div>
        <BattleTrainer />
        <Chat />
        <UserInfoFightContent token={token} />
      </div>
    </div>
  );
}

export default Battle;

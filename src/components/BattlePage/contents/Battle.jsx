import React, { useEffect, useState } from 'react';
import styles from './css/battle.module.css';
import usePokemonBattle from './hooks/useBattle';
import Chat from './Chat';
import { useLocation, useNavigate } from 'react-router-dom';
import UserInfoFightContent from './UserInfoFightContent';
import BattleTrainer from './BattleTrainer';

// 포켓몬 타입 로고 경로를 가져오는 함수
const getTypeLogo = (type) => {
  return `/img/types/${type}.png`;
};

// 포켓몬 타입에 따른 스타일 클래스명을 반환하는 함수
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

// 데미지 값에서 숫자만 추출하는 함수
const getCleanDamageValue = (damage) => {
  // 모든 비숫자 문자를 제거하고 숫자만 추출
  const cleanDamage = damage.replace(/[^0-9]/g, '');
  return cleanDamage ? parseInt(cleanDamage, 10) : 0;
}

function Battle({ token }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get('roomId');

  // 상태 변수 정의
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState([]);
  const [showAttacks, setShowAttacks] = useState(false);
  const [useSmallImages, setUseSmallImages] = useState(true);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState(null);
  const [isBattleFinished, setIsBattleFinished] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로딩 완료 상태
  const [playerTurn, setPlayerTurn] = useState(true); // 현재 턴이 플레이어인지 여부

  const {
    handleFightClick,
    handleAttack,
    toggleSmallImages,
    selectEnemyPokemon
  } = usePokemonBattle(roomId);

  // 포켓몬 데이터 로드 및 초기화
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

  // 포켓몬 데이터 저장
  useEffect(() => {
    localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));
  }, [selectedPokemon]);

  useEffect(() => {
    localStorage.setItem('enemyPokemon', JSON.stringify(enemyPokemon));
  }, [enemyPokemon]);

  // 전투 종료 및 승리 처리
  useEffect(() => {
    if (isBattleFinished && enemyPokemon.length === 0) {
      alert('챔피언 ALDER 와의 \n승부에서 이겼다!');
      alert('싸움이 끝나고 나의 마음에\n상쾌한 바람이 지나갔다 . . .');
      alert('우리의 싸움을\n다음 스텝으로의 발판 삼아 나아가라! !')
      alert('PLAYER 는 상금으로 0원을 손에 넣었다!');
      const battlePage = window.confirm('메인 화면으로 이동하시겠습니까?');
      if (battlePage) {
        navigate('/fight'); // fightContent 페이지로 이동
      }
    }
  }, [isBattleFinished, enemyPokemon, navigate]);

  // 포켓몬 데이터 로딩 완료 상태 체크 및 알림
  useEffect(() => {
    if (selectedPokemon.length > 0 && enemyPokemon.length > 0) {
      setIsDataLoaded(true);
    }
  }, [selectedPokemon, enemyPokemon]);

  useEffect(() => {
    if (isDataLoaded && enemyPokemon.length > 0) {
      alert('챔피언 ALDER가 \n승부를 걸어왔다!');
    }
  }, [isDataLoaded]);

  // 플레이어 포켓몬 클릭 핸들러
  const handlePlayerPokemonClick = (pokemon) => {
    setSelectedPlayerPokemon(pokemon);
    setShowAttacks(true);
  };

  // 적 포켓몬 클릭 핸들러
  const handleEnemyPokemonClick = (pokemon) => {
    setSelectedEnemy(pokemon);
    selectEnemyPokemon(pokemon);
  };

  // 공격 클릭 핸들러
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
      setPlayerTurn(false); // 플레이어의 턴이 끝났으므로 적 AI의 턴으로 전환
    }
  };

  useEffect(() => {
    if (!playerTurn && enemyPokemon.length > 0) {
      alert('ALDER의 턴입니다!');
      
      // 랜덤으로 적 포켓몬을 선택
      const randomEnemyPokemon = enemyPokemon[Math.floor(Math.random() * enemyPokemon.length)];
      console.log('AI가 선택한 적 포켓몬:', randomEnemyPokemon);
  
      // 플레이어 포켓몬이 존재하는지 확인
      if (selectedPokemon.length > 0 && randomEnemyPokemon.attacks.length > 0) {
        const randomAttack = randomEnemyPokemon.attacks[Math.floor(Math.random() * randomEnemyPokemon.attacks.length)];
        const targetPlayerPokemon = selectedPokemon[Math.floor(Math.random() * selectedPokemon.length)];
        console.log('AI가 공격할 플레이어 포켓몬:', targetPlayerPokemon);
  
        setTimeout(() => {
          if (targetPlayerPokemon) {
            const updatedPlayerPokemon = selectedPokemon.map(pokemon => {
              if (pokemon.id === targetPlayerPokemon.id) {
                const newPokemon = { ...pokemon, hp: Math.max(pokemon.hp - randomAttack.damage, 0) };
                if (newPokemon.hp === 0) {
                  newPokemon.isFading = true;
                  setTimeout(() => {
                    setSelectedPokemon(prev => prev.filter(p => p.id !== newPokemon.id));
                  }, 1000);
                }
                return newPokemon;
              }
              return pokemon;
            });
            setSelectedPokemon(updatedPlayerPokemon);
          }
        }, 1000); // 1초 대기 후 공격 실행
      } else {
        console.log('플레이어 포켓몬이 없거나 적 포켓몬이 공격을 할 수 없습니다.');
      }
   
      setPlayerTurn(true); // AI 턴 후 다시 플레이어 턴으로 전환
    }
  }, [playerTurn, enemyPokemon, selectedPokemon]);

  // 포켓몬 카드 렌더링
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


  // 게임 진행 중 적 포켓몬이 모두 제거되면 전투 완료 상태로 설정
  useEffect(() => {
    if (enemyPokemon.length === 0) {
      setIsBattleFinished(true); // 적 포켓몬이 모두 제거되면 전투가 완료된 상태로 설정
    }
  }, [enemyPokemon]);

  // 패배 처리
  useEffect(() => {
    if (enemyPokemon.length > 0 && selectedPokemon.length === 0) {
      alert('PLAYER 에게는 더 이상 \n싸울 수 있는 포켓몬이 없다!');
      alert('. . .  . . .  . . .  \n. . .  . . .  . . .');
      alert('PLAYER는 눈앞이 캄캄해졌다!');
      navigate('/fight'); // 전투 페이지로 이동
    }
  }, [selectedPokemon, navigate]);

  return (
    <div className={styles.App}>
      {/* <h1>Room ID: {roomId}</h1> */}
      <div className={styles.stage}>
        <div className={styles.enemyContainer}>
          <div><h2>ALDER's pokemons</h2></div>
          {renderPokemonCards(enemyPokemon, true)}
        </div>
        <div className={styles.body}>
          <div className={styles.vs}></div>
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
    
      </div>
    </div>
  );
}

export default Battle;

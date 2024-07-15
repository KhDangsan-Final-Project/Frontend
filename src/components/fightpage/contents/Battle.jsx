import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styles from './css/battle.module.css';
import SettingContainer from './SettingFightContent';
const MAX_HP = 100;

function Battle() {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState([]);
  const [showAttacks, setShowAttacks] = useState(false);
  const [useSmallImages, setUseSmallImages] = useState(false);
  const [selectedEnemy, setSelectedEnemy] = useState(null); // 선택된 적 포켓몬
  const [enemyHP, setEnemyHP] = useState(0); // 적 포켓몬의 체력

  const location = useLocation();

  useEffect(() => {
    // localStorage에서 사용자가 선택한 포켓몬과 적 포켓몬을 가져와 설정합니다.
    const storedPokemon = JSON.parse(localStorage.getItem('selectedPokemon'));
    if (storedPokemon) {
      setSelectedPokemon(storedPokemon);
    }

    const storedEnemyPokemon = JSON.parse(localStorage.getItem('enemyPokemon'));
    if (storedEnemyPokemon) {
      setEnemyPokemon(storedEnemyPokemon);
    }
  }, []);

  // Fight 버튼을 클릭하면 공격 기술을 표시합니다.
  const handleFightClick = () => {
    setShowAttacks(true);
  };

  // 공격 기술 버튼을 클릭하면 호출되는 함수입니다.
  const handleAttack = (attackDamage) => {
    if (selectedEnemy) {
      // 선택된 적 포켓몬의 체력을 공격 데미지만큼 감소시킵니다.
      const updatedHP = enemyHP - attackDamage;
      // 적 포켓몬의 체력이 0 미만으로 내려가지 않도록 합니다.
      setEnemyHP(updatedHP >= 0 ? updatedHP : 0);
    }
  };

  // 작은 이미지 토글 버튼을 클릭하면 작은 이미지 사용 여부를 변경합니다.
  const toggleSmallImages = () => {
    setUseSmallImages(prevState => !prevState);
  };

  // 적 포켓몬 카드를 클릭하면 해당 포켓몬을 선택합니다.
  const selectEnemyPokemon = (pokemon) => {
    setSelectedEnemy(pokemon);
    setEnemyHP(pokemon.hp); // 선택된 포켓몬의 체력을 초기화합니다.
  };

  // 각 포켓몬의 타입에 따라 타입 로고 이미지의 경로를 반환합니다.
  const getTypeLogo = (type) => {
    return `/img/types/${type}.png`; // 실제 타입 로고 이미지 경로로 변경해야 합니다.
  };

  // 포켓몬 타입에 따라 CSS 클래스를 반환하는 함수
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
  };

  const runBtn = () => {
    alert("도망칠 수 없었다!");
  }

  return (
    <div className={styles.App}>
      <div className={styles.stage}>
        {/* 적 포켓몬 목록을 표시합니다. */}
        <div className={styles.enemyContainer}>
          {enemyPokemon.length > 0 ? (
            enemyPokemon.map((pokemon, index) => (
              <div key={pokemon.id} className={styles.pokemonCard} onClick={() => selectEnemyPokemon(pokemon)}>
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
                    <div className={styles.hpBar} style={{ width: `${Math.min((pokemon.hpBar / MAX_HP) * 100, 100)}%` }}>
                      HP: {pokemon.hp}
                    </div>
                  </div>
                  {/* 공격 기술 표시 여부에 따라 공격 기술 목록을 보여줍니다. */}
                  {showAttacks && pokemon.attacks && (
                    <div className={styles.pokemonAttacks}>
                      <h3>공격 기술</h3>
                      {pokemon.attacks.map((attack, index) => (
                        <button key={index} className={styles.attackButton} onClick={() => handleAttack(attack.damage)}>
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
            ))
          ) : (
            <p>적 포켓몬이 없습니다.</p>
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.vs}></div>
        </div>
        {/* 선택된 사용자 포켓몬을 표시합니다. */}
        <div className={styles.selectedPokemonContainer}>
          {selectedPokemon.length > 0 ? (
            selectedPokemon.map((pokemon, index) => (
              <div key={pokemon.id} className={styles.pokemonCard}>
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
                    <div className={styles.hpBar} style={{ width: `${Math.min((pokemon.hpBar / MAX_HP) * 100, 100)}%` }}>
                      HP: {pokemon.hp}
                    </div>
                  </div>
                  {/* 공격 기술 표시 여부에 따라 공격 기술 목록을 보여줍니다. */}
                  {showAttacks && pokemon.attacks && (
                    <div className={styles.pokemonAttacks}>
                      <h3>공격 기술</h3>
                      {pokemon.attacks.map((attack, index) => (
                        <button key={index} className={styles.attackButton} onClick={() => handleAttack(attack.damage)}>
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
            ))
          ) : (
            <p>선택된 포켓몬이 없습니다.</p>
          )}
        </div>
      </div>
      {/* 메뉴 영역에는 Fight, Run, 이미지 토글 버튼을 표시합니다. */}
      <div className={styles.footer}>

<SettingContainer/>
<div className={styles.margin}></div>
<SettingContainer/>
<div className={styles.menu}>
  <button onClick={handleFightClick}>Fight</button>
  <button onClick={runBtn}>Run</button>
  <button onClick={toggleSmallImages}>Toggle Small Images</button>
</div>
</div>
    </div>
  );
}

export default Battle;

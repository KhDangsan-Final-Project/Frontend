import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styles from './css/battle.module.css';

const MAX_HP = 100;

function Battle() {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState([]);
  const [showAttacks, setShowAttacks] = useState(false);
  const [useSmallImages, setUseSmallImages] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedPokemon = JSON.parse(localStorage.getItem('selectedPokemon'));
    if (storedPokemon) {
      setSelectedPokemon(storedPokemon);
    }

    const storedEnemyPokemon = JSON.parse(localStorage.getItem('enemyPokemon'));
    if (storedEnemyPokemon) {
      setEnemyPokemon(storedEnemyPokemon);
    }
  }, []);

  const handleFightClick = () => {
    setShowAttacks(true);
  };

  const getTypeLogo = (type) => {
    return `/img/types/${type}.png`; // 이 부분은 실제 타입 로고 이미지 경로로 대체해야 합니다.
  };

  const runBtn = () => {
    alert("도망칠 수 없었다!"); // 도망칠 수 없었다!라는 문구는 임시로 넣은 것입니다.
  };

  const toggleSmallImages = () => {
    setUseSmallImages(prevState => !prevState);
  };

  return (
    <div className={styles.App}>
      <div className={styles.stage}>
        <div className={styles.enemyContainer}>
          {enemyPokemon.length > 0 ? (
            enemyPokemon.map((pokemon, index) => (
              <div key={pokemon.id} className={styles.pokemonCard}>
                <img src={useSmallImages ? pokemon.images.card : pokemon.images.small} alt={pokemon.name} />
                <h2>{pokemon.name}</h2>
                <p>타입: {pokemon.types.join(', ')}</p>
                <div className={styles.types}>
                  {pokemon.types.map((type, index) => (
                    <img key={index} src={getTypeLogo(type)} alt={type} className={styles.typeLogo} />
                  ))}
                </div>
                <div className={styles.hpBarContainer}>
                  <div className={styles.hpBar} style={{ width: `${Math.min((pokemon.hpBar / MAX_HP) * 100, 100)}%` }}>
                    HP: {pokemon.hp}
                  </div>
                </div>
                {showAttacks && pokemon.attacks && (
                  <div className={styles.pokemonAttacks}>
                    <h3>공격 기술</h3>
                    {pokemon.attacks.map((attack, index) => (
                      <button key={index} className={styles.attackButton}>
                        <div className={styles.attack}>
                          <p><strong>{attack.name}</strong></p>
                          <p>피해: {attack.damage}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>적 포켓몬이 없습니다.</p>
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.vs}></div>
        </div>
        <div className={styles.selectedPokemonContainer}>
          {selectedPokemon.length > 0 ? (
            selectedPokemon.map((pokemon, index) => (
              <div key={pokemon.id} className={styles.pokemonCard}>
                <img src={useSmallImages ? pokemon.images.card : pokemon.images.small} alt={pokemon.name} />
                <h2>{pokemon.name}</h2>
                <p>타입: {pokemon.types.join(', ')}</p>
                <div className={styles.types}>
                  {pokemon.types.map((type, index) => (
                    <img key={index} src={getTypeLogo(type)} alt={type} className={styles.typeLogo} />
                  ))}
                </div>
                <div className={styles.hpBarContainer}>
                  <div className={styles.hpBar} style={{ width: `${Math.min((pokemon.hp / MAX_HP) * 100, 100)}%` }}>
                    HP: {pokemon.hp}
                  </div>
                </div>
                {showAttacks && pokemon.attacks && (
                  <div className={styles.pokemonAttacks}>
                    <h3>공격 기술</h3>
                    {pokemon.attacks.map((attack, index) => (
                      <button key={index} className={styles.attackButton}>
                        <div className={styles.attack}>
                          <p><strong>{attack.name}</strong></p>
                          <p>피해: {attack.damage}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>선택된 포켓몬이 없습니다.</p>
          )}
        </div>
      </div>
      <div className={styles.menu}>
        <button onClick={handleFightClick}>Fight</button>
        <button onClick={runBtn}>Run</button>
        <button onClick={toggleSmallImages}>Toggle Small Images</button>
      </div>
    </div>
  );
}

export default Battle;

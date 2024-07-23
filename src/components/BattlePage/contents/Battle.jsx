import React from 'react';
import styles from './css/battle.module.css';
import usePokemonBattle from './hooks/useBattle';
import Chat from './Chat';
import UserInfoFightContent from './UserInfoFightContent';
import { useLocation } from 'react-router-dom';

const getTypeLogo = () => {
  return null;
};

const getTypeLogoContainerClass = () => {
  return null;
};

function Battle({ token }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get('roomId');

  const {
    selectedPokemon,
    showAttacks,
    useSmallImages,
    selectedEnemy,
    handleFightClick,
    handleAttack,
    toggleSmallImages,
    selectEnemyPokemon,
    opponentInfo
  } = usePokemonBattle(roomId);

  const renderPokemonCards = (pokemons, isEnemy) => {
    return pokemons.length > 0 ? (
      pokemons.map((pokemon) => (
        !pokemon.isRemoved && (
          <div
            key={pokemon.id}
            className={`${styles.pokemonCard} ${isEnemy && selectedEnemy && selectedEnemy.id === pokemon.id ? styles.selected : ''}`}
            onClick={() => isEnemy ? selectEnemyPokemon(pokemon) : null}
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
        )
      ))
    ) : (
      <p>{isEnemy ? '적 포켓몬이 없습니다.' : '선택된 포켓몬이 없습니다.'}</p>
    );
  };

  return (
    <div className={styles.App}>
      <h1>Room ID: {roomId}</h1>
      <div className={styles.stage}>
        <div className={styles.enemyContainer}>
          {renderPokemonCards(selectedPokemon, true)}
        </div>
        <div className={styles.body}>
          <div className={styles.vs}></div>
        </div>
        <div className={styles.selectedPokemonContainer}>
          {renderPokemonCards(selectedPokemon, false)}
        </div>
      </div>
      <div className={styles.footer}>
        <UserInfoFightContent token={token} opponentInfo={opponentInfo} />
        <div className={styles.margin}>
          <Chat roomId={roomId} token={token} />
        </div>
        <div className={styles.menu}>
          <button onClick={handleFightClick}>Fight</button>
          <button onClick={toggleSmallImages}>{useSmallImages ? '큰 이미지로 보기' : '작은 이미지로 보기'}</button>
        </div>
      </div>
    </div>
  );
}

export default Battle;

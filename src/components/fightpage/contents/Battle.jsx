import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/battle.module.css';
import SettingContainer from './SettingFightContent';
import usePokemonBattle from './hooks/useBattle';
import Chat from './Chat';


const Battle = () => {
    const {
        selectedPokemon,
        enemyPokemon,
        showAttacks,
        useSmallImages,
        selectedEnemy,
        handleFightClick,
        handleAttack,
        toggleSmallImages,
        selectEnemyPokemon,
        runBtn
    } = usePokemonBattle();



    const getTypeLogo = (type) => `/img/types/${type}.png`;

    const getTypeLogoContainerClass = (type) => {
        switch (type) {
            case 'Dragon': return styles.dragon;
            case 'Fairy': return styles.fairy;
            case 'Fighting': return styles.fighting;
            case 'Fire': return styles.fire;
            case 'Grass': return styles.grass;
            case 'Lightning': return styles.lightning;
            case 'Metal': return styles.metal;
            case 'Psychic': return styles.psychic;
            case 'Water': return styles.water;
            case 'Colorless': return styles.colorless;
            case 'Darkness': return styles.darkness;
            default: return '';
        }
    };

    return (
        <div className={styles.App}>
            <div className={styles.stage}>
                <div className={styles.enemyContainer}>
                    {enemyPokemon.length > 0 ? (
                        enemyPokemon.map((pokemon, index) => (
                            <div
                                key={pokemon.id}
                                className={`${styles.pokemonCard} ${selectedEnemy && selectedEnemy.id === pokemon.id ? styles.selected : ''}`}
                                onClick={() => selectEnemyPokemon(pokemon)}
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
                        ))
                    ) : (
                        <p>선택된 포켓몬이 없습니다.</p>
                    )}
                </div>
            </div>
            <div className={styles.footer}>
                <SettingContainer />
                <div className={styles.margin}>
                 
                          <Chat/>
                            </div>
                <SettingContainer />
                <div className={styles.menu}>
                    <button onClick={handleFightClick}>Fight</button>
                    <button onClick={runBtn}>Run</button>
                    <button onClick={toggleSmallImages}>Toggle Small Images</button>
                </div>
            </div>
        </div>
    );
};

export default Battle;

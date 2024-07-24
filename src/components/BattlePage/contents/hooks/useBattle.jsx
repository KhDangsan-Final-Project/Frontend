import { useState, useEffect } from 'react';

const useBattle = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState([]);
  const [showAttacks, setShowAttacks] = useState(false);
  const [useSmallImages, setUseSmallImages] = useState(false);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [enemyHP, setEnemyHP] = useState(0);

  useEffect(() => {
    const storedPokemon = JSON.parse(localStorage.getItem('selectedPokemon')) || [];
    const storedEnemyPokemon = JSON.parse(localStorage.getItem('enemyPokemon')) || [];
    const removedPokemons = JSON.parse(localStorage.getItem('removedPokemons')) || [];

    const updatePokemons = (pokemons) => {
      return pokemons.map(pokemon => ({
        ...pokemon,
        isRemoved: removedPokemons.includes(pokemon.id)
      }));
    };

    setSelectedPokemon(updatePokemons(storedPokemon));
    setEnemyPokemon(updatePokemons(storedEnemyPokemon));
  }, []);

  const handleFightClick = () => {
    setShowAttacks(true);
  };

  const handleAttack = (attackDamage) => {
    if (selectedEnemy) {
      const updatedHP = enemyHP - attackDamage;
      setEnemyHP(updatedHP >= 0 ? updatedHP : 0);

      const updatedEnemyPokemon = enemyPokemon.map(pokemon => {
        if (pokemon.id === selectedEnemy.id) {
          return { ...pokemon, hp: updatedHP >= 0 ? updatedHP : 0, isRemoved: updatedHP <= 0 };
        }
        return pokemon;
      });

      setEnemyPokemon(updatedEnemyPokemon);

      const removedPokemons = updatedEnemyPokemon.filter(pokemon => pokemon.hp <= 0).map(pokemon => pokemon.id);
      if (removedPokemons.length > 0) {
        localStorage.setItem('removedPokemons', JSON.stringify([...removedPokemons, ...JSON.parse(localStorage.getItem('removedPokemons') || '[]')]));
      }

      if (updatedHP <= 0) {
        setSelectedEnemy(null);
        setEnemyHP(0);
        setShowAttacks(false);
      }
    }
  };

  const toggleSmallImages = () => {
    setUseSmallImages(prevState => !prevState);
  };

  const selectEnemyPokemon = (pokemon) => {
    setSelectedEnemy(pokemon);
    setEnemyHP(pokemon.hp);
  };

  const runBtn = () => {
    alert("도망칠 수 없었다!");
  }

  return {
    selectedPokemon,
    enemyPokemon,
    showAttacks,
    useSmallImages,
    selectedEnemy,
    enemyHP,
    handleFightClick,
    handleAttack,
    toggleSmallImages,
    selectEnemyPokemon,
    runBtn
  };
};

export default useBattle;

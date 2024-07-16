import { useEffect, useState } from 'react';

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
    
    setSelectedPokemon(storedPokemon);
    setEnemyPokemon(storedEnemyPokemon);
  }, []);

  const handleFightClick = () => {
    setShowAttacks(true);
  };

  const handleAttack = (attackDamage) => {
    if (selectedEnemy) {
      const updatedHP = enemyHP - attackDamage;
      setEnemyHP(updatedHP >= 0 ? updatedHP : 0);

      setEnemyPokemon(prevState =>
        prevState.map(pokemon =>
          pokemon.id === selectedEnemy.id
            ? { ...pokemon, hp: updatedHP >= 0 ? updatedHP : 0 }
            : pokemon
        )
      );

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

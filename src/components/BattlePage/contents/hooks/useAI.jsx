import { useEffect } from 'react';

const useAI = (selectedPokemon, enemyPokemon, setSelectedPokemon, setEnemyPokemon, playerTurn, setPlayerTurn) => {
  useEffect(() => {
    if (playerTurn || !selectedPokemon.length || !enemyPokemon.length) return;

    const aiTurn = () => {
      // AI 턴 실행
      const randomEnemyPokemon = enemyPokemon[Math.floor(Math.random() * enemyPokemon.length)];
      const randomAttack = randomEnemyPokemon.attacks[Math.floor(Math.random() * randomEnemyPokemon.attacks.length)];
      const targetPlayerPokemon = selectedPokemon[Math.floor(Math.random() * selectedPokemon.length)];

      if (targetPlayerPokemon) {
        setTimeout(() => {
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
          setPlayerTurn(true); // AI 턴이 끝난 후 플레이어 턴으로 전환
        }, 3000); // 3초 딜레이 후 공격 실행
      }
    };

    aiTurn();
  }, [playerTurn, selectedPokemon, enemyPokemon, setSelectedPokemon, setEnemyPokemon, setPlayerTurn]);
};

export default useAI;

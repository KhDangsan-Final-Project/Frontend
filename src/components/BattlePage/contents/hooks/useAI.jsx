import { useEffect, useRef } from 'react';

const useAI = (selectedPokemon, enemyPokemon, setSelectedPokemon, setEnemyPokemon, playerTurn, setPlayerTurn) => {
  const aiTurnRef = useRef(false); // AI 턴 실행 여부를 확인하기 위한 ref

  useEffect(() => {
    if (playerTurn || !selectedPokemon.length || !enemyPokemon.length || aiTurnRef.current) return;

    aiTurnRef.current = true; // AI 턴 시작

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

          // AI 턴이 끝난 후 플레이어 턴으로 전환
          setPlayerTurn(true);
          aiTurnRef.current = false; // AI 턴 종료
        }, 3000); // 3초 딜레이 후 공격 실행
      } else {
        aiTurnRef.current = false; // AI 턴 종료
      }
    };

    aiTurn();
  }, [playerTurn, selectedPokemon, enemyPokemon, setSelectedPokemon, setPlayerTurn]);
};

export default useAI;

import { useEffect, useRef } from 'react';

const useAI = (
  selectedPokemon,
  enemyPokemon,
  setSelectedPokemon,
  setEnemyPokemon,
  playerTurn,
  setPlayerTurn,
  getCleanDamageValue
) => {
  const aiTurnRef = useRef(false); // AI 턴 실행 여부를 확인하기 위한 ref

  useEffect(() => {
    // 플레이어의 턴이거나, 포켓몬이 없거나, AI 턴이 이미 진행 중이면 실행하지 않음
    if (playerTurn || !selectedPokemon.length || !enemyPokemon.length || aiTurnRef.current) return;

    aiTurnRef.current = true; // AI 턴 시작

    const aiTurn = () => {
      // AI 턴 실행
      const randomEnemyPokemon = enemyPokemon[Math.floor(Math.random() * enemyPokemon.length)];
      const randomAttack = randomEnemyPokemon.attacks[Math.floor(Math.random() * randomEnemyPokemon.attacks.length)];
      const targetPlayerPokemon = selectedPokemon[Math.floor(Math.random() * selectedPokemon.length)];

      if (targetPlayerPokemon) {
        const damage = getCleanDamageValue(randomAttack.damage); // 기호를 제거한 데미지 값

        setTimeout(() => {
          // 플레이어의 포켓몬 상태 업데이트
          const updatedPlayerPokemon = selectedPokemon.map(pokemon => {
            if (pokemon.id === targetPlayerPokemon.id) {
              const newPokemon = { ...pokemon, hp: Math.max(pokemon.hp - damage, 0) };
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
  }, [playerTurn, selectedPokemon, enemyPokemon, setSelectedPokemon, setPlayerTurn, getCleanDamageValue]);
};

export default useAI;

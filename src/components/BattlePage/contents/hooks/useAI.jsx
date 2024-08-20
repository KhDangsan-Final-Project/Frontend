import { useEffect, useRef } from 'react';

const useAI = (
  selectedPokemon, // 플레이어가 선택한 포켓몬 목록
  enemyPokemon, // AI가 사용하는 포켓몬 목록
  setSelectedPokemon, // 플레이어의 포켓몬 상태를 업데이트하는 함수
  setEnemyPokemon, // AI의 포켓몬 상태를 업데이트하는 함수
  playerTurn, // 현재 턴이 플레이어의 턴인지 여부를 나타내는 상태
  setPlayerTurn, // 플레이어의 턴으로 전환하는 함수
  getCleanDamageValue // 공격 데미지에서 숫자만 추출하는 함수
) => {
  // AI 턴이 이미 진행 중인지 확인하기 위한 ref 변수
  const aiTurnRef = useRef(false);

  useEffect(() => {
    // 플레이어의 턴이거나, 포켓몬 목록이 비어 있거나, AI 턴이 이미 진행 중이면 실행하지 않음
    if (playerTurn || !selectedPokemon.length || !enemyPokemon.length || aiTurnRef.current) return;

    aiTurnRef.current = true; // AI 턴이 시작됨을 표시
    console.log("AI 턴 시작");

    const aiTurn = () => {
      // AI 턴을 실행
      // 무작위로 AI의 포켓몬과 공격 기술을 선택
      const randomEnemyPokemon = enemyPokemon[Math.floor(Math.random() * enemyPokemon.length)];
      const randomAttack = randomEnemyPokemon.attacks[Math.floor(Math.random() * randomEnemyPokemon.attacks.length)];
      const targetPlayerPokemon = selectedPokemon[Math.floor(Math.random() * selectedPokemon.length)];

      console.log(`AI가 선택한 포켓몬: ${randomEnemyPokemon.name}`);
      console.log(`AI가 선택한 공격: ${randomAttack.name}`);
      console.log(`타겟 플레이어 포켓몬: ${targetPlayerPokemon.name}`);

      if (targetPlayerPokemon) {
        // 공격 데미지 계산 (기호 제거)
        const damage = getCleanDamageValue(randomAttack.damage);
        console.log(`공격 데미지: ${damage}`);

        // 일정 시간 후(3초) 공격 실행
        setTimeout(() => {
          // 플레이어의 포켓몬 상태 업데이트
          const updatedPlayerPokemon = selectedPokemon.map(pokemon => {
            if (pokemon.id === targetPlayerPokemon.id) {
              const newPokemon = { ...pokemon, hp: Math.max(pokemon.hp - damage, 0) }; // HP가 0 이하로 떨어지지 않도록 설정
              console.log(`플레이어 포켓몬 ${pokemon.name}의 남은 HP: ${newPokemon.hp}`);
              if (newPokemon.hp === 0) {
                newPokemon.isFading = true; // 포켓몬이 쓰러졌음을 표시
                console.log(`플레이어 포켓몬 ${pokemon.name}이(가) 쓰러졌습니다.`);
                setTimeout(() => {
                  // 포켓몬이 쓰러진 경우, 해당 포켓몬을 목록에서 제거
                  setSelectedPokemon(prev => prev.filter(p => p.id !== newPokemon.id));
                }, 1000);
              }
              return newPokemon; // 업데이트된 포켓몬 반환
            }
            return pokemon; // 변경되지 않은 포켓몬 반환
          });

          // 플레이어의 포켓몬 상태 업데이트
          setSelectedPokemon(updatedPlayerPokemon);

          // AI 턴이 끝난 후 플레이어의 턴으로 전환
          setPlayerTurn(true);
          aiTurnRef.current = false; // AI 턴 종료
          console.log("AI 턴 종료, 플레이어의 턴으로 전환");
        }, 3000); // 3초 지연 후 공격 실행
      } else {
        console.log("AI가 공격할 대상 포켓몬을 찾지 못했습니다.");
        aiTurnRef.current = false; // AI 턴 종료
      }
    };

    // AI 턴을 실행
    aiTurn();
  }, [playerTurn, selectedPokemon, enemyPokemon, setSelectedPokemon, setPlayerTurn, getCleanDamageValue]);
};

export default useAI;

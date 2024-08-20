import { useState, useEffect } from 'react';

const useBattle = () => {
  // 선택된 포켓몬, 상대 포켓몬, 공격 표시 여부 등의 상태를 관리하는 상태 변수들
  const [selectedPokemon, setSelectedPokemon] = useState([]); // 플레이어가 선택한 포켓몬 목록을 저장
  const [enemyPokemon, setEnemyPokemon] = useState([]); // 상대방 또는 AI의 포켓몬 목록을 저장
  const [showAttacks, setShowAttacks] = useState(false); // 공격 버튼을 표시할지 여부를 관리
  const [useSmallImages, setUseSmallImages] = useState(false); // 포켓몬 이미지를 작은 크기로 사용할지 여부를 관리
  const [selectedEnemy, setSelectedEnemy] = useState(null); // 현재 선택된 상대 포켓몬을 저장
  const [enemyHP, setEnemyHP] = useState(0); // 선택된 상대 포켓몬의 현재 HP를 저장

  // useEffect 훅을 사용하여 로컬 스토리지에서 포켓몬 데이터를 초기화
  useEffect(() => {
    // 로컬 스토리지에서 저장된 포켓몬 목록을 가져옴
    const storedPokemon = JSON.parse(localStorage.getItem('selectedPokemon')) || []; // 플레이어의 포켓몬 목록을 로컬 스토리지에서 가져옴
    const storedEnemyPokemon = JSON.parse(localStorage.getItem('enemyPokemon')) || []; // 상대 포켓몬 목록을 로컬 스토리지에서 가져옴
    const removedPokemons = JSON.parse(localStorage.getItem('removedPokemons')) || []; // 제거된 포켓몬 ID를 로컬 스토리지에서 가져옴

    // 포켓몬 목록을 업데이트하고 제거된 포켓몬을 반영
    const updatePokemons = (pokemons) => {
      return pokemons.map(pokemon => ({
        ...pokemon,
        isRemoved: removedPokemons.includes(pokemon.id) // 제거된 포켓몬 ID와 일치하는 포켓몬을 표시
      }));
    };

    // 상태에 포켓몬 목록을 설정
    setSelectedPokemon(updatePokemons(storedPokemon)); // 플레이어 포켓몬 목록을 업데이트
    setEnemyPokemon(updatePokemons(storedEnemyPokemon)); // 상대 포켓몬 목록을 업데이트
  }, []);

  // 공격 버튼을 표시하기 위해 호출되는 함수
  const handleFightClick = () => {
    setShowAttacks(true); // 공격 버튼을 표시하도록 설정
  };

  // 플레이어가 상대 포켓몬을 공격할 때 호출되는 함수
  const handleAttack = (attackDamage) => {
    if (selectedEnemy) {
      // 공격으로 인한 상대 포켓몬의 HP 감소 계산
      const updatedHP = enemyHP - attackDamage;
      setEnemyHP(updatedHP >= 0 ? updatedHP : 0); // HP가 0보다 작아지지 않도록 설정

      // 상대 포켓몬 목록을 업데이트하여 HP와 제거 여부를 반영
      const updatedEnemyPokemon = enemyPokemon.map(pokemon => {
        if (pokemon.id === selectedEnemy.id) {
          return { ...pokemon, hp: updatedHP >= 0 ? updatedHP : 0, isRemoved: updatedHP <= 0 }; // HP가 0 이하이면 제거 표시
        }
        return pokemon;
      });

      // 상대 포켓몬 상태 업데이트
      setEnemyPokemon(updatedEnemyPokemon);

      // 제거된 포켓몬의 ID를 로컬 스토리지에 저장
      const removedPokemons = updatedEnemyPokemon.filter(pokemon => pokemon.hp <= 0).map(pokemon => pokemon.id);
      if (removedPokemons.length > 0) {
        localStorage.setItem('removedPokemons', JSON.stringify([...removedPokemons, ...JSON.parse(localStorage.getItem('removedPokemons') || '[]')]));
      }

      // 만약 상대 포켓몬의 HP가 0이 되면 선택 해제 및 공격 버튼 숨김
      if (updatedHP <= 0) {
        setSelectedEnemy(null); // 선택된 상대 포켓몬 해제
        setEnemyHP(0); // 상대 포켓몬 HP 초기화
        setShowAttacks(false); // 공격 버튼 숨김
      }
    }
  };

  // 작은 이미지로 전환할지 여부를 토글하는 함수
  const toggleSmallImages = () => {
    setUseSmallImages(prevState => !prevState); // 이미지 크기 설정을 토글
  };

  // 상대 포켓몬을 선택할 때 호출되는 함수
  const selectEnemyPokemon = (pokemon) => {
    setSelectedEnemy(pokemon); // 선택된 상대 포켓몬을 설정
    setEnemyHP(pokemon.hp); // 해당 포켓몬의 HP를 설정
  };

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
  };
};

export default useBattle;

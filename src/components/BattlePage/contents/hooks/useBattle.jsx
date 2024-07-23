import { useState, useEffect } from 'react';

const useBattle = (roomId) => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState([]);
  const [showAttacks, setShowAttacks] = useState(false);
  const [useSmallImages, setUseSmallImages] = useState(false);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [enemyHP, setEnemyHP] = useState(0);
  const [webSocket, setWebSocket] = useState(null);
  const [opponentInfo, setOpponentInfo] = useState(null); // 상대방 정보 상태 추가

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.20.54:8090/ms2/battle');
    setWebSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket 연결 완료');
      ws.send(JSON.stringify({ type: 'JOIN_ROOM', roomId }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('서버로부터의 데이터:', data);

        if (data.type === 'UPDATE_BATTLE') {
          updateBattleState(data);
        } else if (data.type === 'OPPONENT_INFO') { // 상대방 정보 업데이트
          setOpponentInfo(data.opponentInfo);
        }
      } catch (error) {
        console.error('JSON 파싱 오류:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    ws.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [roomId]);

  const updateBattleState = (data) => {
    setSelectedPokemon(data.selectedPokemon);
    setEnemyPokemon(data.enemyPokemon);
  };

  const handleAttack = (attackDamage) => {
    if (selectedEnemy && webSocket) {
      const updatedHP = selectedEnemy.hp - attackDamage;
      const updatedEnemy = { ...selectedEnemy, hp: Math.max(updatedHP, 0) };

      const updatedEnemyPokemon = enemyPokemon.map(pokemon =>
        pokemon.id === selectedEnemy.id ? updatedEnemy : pokemon
      );

      webSocket.send(JSON.stringify({
        type: 'ATTACK',
        roomId,
        enemyPokemon: updatedEnemyPokemon,
        selectedPokemon
      }));

      setSelectedPokemon(prevState => ({
        ...prevState,
        enemy: updatedEnemyPokemon.filter(pokemon => !pokemon.isRemoved),
      }));

      if (updatedHP <= 0) {
        setSelectedEnemy(null);
        setEnemyHP(0);
        setShowAttacks(false);
      }
    } else {
      console.error('WebSocket이 연결되지 않았거나 적이 선택되지 않았습니다');
    }
  };

  const handleFightClick = () => {
    setShowAttacks(true);
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
  };

  return {
    selectedPokemon,
    enemyPokemon,
    showAttacks,
    useSmallImages,
    selectedEnemy,
    enemyHP,
    opponentInfo, // 상대방 정보 반환
    handleFightClick,
    handleAttack,
    toggleSmallImages,
    selectEnemyPokemon,
    runBtn
  };
};

export default useBattle;

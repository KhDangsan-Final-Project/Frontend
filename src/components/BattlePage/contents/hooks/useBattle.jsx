import { useState, useEffect } from 'react';

const useBattle = (roomId) => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState([]);
  const [showAttacks, setShowAttacks] = useState(false);
  const [useSmallImages, setUseSmallImages] = useState(false);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [enemyHP, setEnemyHP] = useState(0);
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.20.54:8090/ms2/battle');
    setWebSocket(ws);

    ws.onopen = () => {
      console.log('useBattle Connected to WebSocket');
      ws.send(JSON.stringify({ type: 'JOIN_ROOM', roomId }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received data:', data);
        if (data.type === 'UPDATE_BATTLE') {
          updateBattleState(data);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    ws.onclose = (event) => {
      console.log('useBattle Disconnected from WebSocket:', event);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
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
      console.error('WebSocket is not connected or no enemy selected');
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
    handleFightClick,
    handleAttack,
    toggleSmallImages,
    selectEnemyPokemon,
    runBtn
  };
};

export default useBattle;

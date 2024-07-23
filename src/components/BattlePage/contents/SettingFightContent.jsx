import React, { useState, useEffect } from 'react';
import styles from './css/fight.module.css';

export default function SettingFightContent({ onReceiveData }) {
  const [roomNumber, setRoomNumber] = useState(''); // 방 번호 상태
  const [ws, setWs] = useState(null); // WebSocket 상태

  useEffect(() => {
    // WebSocket 연결 생성
    const websocket = new WebSocket('ws://192.168.20.54:8090/ms2/roomid'); 

    websocket.onopen = () => {
      console.log('WebSocket 연결 완료');
      setWs(websocket); // WebSocket 객체를 상태에 저장
    };

    websocket.onmessage = (event) => {
      console.log('서버로부터의 메시지:', event.data);
      if (event.data) {
        onReceiveData(event.data); // 부모 컴포넌트로 데이터 전송
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [onReceiveData]);

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value); // 방 번호 상태 업데이트
  };

  const handleButtonClick = () => {
    if (roomNumber && ws) {
      ws.send(JSON.stringify({ roomNumber })); // 방 번호를 서버로 전송
      console.log('방 번호 전송:', roomNumber);
    }
  };

  return (
    <div className={styles.settingContainer}>
      <h2>:::ROOM ID:::</h2>
      <div className={styles.battleSetting}>
        <input
          type="text"
          placeholder="방 번호를 입력해주세요"
          value={roomNumber}
          onChange={handleRoomNumberChange} // 입력값 변경 시 상태 업데이트
        />
        <button onClick={handleButtonClick}>결정</button> {/* 방 번호 전송 버튼 */}
      </div>
    </div>
  );
}

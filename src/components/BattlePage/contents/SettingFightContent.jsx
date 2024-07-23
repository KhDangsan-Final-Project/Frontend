import React, { useState, useEffect } from 'react';
import styles from './css/fight.module.css';

export default function SettingFightContent({ onReceiveData }) {
  const [roomNumber, setRoomNumber] = useState(''); // 방 번호 상태
  const [ws, setWs] = useState(null); // WebSocket 상태

  useEffect(() => {
    const websocket = new WebSocket('ws://192.168.20.54:8090/ms2/roomid'); 

    websocket.onopen = () => {
      console.log('WebSocket 연결 완료');
      setWs(websocket); // WebSocket 객체를 상태에 저장
    };

    websocket.onmessage = (event) => {
      console.log('서버로부터의 메시지:', event.data);
      // 서버에서 메시지를 받으면 onReceiveData를 호출
      if (event.data) { 
        console.log("방 입장 가능");
        onReceiveData(event.data); // 데이터 전달
      } else {
        console.log("방 사용중");
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket 연결 종료');
      // 연결 종료 시 ws 상태를 null로 설정
      setWs(null);
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, [onReceiveData]); // 의존성 배열에서 ws를 제거

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
      <h2>:::Setting:::</h2>
      <div className={styles.battleSetting}>
        <input
          type="text"
          placeholder="방 번호를 입력해주세요"
          value={roomNumber}
          onChange={handleRoomNumberChange} // 입력값 변경 시 상태 업데이트
        />
        <button onClick={handleButtonClick}>결정</button> {/* 방 번호 전송 버튼 */}
        <p>친구목록 출력</p>
      </div>
    </div>
  );
}

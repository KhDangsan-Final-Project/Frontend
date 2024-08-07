import React, { useState, useEffect } from 'react';
import styles from './css/fight.module.css';

export default function SettingFightContent({ onReceiveData, token }) {
  const [roomNumber, setRoomNumber] = useState(''); // 방 번호 상태
  const [ws, setWs] = useState(null); // WebSocket 상태
  const [error, setError] = useState(''); // 에러 상태

// ===================================== 임시 폐기 =======================================

  useEffect(() => {
    // WebSocket 연결 생성
    const websocket = new WebSocket('wss://teeput.synology.me:30112/ms2/roomid');

    websocket.onopen = () => {
      console.log('WebSocket 연결 완료');
      setWs(websocket); // WebSocket 객체를 상태에 저장
    };

    websocket.onmessage = (event) => {
      console.log('서버로부터의 메시지:', event.data);
  
      try {
        // 메시지를 JSON으로 파싱
        const data = JSON.parse(event.data);

        // 메시지 타입에 따라 처리
        if (data.type === 'ROOM_CREATED' || data.type === 'ROOM_JOINED') {
          onReceiveData(data.roomId); // 방 번호를 부모 컴포넌트로 전송
        } else if (data.type === 'ROOM_NOT_FOUND') {
          setError('방 번호가 잘못되었거나 방이 존재하지 않습니다.');
        } else if (data.error) {
          setError(`서버 오류: ${data.error}`);
        }
      } catch (error) {
        console.error('메시지 파싱 오류:', error);
        setError('서버 응답 처리 중 오류가 발생했습니다.');
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket 오류:', error);
      setError('WebSocket 오류가 발생했습니다.');
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
  }, [onReceiveData, token]);

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value); // 방 번호 상태 업데이트
  };

  const handleButtonClick = () => {
    if (roomNumber && ws) {
      if (/^\d+$/.test(roomNumber)) { // 방 번호가 숫자로만 이루어져 있는지 확인
        // 방 번호와 토큰 값을 서버로 전송
        ws.send(JSON.stringify({ 
          type: 'CREATE_OR_JOIN_ROOM', 
          roomId: roomNumber,
          token: token // 토큰 추가
        }));
        setRoomNumber(''); // 방 번호 전송 후 입력 필드 초기화
        setError(''); // 에러 초기화
      } else {
        setError('방 번호는 숫자만 입력 가능합니다.');
      }
    } else {
      setError('방 번호를 입력해주세요.');
    }
  };

  // 엔터키를 눌렀을 때 버튼 클릭 이벤트를 트리거하는 함수
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 동작 방지
      handleButtonClick(); // 버튼 클릭 함수 호출
    }
  };

  return (
    <div className={styles.settingContainer}>
      <h2 className={styles.h2}>:::ROOM ID:::</h2>
      <div className={styles.battleSetting}>
        <input
          type="text"
          placeholder="방 번호를 입력해주세요"
          value={roomNumber}
          onChange={handleRoomNumberChange} // 입력값 변경 시 상태 업데이트
          onKeyDown={handleKeyDown} // 엔터키 입력 감지
          className={styles.pokemonSearch}
        />
        <button onClick={handleButtonClick} className={styles.button}>: 결정 :</button> {/* 방 번호 전송 버튼 */}
        <p className={styles.p}>※사용 가능한 방 번호는 밑에 표시됩니다.</p>
      </div>
      {error && <p className={styles.error}>{error}</p>} {/* 에러 메시지 출력 */}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import styles from './css/fight.module.css';

export default function BattleUserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [ws, setWs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://192.168.20.54:8090/ms2/userInfo');

    websocket.onopen = () => {
      console.log('WebSocket 연결 완료');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      console.log('BattleUserInfo 서버로부터의 메시지:', event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'USER_INFO') {
          setUserInfo(data.userInfo);
        }
      } catch (error) {
        console.error('메시지 파싱 오류:', error);
        setError('메시지 파싱 오류가 발생했습니다.');
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket 오류:', error);
      setError('웹소켓 오류가 발생했습니다.');
    };

    websocket.onclose = () => {
      console.log('WebSocket 연결 종료');
      setWs(null);
    };

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // 랭크 이미지 클래스 설정
  const getRankImageClass = () => {
    if (userInfo) {
      switch (userInfo.grantNo) {
        case 1:
          return styles.rankImage1;
        case 2:
          return styles.rankImage2;
        case 3:
          return styles.rankImage3;
        case 4:
          return styles.rankImage4;
        case 5:
          return styles.rankImage5;
        case 6:
          return styles.rankImage6;
        default:
          return styles.rankImageDefault; // 기본 클래스
      }
    }
    return styles.rankImageDefault; // 기본 클래스
  };

  return (
    <div className={styles.settingContainer}>
      <h2>:::info:::</h2>
      <div className={styles.userInfoContainer}>
        <div className={styles.userImg}>
          <div className={getRankImageClass()}></div> {/* 랭크 이미지를 배경으로 설정 */}
        </div>
        <div className={styles.userNick}>
          <p className={styles.ptag}>"</p>
          {error ? (
            <p className={styles.error}>{error}</p> // 에러 메시지 표시
          ) : userInfo ? (
            <>
              <p className={styles.nick}>Nickname:<br /> {userInfo.nickname}</p>
              <p className={styles.ptag}>"</p>
              <p className={styles.victory}>Victory:<br /> {userInfo.matchWin}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

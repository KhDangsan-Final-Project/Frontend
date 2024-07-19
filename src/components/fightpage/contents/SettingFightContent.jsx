import React, { useEffect, useState } from 'react';
import styles from './css/fight.module.css';

function SettingFightContent({ token }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      const ws = new WebSocket('ws://192.168.20.54:8090/ms2/token');

      ws.onopen = () => {
        console.log('Connected to WebSocket /SettingFightContent');
        ws.send(JSON.stringify({ token }));  // JSON 형식으로 토큰 전송
      };

      ws.onmessage = function(event) {
        console.log('Message from server:', event.data);

        try {
          const data = JSON.parse(event.data);
          console.log(data);
          console.log(data.id);
          console.log(data.nickname);
          setUserInfo({ id: data.id, nickname: data.nickname });
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from WebSocket /SettingFightContent');
      };

      return () => {
        ws.close();
      };
    }
  }, [token]);

  return (
    <div className={styles.settingContainer}>
      <h2>:::info:::</h2>
      <div className={styles.userInfoContainer}>
        <div className={styles.userImg}>
          <div className={styles.rankImage}></div> {/* 랭크 이미지를 추가할 부분 */}
        </div> {/* 회원 이미지를 추가할 부분 */}
        <div className={styles.userNick}>
          <p className={styles.ptag}>"</p>
          {userInfo ? (
            <>
              <p className={styles.nick}>Nickname:<br/> {userInfo.nickname}</p> {/* 회원닉네임을 추가할 부분 */}
              <p className={styles.ptag}>"</p>
              <p className={styles.victory}>ID:<br/> {userInfo.id}</p> {/* 전투 승리 수를 추가할 부분 */}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <h2>:::Setting:::</h2>
      <div className={styles.battleSetting}>
        {/* 추가적인 전투 설정 컴포넌트나 정보를 여기에 추가할 수 있습니다 */}
      </div>
    </div>
  );
}

export default SettingFightContent;

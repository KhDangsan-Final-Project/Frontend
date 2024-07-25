import React, { useEffect, useState } from 'react';
import styles from './css/fight.module.css';

function UserInfoFightContent({ token }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      const ws = new WebSocket('ws://192.168.20.54:8090/ms2/token');

      ws.onopen = () => {
        console.log('Connected to WebSocket /UserInfoFightContent');
        ws.send(JSON.stringify({ token }));  // JSON 형식으로 토큰 전송
      };

      ws.onmessage = function(event) {
        console.log('Message from server:', event.data);

        try {
          const data = JSON.parse(event.data);
          console.log(data);
          setUserInfo({
            id: data.id,
            nickname: data.nickname,
            grantNo: data.grantNo,
            matchWin: data.matchWin
          });
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from WebSocket /UserInfoFightContent');
      };

      return () => {
        ws.close();
      };
    }
  }, [token]);



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
          <div className={getRankImageClass()}></div> 
          <div className={styles.userImage}></div>
        </div>
        <div className={styles.userNick}>
          <p className={styles.ptag}>"</p>
          {userInfo ? (
            <>
              <p className={styles.nick}>Nickname:<br/> {userInfo.nickname}</p>
              <p className={styles.ptag}>"</p>
              <p className={styles.victory}>Victory:<br/> {userInfo.matchWin}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfoFightContent;

import React, { useEffect, useState } from 'react';
import styles from './css/fight.module.css';
import { getRankImageClass, getProfileImageClass } from './utils'; // utils 파일에서 함수 가져오기

function UserInfoFightContent({ token }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      const ws = new WebSocket('wss://teeput.synology.me:30112/ms2/token');

      ws.onopen = () => {
        console.log('Connected to WebSocket /UserInfoFightContent');
        ws.send(JSON.stringify({ token }));  // JSON 형식으로 토큰 전송
      };

      ws.onmessage = function(event) {
        console.log('Message from server by userInfoFightContent:', event.data);

        try {
          const data = JSON.parse(event.data);
          console.log(data);
          setUserInfo({
            profile: data.profile,
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

  return (
    <div className={styles.settingContainer}>
      <h2 className={styles.h2}>:::info:::</h2>
      <div className={styles.userInfoContainer}>
        <div className={styles.userImg}>
          {/* Check if userInfo exists before accessing its properties */}
          {userInfo ? (
            <>
              <div className={getRankImageClass(userInfo.matchWin, styles)}></div> 
              <div className={getProfileImageClass(userInfo.profile, styles)}></div>
            </>
          ) : (
            <p className={styles.p}>Loading...</p>  // Show loading state if userInfo is not available
          )}
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

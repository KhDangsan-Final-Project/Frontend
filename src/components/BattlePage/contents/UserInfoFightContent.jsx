import React, { useEffect, useState } from 'react';
import styles from './css/fight.module.css';

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

  const getRankImageClass = () => {
    if (userInfo) {
      const { matchWin } = userInfo;
      if (matchWin > 0 && matchWin <= 10) {
        return styles.rankImage1;
      } else if (matchWin > 10 && matchWin <= 20) {
        return styles.rankImage2;
      } else if (matchWin > 20 && matchWin <= 30) {
        return styles.rankImage3;
      } else if (matchWin > 30 && matchWin <= 40) {
        return styles.rankImage4;
      } else if (matchWin > 40 && matchWin <= 50) {
        return styles.rankImage5;
      } else if (matchWin > 50) {
        return styles.rankImage6;
      } else {
        return styles.rankImageDefault; // 기본 클래스
      }
    }
    return styles.rankImageDefault; // 기본 클래스
  };
  const getProfileImageClass = () => {
    if (userInfo) {
      switch (userInfo.profile) {
        case '1':
          return styles.userImage1;
        case '2':
          return styles.userImage2;
        case '3':
          return styles.userImage3;
        case '4':
          return styles.userImage4;
        case '5':
          return styles.userImage5;
        case '6':
          return styles.userImage6;
        default:
          return styles.userImageDefault; // 기본 클래스
      }
    }
    return styles.userImageDefault; // 기본 클래스
  };

  return (
    <div className={styles.settingContainer}>
      <h2 className={styles.h2}>:::info:::</h2>
      <div className={styles.userInfoContainer}>
        <div className={styles.userImg}>
          {/* Check if userInfo exists before accessing its properties */}
          {userInfo ? (
            <>
              <div className={getRankImageClass()}></div> 
              <div className={getProfileImageClass()}></div>
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

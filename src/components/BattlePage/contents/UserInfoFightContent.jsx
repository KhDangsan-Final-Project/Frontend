import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/fight.module.css';
import { getRankImageClass, getProfileImageClass } from './utils'; // utils 파일에서 함수 가져오기

function UserInfoFightContent({ token }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          const response = await axios.post('http://localhost:8090/ms2/game/user', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });

          const data = response.data;
          setUserInfo({
            profile: data.profile,
            id: data.id,
            nickname: data.nickname,
            grantNo: data.grantNo,
            matchWin: data.matchWin
          });

          if ([11, 21, 31, 41, 51].includes(data.matchWin)) {
            await updateGrantNo(data.matchWin);
          }

        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      }
    };

     // grantNo 업데이트 함수
     const updateGrantNo = async (matchWin) => {
      try {
        await axios.put('http://localhost:8090/ms3/updaterank', { matchWin }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        console.log('grantNo updated successfully.');
      } catch (error) {
        console.error('Failed to update grantNo:', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  

  return (
    <div className={styles.settingContainer}>
      <h2 className={styles.h2}>:::info:::</h2>
      <div className={styles.userInfoContainer}>
        <div className={styles.userImg}>
          {userInfo ? (
            <>
              <div className={getRankImageClass(userInfo.matchWin, styles)}></div> 
              <div className={getProfileImageClass(userInfo.profile, styles)}></div>
            </>
          ) : (
            <p className={styles.p}>Loading...</p>
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

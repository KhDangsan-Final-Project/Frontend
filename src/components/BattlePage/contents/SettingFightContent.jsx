// SettingContainer.js

import React from 'react';
import styles from './css/fight.module.css'; // CSS 모듈 경로에 맞게 수정하세요

const SettingContainer = () => {
  return (
    <div className={styles.settingContainer}>
        <h2>:::info:::</h2>
      <div className={styles.userInfoContainer}>
        <div className={styles.userImg}>
        <div className={styles.rankImage}></div> {/* 랭크 이미지를 추가할 부분 */}
            </div> {/* 회원 이미지를 추가할 부분 */}
            <div className={styles.userNick}>
<p className={styles.ptag}>"</p>
        <p className={styles.nick}>Nickname : </p> {/* 회원닉네임을 추가할 부분 */}
<p className={styles.ptag}>"</p>
        <p className={styles.victory}>victory :</p> {/* 전투 승리 수를 추가할 부분 */}
            </div>
      </div>
        <h2>:::Setting:::</h2>
      <div className={styles.battleSetting}>
        {/* 추가적인 전투 설정 컴포넌트나 정보를 여기에 추가할 수 있습니다 */}
      </div>
    </div>
  );
};

export default SettingContainer;

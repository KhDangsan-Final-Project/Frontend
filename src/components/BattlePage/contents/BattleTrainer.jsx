import styles from './css/fight.module.css';

export default function BattleTrainer() {


 

  return (
    <div className={styles.settingContainer}>
      <h2>:::info:::</h2>
      <div className={styles.userInfoContainer}>
        <div className={styles.userImg}>
          <div className={styles.trainerRankImg} ></div> {/* 랭크 이미지를 배경으로 설정 */}
        <div className={styles.trainer}></div>
        </div>
        <div className={styles.userNick}>
          <p className={styles.ptag}>"</p>
        
            <>
              <p className={styles.nick}>Nickname:<br /> ALDER</p>
              <p className={styles.ptag}>"</p>
              <p className={styles.victory}>trainer♪</p>
            </>
        
        </div>
      </div>
    </div>
  );
}

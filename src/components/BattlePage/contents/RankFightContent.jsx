import styles from './css/fight.module.css';

export default function rankFightContent() {
    return(
        <>
        <div className={styles.rankContainer}>
        <div className={styles.rankImage6}></div>
        <div className={styles.rankImage5}></div>
        <div className={styles.rankImage4}></div>
        <div className={styles.rankImage3}></div>
        <div className={styles.rankImage2}></div>
        <div className={styles.rankImage1}></div>
        </div>
        <p>랭크에 따른 포켓볼 뱃지입니다.<br/> 오른쪽에서 왼쪽으로 갈수록 랭크가 높습니다.</p>
        </>
    );
}
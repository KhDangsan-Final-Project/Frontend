import styles from './css/fight.module.css';

export default function RankFightContent() {
    return (
        <>
            <div className={styles.rankContainer}>
                <div className={`${styles.rankImage} ${styles.rankImage1}`}>
                    <div className={styles.tooltip}>기본 뱃지</div>
                </div>
                <div className={`${styles.rankImage} ${styles.rankImage2}`}>
                    <div className={styles.tooltip}>10회 이상 승리시</div>
                </div>
                <div className={`${styles.rankImage} ${styles.rankImage3}`}>
                    <div className={styles.tooltip}>20회 이상 승리시</div>
                </div>
                <div className={`${styles.rankImage} ${styles.rankImage4}`}>
                    <div className={styles.tooltip}>30회 이상 승리시</div>
                </div>
                <div className={`${styles.rankImage} ${styles.rankImage5}`}>
                    <div className={styles.tooltip}>40회 이상 승리시</div>
                </div>
                <div className={`${styles.rankImage} ${styles.rankImage6}`}>
                    <div className={styles.tooltip}>50회 이상 승리시</div>
                </div>
            </div>
            <p className={styles.p}>랭크에 따른 포켓볼 뱃지입니다.<br /> 왼쪽에서 오른쪽으로 갈수록 높은 랭크를 뜻합니다.</p>
        </>
    );
}

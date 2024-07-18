import styles from './css/Line.module.css'

export default function Line() {
    return (
        <div className={styles.background}>
            <div className={styles.circle1}>
                <div className={styles.circle2}>
                    <div className={styles.circle3}>
                        <h1 className={styles.title}>다시 한번 불꽃을 피워 올리세요 🔥</h1>
                        <div className={styles.content}>포켓 라이브러리는 이제 더욱더 빨라진 콘텐츠 주기에 맞춰 이 기념적인 컨텐츠를 즐길 수 있습니다. 여러분은 출석과 게임을 활용하여 카드를 랭킹을 업할 수 있습니다.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
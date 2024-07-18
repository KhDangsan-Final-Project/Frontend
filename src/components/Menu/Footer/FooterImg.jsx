import styles from './css/FooterImg.module.css'

export default function FooterImg() {
    return (
        <div className={styles.background}>
            <div className={styles.pokemon1}>
                <img src='/img/footer/go.png' alt='고라파덕' className={styles.img} />
            </div>
            <div className={styles.pokemon2}>
                <img src='/img/footer/ggo.png' alt='꼬부기' className={styles.img} />
            </div>
            <div className={styles.pokemon3}>
                <img src='/img/footer/yi.png' alt='이상해씨' className={styles.img} />
            </div>
            <div className={styles.pokemon4}>
                <img src='/img/footer/pe.png' alt='피카츄' className={styles.img} />
            </div>
            <div className={styles.pokemon5}>
                <img src='/img/footer/pa.png' alt='파이리' className={styles.img} />
            </div>
        </div>
    )
}
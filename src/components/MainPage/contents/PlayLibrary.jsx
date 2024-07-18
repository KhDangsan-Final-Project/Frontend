import styles from './css/PlayLibrary.module.css';
import { Link } from 'react-router-dom';

export default function PlayLibrary() {

    return (

        <div className={styles.container}>

            <img src='/img/main/section2.jpg' className={styles.img} />

            <div className={styles.textContainer}>
                <div className={styles.title}>다양한 포켓몬 카드들</div>
                <div className={styles.content}>Poke Library에서 무한한 업그레이드 포켓몬 카드의 세계를 발견 하세요. 새로운 도감 시스템, 전투를 경험하세요.</div>

                <Link to="/library" className={styles.link}>지금 바로 도감 확인하기</Link>
            </div>
        </div>

    );
}
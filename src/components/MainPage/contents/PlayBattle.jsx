import styles from './css/PlayBattle.module.css';
import { Link } from 'react-router-dom';

export default function PlayBattle() {

  return (

    <div className={styles.container}>
      
      <div className={styles.textContainer}>
        <div className={styles.title}>포켓몬 카드 도감 기반</div>
        <div className={styles.content}>다양한 종류의 포켓몬 카드를 만나 컬렉션에 추가해서 포켓몬 카드 도감을 완성하세요. 오늘부터 포켓몬 여행을 시작하세요!</div>

        <Link to="/fight" className={styles.link}>지금 포켓몬 카드 전투 시작하기</Link>
      </div>

      <img src='/img/main/section1.jpg' className={styles.img} />
    </div>

  );
}
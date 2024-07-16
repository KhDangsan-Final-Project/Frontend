import styles from './css/PlayBattle.module.css';
import { Link } from 'react-router-dom';

export default function PlayBattle() {

  return (

    <div className={styles.container}>

      <h1 className={styles.h1title}>Play Game!</h1>

      <div className={styles.subcontainer}>
        <div className={styles.subcontainer2}>
          <div className={styles.text}>
            <div className={styles.title}>포켓몬 카드 도감 기반</div>
            <div className={styles.content}>다양한 종류의 포켓몬 카드를 만나 컬렉션에 추가해서 포켓몬 카드 도감을 완성하세요. 오늘부터 포켓몬 여행을 시작하세요!</div>
            <Link to="/fight" className={styles.startlink}>지금 포켓몬 카드 전투 시작하기 ➡️</Link>
          </div>
          <img src="/img/pokemon.png" className={styles.image}/>
        </div>
      </div>

      <div className={styles.subcontainer}>
        <div className={styles.subcontainer2}>
          <img src="/img/pokemon.png" className={styles.image}/>
          <div className={styles.text}>
            <div className={styles.title}>다양한 포켓몬 카드들</div>
            <div className={styles.content}>Poké Library 에서 무한한 업그레이드 포켓몬 카드의 세계를 발견하세요. 새로운 도감 시스템, 전투를 경험하세요.</div>
            <Link to="/fight" className={styles.startlink}>지금 포켓몬 카드 전투 시작하기 ➡️</Link>
          </div>
        </div>
      </div>

      <div className={styles.subcontainer}>
        <div className={styles.subcontainer2}>
          <div className={styles.text}>
            <div className={styles.title}>포켓 라이브러리의 세계로 빠져들어보세요.</div>
            <div className={styles.content}>Poké Library 에서 새로운 종류의 포켓몬 경험을 찾아보세요. 포켓몬 카드의 즐겁고 유익한 팁과 사실들을 얻어보세요.</div>
            <Link to="/fight" className={styles.startlink}>지금 포켓몬 카드 전투 시작하기 ➡️</Link>
          </div>
          <img src="/img/pokemon.png" className={styles.image}/>
        </div>
      </div>

    </div>

  );
}
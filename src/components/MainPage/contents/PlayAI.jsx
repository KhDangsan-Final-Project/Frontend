import styles from './css/PlayAI.module.css';
import { Link } from 'react-router-dom';

export default function PlayAI() {

  return (

    <div className={styles.container}>
      
      <div className={styles.textContainer}>
        <div className={styles.title}>AI 포켓몬 카드 검색</div>
        <div className={styles.content}>포켓몬 카드 컬렉션을 관리하고 싶으신가요? 저희 AI 포켓몬 카드 검색 서비스를 사용해 보세요! 포켓몬 카드를 촬영하면 AI가 자동으로 카드를 인식하고, 카드의 정보를 제공해 드립니다.</div>

        <Link to="/ai" className={styles.link}>지금 포켓몬 카드 촬영하기</Link>
      </div>

      <img src='/img/main/section3.jpg' className={styles.img} />
    </div>

  );
}
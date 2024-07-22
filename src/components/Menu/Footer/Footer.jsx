import styles from './css/Footer.module.css';

export default function Footer() {

  return(
    <div className={styles.container}>
        <img src="/img/pokeball.png" alt="logo" className={styles.logo} />
        <ul className={styles.menu}>
          <li>개인정보처리방침</li>
          <li>회사 소개</li>
          <li>서비스 소개</li>
          <li>홈페이지 이용약관</li>
          <li>위치정보 이용약관</li>
          <li>광고 및 제휴</li>
        </ul>
        <div className={styles.info}>
         <span>사업자등록번호 2024-123-456</span>
         <span>(주)파이널 프로젝트</span>
         <span>TEL : 02）2024-1234 / FAX : 02）1234-5678</span>
        </div>
          <p className={styles.copy}>Copyright © Pokemon Game Company. All Rights Reseved.</p>
     </div>
  )
}
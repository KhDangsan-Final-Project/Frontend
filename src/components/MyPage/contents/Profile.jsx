import React, { useState, useEffect } from 'react';
import styles from './css/Profile.module.css';
import Loading from '../../Loading/Loding';

export default function Profile() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <img src="../img/jiwoo.jpg" alt="프로필 이미지" />
      </div>

      <form className={styles.form}>
        <label>
          <span>이름</span>
          <input type="text" placeholder="이름" className={styles.info} />
        </label>
        
        <label>
          <span>아이디</span>
          <input type="text" placeholder="아이디" />
        </label>

        <div className={styles.emailSection}>
          <label>
            <span>이메일</span>
            <input type="email" placeholder="이메일을 입력해주세요" className={styles.email} />
            @
            <select>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.net">daum.net</option>
            </select>
          </label>
        </div>

        <label>
          <span>비밀번호</span>
          <input type="password" placeholder="비밀번호" className={styles.info} />
        </label>

        <label>
          <span>비밀번호 확인</span>
          <input type="password" placeholder="비밀번호 확인" className={styles.info} />
        </label>

        <label>
          <span>닉네임</span>
          <input type="text" placeholder="닉네임" className={styles.info} />
        </label>
      </form>

      <div className={styles.btn}>
        <button type="submit" className={styles.update_btn}>수정하기</button>
        <button type="button" className={styles.cancel}>취소</button>
      </div>
    </div>
  );
}

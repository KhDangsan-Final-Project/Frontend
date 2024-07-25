import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/PasswordResetRequestPage.module.css';

export default function PasswordResetRequestPage( {showLogin}) {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('naver.com');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullEmail = `${email}@${domain}`;
    try {
      const response = await axios.post('http://localhost:9997/ms3/password-reset-request', { email: fullEmail });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('비밀번호 재설정 요청 중 오류 발생');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>Password Reset Request</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.email}>
          <div className={styles.email_box}>
            <input type="text" value={email} onChange={handleEmailChange} placeholder="이메일을 입력해주세요" />
          </div>
          <div className={styles.email_option}>
            <select name="emailDomain" value={domain} onChange={handleDomainChange}>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="icloud.com">icloud.com</option>
                <option value="kakao.com">kakao.com</option>
              </select>
            </div>
          </div>
          <button type="submit" className={styles.btn_submit}>Reset Request</button>
          <button type="reset" className={styles.btn_cancel} onClick={showLogin}>Cancel</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
    
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/PasswordResetRequestPage.module.css';

export default function PasswordResetRequestPage() {
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
      const response = await axios.post('http://teeput.synology.me:30112/ms3/password-reset-request', { email: fullEmail });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('비밀번호 재설정 요청 중 오류 발생');
    }
  };

  return (
    <div className={styles.container}>
      <h2>비밀번호 재설정 요청</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.emailContainer}>
          <input
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <span>@</span>
          <select value={domain} onChange={handleDomainChange}>
            <option value="naver.com">naver.com</option>
            <option value="google.com">google.com</option>
            <option value="hanmail.net">hanmail.net</option>
          </select>
        </div>
        <button type="submit">비밀번호 재설정 요청</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

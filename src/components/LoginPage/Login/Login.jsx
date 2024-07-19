import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/Login.module.css';

export default function Login({ setToken, showRegister }) {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const handleRegisterClick = () => {
    showRegister();
};

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8090/ms3/user/select', formData);
      if (response.data.result) {
        alert('로그인 성공');
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);  // 추가된 부분
        navigate('/');
      } else {
        alert('로그인 실패: ' + response.data.msg);
      }
    } catch (error) {
      alert('로그인 중 오류 발생: ' + error.message);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>Poke Library</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.txt_box}>
            <input
              type="text"
              name="id"
              placeholder="아이디를 입력해주세요"
              value={formData.id} // 수정
              onChange={handleChange}
            />
            <i className="bi bi-person-circle"></i>
          </div>
          <div className={styles.txt_box}>
            <input
              type="password"
              name="password"
              placeholder="패스워드를 입력해주세요"
              value={formData.password} // 수정
              onChange={handleChange}
            />
            <i className="bi bi-lock"></i>
          </div>
          <div className={styles.chk_bar}>
            <div>
                <input type="checkbox" id="check1" className={styles.checkbox} />
                <label htmlFor="check1" className={styles.checkboxLabel}>이 계정 기억하기</label>
            </div>
            <a href="/password-reset-request" className={styles.searchPS}>비밀번호 찾기</a>
          </div>
          <button type="submit" className={styles.btn_login}>Login</button>
        </form>
        <div className={styles.register_bar}>
          <p>계정을 가지고 있지 않나요?</p> 
          <a href='#' onClick={handleRegisterClick}>회원가입</a></div>
      </div>
    </div>
  );
}

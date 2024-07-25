import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/Login.module.css';
import { useCookies } from 'react-cookie';

export default function Login({ setToken, showRegister }) {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberUserAccount"]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (cookies.rememberUserAccount) {
      setFormData((prevData) => ({ ...prevData, id: cookies.rememberUserAccount }));
      setIsRemember(true);
    }
  }, [cookies]);

  const handleOnChange = (e) => {
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      setCookie("rememberUserAccount", formData.id, { maxAge: 60 * 60 * 24 * 30 }); // 30일
    } else {
      removeCookie("rememberUserAccount");
    }
  };

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
        alert(response.data.msg);
        const token = response.data.token;
        setToken(token);
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        setError('! 아이디 또는 비밀번호를 정확히 입력해 주세요.');
      }
    } catch (error) {
      alert('로그인 중 오류 발생: ' + error.message);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>Poké Library</h1>
        <form name='loginForm' onSubmit={handleSubmit}>
          <div className={styles.txt_box}>
            <input
              type="text"
              name="id"
              placeholder="아이디를 입력해주세요"
              value={formData.id}
              onChange={handleChange}
            />
            <i className="bi bi-person-circle"></i>
          </div>
          <div className={styles.txt_box}>
            <input
              type="password"
              name="password"
              placeholder="패스워드를 입력해주세요"
              value={formData.password}
              onChange={handleChange}
            />
            <i className="bi bi-lock"></i>
          </div>
          <div className={styles.chk_bar}>
            <div>
              <label htmlFor="check1" className={styles.checkboxLabel}>
                이 계정 기억하기
                <input
                  type="checkbox"
                  id="check1"
                  className={styles.checkbox}
                  onChange={handleOnChange}
                  checked={isRemember}
                />
              </label>
            </div>
            <a href="/password-reset-request" className={styles.searchPS}>비밀번호 찾기</a>
          </div>
          <div className={`${styles.error} ${error ? styles.visible : styles.hidden}`}>{error}</div>
          <button type="submit" className={styles.btn_login}>Login</button>
        </form>
        <div className={styles.register_bar}>
          <p>계정을 가지고 있지 않나요?</p>
          <a href='#' onClick={handleRegisterClick}>회원가입</a>
        </div>
      </div>
    </div>
  );
}

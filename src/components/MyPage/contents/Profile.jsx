import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './css/Profile.module.css';
import Loading from '../../Loading/Loading';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ name: '', id: '', email: '', password: '', nickname: '' });
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("토큰이 없습니다.");
      setLoading(false);
      return;
    }
    axios.get('https://teeput.synology.me:30112/ms3/mypage', { params: { token } })
      .then(response => {
        if (response.data) {
          setUserData(response.data);
        } else {
          console.error("서버에서 데이터를 가져오지 못했습니다.");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("사용자 데이터를 가져오는 중 오류가 발생했습니다!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      password: value
    }));
    setPasswordValid(checkPassword(value));
  };

  const handlePasswordCheckChange = (e) => {
    const { value } = e.target;
    setPasswordCheck(value);
    setPasswordMatch(value === userData.password);
  };

  const handleEmailChange = (part, value) => {
    const emailParts = userData.email.split('@');
    emailParts[part] = value;
    setUserData(prevState => ({
      ...prevState,
      email: emailParts.join('@')
    }));
  };

  const checkPassword = (password) => {
    let reg = /(?=.*\d)(?=.*[!@#$%^&*~])[A-Za-z\d!@#$%^&*~]{8,32}$/;
    return reg.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!passwordValid || !passwordMatch) {
      return;
    }
    try {
      const response = await axios.put('https://teeput.synology.me:30112/ms3/mypage/update', userData, {
        params: { token }
      });
      if (response.data.status === 'success') {
        alert('정보가 성공적으로 업데이트되었습니다.');
        navigate('/');
      } else {
        console.error('정보 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('정보 업데이트 중 오류가 발생했습니다!', error);
    }
  };  

  const handleDeleteAccount = async () => {
    if (!window.confirm("회원 탈퇴를 하시겠습니까?")) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`https://teeput.synology.me:30112/ms3/user/delete`, {
        params: { id: userData.id, token: token }
      });

      if (response.data.status === 'success') {
        alert('회원 탈퇴가 성공적으로 처리되었습니다.');
        localStorage.removeItem('token'); 
        navigate('/'); 
      } else {
        alert(response.data.message || '회원 탈퇴에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원 탈퇴 중 오류가 발생했습니다!', error);
      alert('회원 탈퇴 중 오류가 발생했습니다!');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>프로필</h2>
      <div className={styles.profileSection}>
        <img src={userData.profile} alt="프로필 이미지" />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <span>이름</span>
          <input type="text" placeholder="이름" className={styles.info} value={userData.name} readOnly />
        </label>
        
        <label className={styles.label}>
          <span>아이디</span>
          <input type="text" placeholder="아이디" value={userData.id} readOnly />
        </label>

        <div className={styles.emailSection}>
          <label className={styles.label2}>
            <span>이메일</span>
            <input 
              type="text"  placeholder="이메일을 입력해주세요"  className={styles.email}  value={userData.email.split('@')[0]}  onChange={(e) => handleEmailChange(0, e.target.value)}  />
            @
            <select value={userData.email.split('@')[1]} onChange={(e) => handleEmailChange(1, e.target.value)}>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.net">daum.net</option>
            </select>
          </label>
        </div>

        <label className={styles.label}>
          <span>비밀번호</span>
          <input type="password" placeholder="비밀번호" className={styles.info} onChange={handlePasswordChange} />
        </label>
        <span className={`${styles.error} ${passwordValid ? styles.hidden : styles.visible}`}>
          *암호는 숫자, 특수문자 1글자씩 포함되어야합니다. 8~32글자 사이로 입력하세요.
        </span>

        <label className={styles.label}>
          <span>비밀번호 확인</span>
          <input type="password" placeholder="비밀번호 확인" className={styles.info} value={passwordCheck} onChange={handlePasswordCheckChange} />
        </label>
        <span className={`${styles.error} ${passwordMatch ? styles.hidden : styles.visible}`}>
          *암호가 일치하지 않습니다.
        </span>

        <label className={styles.label}>
          <span>닉네임</span>
          <input 
            type="text" 
            placeholder="닉네임" 
            className={styles.info} 
            value={userData.nickname} 
            name="nickname"
            onChange={handleInputChange} 
          />
        </label>

        <div className={styles.btn}>
          <button type="submit" className={styles.update_btn}>수정하기</button>
          <button type="button" className={styles.cancel_btn} onClick={() => navigate('/')}>취소</button>
        </div>
        <a href="#" onClick={handleDeleteAccount} className={styles.delete}>회원을 탈퇴하시겠습니까?</a>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './css/SendMail.module.css';

export default function SendMail() {
  const [newMail, setNewMail] = useState({ receiver: '', subject: '', content: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMail(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSendMail = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('토큰이 없습니다. 다시 로그인해 주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8090/ms3/mail/send', newMail, { params: { token } });
      
      if (response.data.status === 'success') {
        alert('메일이 성공적으로 전송되었습니다.');
        navigate(-1);  
      } else {
        console.log(response.data.status);
        alert('메일 전송에 실패했습니다. 아이디를 다시 확인하세요.');
      }
    } catch (error) {
      console.error('메일 전송 중 오류 발생:', error);
      alert('메일 전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>메일 쓰기</h2>
      <input type="text" name="receiver" placeholder="받는 사람" onChange={handleInputChange} className={styles.input}/>
      <input type="text" name="subject" placeholder="제목" onChange={handleInputChange} className={styles.input}/>
      <textarea name="content" placeholder="내용" onChange={handleInputChange} className={styles.textarea}></textarea>
      <div className={styles.btn}>
        <button onClick={handleSendMail} className={styles.sendButton}>보내기</button>
        <button onClick={() => navigate(-1)} className={styles.cancelButton}>취소</button>
      </div>
    </div>
  );
}

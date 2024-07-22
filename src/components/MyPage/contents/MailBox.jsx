import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/MailBox.module.css';
import Loading from '../../Loading/Loading';
import SendMail from './SendMail';

export default function MailBox() {
  const [loading, setLoading] = useState(true);
  const [mails, setMails] = useState([]);
  const [showCompose, setShowCompose] = useState(false);

  const fetchMails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("토큰이 없습니다.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8090/ms3/mail', { params: { token } });
      if (response.data && response.data.result) {
        setMails(response.data.result);
      } else {
        console.error("서버에서 데이터를 가져오지 못했습니다.");
      }
      setLoading(false);
    } catch (error) {
      console.error("메일 데이터를 가져오는 중 오류가 발생했습니다!", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (showCompose) {
    return <SendMail onMailSent={() => {
      setShowCompose(false);
      fetchMails();
    }} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>받은 메일함</h2>
      <button onClick={() => setShowCompose(true)} className={styles.sendMail}>메일 쓰기</button>
      {mails.length > 0 ? (
        <ul className={styles.mailList}>
          {mails.map((mail, index) => (
            <li key={index} className={styles.mailItem}>
              <div className={styles.mailDetail}>
                <div>보낸 사람: {mail.sender}</div>
                <div>제목: {mail.subject}</div>
                <div>내용: {mail.content}</div>
                <div>받은 시간: {mail.timestamp ? new Date(mail.timestamp).toLocaleString() : '알 수 없음'}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>메일이 없습니다.</p>
      )}
    </div>
  );
}

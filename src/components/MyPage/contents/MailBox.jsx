import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/MailBox.module.css';
import Loading from '../../Loading/Loading';
import SendMail from './SendMail';

export default function MailBox() {
    const [loading, setLoading] = useState(true);
    const [mails, setMails] = useState([]);
    const [selectedMailId, setSelectedMailId] = useState(null);
    const [selectedMail, setSelectedMail] = useState(null);
    const [showCompose, setShowCompose] = useState(false);
    const token = localStorage.getItem('token'); // JWT 토큰 설정

    const fetchMails = async () => {
        if (!token) {
            console.error("토큰이 없습니다.");
            setLoading(false);
            return;
        }
            const response = await axios.get('https://teeput.synology.me:30112/ms3/mail', { params: { token } });
            if (response.data && response.data.result) {
                setMails(response.data.result);
            } else {
                console.error("서버에서 데이터를 가져오지 못했습니다.");
            }
            setLoading(false);
    };
    const handleMailClick = async (mailNo) => {
        if (selectedMailId === mailNo) {
            setSelectedMailId(null);
            setSelectedMail(null);
            return;
        }
            const response = await axios.get('https://teeput.synology.me:30112/ms3/mail/detail', {
                params: { mailNo, token }
            });
            setSelectedMail(response.data);
            setSelectedMailId(mailNo);
    };
    const handleDeleteMail = async (mailNo) => {
            const response = await axios.delete('https://teeput.synology.me:30112/ms3/mail/delete', {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                params: { mailNo, token }
            });
            if (response.data.status === 'success') {
                setMails(mails.filter(mail => mail.mailNo !== mailNo));
                setSelectedMailId(null);
                setSelectedMail(null);
                alert('쪽지가 성공적으로 삭제되었습니다');
            } else {
                alert('쪽지 삭제에 실패했습니다');
            }
      
    };
    const formatDateTime = (timestamp) => {
        return timestamp.replace('T', ' ').slice(0, 16); 
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
            <h2 className={styles.title}>쪽지함</h2>
            <div className={styles.buttonContainer}>
                <button onClick={() => setShowCompose(true)} className={styles.sendMail}>쪽지 쓰기</button>
            </div>
            <div className={styles.sectionsContainer}>
                <div className={styles.header}>
                    <span className={styles.headerItem}>보낸 사람</span>
                    <span className={styles.headerItem}>제목</span>
                    <span className={styles.headerItem}>시간</span>
                </div>
                <div className={styles.section}>
                    <ul className={styles.list}>
                        {mails.length > 0 ? (
                            mails.map(mail => (
                                <li key={mail.mailNo} className={styles.listItem}>
                                    <a href="#" onClick={() => handleMailClick(mail.mailNo)} className={styles.link}>
                                        <span className={styles.mailSender}>{mail.sender}</span>
                                        <span className={styles.mailSubject}>{mail.subject}</span>
                                        <span className={styles.mailTimestamp}>{formatDateTime(mail.timestamp)}</span>
                                    </a>
                                    {selectedMailId === mail.mailNo && selectedMail && (
                                        <div className={styles.detail}>
                                            <div>보낸 사람: {selectedMail.sender}</div>
                                            <div>제목: {selectedMail.subject}</div>
                                            <div>내용: {selectedMail.content}</div>
                                            <div>시간: {formatDateTime(selectedMail.timestamp)}</div>
                                            <button onClick={() => handleDeleteMail(selectedMail.mailNo)} className={styles.button}>삭제</button>
                                        </div>
                                    )}
                                </li>
                            ))) : ( <p>받은 쪽지가 없습니다.</p> )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

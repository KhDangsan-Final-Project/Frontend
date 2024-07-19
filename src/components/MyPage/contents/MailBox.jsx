import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/MailBox.module.css'; // CSS 파일을 미리 준비해 주세요

const MailBox = () => {
    const [mails, setMails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("토큰이 없습니다.");
            setLoading(false);
            return;
        }
        const id = extractUserIdFromToken(token);
        setUserId(id);
        fetchMails(token);
    }, []);

    const fetchMails = async (token) => {
        try {
            const response = await axios.get('http://localhost:8090/ms3/mailbox', { params: { token } });
            console.log(response.data); // 데이터를 잘 가져오는지 확인
            setMails(response.data);
        } catch (error) {
            console.error('메일을 가져오는 중 오류가 발생했습니다:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const extractUserIdFromToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const decodedToken = JSON.parse(jsonPayload);
            return decodedToken.sub;
        } catch (error) {
            console.error('토큰을 디코딩하는 중 오류가 발생했습니다:', error);
            return null;
        }
    };

    if (loading) {
        return <div className={styles.loading}>로딩 중...</div>;
    }

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                {error.response && <pre>{JSON.stringify(error.response.data, null, 2)}</pre>}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>메일함</h2>
            <div className={styles.mailContainer}>
                {mails.length > 0 ? (
                    mails.map((mail) => (
                        <div key={mail.id} className={styles.mailCard}>
                            <div className={styles.mailHeader}>
                                <h3 className={styles.mailSubject}>{mail.subject}</h3>
                                <p className={styles.mailTimestamp}>{new Date(mail.timestamp).toLocaleString()}</p>
                            </div>
                            <div className={styles.mailBody}>
                                <p><strong>From:</strong> {mail.sender}</p>
                                <p><strong>To:</strong> {mail.receiver}</p>
                                <p>{mail.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>받은 메일이 없습니다</p>
                )}
            </div>
        </div>
    );
};

export default MailBox;

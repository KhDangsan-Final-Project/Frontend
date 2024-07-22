import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './css/PasswordResetPage.module.css';

export default function PasswordResetPage() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }
        // 서버로 비밀번호 재설정 요청
        const response = await fetch(`/api/password-reset/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });
        const data = await response.json();
        if (data.success) {
            setMessage('비밀번호가 성공적으로 변경되었습니다.');
        } else {
            setMessage('비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className={styles.container}>
            <h2>비밀번호 재설정</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
                <button type="submit">비밀번호 재설정</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

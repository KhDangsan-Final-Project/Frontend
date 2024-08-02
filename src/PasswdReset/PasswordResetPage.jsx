import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './css/PasswordResetPage.module.css';

export default function PasswordResetPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    
    

    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [message, setMessage] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    function checkPassword(password) {
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        return password.length >= 8 && password.length <= 32 && hasNumber.test(password) && hasSpecialChar.test(password);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setPasswordValid(checkPassword(e.target.value));
    }

    const handlePasswordCheckChange = (e) => {
        setPasswordCheck(e.target.value);
        setPasswordMatch(e.target.value === password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordCheck) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:9997/ms3/password-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword : password })
            });
            const data = await response.json();
            if (data.result) {
                setMessage('비밀번호가 성공적으로 변경되었습니다.');
            } else {
                setMessage('비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            setMessage('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.head}>
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Password Reset</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.password}>
                                <input type="password" value={password} onChange={handlePasswordChange} placeholder="패스워드를 입력해주세요" />
                            </div>
                            <span className={`${styles.error} ${passwordValid ? styles.hidden : styles.visible}`}>
                                *암호는 숫자, 특수문자 1글자씩 포함되어야합니다. 8~32글자 사이로 입력하세요
                            </span>
                            <div className={styles.password}>
                                <input type="password" value={passwordCheck} onChange={handlePasswordCheckChange} placeholder="패스워드 확인" />
                            </div>
                            <span className={`${styles.error} ${passwordMatch ? styles.hidden : styles.visible}`}>
                                *암호가 일치하지 않습니다.
                            </span>
                            <div/>
                            <button type="submit" className={styles.btn_submit}>Complete</button>
                </form>
            {message && <p className={styles.msg}>{message}</p>}
            </div>
        </div>
        </div>
    );
}

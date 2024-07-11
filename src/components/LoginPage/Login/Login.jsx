import React from 'react';
import styles from './css/Login.module.css';

export default function Login({ showRegister }) {
    const handleRegisterClick = () => {
        showRegister();
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Login</h1>
                <div className={styles.txt_box}>
                    <input type="text" placeholder="아이디를 입력해주세요" />
                    <i className="bi bi-person-circle"></i>
                </div>
                <div className={styles.txt_box}>
                    <input type="password" placeholder="패스워드를 입력해주세요" />
                    <i className='bi bi-lock' />
                </div>
                <div className={styles.chk_bar}>
                    <label><input type="checkbox" />이 계정 기억하기</label>
                    <a href="#">비밀번호 찾기</a>
                </div>
                <button type="submit" className={styles.btn_login}>Login</button>
                <div className={styles.register_bar}>
                    <p>계정을 가지고 있지 않나요?</p>
                    <p onClick={handleRegisterClick}>회원가입</p>
                </div>
            </div>
        </div>
    );
}

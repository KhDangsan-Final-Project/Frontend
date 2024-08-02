import React, { useState } from 'react';
import Login from './Login/Login';
import styles from './css/LoginPage.module.css';
import Register from './Register/Register';
import PasswordResetRequestPage from './PasswdResetRequestPage/PasswordResetRequestPage';

export default function LoginPage({ setToken }) {
    const [formType, setFormType] = useState('login');
    
    const showLogin = () => {
        setFormType('login');
    };

    const showRegister = () => {
        setFormType('register');
    };

    const showPasswordReset = () => {
        setFormType('passwordReset')
    };
    return (
        <div className={styles.container}>
            {formType === 'login' && (
                <Login setToken={setToken} showRegister={showRegister} showPassWordReset={showPasswordReset} />
            )}
            {formType === 'register' && (
                <Register showLogin={showLogin} />
            )}
            {formType === 'passwordReset' && (
                <PasswordResetRequestPage showLogin={showLogin} />
            )}
        </div>
    );
}

import React, { useState } from 'react';
import Login from './Login/Login';
import styles from './css/LoginPage.module.css';
import Register from './Register/Register';

export default function LoginPage({ setToken }) {
    const [showLogin, setShowLogin] = useState(true);

    const showRegister = () => {
        setShowLogin(false);
    };

    const showLoginComponent = () => {
        setShowLogin(true);
    };
    return (
        <div className={styles.container}>
            {showLogin ? (
                <Login setToken={setToken} showRegister={showRegister} />
            ) : (
                <Register showLoginComponent={showLoginComponent} />
            )}
        </div>
    );
}

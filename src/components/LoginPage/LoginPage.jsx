import React, { useState } from 'react';
import Login from './Login/Login';
import styles from './css/LoginPage.module.css';
import Menu from '../MenuPage/Menu';
import Register from './Register/Register';

export default function LoginPage() {
    const [showLogin, setShowLogin] = useState(true);

    const showRegister = () => {
        setShowLogin(false);
    };

    const showLoginComponent = () => {
        setShowLogin(true);
    };

    return (
        <div className={styles.container}>
            <Menu />
            {showLogin ? (
                <Login showRegister={showRegister} />
            ) : (
                <Register showLoginComponent={showLoginComponent} />
            )}
        </div>
    );
}

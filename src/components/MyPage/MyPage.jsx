import React, { useState } from 'react';
import Profile from './contents/Profile';
import styles from './css/MyPage.module.css';
import Library from './contents/Library';
import Friends from './contents/Friends';
import MailBox from './contents/MailBox';

export default function MyPage({ setToken }) {
    const [currentPage, setCurrentPage] = useState('profile');

    const showProfile = () => {
        setCurrentPage('profile');
    };

    const showMyDex = () => {
        setCurrentPage('myDex');
    };

    const showMyFriends = () => {
        setCurrentPage('myFriends');
    };

    const showMailbox = () => {
        setCurrentPage('mailbox');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>My Page</h1>
            <nav className={styles.nav}>
                <button type='button' onClick={showProfile}>프로필</button>
                <button type='button' onClick={showMyDex}>내 도감</button>
                <button type='button' onClick={showMyFriends}>내 친구</button>
                <button type='button' onClick={showMailbox}>메일함</button>
            </nav>
            <div className={styles.content}>
                {currentPage === 'profile' && <Profile />}
                {currentPage === 'myDex' && <Library />}
                {currentPage === 'myFriends' && <Friends />}
                {currentPage === 'mailbox' && <MailBox />}
            </div>
        </div>
    );
}

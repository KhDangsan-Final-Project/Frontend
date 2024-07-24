import React, { useState } from 'react';
import Profile from './contents/Profile';
import styles from './css/MyPage.module.css';
import MyLibrary from './contents/MyLibrary';
import Friends from './contents/Friends';
import MailBox from './contents/MailBox';
import Attendance from './contents/Attendance';

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

    const showAttendance = () => {
        setCurrentPage('attendance');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>My Page</h1>
            <nav className={styles.nav}>
                <button type='button' onClick={showProfile}>프로필</button>
                <button type='button' onClick={showMyDex}>내 도감</button>
                <button type='button' onClick={showMyFriends}>내 친구</button>
                <button type='button' onClick={showMailbox}>메일함</button>
                <button type='button' onClick={showAttendance}>메일함</button>
            </nav>
            <div className={styles.content}>
                {currentPage === 'profile' && <Profile />}
                {currentPage === 'myDex' && <MyLibrary />}
                {currentPage === 'myFriends' && <Friends />}
                {currentPage === 'mailbox' && <MailBox />}
                {currentPage === 'attendance' && <Attendance />}
            </div>
        </div>
    );
}

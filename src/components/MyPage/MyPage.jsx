import React, { useState, useEffect } from 'react';
import Profile from './contents/Profile';
import styles from './css/MyPage.module.css';
import MyLibrary from './contents/MyLibrary';
import Friends from './contents/Friends';
import MailBox from './contents/MailBox';
import Attendance from './contents/Attendance';
import FooterImg from '../Menu/Footer/FooterImg';
import Footer from '../Menu/Footer/Footer';
import axios from 'axios';

export default function MyPage({ setToken }) {
    const [currentPage, setCurrentPage] = useState('profile');
    const [grantNo, setGrantNo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('https://teeput.synology.me:30112/ms3/rankcheck', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setGrantNo(response.data);
            })
            .catch(error => {
                console.error('Error fetching rank', error);
            });
        }
    }, []);

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

    const showAdminPage = () => {
        window.open('https://13.125.193.115:30117/ms4/login/view', '_blank');
    };

    return (
        <div className={styles.container}>
            <div className={styles.jumpUp} />
            <h1 className={styles.pageTitle}>My Page</h1>
            <nav className={styles.nav}>
                <button type='button' onClick={showProfile}>프로필</button>
                <button type='button' onClick={showMyDex}>내 도감</button>
                <button type='button' onClick={showMyFriends}>내 친구</button>
                <button type='button' onClick={showMailbox}>쪽지함</button>
                <button type='button' onClick={showAttendance}>출석체크</button>
                {grantNo === 0 && (
                    <button type='button' onClick={showAdminPage}>관리자</button>
                )}
            </nav>
            <div className={styles.jump} />
            <div className={styles.content}>
                {currentPage === 'profile' && <Profile />}
                {currentPage === 'myDex' && <MyLibrary />}
                {currentPage === 'myFriends' && <Friends />}
                {currentPage === 'mailbox' && <MailBox />}
                {currentPage === 'attendance' && <Attendance />}
            </div>
            <div className={styles.jump} />
            <FooterImg />
            <Footer />
        </div>
    );
}

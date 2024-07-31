import React, { useState, useEffect } from 'react';
import styles from './css/Attendance.module.css';
import axios from 'axios';

export default function Attendance() {
    const [attendance, setAttendance] = useState(Array(30).fill(false));
    const [lastCheckedDay, setLastCheckedDay] = useState(0);

    useEffect(() => {
        // localStorage에서 토큰 가져오기
        const token = localStorage.getItem("token");

        // 페이지 로드 시 출석 데이터를 가져옴
        axios.get('https://teeput.synology.me:30112/ms3/attendance/list', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const attendedDaysCount = response.data;
            const newAttendance = [...attendance];
            for (let day = 0; day < attendedDaysCount; day++) {
                newAttendance[day] = true;
            }
            setAttendance(newAttendance);
            setLastCheckedDay(attendedDaysCount); // 마지막 체크한 날짜 설정
        })
        .catch(error => {
            console.error('Error fetching attendance data', error);
        });
    }, []);

    const handleAttendanceCheck = () => {
        const token = localStorage.getItem("token");

        axios.get('https://teeput.synology.me:30112/ms3/attendance/add', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const message = response.data;
            if (message === '이미 출석체크를 하셨습니다.') {
                alert(message);
                return;
            }
            alert('출석체크 완료!');
            window.location.reload();
        })
        .catch(error => {
            console.error('Error adding attendance', error);
        });
    };
    
    return (
        <div className={styles.attendanceContainer}>
            <h2 className={styles.bigTitle}>출석체크</h2>
            <button onClick={handleAttendanceCheck} className={styles.btn}>출석하기</button>
            <div className={styles.calendar}>
                {attendance.map((checked, index) => (
                    <div
                        key={index}
                        className={`${styles.day} ${checked ? styles.checked : ''}`}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            <div className={styles.rewards}>
                <p className={styles.title}>연속 출석 보상</p>
                <div className={styles.rewardDates}>
                    <div className={styles.rewardDay} id={styles.back1}>5일</div>
                    <div className={styles.rewardDay} id={styles.back2}>10일</div>
                    <div className={styles.rewardDay} id={styles.back3}>15일</div>
                    <div className={styles.rewardDay} id={styles.back4}>20일</div>
                    <div className={styles.rewardDay} id={styles.back5}>25일</div>
                    <div className={styles.rewardDay} id={styles.back6}>30일</div>
                </div>
            </div>
        </div>
    );
}

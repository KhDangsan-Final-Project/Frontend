import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/ViewText.module.css';

export default function ViewText() {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                // 방문자의 IP 주소를 가져옵니다.
                const { data: ipData } = await axios.get('https://api64.ipify.org?format=json');
                const ipAddress = ipData.ip;

                // IP 주소를 서버에 전달하여 방문자 수를 업데이트합니다.
                await axios.post('http://localhost:8090/ms1/view/up', { ipAddress });

                // 서버에서 최신 방문자 수를 가져옵니다.
                const { data: count } = await axios.get('http://localhost:8090/ms1/view/count');
                setVisitorCount(count);
            } catch (error) {
                console.error('Error fetching visitor count', error);
            }
        };

        fetchVisitorCount();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.title}>여러분들의 방문을<br /> 진심으로 환영합니다!</div>
            <div className={styles.title}>총 방문자 {visitorCount}명</div>
            <div className={styles.title}>여기서 새로운 모험을 시작하세요! <br />여러분을 기다리는 수많은 <br />포켓몬들이 있습니다. 🕵️‍♂️</div>
        </div>
    );
}

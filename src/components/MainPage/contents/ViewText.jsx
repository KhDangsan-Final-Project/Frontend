import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/ViewText.module.css';
import Loading from '../../Loading/Loading';

export default function ViewText({ onLoad }) {
    const [visitorCount, setVisitorCount] = useState(0);
    const [displayedCount, setDisplayedCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [additionalLoading, setAdditionalLoading] = useState(true);

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                const { data: ipData } = await axios.get('https://api64.ipify.org?format=json');
                const ipAddress = ipData.ip;

                await axios.post('http://localhost:8090/ms1/view/up', { ipAddress });

                const { data: count } = await axios.get('http://localhost:8090/ms1/view/count');
                setVisitorCount(count);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching visitor count', error);
            }
        };

        fetchVisitorCount();
    }, []);

    useEffect(() => {
        if (!loading && displayedCount < visitorCount) {
            const increment = Math.ceil((visitorCount - displayedCount) / 20);
            const interval = setInterval(() => {
                setDisplayedCount(prevCount => {
                    if (prevCount + increment >= visitorCount) {
                        clearInterval(interval);
                        return visitorCount;
                    }
                    return prevCount + increment;
                });
            }, 50); // 50ms마다 업데이트
            return () => clearInterval(interval);
        }
    }, [visitorCount, loading]);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setAdditionalLoading(false);
                console.log('ViewText loaded');
            }, 10);
        }
    }, [loading, onLoad]);

    if (loading || additionalLoading) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>여러분들의 방문을<br /> 진심으로 환영합니다!</div>
            <div className={styles.title}>총 방문자 {displayedCount}명</div>
            <div className={styles.title}>여기서 새로운 모험을 시작하세요! <br />여러분을 기다리는 수많은 <br />포켓몬들이 있습니다. 🕵️‍♂️</div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useVisitorCount = (setLoading) => {
    const [visitorCount, setVisitorCount] = useState(0);
    const [error, setError] = useState(false); // 에러 상태 추가

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                const { data: ipData } = await axios.get('https://api64.ipify.org?format=json');
                const ipAddress = ipData.ip;

                await axios.post('https://teeput.synology.me:30112/ms1/view/up', { ipAddress });

                const { data: count } = await axios.get('https://teeput.synology.me:30112/ms1/view/count');
                setVisitorCount(count);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching visitor count', error);
                setError(true); // 에러 상태 설정
                setLoading(false);
            }
        };

        fetchVisitorCount();
    }, []);

    return { visitorCount, error }; // 에러 상태 반환
};

export const useDisplayedCount = (visitorCount, loading) => {
    const [displayedCount, setDisplayedCount] = useState(0);

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
            }, 50);
            return () => clearInterval(interval);
        }
    }, [visitorCount, loading, displayedCount]);

    return displayedCount;
};

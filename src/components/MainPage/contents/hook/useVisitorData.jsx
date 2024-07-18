import { useState, useEffect } from 'react';
import axios from 'axios';

export const useVisitorCount = (setLoading) => {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                const { data: ipData } = await axios.get('https://api64.ipify.org?format=json');
                const ipAddress = ipData.ip;
                console.log(ipAddress);

                await axios.post('http://localhost:8090/ms1/view/up', { ipAddress });

                const { data: count } = await axios.get('http://teeput.synology.me:30112/ms1/view/count');
                setVisitorCount(count);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching visitor count', error);
            }
        };

        fetchVisitorCount();
    }, []);

    return visitorCount;
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


import React, { useState, useEffect } from 'react';

const Presale = () => {
    const [totalRaised, setTotalRaised] = useState(0);
    const [endTime, setEndTime] = useState(Date.now() + 100000);  // Placeholder for end time
    const [timer, setTimer] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const distance = endTime - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);

            if (distance < 0) {
                clearInterval(interval);
                setTimer('Presale ended');
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [endTime]);

    return (
        <div>
            <h1>Presale Progress</h1>
            <p>Raised: {totalRaised}</p>
            <p>Time Remaining: {timer}</p>
        </div>
    );
};

export default Presale;

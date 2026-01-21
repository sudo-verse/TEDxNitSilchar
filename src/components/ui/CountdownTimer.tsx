import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    targetDate: string;
}

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
        return (
            <div key={interval} className="flex flex-col items-center mx-2 sm:mx-4">
                <div className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-serif)]">
                    {value < 10 ? `0${value}` : value}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 mt-1">
                    {interval}
                </div>
            </div>
        );
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center items-center mt-8 pb-4"
        >
            <div className="flex bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 shadow-2xl">
                {timerComponents}
            </div>
        </motion.div>
    );
};

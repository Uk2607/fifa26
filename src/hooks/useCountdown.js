import { useState, useEffect } from 'react';

export function useCountdown(targetTimestamp) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasStarted: false,
    within24h: false,
    isConfigured: false
  });

  useEffect(() => {
    if (!targetTimestamp) {
      setTimeLeft(prev => ({ ...prev, isConfigured: false, hasStarted: false }));
      return;
    }

    const targetDate = new Date(targetTimestamp).getTime();
    if (isNaN(targetDate)) {
      setTimeLeft(prev => ({ ...prev, isConfigured: false, hasStarted: false }));
      return;
    }

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          hasStarted: true,
          within24h: false,
          isConfigured: true
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      const within24h = difference <= 24 * 60 * 60 * 1000;

      return {
        days,
        hours,
        minutes,
        seconds,
        hasStarted: false,
        within24h,
        isConfigured: true
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // update every second

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return timeLeft;
}

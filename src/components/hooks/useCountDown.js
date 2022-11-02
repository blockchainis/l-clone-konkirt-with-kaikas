import { useState, useEffect } from "react";
function useCountDown(targetDate) {
  const countDownDate = targetDate;
  const [countDown, setCountDown] = useState(() => {
    return Math.max(countDownDate - new Date(), 0);
  });
  const isClosed = countDown <= 0;
  const isComingSoon = isNaN(countDown);
  useEffect(() => {
    const id = setInterval(() => {
      setCountDown((c) => Math.max(c - 1000, 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return { ...getValue(countDown), isClosed, isComingSoon };
}

function getValue(countDown) {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default useCountDown;

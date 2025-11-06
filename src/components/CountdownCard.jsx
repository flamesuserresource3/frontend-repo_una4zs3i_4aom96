import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function getTimeRemaining(targetDate) {
  const total = targetDate - new Date().getTime();
  const seconds = Math.max(0, Math.floor((total / 1000) % 60));
  const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
  const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
  const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));
  return { total, days, hours, minutes, seconds };
}

export default function CountdownCard() {
  // Target: Nov 10, 2025 9:00 PM IST
  const target = useMemo(() => {
    try {
      // Construct target time in IST (UTC+5:30)
      const utcMillis = Date.UTC(2025, 10, 10, 15, 30, 0); // 21:00 IST -> 15:30 UTC
      return utcMillis;
    } catch {
      return new Date().getTime();
    }
  }, []);

  const [time, setTime] = useState(getTimeRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const Item = ({ label, value }) => (
    <div className="flex flex-col items-center justify-center bg-white/70 backdrop-blur rounded-2xl px-4 py-3 shadow-[0_10px_25px_rgba(255,182,193,0.35)] border border-pink-200">
      <span className="text-3xl md:text-4xl font-semibold text-pink-600" style={{ fontFamily: 'Inter, Poppins, system-ui' }}>{String(value).padStart(2, '0')}</span>
      <span className="text-xs uppercase tracking-wide text-pink-500/80" style={{ fontFamily: 'Inter, Poppins, system-ui' }}>{label}</span>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="mt-4 grid grid-cols-4 gap-2 w-full max-w-md mx-auto">
      <Item label="Days" value={time.days} />
      <Item label="Hours" value={time.hours} />
      <Item label="Minutes" value={time.minutes} />
      <Item label="Seconds" value={time.seconds} />
    </motion.div>
  );
}

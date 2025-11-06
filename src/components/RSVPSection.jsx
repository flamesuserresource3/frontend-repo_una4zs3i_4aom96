import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'ananya_rsvp';

export default function RSVPSection() {
  const [yes, setYes] = useState(0);
  const [no, setNo] = useState(0);
  const [burst, setBurst] = useState(null); // 'yes' | 'no' | null

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { yes: y, no: n } = JSON.parse(raw);
        setYes(y || 0);
        setNo(n || 0);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ yes, no }));
  }, [yes, no]);

  const vote = (type) => {
    if (type === 'yes') setYes((v) => v + 1);
    else setNo((v) => v + 1);
    setBurst(type);
    setTimeout(() => setBurst(null), 1200);
  };

  return (
    <div className="mt-6 text-center">
      <p className="text-pink-700/80 mb-3" style={{ fontFamily: 'Inter, Poppins, system-ui' }}>
        Will you join the celebration?
      </p>
      <div className="flex items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => vote('yes')}
          className="px-4 py-2 rounded-full bg-pink-500 text-white shadow-[0_12px_24px_rgba(255,182,193,0.5)] border border-pink-300/70"
        >
          Yes 💕
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => vote('no')}
          className="px-4 py-2 rounded-full bg-white text-pink-600 shadow-[0_10px_20px_rgba(255,182,193,0.45)] border border-pink-300/70"
        >
          No 😢
        </motion.button>
      </div>

      <div className="mt-3 text-pink-700/80" style={{ fontFamily: 'Inter, Poppins, system-ui' }}>
        <span className="mr-4">Yes: <strong>{yes}</strong></span>
        <span>No: <strong>{no}</strong></span>
      </div>

      {/* floating reactions */}
      <AnimatePresence>
        {burst === 'yes' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -60 }}
            exit={{ opacity: 0, y: -90 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="pointer-events-none"
          >
            <div className="relative h-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="absolute text-pink-500" style={{ left: `${10 + Math.random() * 80}%`, transform: `translateY(-10px)`, filter: 'drop-shadow(0 4px 8px rgba(255, 182, 193, 0.5))' }}>
                  💖
                </span>
              ))}
            </div>
          </motion.div>
        )}
        {burst === 'no' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -60 }}
            exit={{ opacity: 0, y: -90 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="pointer-events-none"
          >
            <div className="relative h-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="absolute" style={{ left: `${10 + Math.random() * 80}%`, transform: `translateY(-10px)`, filter: 'drop-shadow(0 4px 8px rgba(146, 194, 255, 0.5))' }}>
                  💧
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

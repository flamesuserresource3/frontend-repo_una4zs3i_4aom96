import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const shimmerText = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.9), rgba(255,255,255,0.3))',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  backgroundSize: '200% 100%',
  animation: 'shimmer 3.5s ease-in-out infinite',
};

export default function EnvelopeInvite({ onOpened }) {
  const [open, setOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    let t1, t2;
    if (open) {
      t1 = setTimeout(() => setShowTitle(true), 700);
      t2 = setTimeout(() => onOpened && onOpened(), 900);
    } else {
      setShowTitle(false);
    }
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [open, onOpened]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="relative w-[min(92vw,520px)] h-[340px]">
        {/* shadow */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full blur-2xl bg-[#EAA5B8] opacity-40" />

        {/* envelope body */}
        <div className="absolute inset-0 perspective-[1200px]">
          {/* back panel */}
          <div className="absolute inset-0 rounded-2xl" style={{ background: '#FFF9F9', boxShadow: '0 30px 60px rgba(255, 182, 193, 0.35), inset 0 1px 0 rgba(255,255,255,0.9)' }} />

          {/* flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 origin-top rounded-t-2xl"
            style={{ height: '60%', background: 'linear-gradient(180deg,#FFF9F9,#FFE9F0)', boxShadow: '0 12px 24px rgba(255, 182, 193, 0.25)'}}
            animate={{ rotateX: open ? -150 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />

          {/* front pocket */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[65%] rounded-b-2xl"
            style={{ background: 'linear-gradient(180deg,#FFF0F4,#FFE3EC)', boxShadow: '0 18px 36px rgba(233, 135, 163, 0.25)'}}
          />

          {/* seal heart */}
          <motion.button
            aria-label={open ? 'Close invitation' : 'Open invitation'}
            onClick={() => setOpen(v => !v)}
            className="absolute top-[48%] left-1/2 -translate-x-1/2 z-10 w-14 h-12 rounded-full grid place-items-center"
            whileTap={{ scale: 0.95 }}
            style={{ filter: 'drop-shadow(0 6px 14px rgba(255, 105, 140, 0.35))' }}
          >
            <motion.div
              initial={false}
              animate={{ scale: open ? 0.9 : 1, rotate: open ? 15 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="w-12 h-10"
              style={{
                background: 'radial-gradient(circle at 50% 45%, #FF6B9A 0%, #FF8AB0 40%, #FFB6C1 70%, #FFD6E8 100%)',
                clipPath: 'path("M24 7 C24 3 20 0 16 0 C12 0 10 3 10 5 C10 3 8 0 4 0 C0 0 -4 3 -4 7 C-4 14 6 20 10 24 C12 26 14 28 16 30 C18 28 20 26 22 24 C26 20 36 14 36 7 Z")'
              }}
            />
          </motion.button>
        </div>

        {/* invitation card */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 24, rotateX: -10 }}
              animate={{ opacity: 1, y: -30, rotateX: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="absolute left-1/2 -translate-x-1/2 top-1/2 w-[88%] max-w-[520px]"
            >
              <div className="relative rounded-3xl p-6 md:p-8"
                   style={{ background: '#FFF9F9', boxShadow: '0 20px 60px rgba(255, 182, 193, 0.35)' }}>
                <div className="absolute inset-0 rounded-3xl border border-pink-200/70" style={{ boxShadow: '0 0 0 4px rgba(255, 214, 232, 0.8), inset 0 0 20px rgba(255, 182, 193, 0.45)' }} />
                <div className="relative text-center">
                  <motion.p
                    className="text-4xl md:text-5xl tracking-wide"
                    style={{ fontFamily: 'Sacramento, cursive', ...shimmerText }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    💌 Ananya’s 20th
                  </motion.p>
                  <p className="mt-3 text-pink-700/80" style={{ fontFamily: 'Inter, Poppins, system-ui' }}>
                    Date: 10th November, 9:00 PM onwards
                  </p>
                  <p className="text-pink-700/70" style={{ fontFamily: 'Inter, Poppins, system-ui' }}>
                    Let’s celebrate together!
                  </p>
                  {showTitle && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                      {onOpened}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
      `}</style>
    </div>
  );
}

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ParallaxBackground() {
  const scrollY = useMotionValue(0);
  const smoothY = useSpring(scrollY, { stiffness: 60, damping: 20 });
  const layer1 = useTransform(smoothY, [0, 600], [0, -20]);
  const layer2 = useTransform(smoothY, [0, 600], [0, -40]);
  const layer3 = useTransform(smoothY, [0, 600], [0, -70]);

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY || 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollY]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* dreamy baby pink gradient */}
      <motion.div
        style={{ y: layer1 }}
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,#FFE8F1_0%,#FFD6E8_35%,#FFC6DA_60%,#FFD6E8_100%)]"
      />

      {/* glow orbs */}
      <motion.div style={{ y: layer2 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-10 w-80 h-80 rounded-full blur-3xl opacity-40" style={{ background: '#FFB6C1' }} />
        <div className="absolute top-24 right-10 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: '#FFF9F9' }} />
      </motion.div>

      {/* sparkles */}
      <motion.div style={{ y: layer3 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]">
          {Array.from({ length: 70 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: 'white',
                opacity: 0.75,
                boxShadow: '0 0 8px 2px rgba(255,255,255,0.9)',
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* floating petals */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => {
          const size = 10 + Math.random() * 16;
          const left = Math.random() * 100;
          const duration = 10 + Math.random() * 12;
          const delay = Math.random() * 5;
          const rotate = Math.random() * 360;
          return (
            <div
              key={i}
              className="absolute rounded-full opacity-70"
              style={{
                width: size,
                height: size * 0.7,
                left: `${left}%`,
                top: `-10%`,
                background: 'linear-gradient(135deg,#FFB6C1,#FFF1F4)',
                filter: 'blur(0.2px)',
                transform: `rotate(${rotate}deg)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                animation: `floatDown ${duration}s ${delay}s linear infinite`,
                boxShadow: '0 2px 6px rgba(255, 182, 193, 0.35)'
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes floatDown {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.85; }
          60% { transform: translateY(60vh) rotate(140deg); }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

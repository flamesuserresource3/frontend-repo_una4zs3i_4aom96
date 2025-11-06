import React from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from './components/ParallaxBackground';
import EnvelopeInvite from './components/EnvelopeInvite';
import CountdownCard from './components/CountdownCard';
import RSVPSection from './components/RSVPSection';
import SoundToggle from './components/SoundToggle';

function App() {
  return (
    <div className="min-h-[200vh] relative text-pink-900">
      <ParallaxBackground />
      <SoundToggle />

      {/* Hero section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <motion.h1
            className="mb-6 text-center text-5xl md:text-6xl"
            style={{ fontFamily: 'Sacramento, cursive', textShadow: '0 6px 20px rgba(255,182,193,0.6)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ananya’s 20th Birthday
          </motion.h1>

          <EnvelopeInvite onOpened={<>
            <CountdownCard />
            <RSVPSection />
          </>} />

          <p className="mt-10 text-sm text-pink-700/70" style={{ fontFamily: 'Inter, Poppins, system-ui' }}>
            Made with love 💌
          </p>
        </div>
      </section>

      {/* Spacer for parallax scroll feel */}
      <section className="h-[80vh]" />

      {/* Meta tags for social sharing are set in index.html by template; adding here dynamically would be SSR. */}
    </div>
  );
}

export default App;

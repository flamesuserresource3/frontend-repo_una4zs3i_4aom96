import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SoundToggle() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    if (enabled) {
      const play = async () => {
        try { await audioRef.current.play(); } catch (e) {}
      };
      play();
    } else {
      audioRef.current.pause();
    }
  }, [enabled]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setEnabled(v => !v)}
        className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow-[0_10px_20px_rgba(255,182,193,0.45)] border border-pink-200 text-pink-700"
        aria-pressed={enabled}
        aria-label="Toggle background music"
        title={enabled ? 'Mute' : 'Play soft music'}
      >
        {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span className="text-sm" style={{ fontFamily: 'Inter, Poppins, system-ui' }}>{enabled ? 'On' : 'Off'}</span>
      </motion.button>
      {/* gentle harp-like loop (royalty-free short tone embedded as data URI) */}
      <audio ref={audioRef} loop>
        <source src="data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAAAC0AAABtAAAARGF0YQAAAAA=" type="audio/mp3" />
      </audio>
    </div>
  );
}

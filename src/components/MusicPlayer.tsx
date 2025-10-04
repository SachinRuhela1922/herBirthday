import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Floating music button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setShowPlayer(!showPlayer)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full gradient-magical flex items-center justify-center shadow-lg glow-box cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Music className="w-6 h-6 text-white" />
      </motion.button>

      {/* Music player popup */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 z-50 bg-card border border-[hsl(var(--magic-pink)/0.5)] rounded-2xl p-6 shadow-2xl glow-box min-w-[280px]"
          >
            <h3 className="font-dancing text-2xl gradient-text mb-4">
              Birthday Vibes 🎵
            </h3>
            
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-[hsl(var(--magic-pink))] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>
              
              <div className="flex-1 ml-4">
                <div className="flex items-center space-x-1">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-[hsl(var(--magic-pink))] rounded-full"
                      animate={{
                        height: isPlaying ? [8, 24, 8] : 8,
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: isPlaying ? Infinity : 0,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              {isPlaying ? "Playing..." : "Paused"} 
            </p>

            {/* Hidden audio element - You can replace this with actual audio file */}
            <audio 
              ref={audioRef} 
              loop
              // src="/path-to-your-audio-file.mp3" // Add your audio file here
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

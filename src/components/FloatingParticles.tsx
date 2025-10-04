import { motion } from 'framer-motion';

export const FloatingParticles = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => i);
  const sparkles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating hearts */}
      {hearts.map((i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-2xl opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -50,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        >
          <span className="text-[hsl(var(--magic-pink))]">💖</span>
        </motion.div>
      ))}

      {/* Sparkles */}
      {sparkles.map((i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(var(--glow-${i % 2 === 0 ? 'pink' : 'lavender'})), transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--magic-lavender)/0.1)] via-transparent to-[hsl(var(--magic-pink)/0.1)]" />
    </div>
  );
};

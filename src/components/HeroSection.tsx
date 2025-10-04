import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 px-4"
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-dancing font-bold mb-6 gradient-text glow-text"
          animate={{
            textShadow: [
              "0 0 20px hsl(var(--glow-pink)), 0 0 40px hsl(var(--glow-lavender))",
              "0 0 40px hsl(var(--glow-pink)), 0 0 80px hsl(var(--glow-lavender))",
              "0 0 20px hsl(var(--glow-pink)), 0 0 40px hsl(var(--glow-lavender))",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          className="text-4xl md:text-6xl font-dancing gradient-text mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Beautiful Soul 💖
        </motion.h2>

        <motion.div
          className="inline-block px-8 py-4 rounded-full border-2 border-[hsl(var(--magic-pink))] glow-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl font-poppins text-foreground/80">
            A magical day for a magical person ✨
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-lg text-muted-foreground font-poppins">
            Scroll down to explore the magic ↓
          </p>
        </motion.div>
      </motion.div>

      {/* Animated background circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--magic-pink)), transparent)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--magic-lavender)), transparent)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
};

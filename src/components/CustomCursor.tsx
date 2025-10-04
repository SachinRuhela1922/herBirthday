import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import crush1 from '@/assets/crush-1.jpeg';
import crush2 from '@/assets/crush-2.jpeg';
import crush3 from '@/assets/crush-3.jpeg';

interface Star {
  id: number;
  x: number;
  y: number;
  hasImage: boolean;
  image?: string;
}

const images = [crush1, crush2, crush3];

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Star[]>([]);
  const [starId, setStarId] = useState(0);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Create new star with 30% chance of having an image
      const hasImage = Math.random() > 0.7;
      const newStar: Star = {
        id: starId,
        x: e.clientX + (Math.random() - 0.5) * 40,
        y: e.clientY + (Math.random() - 0.5) * 40,
        hasImage,
        image: hasImage ? images[Math.floor(Math.random() * images.length)] : undefined,
      };
      
      setStars((prev) => [...prev, newStar]);
      setStarId((prev) => prev + 1);
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, [starId]);

  // Remove stars after animation
  useEffect(() => {
    const timer = setInterval(() => {
      setStars((prev) => prev.slice(-30)); // Keep only last 30 stars
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
      >
        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[hsl(var(--magic-pink))] to-[hsl(var(--magic-lavender))] opacity-70 blur-sm" />
      </motion.div>

      {/* Star trail */}
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="fixed pointer-events-none z-40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              left: star.x,
              top: star.y,
            }}
          >
            {star.hasImage && star.image ? (
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 animate-star-twinkle">
                  <img
                    src={star.image}
                    alt="star"
                    className="w-full h-full rounded-full object-cover border-2 border-[hsl(var(--magic-pink))] shadow-lg shadow-[hsl(var(--glow-pink)/0.5)]"
                  />
                </div>
              </div>
            ) : (
              <div className="relative animate-star-twinkle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="url(#starGradient)"
                  />
                  <defs>
                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--magic-pink))" />
                      <stop offset="100%" stopColor="hsl(var(--magic-lavender))" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

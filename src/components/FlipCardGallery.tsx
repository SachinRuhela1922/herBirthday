import { useState } from 'react';
import { motion } from 'framer-motion';
import crush1 from '@/assets/crush-1.jpeg';
import crush2 from '@/assets/crush-2.jpeg';
import crush3 from '@/assets/crush-3.jpeg';
import crush4 from '@/assets/crush-4.jpeg';
import crush5 from '@/assets/crush-5.jpeg';
import crush6 from '@/assets/crush-6.jpeg';

interface CardData {
  image: string;
  message: string;
}

const cards: CardData[] = [
  { 
    image: crush1, 
    message: "You bring joy to everyone around you! 🌟" 
  },
  { 
    image: crush2, 
    message: "Your smile lights up the darkest days 💖" 
  },
  { 
    image: crush3, 
    message: "May all your dreams come true this year ✨" 
  },
  { 
    image: crush4, 
    message: "You deserve all the happiness in the world 🎉" 
  },
  { 
    image: crush5, 
    message: "Keep shining bright like the star you are ⭐" 
  },
  { 
    image: crush6, 
    message: "Here's to another amazing year ahead! 🎂" 
  },
];

const FlipCard = ({ image, message, index }: CardData & { index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-80 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of card - Image */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-lg border-2 border-[hsl(var(--magic-pink)/0.3)] hover:border-[hsl(var(--glow-pink))] transition-colors duration-300"
          style={{ 
            boxShadow: isFlipped 
              ? '0 0 40px hsl(var(--glow-pink)/0.5)' 
              : '0 0 20px hsl(var(--glow-pink)/0.2)'
          }}
        >
          <img 
            src={image} 
            alt="Memory" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--magic-pink)/0.4)] to-transparent" />
        </div>

        {/* Back of card - Message */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden p-8 flex items-center justify-center text-center gradient-magical shadow-lg"
          style={{ 
            transform: 'rotateY(180deg)',
            boxShadow: '0 0 40px hsl(var(--glow-lavender)/0.6)'
          }}
        >
          <div>
            <p className="text-2xl font-dancing text-white mb-4">
              {message}
            </p>
            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const FlipCardGallery = () => {
  return (
    <section className="min-h-screen py-20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl md:text-7xl font-dancing gradient-text mb-4">
          Wishes & Memories
        </h2>
        <p className="text-xl text-muted-foreground">
          Hover over each card to reveal a special message 💌
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <FlipCard key={index} {...card} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-lg text-muted-foreground font-poppins">
          ✨ Each card holds a piece of love ✨
        </p>
      </motion.div>
    </section>
  );
};

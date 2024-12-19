import React from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
}

export const GameOverConfetti: React.FC = () => {
  const colors = ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3', '#9C27B0'];
  const particles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 1 + 0.5, // Smaller size range for squares
    rotation: Math.random() * 360 // Random initial rotation
  }));

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1000 }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.x}vw`,
            y: -20,
            scale: 1,
            opacity: 1,
            rotate: particle.rotation
          }}
          animate={{ 
            y: '100vh',
            scale: 0,
            opacity: [1, 1, 0],
            rotate: particle.rotation + 360 // Full rotation during fall
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeIn",
            delay: Math.random() * 0.2
          }}
          className="absolute"
          style={{ 
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
            backgroundColor: particle.color,
            borderRadius: '0.25rem', // Slightly rounded corners like game squares
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        />
      ))}
    </div>
  );
};
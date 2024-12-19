import React, { ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface StatItemProps {
  icon: ReactNode;
  value: string;
  highlight?: boolean;
}

export const StatItem: React.FC<StatItemProps> = ({ icon, value, highlight = false }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (highlight) {
      controls.start({
        backgroundColor: [
          'rgba(37, 37, 37, 1)',
          'rgba(234, 179, 8, 0.3)',
          'rgba(234, 179, 8, 0.4)',
          'rgba(234, 179, 8, 0.3)',
          'rgba(37, 37, 37, 1)'
        ],
        scale: [1, 1.05, 1.05, 1.05, 1],
        transition: {
          duration: 1.5,
          times: [0, 0.25, 0.5, 0.75, 1],
          ease: "easeInOut",
          delay: 2 // Start after score animation
        }
      });
    }
  }, [highlight, controls]);

  return (
    <motion.div 
      animate={controls}
      className="flex-1 flex items-center justify-center gap-2 
                bg-[#252525] backdrop-blur-md rounded-xl p-2
                border border-white/5 shadow-lg"
    >
      {icon}
      <span className="text-sm font-light text-white/90">{value}</span>
    </motion.div>
  );
};
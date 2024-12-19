import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedScoreProps {
  value: number;
  className?: string;
}

export const AnimatedScore: React.FC<AnimatedScoreProps> = ({ value, className = '' }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  React.useEffect(() => {
    const animation = animate(count, value, { 
      duration: 2.5,
      ease: "easeOut",
      delay: 0.5 // Start after confetti begins
    });
    return animation.stop;
  }, [value]);

  return <motion.span className={className}>{rounded}</motion.span>;
};
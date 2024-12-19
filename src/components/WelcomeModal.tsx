import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Target, Lightbulb } from 'lucide-react';
import { Logo } from './Logo';

interface WelcomeModalProps {
  show: boolean;
  onStart: () => void;
  isInfo?: boolean;
  onClose?: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ 
  show, 
  onStart, 
  isInfo = false,
  onClose
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-[#202020]/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/10 mt-20 md:mt-0"
        >
          {isInfo ? (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          ) : null}

          <div className="p-6 md:p-8 flex flex-col items-center gap-6">
            <Logo variant="welcome" className="h-12 md:h-20" />
            
            <h2 className="text-2xl font-semibold text-white">How to Play</h2>
            
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-4 text-white/90">
                <Eye className="w-6 h-6 text-blue-400 shrink-0" />
                <span>Find the square with a slightly different color shade</span>
              </div>
              
              <div className="flex items-center gap-4 text-white/90">
                <Target className="w-6 h-6 text-green-400 shrink-0" />
                <span>Progress through levels - each one gets more challenging</span>
              </div>
              
              <div className="flex items-center gap-4 text-white/90">
                <Lightbulb className="w-6 h-6 text-yellow-400 shrink-0" />
                <span>Use hints when stuck (available every 10 levels)</span>
              </div>
            </div>

            {!isInfo && (
              <button
                onClick={onStart}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl 
                         transition-all duration-200 flex items-center justify-center gap-2 mt-4"
              >
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Start Game
                </motion.span>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
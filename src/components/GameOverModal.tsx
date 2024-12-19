import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, Target, RotateCcw, Save, ChevronRight, X } from 'lucide-react';
import { GameScore } from '../types/game';
import { formatTime } from '../utils/timeUtils';
import { GameOverConfetti } from './GameOverConfetti';
import { AnimatedScore } from './AnimatedScore';

interface GameOverModalProps {
  show: boolean;
  score: number;
  level: number;
  time: number;
  onRestart: () => void;
  onSaveScore: (name: string) => void;
  onClose: () => void;
  scores: GameScore[];
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  show,
  score,
  level,
  time,
  onRestart,
  onSaveScore,
  onClose,
  scores,
}) => {
  const [playerName, setPlayerName] = useState('');
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (show) {
      setPlayerName('');
      setShowScoreboard(false);
      setHasSubmitted(false);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm"
        >
          <GameOverConfetti />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1e1e1e]/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/10"
          >
            <div className="relative p-6 md:p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>

              {!showScoreboard ? (
                <div className="text-center">
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-4xl font-bold text-white mb-8"
                  >
                    Game Over!
                  </motion.div>
                  
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between bg-white/5 p-4 rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                        <span className="text-white/90">Score</span>
                      </div>
                      <AnimatedScore value={score} className="text-xl font-semibold text-white" />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between bg-white/5 p-4 rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <Target className="w-6 h-6 text-blue-400" />
                        <span className="text-white/90">Level</span>
                      </div>
                      <span className="text-xl font-semibold text-white">{level}</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-between bg-white/5 p-4 rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-green-400" />
                        <span className="text-white/90">Time</span>
                      </div>
                      <span className="text-xl font-semibold text-white">{formatTime(time)}</span>
                    </motion.div>

                    {!hasSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-3"
                      >
                        <input
                          type="text"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full bg-white/5 text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                          maxLength={20}
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              if (playerName.trim()) {
                                onSaveScore(playerName.trim());
                                setHasSubmitted(true);
                                setShowScoreboard(true);
                              }
                            }}
                            disabled={!playerName.trim()}
                            className="flex-1 bg-white/10 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Save className="w-5 h-5" />
                            Save Score
                          </button>
                          <button
                            onClick={() => setShowScoreboard(true)}
                            className="flex-1 bg-white/10 hover:bg-white/15 text-white py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <ChevronRight className="w-5 h-5" />
                            Skip
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">High Scores</h3>
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-4 max-h-[50vh] overflow-y-auto">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-white/5">
                          <tr className="text-left text-white/90">
                            <th className="p-2">Rank</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Score</th>
                            <th className="p-2">Level</th>
                            <th className="p-2">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scores.map((score, index) => (
                            <tr key={index} className="border-t border-white/5 text-white/80">
                              <td className="p-2">{index + 1}</td>
                              <td className="p-2">{score.name}</td>
                              <td className="p-2">{score.score}</td>
                              <td className="p-2">{score.level}</td>
                              <td className="p-2">{formatTime(score.time)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      onClick={onRestart}
                      className="w-full bg-white/10 hover:bg-white/15 text-white py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                      Play Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
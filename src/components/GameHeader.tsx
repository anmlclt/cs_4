import React from 'react';
import { Trophy, Info, Target, Clock } from 'lucide-react';
import { Logo } from './Logo';
import { Lives } from './Lives';
import { GameStats } from './GameStats';
import { HintButton } from './HintButton';
import type { HintState } from '../types/game';

interface GameHeaderProps {
  isGameActive: boolean;
  showGameOver: boolean;
  level: number;
  score: number;
  time: number;
  lives: number;
  maxLives: number;
  hint: HintState;
  onHintClick: () => void;
  onShowLeaderboard: () => void;
  onShowInfo: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  isGameActive,
  showGameOver,
  level,
  score,
  time,
  lives,
  maxLives,
  hint,
  onHintClick,
  onShowLeaderboard,
  onShowInfo,
}) => {
  const shouldHighlightLevel = level > 0 && level % 10 === 0;

  return (
    <div className="fixed top-0 left-0 z-30 
                    w-full md:w-32 h-auto md:h-screen 
                    bg-[#191919] backdrop-blur-md border-b md:border-r border-white/10
                    shadow-lg shadow-black/20">
      {/* Mobile Layout */}
      <div className="md:hidden w-full flex flex-col items-center p-4 gap-4">
        {/* Top Row - Logo and Icons */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={onShowLeaderboard}
            className="h-10 w-10 flex items-center justify-center rounded-xl
                     bg-white/5 hover:bg-white/10 text-white/90
                     border border-white/10 transition-colors duration-200"
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
          </button>
          <Logo variant="mobile" className="h-8" />
          <button
            onClick={onShowInfo}
            className="h-10 w-10 flex items-center justify-center rounded-xl
                     bg-white/5 hover:bg-white/10 text-white/70 hover:text-white/90 
                     transition-colors duration-200"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Game Controls Grid */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <HintButton
            onHintClick={onHintClick}
            isAvailable={level >= hint.availableAt}
            nextAvailableLevel={hint.availableAt}
            currentLevel={level}
          />
          <Lives lives={lives} maxLives={maxLives} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="h-12 flex items-center justify-center gap-2 
                       bg-[#252525] backdrop-blur-md rounded-xl px-3
                       border border-white/5">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-light text-white/90">{level}</span>
          </div>
          <div className="h-12 flex items-center justify-center gap-2 
                       bg-[#252525] backdrop-blur-md rounded-xl px-3
                       border border-white/5">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-light text-white/90">{score}</span>
          </div>
          <div className="h-12 flex items-center justify-center gap-2 
                       bg-[#252525] backdrop-blur-md rounded-xl px-3
                       border border-white/5">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-sm font-light text-white/90">
              {String(Math.floor(time / 60)).padStart(2, '0')}:
              {String(time % 60).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-col h-full p-6 gap-6">
        <Logo variant="desktop" className="w-full mb-6" />
        
        <button
          onClick={onShowLeaderboard}
          className="w-full h-16 flex flex-col items-center justify-center gap-2 rounded-xl
                   bg-white/5 hover:bg-white/10 text-white/90
                   border border-white/10 transition-colors duration-200"
        >
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-xs font-medium">Leaderboard</span>
        </button>

        <HintButton
          onHintClick={onHintClick}
          isAvailable={level >= hint.availableAt}
          nextAvailableLevel={hint.availableAt}
          currentLevel={level}
        />

        <Lives lives={lives} maxLives={maxLives} />

        <div className="flex-1" />

        <div className="space-y-4">
          <div className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl
                       bg-[#252525] backdrop-blur-md
                       border border-white/5">
            <Target className="w-5 h-5 text-blue-400" />
            <div className="text-center">
              <div className="text-xs font-medium text-white/50">Level</div>
              <div className="text-sm font-medium text-white/90">{level}</div>
            </div>
          </div>

          <div className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl
                       bg-[#252525] backdrop-blur-md
                       border border-white/5">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <div className="text-center">
              <div className="text-xs font-medium text-white/50">Score</div>
              <div className="text-sm font-medium text-white/90">{score}</div>
            </div>
          </div>

          <div className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl
                       bg-[#252525] backdrop-blur-md
                       border border-white/5">
            <Clock className="w-5 h-5 text-green-400" />
            <div className="text-center">
              <div className="text-xs font-medium text-white/50">Time</div>
              <div className="text-sm font-medium text-white/90">
                {String(Math.floor(time / 60)).padStart(2, '0')}:
                {String(time % 60).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onShowInfo}
          className="w-full h-16 flex flex-col items-center justify-center gap-2 rounded-xl
                   bg-white/5 hover:bg-white/10 text-white/70 hover:text-white/90
                   border border-white/10 transition-colors duration-200 mt-2"
        >
          <Info className="w-5 h-5" />
          <span className="text-xs font-medium">Info</span>
        </button>
      </div>
    </div>
  );
};
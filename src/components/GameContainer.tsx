import React from 'react';
import { GameGrid } from './GameGrid';
import { Advertisement } from './Advertisement';

interface GameContainerProps {
  gameState: {
    gridSize: number;
    mainColor: string;
    differentColor: string;
    differentSquareIndex: number;
  };
  onSquareClick: (index: number) => void;
  highlightedArea: number[];
  wrongSquareIndex: number | null;
  level: number;
}

export const GameContainer: React.FC<GameContainerProps> = ({
  gameState,
  onSquareClick,
  highlightedArea,
  wrongSquareIndex,
  level,
}) => (
  <div className="w-full min-h-screen pt-[220px] md:pt-4 md:pl-32">
    {/* Top Ad Space - Desktop Only */}
    <div className="hidden md:block h-[90px] max-w-[728px] mx-auto mb-8">
      <Advertisement slot="top-banner" />
    </div>

    {/* Game Grid Container */}
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="w-[calc(100%-1rem)] md:w-[min(85vh,85vw)] aspect-square max-w-[800px] relative">
        <GameGrid
          gridSize={gameState.gridSize}
          mainColor={gameState.mainColor}
          differentColor={gameState.differentColor}
          differentSquareIndex={gameState.differentSquareIndex}
          onSquareClick={onSquareClick}
          highlightedArea={highlightedArea}
          wrongSquareIndex={wrongSquareIndex}
        />
      </div>
      
      {/* Bottom Ad Space */}
      <div className="mt-8 w-full">
        {/* Mobile Ad */}
        <div className="md:hidden h-[100px] max-w-[320px] mx-auto">
          <Advertisement slot="mobile-banner" format="mobile" />
        </div>
        
        {/* Desktop Ad */}
        <div className="hidden md:block h-[90px] max-w-[728px] mx-auto">
          <Advertisement slot="bottom-banner" />
        </div>
      </div>
    </div>
  </div>
);
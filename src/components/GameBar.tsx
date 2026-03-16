import React from 'react';
import '../styles/game.css';
import type { GameMode } from '../hooks/useGameLogic';

interface GameBarProps {
  position: number;
  skin?: string;
  mode: GameMode;
}

const GameBar: React.FC<GameBarProps> = ({ position, skin = 'neon', mode }) => {
  if (mode === 'CIRCLE') {
    return (
      <div 
        className={`circle-pointer ${skin}`} 
        style={{ transform: `rotate(${position - 90}deg)` }} 
      />
    );
  }

  return (
    <div className="game-bar-container">
      <div 
        className={`game-bar ${skin}`} 
        style={{ left: `${position}%` }} 
      />
    </div>
  );
};

export default GameBar;

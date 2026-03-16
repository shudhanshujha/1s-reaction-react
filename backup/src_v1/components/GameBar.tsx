import React from 'react';
import '../styles/game.css';

interface GameBarProps {
  position: number;
  skin?: string;
}

const GameBar: React.FC<GameBarProps> = ({ position, skin = 'neon' }) => {
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

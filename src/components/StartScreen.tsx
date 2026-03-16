import React, { useState } from 'react';
import '../styles/game.css';
import type { GameMode } from '../hooks/useGameLogic';

interface StartScreenProps {
  bestScore: number;
  coins: number;
  onStart: (mode: GameMode) => void;
  onOpenShop: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ 
  bestScore, 
  coins, 
  onStart, 
  onOpenShop 
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('CLASSIC');

  return (
    <div className="screen start-screen">
      <h1 className="title">1 Second Reaction</h1>
      
      <div className="mode-selector">
        <button 
          className={`mode-btn ${selectedMode === 'CLASSIC' ? 'active' : ''}`}
          onClick={() => setSelectedMode('CLASSIC')}
        >
          Classic
        </button>
        <button 
          className={`mode-btn ${selectedMode === 'CIRCLE' ? 'active' : ''}`}
          onClick={() => setSelectedMode('CIRCLE')}
        >
          Circle
        </button>
        <button 
          className={`mode-btn ${selectedMode === 'INFINITE' ? 'active' : ''}`}
          onClick={() => setSelectedMode('INFINITE')}
        >
          Infinite
        </button>
      </div>

      <div className="stats">
        <p className="best-score">Best Score: {bestScore}</p>
        <p className="coin-balance">Coins: {coins}</p>
      </div>

      <div className="button-group">
        <button className="btn primary-btn start-btn" onClick={() => onStart(selectedMode)}>
          Start Game
        </button>
        <button className="btn secondary-btn shop-btn" onClick={onOpenShop}>
          Shop
        </button>
      </div>
    </div>
  );
};

export default StartScreen;

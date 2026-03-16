import React from 'react';
import '../styles/game.css';

interface StartScreenProps {
  bestScore: number;
  coins: number;
  onStart: () => void;
  onOpenShop: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ 
  bestScore, 
  coins, 
  onStart, 
  onOpenShop 
}) => {
  return (
    <div className="screen start-screen">
      <h1 className="title">1 Second Reaction</h1>
      <div className="stats">
        <p className="best-score">Best Score: {bestScore}</p>
        <p className="coin-balance">Coins: {coins}</p>
      </div>
      <div className="button-group">
        <button className="btn primary-btn start-btn" onClick={onStart}>
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

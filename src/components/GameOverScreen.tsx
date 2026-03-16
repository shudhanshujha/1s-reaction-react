import React from 'react';
import '../styles/game.css';

interface GameOverScreenProps {
  score: number;
  bestScore: number;
  coinsEarned: number;
  onRestart: () => void;
  onGoHome: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  score, 
  bestScore, 
  coinsEarned, 
  onRestart, 
  onGoHome 
}) => {
  return (
    <div className="screen game-over-screen">
      <h2 className="title">Game Over</h2>
      <div className="results">
        <p className="final-score">Score: {score}</p>
        <p className="best-score">Best: {bestScore}</p>
        <p className="coins-earned">Coins Earned: {coinsEarned}</p>
      </div>
      <div className="button-group">
        <button className="btn primary-btn restart-btn" onClick={onRestart}>
          Play Again
        </button>
        <button className="btn secondary-btn home-btn" onClick={onGoHome}>
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;

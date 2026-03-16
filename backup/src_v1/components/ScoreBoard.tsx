import React from 'react';

interface ScoreBoardProps {
  score: number;
  bestScore: number;
  coins: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, bestScore, coins }) => {
  return (
    <div className="score-board">
      <div className="current-score">Score: {score}</div>
      <div className="top-scores">
        <span>Best: {bestScore}</span>
        <span>Coins: {coins}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;

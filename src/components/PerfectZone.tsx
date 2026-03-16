import React from 'react';
import '../styles/game.css';
import type { GameMode } from '../hooks/useGameLogic';

interface PerfectZoneProps {
  size: number;
  position: number;
  mode: GameMode;
}

const PerfectZone: React.FC<PerfectZoneProps> = ({ size, position, mode }) => {
  if (mode === 'CIRCLE') {
    return (
      <div className="circle-zone-wrapper">
        <svg viewBox="0 0 100 100" className="circle-svg">
          {/* Main track circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#333"
            strokeWidth="4"
          />
          {/* Perfect zone arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(76, 175, 80, 0.6)"
            strokeWidth="10"
            strokeDasharray={`${size * 0.785} 282.6`} // Arc length: (size/360) * 2 * PI * 45
            strokeLinecap="round"
            transform={`rotate(${position - size / 2 - 90} 50 50)`}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="perfect-zone-container">
      <div 
        className="perfect-zone" 
        style={{ width: `${size}%`, left: `${position - size / 2}%` }} 
      />
    </div>
  );
};

export default PerfectZone;

import React from 'react';
import '../styles/game.css';

interface PerfectZoneProps {
  size: number;
}

const PerfectZone: React.FC<PerfectZoneProps> = ({ size }) => {
  return (
    <div className="perfect-zone-container">
      <div 
        className="perfect-zone" 
        style={{ width: `${size}%`, left: `${50 - size / 2}%` }} 
      />
    </div>
  );
};

export default PerfectZone;

import { useState, useEffect, useRef, useCallback } from 'react';

export type GameMode = 'CLASSIC' | 'CIRCLE' | 'INFINITE';

interface GameState {
  score: number;
  barPosition: number; // 0 to 100 for Classic/Infinite, 0 to 360 for Circle
  barSpeed: number;
  perfectZoneSize: number;
  perfectZonePosition: number; // For Infinite/Circle: where the zone is located
  isGameOver: boolean;
  isPlaying: boolean;
  direction: 1 | -1;
  mode: GameMode;
}

const INITIAL_SPEEDS = {
  CLASSIC: 0.5,
  CIRCLE: 1.0, // Circle is slightly faster due to distance but still slow
  INFINITE: 0.5,
};

const INITIAL_ZONE_SIZE = 20;
const SPEED_INCREMENT = 0.1;
const ZONE_DECREMENT = 0.5;
const MIN_ZONE_SIZE = 5;

const useGameLogic = (onGameOver: (score: number) => void) => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    barPosition: 0,
    barSpeed: INITIAL_SPEEDS.CLASSIC,
    perfectZoneSize: INITIAL_ZONE_SIZE,
    perfectZonePosition: 50, // Center for Classic
    isGameOver: false,
    isPlaying: false,
    direction: 1,
    mode: 'CLASSIC',
  });

  const requestRef = useRef<number>(null);

  const startGame = useCallback((mode: GameMode = 'CLASSIC') => {
    let initialPos = 0;
    let zonePos = 50;

    if (mode === 'INFINITE') {
      zonePos = 20 + Math.random() * 60; // Random zone between 20 and 80%
    } else if (mode === 'CIRCLE') {
      zonePos = Math.random() * 360; // Random degree
    }

    setGameState({
      score: 0,
      barPosition: initialPos,
      barSpeed: INITIAL_SPEEDS[mode],
      perfectZoneSize: INITIAL_ZONE_SIZE,
      perfectZonePosition: zonePos,
      isGameOver: false,
      isPlaying: true,
      direction: 1,
      mode,
    });
  }, []);

  const stopBar = useCallback(() => {
    if (!gameState.isPlaying || gameState.isGameOver) return;

    const { barPosition, perfectZoneSize, perfectZonePosition, mode } = gameState;
    let isHit = false;

    if (mode === 'CIRCLE') {
      // Circle logic: handle 360 wrap around
      const diff = Math.abs(barPosition - perfectZonePosition);
      const wrappedDiff = Math.min(diff, 360 - diff);
      isHit = wrappedDiff <= perfectZoneSize / 2;
    } else {
      // Classic/Infinite logic
      const halfZone = perfectZoneSize / 2;
      isHit = barPosition >= perfectZonePosition - halfZone && barPosition <= perfectZonePosition + halfZone;
    }

    if (isHit) {
      let nextZonePos = 50;
      if (mode === 'INFINITE') {
        nextZonePos = 10 + Math.random() * 80;
      } else if (mode === 'CIRCLE') {
        nextZonePos = Math.random() * 360;
      }

      setGameState((prev) => ({
        ...prev,
        score: prev.score + 1,
        barSpeed: prev.barSpeed + SPEED_INCREMENT,
        perfectZoneSize: Math.max(prev.perfectZoneSize - ZONE_DECREMENT, MIN_ZONE_SIZE),
        perfectZonePosition: nextZonePos,
      }));
    } else {
      setGameState((prev) => ({ ...prev, isGameOver: true, isPlaying: false }));
      onGameOver(gameState.score);
    }
  }, [gameState, onGameOver]);

  const update = useCallback(() => {
    setGameState((prev) => {
      if (!prev.isPlaying || prev.isGameOver) return prev;

      let nextPosition = prev.barPosition + prev.barSpeed * prev.direction;
      let nextDirection = prev.direction;

      if (prev.mode === 'CIRCLE') {
        if (nextPosition >= 360) nextPosition -= 360;
        if (nextPosition < 0) nextPosition += 360;
      } else {
        if (nextPosition >= 100) {
          nextPosition = 100;
          nextDirection = -1;
        } else if (nextPosition <= 0) {
          nextPosition = 0;
          nextDirection = 1;
        }
      }

      return {
        ...prev,
        barPosition: nextPosition,
        direction: nextDirection,
      };
    });

    requestRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    if (gameState.isPlaying && !gameState.isGameOver) {
      requestRef.current = requestAnimationFrame(update);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState.isPlaying, gameState.isGameOver, update]);

  return {
    gameState,
    startGame,
    stopBar,
  };
};

export default useGameLogic;

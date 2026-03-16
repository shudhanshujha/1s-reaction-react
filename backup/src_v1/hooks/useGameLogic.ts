import { useState, useEffect, useRef, useCallback } from 'react';

interface GameState {
  score: number;
  barPosition: number; // 0 to 100
  barSpeed: number;
  perfectZoneSize: number;
  isGameOver: boolean;
  isPlaying: boolean;
  direction: 1 | -1;
}

const INITIAL_SPEED = 2;
const INITIAL_ZONE_SIZE = 20;
const SPEED_INCREMENT = 0.5;
const ZONE_DECREMENT = 0.5;
const MIN_ZONE_SIZE = 5;

const useGameLogic = (onGameOver: (score: number) => void) => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    barPosition: 0,
    barSpeed: INITIAL_SPEED,
    perfectZoneSize: INITIAL_ZONE_SIZE,
    isGameOver: false,
    isPlaying: false,
    direction: 1,
  });

  const requestRef = useRef<number>(null);

  const startGame = useCallback(() => {
    setGameState({
      score: 0,
      barPosition: 0,
      barSpeed: INITIAL_SPEED,
      perfectZoneSize: INITIAL_ZONE_SIZE,
      isGameOver: false,
      isPlaying: true,
      direction: 1,
    });
  }, []);

  const stopBar = useCallback(() => {
    if (!gameState.isPlaying || gameState.isGameOver) return;

    const { barPosition, perfectZoneSize } = gameState;
    const center = 50;
    const halfZone = perfectZoneSize / 2;

    const isHit = barPosition >= center - halfZone && barPosition <= center + halfZone;

    if (isHit) {
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 1,
        barSpeed: prev.barSpeed + SPEED_INCREMENT,
        perfectZoneSize: Math.max(prev.perfectZoneSize - ZONE_DECREMENT, MIN_ZONE_SIZE),
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

      if (nextPosition >= 100) {
        nextPosition = 100;
        nextDirection = -1;
      } else if (nextPosition <= 0) {
        nextPosition = 0;
        nextDirection = 1;
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

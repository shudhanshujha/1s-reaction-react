import React, { useState, useCallback, useEffect } from 'react';
import StartScreen from '../components/StartScreen';
import GameBar from '../components/GameBar';
import PerfectZone from '../components/PerfectZone';
import ScoreBoard from '../components/ScoreBoard';
import GameOverScreen from '../components/GameOverScreen';
import Shop from '../components/Shop';
import useGameLogic from '../hooks/useGameLogic';
import type { GameMode } from '../hooks/useGameLogic';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/game.css';

type ScreenState = 'START' | 'PLAYING' | 'GAMEOVER';

const GamePage: React.FC = () => {
  console.log("GamePage: Rendering");
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('START');
  const [activeMode, setActiveMode] = useState<GameMode>('CLASSIC');
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  const [bestScore, setBestScore] = useLocalStorage<number>('bestScore', 0);
  const [coins, setCoins] = useLocalStorage<number>('coins', 0);
  const [purchasedSkins, setPurchasedSkins] = useLocalStorage<string[]>('purchasedSkins', ['neon']);
  const [equippedSkin, setEquippedSkin] = useLocalStorage<string>('equippedSkin', 'neon');

  const onGameOver = useCallback((finalScore: number) => {
    setCurrentScreen('GAMEOVER');
    if (finalScore > bestScore) {
      setBestScore(finalScore);
    }
    const earnedCoins = finalScore * 5;
    setCoins((prev) => prev + earnedCoins);
  }, [bestScore, setBestScore, setCoins]);

  const { gameState, startGame, stopBar } = useGameLogic(onGameOver);

  const handleStart = useCallback((mode: GameMode) => {
    console.log("Starting game with mode:", mode);
    setActiveMode(mode);
    setCurrentScreen('PLAYING');
    startGame(mode);
  }, [startGame]);

  const handleRestart = useCallback(() => {
    setCurrentScreen('PLAYING');
    startGame(activeMode);
  }, [activeMode, startGame]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentScreen === 'PLAYING' && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault(); 
        stopBar();
      } else if (currentScreen === 'START' && event.key === 'Enter') {
        handleStart('CLASSIC');
      } else if (currentScreen === 'GAMEOVER' && (event.key === ' ' || event.key === 'Enter')) {
        handleRestart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, stopBar, handleStart, handleRestart]);

  const handleGoHome = () => {
    setCurrentScreen('START');
  };

  const handlePurchaseCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  const handlePurchaseSkin = (skinId: string, price: number) => {
    if (coins >= price) {
      setCoins((prev) => prev - price);
      setPurchasedSkins((prev) => [...prev, skinId]);
    }
  };

  const handleEquipSkin = (skinId: string) => {
    setEquippedSkin(skinId);
  };

  const handleWatchAd = () => {
    setIsWatchingAd(true);
    setTimeout(() => {
      setIsWatchingAd(false);
      setCoins((prev) => prev + 100);
      alert('You earned 100 coins!');
    }, 5000);
  };

  return (
    <div className="game-wrapper" onClick={currentScreen === 'PLAYING' ? stopBar : undefined}>
      {currentScreen === 'START' && (
        <StartScreen 
          bestScore={bestScore} 
          coins={coins} 
          onStart={handleStart} 
          onOpenShop={() => setIsShopOpen(true)} 
        />
      )}

      {currentScreen === 'PLAYING' && (
        <div className="game-container">
          <ScoreBoard 
            score={gameState.score} 
            bestScore={bestScore} 
            coins={coins} 
          />
          <div className="game-area">
            {gameState.mode === 'CIRCLE' ? (
              <div className="circle-game-container">
                <PerfectZone size={gameState.perfectZoneSize} position={gameState.perfectZonePosition} mode={gameState.mode} />
                <GameBar position={gameState.barPosition} skin={equippedSkin} mode={gameState.mode} />
              </div>
            ) : (
              <>
                <GameBar position={gameState.barPosition} skin={equippedSkin} mode={gameState.mode} />
                <PerfectZone size={gameState.perfectZoneSize} position={gameState.perfectZonePosition} mode={gameState.mode} />
              </>
            )}
          </div>
          <div className="tap-instruction">TAP OR PRESS SPACE TO STOP!</div>
        </div>
      )}

      {currentScreen === 'GAMEOVER' && (
        <GameOverScreen 
          score={gameState.score} 
          bestScore={bestScore} 
          coinsEarned={gameState.score * 5} 
          onRestart={handleRestart} 
          onGoHome={handleGoHome} 
        />
      )}

      {isShopOpen && (
        <Shop 
          coins={coins}
          onPurchaseCoins={handlePurchaseCoins}
          onPurchaseSkin={handlePurchaseSkin}
          onEquipSkin={handleEquipSkin}
          purchasedSkins={purchasedSkins}
          equippedSkin={equippedSkin}
          onClose={() => setIsShopOpen(false)}
          onWatchAd={handleWatchAd}
        />
      )}

      {isWatchingAd && (
        <div className="ad-overlay">
          <div className="spinner"></div>
          <p>Watching Ad... Reward in 5 seconds</p>
        </div>
      )}
    </div>
  );
};

export default GamePage;

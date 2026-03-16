import React, { useState, useCallback, useEffect } from 'react';
import StartScreen from '../components/StartScreen';
import GameBar from '../components/GameBar';
import PerfectZone from '../components/PerfectZone';
import ScoreBoard from '../components/ScoreBoard';
import GameOverScreen from '../components/GameOverScreen';
import Shop from '../components/Shop';
import useGameLogic from '../hooks/useGameLogic';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/game.css';

type ScreenState = 'START' | 'PLAYING' | 'GAMEOVER';

const GamePage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('START');
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

  const handleStart = () => {
    setCurrentScreen('PLAYING');
    startGame();
  };

  const handleRestart = () => {
    setCurrentScreen('PLAYING');
    startGame();
  };

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
            <GameBar position={gameState.barPosition} skin={equippedSkin} />
            <PerfectZone size={gameState.perfectZoneSize} />
          </div>
          <div className="tap-instruction">TAP TO STOP!</div>
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

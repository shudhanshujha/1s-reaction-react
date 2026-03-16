import React, { useState } from 'react';
import '../styles/store.css';

interface ShopProps {
  coins: number;
  onPurchaseCoins: (amount: number) => void;
  onPurchaseSkin: (skinId: string, price: number) => void;
  onEquipSkin: (skinId: string) => void;
  purchasedSkins: string[];
  equippedSkin: string;
  onClose: () => void;
  onWatchAd: () => void;
}

const SKINS = [
  { id: 'neon', name: 'Neon', price: 0, class: 'neon' },
  { id: 'fire', name: 'Fire', price: 500, class: 'fire' },
  { id: 'electric', name: 'Electric', price: 1000, class: 'electric' },
  { id: 'gold', name: 'Gold', price: 5000, class: 'gold' },
];

const COIN_PACKS = [
  { amount: 500, label: '500 Coins' },
  { amount: 2000, label: '2000 Coins' },
  { amount: 5000, label: '5000 Coins' },
];

const Shop: React.FC<ShopProps> = ({ 
  coins, 
  onPurchaseCoins, 
  onPurchaseSkin, 
  onEquipSkin, 
  purchasedSkins, 
  equippedSkin, 
  onClose,
  onWatchAd
}) => {
  return (
    <div className="shop-overlay">
      <div className="shop-container">
        <div className="shop-header">
          <h2>Shop</h2>
          <div className="coin-balance">Coins: {coins}</div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="shop-section">
          <h3>Earn Coins</h3>
          <button className="ad-button" onClick={onWatchAd}>
            Watch Ad for 100 Coins
          </button>
        </div>

        <div className="shop-section">
          <h3>Coin Packs</h3>
          <div className="coin-packs">
            {COIN_PACKS.map(pack => (
              <button key={pack.amount} className="pack-button" onClick={() => onPurchaseCoins(pack.amount)}>
                {pack.label}
              </button>
            ))}
          </div>
        </div>

        <div className="shop-section">
          <h3>Skins</h3>
          <div className="skins-list">
            {SKINS.map(skin => {
              const isPurchased = purchasedSkins.includes(skin.id);
              const isEquipped = equippedSkin === skin.id;

              return (
                <div key={skin.id} className="skin-item">
                  <div className={`skin-preview ${skin.class}`}></div>
                  <div className="skin-info">
                    <span className="skin-name">{skin.name}</span>
                    {isPurchased ? (
                      <button 
                        className={`equip-btn ${isEquipped ? 'equipped' : ''}`}
                        onClick={() => onEquipSkin(skin.id)}
                        disabled={isEquipped}
                      >
                        {isEquipped ? 'Equipped' : 'Equip'}
                      </button>
                    ) : (
                      <button 
                        className="buy-btn"
                        onClick={() => onPurchaseSkin(skin.id, skin.price)}
                        disabled={coins < skin.price}
                      >
                        {skin.price} Coins
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

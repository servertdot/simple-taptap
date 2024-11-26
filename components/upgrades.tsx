"use client";

import { useState } from 'react';
import { Zap, Clock } from 'lucide-react';

interface UpgradesProps {
  coins: number;
  setCoins: (coins: number) => void;
  multiplier: number;
  setMultiplier: (multiplier: number) => void;
  autoClickerCount: number;
  setAutoClickerCount: (count: number) => void;
}

export default function Upgrades({
  coins,
  setCoins,
  multiplier,
  setMultiplier,
  autoClickerCount,
  setAutoClickerCount,
}: UpgradesProps) {
  const getMultiplierCost = () => Math.floor(100 * Math.pow(1.5, multiplier - 1));
  const getAutoClickerCost = () => Math.floor(150 * Math.pow(1.5, autoClickerCount));

  const buyMultiplier = () => {
    const cost = getMultiplierCost();
    if (coins >= cost) {
      setCoins(coins - cost);
      setMultiplier(multiplier + 1);
    }
  };

  const buyAutoClicker = () => {
    const cost = getAutoClickerCost();
    if (coins >= cost) {
      setCoins(coins - cost);
      setAutoClickerCount(autoClickerCount + 1);
    }
  };

  return (
    <div className="w-full space-y-4">
      <button
        onClick={buyMultiplier}
        disabled={coins < getMultiplierCost()}
        className="w-full p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg
                   flex items-center justify-between
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:from-purple-700 hover:to-blue-700
                   transition-all duration-200 ease-in-out"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          <span>Upgrade Tap Power</span>
        </div>
        <span>{getMultiplierCost()} coins</span>
      </button>

      <button
        onClick={buyAutoClicker}
        disabled={coins < getAutoClickerCost()}
        className="w-full p-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg
                   flex items-center justify-between
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:from-green-700 hover:to-teal-700
                   transition-all duration-200 ease-in-out"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>Buy Auto Clicker ({autoClickerCount})</span>
        </div>
        <span>{getAutoClickerCost()} coins</span>
      </button>
    </div>
  );
}
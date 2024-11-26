"use client";

import { useEffect, useState } from 'react';
import { Coins, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Upgrades from './upgrades';

export  const Game = () => {
  const [coins, setCoins] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [autoClickerCount, setAutoClickerCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Load saved progress
  useEffect(() => {
    const savedGame = localStorage.getItem('clickerGame');
    if (savedGame) {
      const { coins, multiplier, autoClickerCount } = JSON.parse(savedGame);
      setCoins(coins);
      setMultiplier(multiplier);
      setAutoClickerCount(autoClickerCount);
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('clickerGame', JSON.stringify({
      coins,
      multiplier,
      autoClickerCount,
    }));
  }, [coins, multiplier, autoClickerCount]);

  // Auto-clicker effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoClickerCount > 0) {
        setCoins(prev => prev + (autoClickerCount * multiplier));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [autoClickerCount, multiplier]);

  const handleClick = () => {
    setCoins(prev => prev + multiplier);
    setIsAnimating(true);
    playClickSound();
    createParticle();

    // Reset animation
    setTimeout(() => setIsAnimating(false), 100);
  };

  const createParticle = () => {
    const newParticle = {
      id: Date.now(),
      x: Math.random() * 60 - 30,
      y: Math.random() * -50 - 20,
    };
    setParticles(prev => [...prev, newParticle]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 500);
  };

  const playClickSound = () => {
    const audio = new Audio("data:audio/wav;base64,UklGRpQGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXAGAACBhYqFbF1fdH2Hh4NybGhwf4yTkX5xcnyLnayolnhxeIqbr7qwlHhzfY+luMG2mXt2gpWrvcW6nX97iJqwwcq+o4KBjZ+0xc3BooeGkaO4yM/DpouLlqi8zNHGrI+PmqzAz9TJsZOTna/E0tbMtZeXobPH1NfPupubo7bK1djRvp+fpbjM1tnTwaOjp7rO2NrVxKenqr3Q2dvXx6qqrL/S2tzYyq2trsHS293azrCwsMLU3N3b0LOzs8TV3d7c0rW1tcbW3t/d1Le3t8jX39/e1bm5ucnY4ODf17u7u8vZ4eHg2L29vc3a4eLi2r+/v87b4uPj3MHBwdDc4+Tk3cPDw9Hd5OXl38XFxdPe5ebl4cfHx9Tf5ufn48nJydXg5+jo5MvLy9fh6Onp5s3NzdjI6urq6M/Pz9rj6+vr6tHR0dvk7Ozs7NPT093l7e7u7tXV1d7m7u/v79fX19/n7/Dw8dnZ2eDo8PHx8tvb2+Hp8fLy8t3d3eLq8vPz897e3uPr8/T09ODg4OTs9PX19eLi4ubt9fb29uTk5Ofu9vf39+bm5uju9/j4+Ojo6On1+Pn5+erq6ur1+fr6+uzs7Ov2+vv7++7u7uz3+/z8/PDw8O34/P39/fLy8u75/f7+/vT09O/6/v///w==");
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md mx-auto">
      <div className="text-4xl font-bold text-yellow-400">
        {Math.floor(coins)} coins
      </div>

      <div className="relative">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute text-yellow-400 animate-particle"
            style={{
              transform: `translate(${particle.x}px, ${particle.y}px)`,
            }}
          >
            +{multiplier}
          </div>
        ))}
        <button
          onClick={handleClick}
          className={cn(
            "w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center",
            "transform transition-transform hover:scale-105 active:scale-95",
            "shadow-lg hover:shadow-yellow-500/50",
            "cursor-pointer",
            isAnimating && "animate-click"
          )}
        >
          <Coins className="w-16 h-16 text-yellow-100" />
        </button>
      </div>

      <div className="flex items-center gap-2 text-yellow-400">
        <Zap className="w-4 h-4" />
        <span>Power: x{multiplier}</span>
      </div>

      <Upgrades
        coins={coins}
        setCoins={setCoins}
        multiplier={multiplier}
        setMultiplier={setMultiplier}
        autoClickerCount={autoClickerCount}
        setAutoClickerCount={setAutoClickerCount}
      />
    </div>
  );
}
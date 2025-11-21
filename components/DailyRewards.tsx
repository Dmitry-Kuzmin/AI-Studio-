import React, { useState } from 'react';
import { Flame, Zap, Gift, Star, Award } from 'lucide-react';

interface DailyRewardsProps {
  currentStreak: number;
  hasClaimedToday: boolean;
  onClaim: () => void;
}

export const DailyRewards: React.FC<DailyRewardsProps> = ({ currentStreak, hasClaimedToday, onClaim }) => {
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      onClaim();
      setIsClaiming(false);
    }, 1000);
  };

  const weeklyProgress = (currentStreak % 7) || 7;
  const progressPercent = (weeklyProgress / 7) * 100;
  const radius = 42;
  const circumference = 2 * Math.PI * radius; 
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="h-full bg-[#0B1120] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between border border-slate-800">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
           <h3 className="font-bold text-lg tracking-tight">Racha Diaria</h3>
           <p className="text-xs text-slate-400">Mantén el fuego encendido</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
           <Award size={18} className="text-amber-400" />
        </div>
      </div>

      {/* Main Visual */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-6">
        <div className="relative w-40 h-40">
          {/* Glow */}
          <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl"></div>
          
          <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
            {/* Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#1e293b"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Indicator */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#fireGradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Flame className={`w-10 h-10 mb-1 ${hasClaimedToday ? 'text-orange-500' : 'text-slate-600'} transition-colors`} fill="currentColor" />
            <span className="text-4xl font-bold text-white tracking-tighter">{currentStreak}</span>
          </div>
        </div>
      </div>

      {/* Week Row */}
      <div className="relative z-10 flex justify-between gap-2 mb-6 px-2">
         {[1, 2, 3, 4, 5, 6, 7].map((day) => {
           const isCompleted = day < weeklyProgress || (day === weeklyProgress && hasClaimedToday);
           const isActive = day === weeklyProgress && !hasClaimedToday;
           
           return (
             <div key={day} className="flex flex-col items-center gap-1">
                <div 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isCompleted ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 
                    isActive ? 'bg-white animate-pulse' : 'bg-slate-800'
                  }`}
                ></div>
             </div>
           );
         })}
      </div>

      {/* Button */}
      <button
        onClick={handleClaim}
        disabled={hasClaimedToday || isClaiming}
        className={`relative z-10 w-full py-4 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all duration-300 overflow-hidden ${
          hasClaimedToday 
            ? 'bg-slate-800 text-slate-400 cursor-default' 
            : 'bg-white text-slate-900 hover:bg-slate-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
        }`}
      >
        {hasClaimedToday ? 'Completado' : isClaiming ? 'Procesando...' : 'Reclamar XP'}
      </button>
    </div>
  );
};
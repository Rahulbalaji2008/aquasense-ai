import React from 'react';
import { CloudRain, Sun, Wind, Droplet } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <div className="glass-panel p-3.5 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4 text-xs font-mono">
        <div className="p-2 rounded-xl bg-sky-500/20 text-[#4FC3F7] border border-sky-400/30">
          <CloudRain className="w-5 h-5 animate-bounce" style={{ animationDuration: '3s' }} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Central Valley Catchment</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00FF9D]/20 text-[#00FF9D]">PRECIP RADAR</span>
          </div>
          <div className="text-gray-300 mt-0.5 flex items-center gap-3 text-[11px]">
            <span>29°C</span>
            <span>• 34mm Rain Today</span>
            <span>• Wind 12 km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

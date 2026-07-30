import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Droplets, 
  CloudRain, 
  Thermometer, 
  Droplet, 
  Gauge, 
  Sparkles, 
  RefreshCw, 
  Activity,
  Maximize2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { TelemetryMetrics } from '../types';

interface LiveDashboardProps {
  metrics: TelemetryMetrics;
  onRefresh: () => void;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

export const LiveDashboard: React.FC<LiveDashboardProps> = ({
  metrics,
  onRefresh,
  isFullScreen,
  toggleFullScreen,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    // Animate level up to metric level
    const timer = setTimeout(() => {
      setAnimatedLevel(metrics.groundwaterLevel);
    }, 150);
    return () => clearTimeout(timer);
  }, [metrics.groundwaterLevel]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const cards = [
    {
      id: 'groundwater',
      title: 'Groundwater Level',
      value: `${metrics.groundwaterLevel}%`,
      unit: 'Capacity',
      icon: Droplets,
      color: '#00E5FF',
      subtext: 'Optimal Aquifer Depth (14.2m)',
      isWaterFillCard: true,
      trend: '+1.4% vs yesterday'
    },
    {
      id: 'rainfall',
      title: 'Rainfall Today',
      value: `${metrics.rainfallToday}`,
      unit: 'mm',
      icon: CloudRain,
      color: '#4FC3F7',
      subtext: 'Monitored across 8 gauges',
      trend: '+12mm precip storm'
    },
    {
      id: 'temperature',
      title: 'Temperature',
      value: `${metrics.temperature}`,
      unit: '°C',
      icon: Thermometer,
      color: '#FFC107',
      subtext: 'Ambient Catchment Temp',
      trend: 'Normal seasonal range'
    },
    {
      id: 'humidity',
      title: 'Humidity',
      value: `${metrics.humidity}`,
      unit: '%',
      icon: Droplet,
      color: '#00FF9D',
      subtext: 'Soil Surface Evaporation Low',
      trend: '+3% RH moisture'
    },
    {
      id: 'water_usage',
      title: 'Water Usage',
      value: `${metrics.waterUsage.toLocaleString()}`,
      unit: 'L/day',
      icon: Gauge,
      color: '#00FF9D',
      subtext: 'Agricultural & Well Wells',
      trend: '-50L efficiency gain'
    },
    {
      id: 'accuracy',
      title: 'Prediction Accuracy',
      value: `${metrics.predictionAccuracy}`,
      unit: '%',
      icon: Sparkles,
      color: '#00E5FF',
      subtext: 'Gemini AI Hydro Neural Model',
      trend: 'Verified against sensors'
    }
  ];

  return (
    <section id="dashboard" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] tracking-wider uppercase mb-2">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Real-Time Telemetry Stream</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live IoT <span className="gradient-text">Groundwater Dashboard</span>
            </h2>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-xl glass-panel border border-white/10 text-xs font-mono text-cyan-300 hover:text-white hover:border-[#00E5FF]/40 flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'SYNCING...' : 'SYNC SENSORS'}</span>
            </button>

            <button
              onClick={toggleFullScreen}
              className="px-4 py-2 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF] hover:bg-[#00E5FF]/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isFullScreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN VIEW'}</span>
            </button>
          </div>
        </div>

        {/* Bento Grid Telemetry Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Bento Card 1: Groundwater Capacity Hero Card (Col 12 on mobile, 4 on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-6 lg:col-span-4 bg-[#0B1120]/60 rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between relative overflow-hidden group shadow-2xl min-h-[300px]"
          >
            {/* Background Gradient Water Rise Effect */}
            <div 
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#00E5FF]/20 via-[#00E5FF]/10 to-transparent transition-all duration-1000"
              style={{ height: `${animatedLevel}%` }}
            />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#00E5FF]" /> Groundwater Level
              </span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-bold">
                AQUIFER DEPTH 14.2m
              </span>
            </div>

            <div className="relative z-10 my-6 flex flex-col items-center text-center">
              <div className="text-6xl sm:text-7xl font-extrabold text-[#00E5FF] font-mono tracking-tight mb-1">
                {metrics.groundwaterLevel}<span className="text-3xl">%</span>
              </div>
              <div className="text-[#00FF9D] text-xs font-mono flex items-center gap-1 font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> +2.4% vs last month
              </div>

              {/* Progress indicator bar */}
              <div className="w-full h-3 bg-slate-900/90 rounded-full overflow-hidden border border-cyan-400/30 mt-6 relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00E5FF] via-cyan-400 to-[#00FF9D]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${animatedLevel}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>Status: <strong className="text-emerald-400">Optimal Recharge</strong></span>
              <span>Target: 70%+</span>
            </div>

            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF]/10 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>

          {/* Bento Card 2: Rainfall Precipitation Gauge (Col 6 on md, 4 on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-6 lg:col-span-4 bg-[#0B1120]/60 rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-2xl min-h-[300px]"
          >
            <div className="flex items-center justify-between relative z-10">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-[#4FC3F7]" /> Rainfall Today
              </span>
              <div className="p-2.5 rounded-2xl bg-sky-500/20 text-[#4FC3F7] border border-sky-400/30">
                <CloudRain className="w-5 h-5" />
              </div>
            </div>

            <div className="my-4 relative z-10">
              <div className="text-5xl font-extrabold text-[#4FC3F7] font-mono tracking-tight">
                {metrics.rainfallToday} <span className="text-2xl text-gray-300">mm</span>
              </div>
              <div className="text-xs text-slate-400 mt-2 font-mono">Monitored across 8 high-precision tipping bucket rain gauges.</div>

              {/* Rain activity bar chart visualization */}
              <div className="flex gap-1.5 items-end h-10 mt-6">
                <div className="flex-1 bg-white/5 rounded-t h-4"></div>
                <div className="flex-1 bg-white/10 rounded-t h-6"></div>
                <div className="flex-1 bg-white/20 rounded-t h-3"></div>
                <div className="flex-1 bg-[#4FC3F7] rounded-t h-10 animate-pulse"></div>
                <div className="flex-1 bg-white/20 rounded-t h-7"></div>
                <div className="flex-1 bg-white/10 rounded-t h-5"></div>
                <div className="flex-1 bg-white/5 rounded-t h-3"></div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono relative z-10">
              <span>Catchment Storm Rating: <strong className="text-sky-300">Moderate</strong></span>
              <span className="text-[#4FC3F7]">+12mm storm</span>
            </div>

            <div className="absolute bottom-0 right-0 w-40 h-40 bg-sky-500/10 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>

          {/* Bento Card 3: AI Model Neural Prediction Summary (Col 12 on md, 4 on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-12 lg:col-span-4 bg-[#0B1120]/60 rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-2xl min-h-[300px] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"
          >
            <div className="flex items-center justify-between relative z-10">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00FF9D]" /> AI Neural Model
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/30">
                CONFIDENCE: {metrics.predictionAccuracy}%
              </span>
            </div>

            <div className="my-4 relative z-10 space-y-3">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>Aquifer Depletion Risk</span>
                <span className="text-[#00FF9D] font-bold">LOW (96.4%)</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="w-[96%] h-full bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] rounded-full" />
              </div>
              <div className="text-xs leading-relaxed text-slate-300 italic p-3 rounded-2xl bg-white/5 border border-white/5 mt-2">
                "Stable groundwater levels predicted for the next 45 days based on current precipitation trends and agricultural extraction cycles."
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono relative z-10">
              <span>Risk Assessment: <strong className="text-[#00FF9D]">Low Risk</strong></span>
              <button 
                onClick={() => {
                  const el = document.getElementById('ai-prediction');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#00E5FF] hover:underline cursor-pointer font-bold"
              >
                View Forecast →
              </button>
            </div>
          </motion.div>

          {/* Bento Card 4: Water Usage / Extraction (Col 4 on md) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-4 bg-[#0B1120]/60 rounded-3xl p-6 border border-white/10 flex flex-col justify-between shadow-xl min-h-[200px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#00FF9D]" /> Daily Extraction
              </span>
              <div className="p-2.5 rounded-2xl bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/30">
                <Gauge className="w-5 h-5" />
              </div>
            </div>

            <div className="my-2">
              <div className="text-3xl font-extrabold text-white font-mono">{metrics.waterUsage.toLocaleString()} <span className="text-sm text-gray-400">L/day</span></div>
              <div className="text-xs text-gray-400 font-mono mt-1">Agricultural & Municipal Wells</div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[#00FF9D] flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> -50L efficiency gain today
            </div>
          </motion.div>

          {/* Bento Card 5: Ambient Temperature (Col 4 on md) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-4 bg-[#0B1120]/60 rounded-3xl p-6 border border-white/10 flex flex-col justify-between shadow-xl min-h-[200px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-amber-400" /> Ambient Temp
              </span>
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Thermometer className="w-5 h-5" />
              </div>
            </div>

            <div className="my-2">
              <div className="text-3xl font-extrabold text-white font-mono">{metrics.temperature} <span className="text-sm text-gray-400">°C</span></div>
              <div className="text-xs text-gray-400 font-mono mt-1">Catchment Surface Temperature</div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-amber-300">
              Optimal evaporation window
            </div>
          </motion.div>

          {/* Bento Card 6: Relative Humidity (Col 4 on md) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-4 bg-[#0B1120]/60 rounded-3xl p-6 border border-white/10 flex flex-col justify-between shadow-xl min-h-[200px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                <Droplet className="w-4 h-4 text-[#00E5FF]" /> Soil Humidity
              </span>
              <div className="p-2.5 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                <Droplet className="w-5 h-5" />
              </div>
            </div>

            <div className="my-2">
              <div className="text-3xl font-extrabold text-white font-mono">{metrics.humidity} <span className="text-sm text-gray-400">% RH</span></div>
              <div className="text-xs text-gray-400 font-mono mt-1">Surface Evaporation Low</div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-cyan-300">
              +3% moisture retention
            </div>
          </motion.div>

        </div>

        {/* Bottom Bento Summary Analytics Bar */}
        <div className="mt-6 bg-[#0B1120]/60 rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-around gap-4 text-center font-mono">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold mb-1">IoT Active Nodes</span>
            <span className="text-xl font-bold text-white">542</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold mb-1">Data Points Logged</span>
            <span className="text-xl font-bold text-[#00E5FF]">2.1M</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold mb-1">Water Conserved</span>
            <span className="text-xl font-bold text-[#00FF9D]">1.5M <span className="text-xs">L</span></span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold mb-1">Network Signal Avg</span>
            <span className="text-xl font-bold text-[#4FC3F7]">98%</span>
          </div>
        </div>

      </div>
    </section>
  );
};

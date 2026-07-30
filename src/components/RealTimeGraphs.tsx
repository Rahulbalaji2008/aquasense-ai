import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Download, 
  Layers, 
  Activity, 
  CloudRain, 
  Droplets,
  Gauge
} from 'lucide-react';
import { hourlyGroundwaterTrend, monthlyRainfallvsLevel } from '../data/mockData';

export const RealTimeGraphs: React.FC = () => {
  const [activeGraphTab, setActiveGraphTab] = useState<'level_vs_time' | 'rain_vs_groundwater' | 'monthly_rain' | 'consumption' | 'weekly_trends'>('level_vs_time');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '1y'>('24h');

  // Custom Chart Tooltip Style
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 rounded-xl border border-cyan-500/30 text-xs shadow-xl space-y-1">
          <p className="font-mono text-cyan-300 font-bold border-b border-white/10 pb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-white">{entry.value} {entry.unit || ''}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="analytics" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Top Header & Chart Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-1">
                <Activity className="w-4 h-4" />
                <span>Interactive Hydro-Telemetry Visualizer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Real-Time <span className="gradient-text">Analytics & Trends</span>
              </h3>
            </div>

            {/* Timeframe Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-[#050816]/80 p-1.5 rounded-2xl border border-white/10">
              {(['24h', '7d', '30d', '1y'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all ${
                    timeRange === range
                      ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold shadow-md shadow-cyan-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Tab Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none border-b border-white/5">
            {[
              { id: 'level_vs_time', label: 'Groundwater Level vs Time', icon: Droplets },
              { id: 'rain_vs_groundwater', label: 'Rainfall vs Groundwater', icon: CloudRain },
              { id: 'monthly_rain', label: 'Monthly Rainfall', icon: Calendar },
              { id: 'consumption', label: 'Water Consumption', icon: Gauge },
              { id: 'weekly_trends', label: 'Weekly Hydro Trends', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeGraphTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveGraphTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-[#00E5FF]/15 text-[#00E5FF] border-[#00E5FF]/40 shadow-lg shadow-cyan-500/10'
                      : 'bg-white/5 text-gray-400 border-transparent hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Chart Canvas Container */}
          <div className="h-[380px] w-full pt-6">
            <ResponsiveContainer width="100%" height="100%">
              {activeGraphTab === 'level_vs_time' ? (
                <AreaChart data={hourlyGroundwaterTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis domain={[60, 80]} stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="level" 
                    name="Groundwater Level" 
                    unit="%" 
                    stroke="#00E5FF" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorLevel)" 
                  />
                </AreaChart>
              ) : activeGraphTab === 'rain_vs_groundwater' ? (
                <BarChart data={monthlyRainfallvsLevel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis yAxisId="left" stroke="#4FC3F7" tick={{ fill: '#4FC3F7', fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" domain={[50, 100]} stroke="#00FF9D" tick={{ fill: '#00FF9D', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: '#9CA3AF', fontSize: '12px' }} />
                  <Bar yAxisId="left" dataKey="rainfall" name="Rainfall (mm)" fill="#4FC3F7" radius={[6, 6, 0, 0]} />
                  <Bar yAxisId="right" dataKey="level" name="Groundwater (%)" fill="#00FF9D" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : activeGraphTab === 'monthly_rain' ? (
                <BarChart data={monthlyRainfallvsLevel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis stroke="#4FC3F7" tick={{ fill: '#4FC3F7', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="rainfall" name="Rainfall (mm)" fill="#4FC3F7" radius={[8, 8, 0, 0]} />
                </BarChart>
              ) : activeGraphTab === 'consumption' ? (
                <AreaChart data={monthlyRainfallvsLevel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF9D" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00FF9D" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis stroke="#00FF9D" tick={{ fill: '#00FF9D', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="usage" name="Water Usage (L/day)" stroke="#00FF9D" strokeWidth={3} fill="url(#colorUsage)" />
                </AreaChart>
              ) : (
                <LineChart data={hourlyGroundwaterTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis stroke="#00E5FF" tick={{ fill: '#00E5FF', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: '#9CA3AF', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="level" name="Groundwater %" stroke="#00E5FF" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="rainfall" name="Rainfall mm" stroke="#4FC3F7" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Chart Insights Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-ping" />
              <span>Real-time IoT streaming active via LoRaWAN & Cellular Gateway</span>
            </div>
            <div className="font-mono text-[#00E5FF]">
              Last updated: 2 mins ago | Sample Rate: 15 mins
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

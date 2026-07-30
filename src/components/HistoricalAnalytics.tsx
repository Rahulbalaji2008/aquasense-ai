import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  CloudRain, 
  Gauge, 
  BarChart3, 
  LineChart as LineChartIcon, 
  Grid, 
  Layers,
  Calendar
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { monthlyRainfallvsLevel } from '../data/mockData';

export const HistoricalAnalytics: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area' | 'heatmap'>('area');

  // Heatmap mock matrix data (Months vs Aquifer Regions intensity)
  const heatmapData = [
    { month: 'Jan', valley: 85, delta: 90, foothills: 75, south: 40 },
    { month: 'Feb', valley: 88, delta: 92, foothills: 78, south: 42 },
    { month: 'Mar', valley: 90, delta: 94, foothills: 80, south: 45 },
    { month: 'Apr', valley: 82, delta: 88, foothills: 72, south: 38 },
    { month: 'May', valley: 75, delta: 82, foothills: 65, south: 32 },
    { month: 'Jun', valley: 68, delta: 74, foothills: 58, south: 28 },
    { month: 'Jul', valley: 60, delta: 68, foothills: 50, south: 22 },
    { month: 'Aug', valley: 58, delta: 65, foothills: 48, south: 20 },
    { month: 'Sep', valley: 64, delta: 70, foothills: 54, south: 26 },
    { month: 'Oct', valley: 72, delta: 78, foothills: 62, south: 32 },
    { month: 'Nov', valley: 78, delta: 84, foothills: 70, south: 36 },
    { month: 'Dec', valley: 84, delta: 88, foothills: 74, south: 39 },
  ];

  const getHeatmapColor = (val: number) => {
    if (val >= 80) return 'bg-[#00FF9D]/80 text-[#050816] font-bold';
    if (val >= 60) return 'bg-[#00E5FF]/60 text-white';
    if (val >= 40) return 'bg-[#FFC107]/60 text-white';
    return 'bg-[#FF5252]/80 text-white font-bold';
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Multi-Year Hydrological Trends</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Historical <span className="gradient-text">Analytics Engine</span>
          </h2>
        </div>

        {/* 4 Key Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 uppercase">Highest Water Level</span>
              <div className="p-2 rounded-xl bg-emerald-500/20 text-[#00FF9D]">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono mt-3">88%</div>
            <p className="text-xs text-[#00FF9D] font-mono mt-1">Recorded: Dec 2025 (Winter Recharge)</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 uppercase">Lowest Water Level</span>
              <div className="p-2 rounded-xl bg-red-500/20 text-[#FF5252]">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono mt-3">61%</div>
            <p className="text-xs text-[#FF5252] font-mono mt-1">Recorded: Aug 2025 (Peak Dry Spell)</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 uppercase">Average Rainfall</span>
              <div className="p-2 rounded-xl bg-sky-500/20 text-[#4FC3F7]">
                <CloudRain className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono mt-3">54 mm</div>
            <p className="text-xs text-[#4FC3F7] font-mono mt-1">Monthly Precip Mean</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 uppercase">Average Consumption</span>
              <div className="p-2 rounded-xl bg-cyan-500/20 text-[#00E5FF]">
                <Gauge className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono mt-3">1,380 L</div>
            <p className="text-xs text-cyan-300 font-mono mt-1">Daily Extraction Average</p>
          </div>

        </div>

        {/* Analytics Interactive Panel */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00E5FF]" /> Multi-Dimensional Historical Visualization
            </h4>

            <div className="flex items-center gap-1.5 bg-[#050816] p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setChartType('area')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  chartType === 'area' ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" /> Area
              </button>

              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  chartType === 'bar' ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" /> Bar
              </button>

              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  chartType === 'line' ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <LineChartIcon className="w-3.5 h-3.5" /> Line
              </button>

              <button
                onClick={() => setChartType('heatmap')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  chartType === 'heatmap' ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Heatmap
              </button>
            </div>
          </div>

          {/* Chart Rendering / Heatmap Matrix */}
          <div className="h-[360px] w-full">
            {chartType === 'heatmap' ? (
              <div className="h-full overflow-x-auto pt-2">
                <table className="w-full text-xs font-mono text-center">
                  <thead>
                    <tr className="text-gray-400 border-b border-white/10">
                      <th className="py-2 text-left px-3">Month</th>
                      <th className="py-2 px-3">Central Valley</th>
                      <th className="py-2 px-3">Delta Basin</th>
                      <th className="py-2 px-3">Eastern Foothills</th>
                      <th className="py-2 px-3">Southern District</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {heatmapData.map((row) => (
                      <tr key={row.month} className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-3 text-left font-bold text-white">{row.month}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2.5 py-1 rounded-lg block ${getHeatmapColor(row.valley)}`}>{row.valley}%</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2.5 py-1 rounded-lg block ${getHeatmapColor(row.delta)}`}>{row.delta}%</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2.5 py-1 rounded-lg block ${getHeatmapColor(row.foothills)}`}>{row.foothills}%</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2.5 py-1 rounded-lg block ${getHeatmapColor(row.south)}`}>{row.south}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : chartType === 'area' ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRainfallvsLevel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="histLevel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF9D" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#00FF9D" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis stroke="#00FF9D" tick={{ fill: '#00FF9D', fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="level" name="Groundwater Level (%)" stroke="#00FF9D" strokeWidth={3} fill="url(#histLevel)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : chartType === 'bar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRainfallvsLevel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis stroke="#00E5FF" tick={{ fill: '#00E5FF', fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="level" name="Groundwater Level (%)" fill="#00E5FF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRainfallvsLevel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis stroke="#4FC3F7" tick={{ fill: '#4FC3F7', fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke="#4FC3F7" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

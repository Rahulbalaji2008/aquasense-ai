import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Brain, 
  CloudRain, 
  Gauge, 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  ShieldAlert,
  Compass,
  Zap,
  RefreshCw
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { PredictionInput, PredictionResult } from '../types';

export const AiPredictionSection: React.FC = () => {
  const [inputs, setInputs] = useState<PredictionInput>({
    rainfall: 35,
    waterUsage: 1450,
    previousWaterLevel: 72,
    region: 'Central Valley Aquifer',
    soilType: 'Sandy Loam'
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult>({
    predictedLevel: 74.5,
    risk: 'Low',
    confidenceScore: 96,
    rechargeRate: '+1.8 mm/hr',
    depletionForecast: '1.45 m³/day',
    recommendation: 'Aquifer recharge rate is optimal. Extraction can be maintained at current agricultural rates without depletion risk.',
    analysisSummary: 'Gemini AI hydrogeological neural network predicts a net positive water table balance driven by 35mm precip over sandy loam permeability layer.',
    futureTrend: [
      { day: 'Day 1', level: 72, rainfall: 35 },
      { day: 'Day 2', level: 73.2, rainfall: 22 },
      { day: 'Day 3', level: 74.5, rainfall: 15 },
      { day: 'Day 4', level: 75.1, rainfall: 8 },
      { day: 'Day 5', level: 74.8, rainfall: 0 },
      { day: 'Day 6', level: 74.2, rainfall: 0 },
      { day: 'Day 7', level: 73.9, rainfall: 0 },
    ],
    isAiGenerated: true
  });

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rainfall: inputs.rainfall,
          waterUsage: inputs.waterUsage,
          previousLevel: inputs.previousWaterLevel,
          region: inputs.region,
          soilType: inputs.soilType,
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPrediction(data);
      }
    } catch (err) {
      console.error("AI prediction request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40', badge: '#FF5252' };
      case 'High': return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/40', badge: '#FFC107' };
      case 'Medium': return { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/40', badge: '#00E5FF' };
      default: return { bg: 'bg-[#00FF9D]/20', text: 'text-[#00FF9D]', border: 'border-[#00FF9D]/40', badge: '#00FF9D' };
    }
  };

  const riskStyle = getRiskColor(prediction.risk);

  return (
    <section id="ai-prediction" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF] mb-3">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            <span>GEMINI AI HYDROLOGICAL PREDICTIVE MODEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            AI Groundwater <span className="gradient-text">Forecasting Engine</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-3">
            Simulate future water table levels, aquifer depletion risks, and recharge rates using machine learning models trained on soil permeability and precip patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs Control Panel */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#00E5FF]/20 to-[#00FF9D]/20 border border-[#00E5FF]/30 text-[#00E5FF]">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Simulation Parameters</h3>
                <p className="text-xs text-gray-400">Adjust variables to run AI prediction</p>
              </div>
            </div>

            <div className="space-y-5">
              
              {/* Region & Soil */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-gray-300 block mb-1">Target Region</label>
                  <select
                    value={inputs.region}
                    onChange={(e) => setInputs({ ...inputs, region: e.target.value })}
                    className="w-full bg-[#050816] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="Central Valley Aquifer">Central Valley</option>
                    <option value="Delta Coastal Basin">Delta Basin</option>
                    <option value="Eastern Foothills">Eastern Foothills</option>
                    <option value="Southern Industrial Zone">Southern Zone</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-300 block mb-1">Soil Type</label>
                  <select
                    value={inputs.soilType}
                    onChange={(e) => setInputs({ ...inputs, soilType: e.target.value })}
                    className="w-full bg-[#050816] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="Sandy Loam">Sandy Loam (High Permeability)</option>
                    <option value="Clay Silt">Clay Silt (Low Permeability)</option>
                    <option value="Alluvial Gravel">Alluvial Gravel (Fast Recharge)</option>
                  </select>
                </div>
              </div>

              {/* Slider 1: Rainfall (mm) */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-gray-300 flex items-center gap-1">
                    <CloudRain className="w-3.5 h-3.5 text-[#4FC3F7]" /> Expected Rainfall Today
                  </span>
                  <span className="font-mono font-bold text-[#4FC3F7]">{inputs.rainfall} mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={inputs.rainfall}
                  onChange={(e) => setInputs({ ...inputs, rainfall: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#4FC3F7]"
                />
              </div>

              {/* Slider 2: Water Usage (L/day) */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-gray-300 flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-[#00FF9D]" /> Daily Water Extraction Rate
                  </span>
                  <span className="font-mono font-bold text-[#00FF9D]">{inputs.waterUsage} L/day</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="50"
                  value={inputs.waterUsage}
                  onChange={(e) => setInputs({ ...inputs, waterUsage: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00FF9D]"
                />
              </div>

              {/* Slider 3: Previous Water Level (%) */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-gray-300 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-[#00E5FF]" /> Current/Previous Water Level
                  </span>
                  <span className="font-mono font-bold text-[#00E5FF]">{inputs.previousWaterLevel}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={inputs.previousWaterLevel}
                  onChange={(e) => setInputs({ ...inputs, previousWaterLevel: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
                />
              </div>

              {/* Run Prediction Button */}
              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>NEURAL NETWORK CALCULATING...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>GENERATE AI PREDICTION</span>
                  </>
                )}
              </button>

            </div>
          </div>

          {/* Right AI Prediction Results Dashboard */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            
            {loading ? (
              <div className="h-[420px] flex flex-col items-center justify-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-[#00E5FF]/20 border-t-[#00E5FF] animate-spin" />
                  <Sparkles className="w-8 h-8 text-[#00FF9D] absolute inset-0 m-auto animate-pulse" />
                </div>
                <p className="text-sm font-mono text-cyan-300 animate-pulse">Running Gemini 3.6 Flash Hydrogeological Model...</p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Result Highlights Bar */}
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Predicted Groundwater Level Card */}
                  <div className="glass-card-neon p-4 rounded-2xl border border-cyan-500/30 text-center">
                    <span className="text-[11px] font-mono text-gray-400 uppercase block mb-1">PREDICTED LEVEL</span>
                    <div className="text-3xl font-extrabold text-[#00E5FF] font-mono">{prediction.predictedLevel}%</div>
                    <span className="text-[10px] text-cyan-300 font-mono">Aquifer Capacity</span>
                  </div>

                  {/* Risk Indicator Card */}
                  <div className={`p-4 rounded-2xl border text-center ${riskStyle.bg} ${riskStyle.border}`}>
                    <span className="text-[11px] font-mono text-gray-300 uppercase block mb-1">DEPLETION RISK</span>
                    <div className={`text-2xl font-bold ${riskStyle.text} uppercase`}>{prediction.risk}</div>
                    <span className="text-[10px] opacity-80 font-mono">Status Assessment</span>
                  </div>

                  {/* Confidence Score Card */}
                  <div className="glass-card-neon p-4 rounded-2xl border border-[#00FF9D]/30 text-center">
                    <span className="text-[11px] font-mono text-gray-400 uppercase block mb-1">CONFIDENCE</span>
                    <div className="text-3xl font-extrabold text-[#00FF9D] font-mono">{prediction.confidenceScore}%</div>
                    <span className="text-[10px] text-emerald-300 font-mono">Neural Accuracy</span>
                  </div>

                </div>

                {/* 7-Day Future Trend Forecast Chart */}
                <div className="bg-[#050816]/70 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#00E5FF]" /> 7-DAY GROUNDWATER FORECAST
                    </span>
                    <span className="text-[10px] font-mono text-[#00FF9D]">Recharge Rate: {prediction.rechargeRate}</span>
                  </div>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={prediction.futureTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                        <YAxis domain={['auto', 'auto']} stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="level" name="Predicted Level (%)" stroke="#00E5FF" strokeWidth={3} fill="url(#colorTrend)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Hydrogeological Analysis & Recommendation */}
                <div className="space-y-3 bg-[#0B1120]/80 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#00E5FF]">
                    <Sparkles className="w-4 h-4 text-[#00FF9D]" />
                    <span>AI HYDROLOGICAL ANALYSIS SUMMARY</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal">
                    {prediction.analysisSummary}
                  </p>
                  <div className="p-3 rounded-xl bg-[#00FF9D]/10 border border-[#00FF9D]/30 text-xs text-[#00FF9D] flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Recommendation: </span>
                      <span>{prediction.recommendation}</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

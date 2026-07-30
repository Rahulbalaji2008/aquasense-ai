import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Cpu, Cloud, Wifi, Database, Sparkles, Droplets, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onViewDashboard: () => void;
  onLiveDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewDashboard,
  onLiveDemo
}) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden">
      {/* Background Animated Gradient Lights & Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00E5FF]/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#00FF9D]/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Floating Animated Droplets & Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400/20 backdrop-blur-sm border border-cyan-300/30"
            style={{
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 12 + 8}px`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 95}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF] shadow-lg shadow-cyan-500/10">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>TAGLINE: Monitor • Analyze • Predict • Preserve</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Smart Water Intelligence for a{' '}
              <span className="bg-gradient-to-r from-[#00E5FF] via-cyan-200 to-[#00FF9D] bg-clip-text text-transparent">
                Sustainable Future
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-normal">
              Real-time groundwater monitoring, rainfall analytics, historical insights, and AI-powered predictions to optimize water resource management for agriculture, industry, and municipal governance.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onViewDashboard}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold text-sm tracking-wide hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLiveDemo}
                className="px-6 py-3.5 rounded-2xl glass-panel border border-white/15 text-white font-semibold text-sm hover:border-[#00E5FF]/40 hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2 group"
              >
                <div className="w-7 h-7 rounded-full bg-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Live Demo</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-xl font-bold text-white flex items-center gap-1">
                  <span>96%</span>
                  <span className="text-xs text-[#00FF9D] font-mono">Accuracy</span>
                </div>
                <div className="text-xs text-gray-400">AI Neural Model</div>
              </div>

              <div>
                <div className="text-xl font-bold text-white flex items-center gap-1">
                  <span>&lt;1s</span>
                  <span className="text-xs text-[#00E5FF] font-mono">Latency</span>
                </div>
                <div className="text-xs text-gray-400">IoT Telemetry</div>
              </div>

              <div>
                <div className="text-xl font-bold text-white flex items-center gap-1">
                  <span>500+</span>
                  <span className="text-xs text-cyan-300 font-mono">Sensors</span>
                </div>
                <div className="text-xs text-gray-400">Monitored Aquifers</div>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive 3D Hydrological IoT Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-square rounded-3xl glass-card-neon p-6 overflow-hidden flex flex-col justify-between shadow-2xl">
              
              {/* Rain Cloud Header Layer */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-sky-500/20 text-[#4FC3F7] border border-sky-400/30">
                    <Cloud className="w-6 h-6 animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#4FC3F7]">ATMOSPHERIC INPUT</span>
                    <h4 className="text-sm font-semibold text-white">Rain Precipitation (34mm)</h4>
                  </div>
                </div>

                {/* Cloud Data Stream Icon */}
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#00FF9D] bg-[#00FF9D]/10 px-2.5 py-1 rounded-full border border-[#00FF9D]/30">
                  <Wifi className="w-3 h-3 animate-pulse" />
                  <span>LoRaWAN 4G</span>
                </div>
              </div>

              {/* Central IoT & Sensor Signal Flow Diagram */}
              <div className="relative py-8 flex items-center justify-center">
                {/* Concentric Signal Rings */}
                <div className="absolute w-52 h-52 rounded-full border border-[#00E5FF]/20 animate-ping" style={{ animationDuration: '4s' }} />
                <div className="absolute w-40 h-40 rounded-full border border-[#00FF9D]/30" />

                {/* Microcontroller Sensor Node Center */}
                <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#050816] to-[#0B1120] border-2 border-[#00E5FF] p-3 shadow-xl shadow-cyan-500/30 flex flex-col items-center justify-center text-center">
                  <Cpu className="w-8 h-8 text-[#00E5FF] mb-1 animate-pulse" />
                  <span className="text-[10px] font-mono text-white font-bold">ESP32 NODE</span>
                  <span className="text-[8px] font-mono text-[#00FF9D]">AQUA-01</span>
                </div>

                {/* Floating Signal Packets */}
                <motion.div
                  className="absolute top-2 right-12 bg-[#00E5FF]/20 border border-[#00E5FF]/50 text-[#00E5FF] px-2 py-1 rounded-md text-[10px] font-mono shadow-md flex items-center gap-1"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Database className="w-3 h-3" /> 1024 Hz Data
                </motion.div>

                <motion.div
                  className="absolute bottom-4 left-6 bg-[#00FF9D]/20 border border-[#00FF9D]/50 text-[#00FF9D] px-2 py-1 rounded-md text-[10px] font-mono shadow-md flex items-center gap-1"
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <ShieldCheck className="w-3 h-3" /> Encrypted TLS
                </motion.div>
              </div>

              {/* Underground Water Layer (Animated Water Filling Effect) */}
              <div className="relative rounded-2xl bg-[#050816] border border-cyan-500/30 p-4 overflow-hidden">
                <div className="flex items-center justify-between relative z-10 mb-2">
                  <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-[#00E5FF]" /> AQUIFER GROUNDWATER DEPTH
                  </span>
                  <span className="text-sm font-bold font-mono text-[#00FF9D]">72% CAPACITY</span>
                </div>

                {/* Aquifer Visual Container */}
                <div className="w-full h-12 bg-gray-900/80 rounded-xl relative overflow-hidden border border-white/10">
                  {/* Water Animated Wave Layer */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#00E5FF] to-[#00FF9D]/80 opacity-80"
                    style={{ height: '72%' }}
                    animate={{
                      height: ['68%', '74%', '72%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-full h-full opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center text-[11px] font-mono text-white font-bold tracking-wider z-20 drop-shadow">
                    DEPTH: 14.2m | RECHARGE: +1.8mm/hr
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Bottom Moving Wave Visual Accent */}
      <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none opacity-20 overflow-hidden">
        <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent animate-wave" />
      </div>
    </section>
  );
};

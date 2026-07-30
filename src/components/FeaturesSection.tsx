import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  CloudRain, 
  BarChart2, 
  Brain, 
  Database, 
  BellRing, 
  Wifi, 
  LayoutDashboard 
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      desc: 'Sub-second sensor telemetry tracking groundwater levels across distributed aquifer monitoring wells.',
      color: '#00E5FF'
    },
    {
      icon: CloudRain,
      title: 'Rainfall Recording',
      desc: 'High-precision tipping bucket rain gauges capturing precipitation metrics for catchment recharge.',
      color: '#4FC3F7'
    },
    {
      icon: BarChart2,
      title: 'Historical Analysis',
      desc: 'Multi-year data trends, heatmaps, and seasonal extraction audits to visualize long-term water tables.',
      color: '#00FF9D'
    },
    {
      icon: Brain,
      title: 'AI Prediction',
      desc: 'Gemini AI hydrogeological neural models forecasting future water table depletion and recovery.',
      color: '#00E5FF'
    },
    {
      icon: Database,
      title: 'Cloud Storage',
      desc: 'Secure encrypted real-time streaming database providing compliance-ready data persistence.',
      color: '#00FF9D'
    },
    {
      icon: BellRing,
      title: 'Smart Alerts',
      desc: 'Instant automated notifications on critical well depletion, heavy storms, or hardware battery drop.',
      color: '#FF5252'
    },
    {
      icon: Wifi,
      title: 'IoT Connectivity',
      desc: 'Ultra-long-range LoRaWAN and 4G ESP32 hardware nodes operating on solar power in remote fields.',
      color: '#FFC107'
    },
    {
      icon: LayoutDashboard,
      title: 'Interactive Dashboard',
      desc: 'Futuristic glassmorphism UI with real-time chart widgets, maps, and full-screen telemetry view.',
      color: '#00E5FF'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF] mb-3">
            <span>PLATFORM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="gradient-text">Sustainable Hydrology</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-3">
            A complete suite of hardware-integrated software features designed for farmers, municipal authorities, and researchers.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${feat.color}15`,
                      borderColor: `${feat.color}40`,
                      color: feat.color
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00E5FF] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>

                <div 
                  className="mt-6 pt-3 border-t border-white/5 text-[10px] font-mono opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ color: feat.color }}
                >
                  INTEGRATED MODULE →
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Database, CloudRain, Sparkles, Droplets } from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const stats = [
    { label: 'IoT Devices', value: '500+', subtext: 'Active Field Nodes', icon: Cpu, color: '#00E5FF' },
    { label: 'Data Points', value: '2M+', subtext: 'Real-time Telemetry', icon: Database, color: '#00FF9D' },
    { label: 'Rainfall Records', value: '100K+', subtext: 'Precip Audit Logs', icon: CloudRain, color: '#4FC3F7' },
    { label: 'Prediction Accuracy', value: '96%', subtext: 'Gemini Neural Model', icon: Sparkles, color: '#00E5FF' },
    { label: 'Water Saved', value: '1.5M L', subtext: 'Conserved via AI Alerts', icon: Droplets, color: '#00FF9D' },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card-neon rounded-3xl p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="space-y-2 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00E5FF]/30 transition-all"
                >
                  <div 
                    className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2"
                    style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                    {stat.value}
                  </div>

                  <div className="text-xs font-bold text-gray-200">{stat.label}</div>
                  <div className="text-[10px] text-gray-400 font-mono">{stat.subtext}</div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

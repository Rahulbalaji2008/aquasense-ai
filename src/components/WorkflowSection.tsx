import React from 'react';
import { motion } from 'motion/react';
import { 
  CloudRain, 
  Compass, 
  Cpu, 
  Database, 
  Activity, 
  Brain, 
  LayoutDashboard, 
  BellRing,
  ArrowRight
} from 'lucide-react';
import { workflowSteps } from '../data/mockData';

export const WorkflowSection: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'CloudRain': return CloudRain;
      case 'Compass': return Compass;
      case 'Cpu': return Cpu;
      case 'Database': return Database;
      case 'Activity': return Activity;
      case 'Sparkles': return Brain;
      case 'LayoutDashboard': return LayoutDashboard;
      default: return BellRing;
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#00FF9D]/30 text-xs font-mono text-[#00FF9D] mb-3">
            <span>END-TO-END TELEMETRY ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            System <span className="gradient-text">Workflow Architecture</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-3">
            From physical precipitation to real-time AI decision support—how data flows seamlessly through AquaSense AI.
          </p>
        </div>

        {/* Horizontal Animated Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative">
          {workflowSteps.map((step, idx) => {
            const Icon = getStepIcon(step.icon);
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel rounded-2xl p-4 border border-white/10 relative flex flex-col items-center text-center justify-between group hover:border-[#00E5FF]/40 transition-all"
              >
                {/* Step Badge */}
                <span className="text-[10px] font-mono font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded-full border border-[#00E5FF]/30 mb-2">
                  0{step.id}
                </span>

                <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#00E5FF]/15 to-[#00FF9D]/15 border border-[#00E5FF]/30 text-[#00E5FF] mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>

                <h4 className="text-xs font-bold text-white mb-1">{step.title}</h4>
                <p className="text-[10px] text-gray-400 font-normal leading-tight">{step.desc}</p>

                {/* Arrow Connector (Visible on desktop between steps) */}
                {idx < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#00E5FF]">
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

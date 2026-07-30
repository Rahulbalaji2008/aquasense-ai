import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#050816] flex flex-col items-center justify-center p-4"
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#00E5FF] to-[#00FF9D] p-[1px] glow-cyan animate-pulse">
          <div className="w-full h-full bg-[#050816] rounded-[23px] flex items-center justify-center">
            <Droplets className="w-10 h-10 text-[#00E5FF]" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
        AquaSense <span className="text-[#00FF9D]">AI</span>
      </h1>
      <p className="text-xs font-mono text-cyan-300 tracking-widest uppercase mb-8">
        IoT Water Intelligence Platform
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10 relative">
        <div
          className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-[10px] font-mono text-gray-500 mt-3">
        INITIALIZING IoT NETWORK NODES... {progress}%
      </p>
    </motion.div>
  );
};

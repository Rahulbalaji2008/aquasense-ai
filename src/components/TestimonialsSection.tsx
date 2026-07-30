import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { mockTestimonials } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };

  const activeTestimonial = mockTestimonials[currentIndex];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF] mb-3">
            <span>FIELD EXPERT ENDORSEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Trusted by <span className="gradient-text">Water Stewards</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          
          <Quote className="w-16 h-16 text-[#00E5FF]/20 absolute top-6 left-6 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 relative z-10"
            >
              <p className="text-lg sm:text-xl text-gray-200 font-normal leading-relaxed italic">
                "{activeTestimonial.quote}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#00E5FF]"
                />
                <div>
                  <h4 className="text-base font-bold text-white">{activeTestimonial.name}</h4>
                  <p className="text-xs text-[#00FF9D] font-mono">{activeTestimonial.role}</p>
                  <p className="text-xs text-gray-400">{activeTestimonial.organization}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Manual Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/5">
            <div className="flex items-center gap-2">
              {mockTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-[#00E5FF]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

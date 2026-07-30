import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Github, 
  Twitter, 
  Linkedin, 
  Globe 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', organization: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF] mb-3">
            <Mail className="w-4 h-4" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Connect with <span className="gradient-text">AquaSense AI</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-3">
            Deploy IoT sensor arrays in your region or request a customized hydrological feasibility assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Contact Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00FF9D]/20 border border-[#00FF9D]/40 text-[#00FF9D] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Transmitted!</h3>
                <p className="text-xs font-mono text-gray-300 max-w-sm mx-auto">
                  Thank you for reaching out. An AquaSense hydrogeology engineer will review your inquiry within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-300 block mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#050816] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-300 block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., sarah@waterboard.gov"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#050816] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-300 block mb-1.5">Organization / Farm Name</label>
                  <input
                    type="text"
                    placeholder="e.g., California Basin Water District"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-[#050816] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-300 block mb-1.5">Message / Deployment Inquiry *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your groundwater monitoring requirements or well site coordinates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#050816] border border-white/15 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold text-xs tracking-wider hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Location & Google Maps Mockup */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Global Headquarters</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-normal">
                AquaSense AI Hydrogeology Innovation Center, Silicon Valley Campus
              </p>
            </div>

            <div className="space-y-3 text-xs font-mono text-gray-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#00E5FF]" />
                <span>400 Water Innovation Way, San Jose, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#00FF9D]" />
                <span>contact@aquasense.ai</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#4FC3F7]" />
                <span>+1 (800) 555-AQUA</span>
              </div>
            </div>

            {/* Google Map Mockup Box */}
            <div className="w-full h-44 rounded-2xl bg-[#050816] border border-white/10 overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="relative z-10 text-center space-y-1">
                <MapPin className="w-8 h-8 text-[#00E5FF] mx-auto animate-bounce" />
                <span className="text-xs font-mono font-bold text-white block">HQ Satellite Map Coordinates</span>
                <span className="text-[10px] text-gray-400 font-mono">Lat 37.3382° N, Lng 121.8863° W</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-gray-400">
              <span className="text-xs font-mono">Connect:</span>
              <div className="flex items-center gap-3">
                <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/15 hover:text-white transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/15 hover:text-white transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/15 hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/15 hover:text-white transition-all">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

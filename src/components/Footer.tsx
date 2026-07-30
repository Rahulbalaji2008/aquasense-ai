import React from 'react';
import { Droplets, Github, BookOpen, Shield, FileText } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#050816] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00E5FF] to-[#00FF9D] p-[1px] glow-cyan">
                <div className="w-full h-full bg-[#050816] rounded-[11px] flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-[#00E5FF]" />
                </div>
              </div>
              <span className="text-lg font-bold text-white">
                AquaSense <span className="text-[#00FF9D]">AI</span>
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              IoT-Based Groundwater Level Monitoring and Rainfall Analysis System powered by real-time neural analytics.
            </p>

            <p className="text-[10px] font-mono text-[#00E5FF]">
              TAGLINE: Monitor • Analyze • Predict • Preserve
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-[#00E5FF] transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-[#00E5FF] transition-colors">Dashboard</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analytics')} className="hover:text-[#00E5FF] transition-colors">Analytics</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-prediction')} className="hover:text-[#00E5FF] transition-colors">AI Prediction</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('iot-devices')} className="hover:text-[#00E5FF] transition-colors">IoT Devices</button>
              </li>
            </ul>
          </div>

          {/* Resources & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Developer & Resources</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer" onClick={() => alert("GitHub Repository: https://github.com/aquasense-ai/groundwater-iot")}>
                <Github className="w-3.5 h-3.5 text-[#00FF9D]" />
                <span>GitHub Repository</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer" onClick={() => alert("Documentation: API references, ESP32 firmware specs, and Gemini prompt schemas.")}>
                <BookOpen className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Documentation</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer" onClick={() => setActiveTab('reports')}>
                <FileText className="w-3.5 h-3.5 text-[#4FC3F7]" />
                <span>Compliance Audit Reports</span>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer" onClick={() => alert("Privacy Policy: End-to-end encrypted telemetry with strict data governance.")}>
                <Shield className="w-3.5 h-3.5 text-gray-400" />
                <span>Privacy Policy</span>
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => alert("Terms of Service: Authorized environmental monitoring platform usage.")}>
                <span>Terms of Service</span>
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => alert("Security: ISO 27001 & TLS 1.3 Certified.")}>
                <span>Security Standards</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} AquaSense AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#00FF9D]">● All IoT Nodes Operational</span>
            <span>v2.4.0-Production</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

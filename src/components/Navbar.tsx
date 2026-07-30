import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Activity, 
  Search, 
  Bell, 
  User, 
  Maximize2, 
  Minimize2, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { AlertNotification } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  alerts: AlertNotification[];
  onOpenLogin: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  alerts,
  onOpenLogin,
  isDarkMode,
  setIsDarkMode,
  isFullScreen,
  toggleFullScreen,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = alerts.filter(a => !a.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'ai-prediction', label: 'AI Prediction' },
    { id: 'iot-devices', label: 'IoT Devices' },
    { id: 'reports', label: 'Reports' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050816]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-cyan-500/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00E5FF] to-[#00FF9D] p-[1px] glow-cyan">
                <div className="w-full h-full bg-[#050816] rounded-[11px] flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#00E5FF] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-[#00E5FF] bg-clip-text text-transparent">
                  AquaSense <span className="text-[#00FF9D] text-xs font-mono px-1.5 py-0.5 rounded border border-[#00FF9D]/30 bg-[#00FF9D]/10">AI</span>
                </span>
                <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">IoT Water Intelligence</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#0B1120]/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#00FF9D]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-sm shadow-cyan-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons & Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Live Status Pill */}
              <button 
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FF9D]/10 border border-[#00FF9D]/30 text-[#00FF9D] text-xs font-mono hover:bg-[#00FF9D]/20 transition-all cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#00FF9D]" />
                <span>LIVE MONITORED</span>
              </button>

              {/* Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all relative"
                title="Search telemetry or sensors"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF5252] text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 glass-panel rounded-2xl p-4 shadow-2xl border border-white/10 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#00E5FF]" /> Notifications
                      </h4>
                      <span className="text-xs text-gray-400">{alerts.length} total</span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {alerts.map((a) => (
                        <div
                          key={a.id}
                          className={`p-2.5 rounded-xl text-xs border transition-all ${
                            a.type === 'danger'
                              ? 'bg-[#FF5252]/10 border-[#FF5252]/30 text-red-200'
                              : a.type === 'warning'
                              ? 'bg-[#FFC107]/10 border-[#FFC107]/30 text-amber-200'
                              : 'bg-[#00E5FF]/10 border-[#00E5FF]/30 text-cyan-200'
                          }`}
                        >
                          <div className="font-semibold">{a.title}</div>
                          <div className="text-[11px] opacity-80 mt-0.5">{a.message}</div>
                          <div className="text-[9px] opacity-60 mt-1 font-mono">{a.timestamp}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-cyan-300" />}
              </button>

              {/* Fullscreen Mode */}
              <button
                onClick={toggleFullScreen}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Dashboard"}
              >
                {isFullScreen ? <Minimize2 className="w-4 h-4 text-[#00FF9D]" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Login Button */}
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-semibold text-xs tracking-wide hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Portal Login</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Overlay Input */}
        {showSearch && (
          <div className="max-w-3xl mx-auto px-4 mt-3">
            <div className="glass-panel p-2 rounded-2xl flex items-center gap-3 border border-[#00E5FF]/30">
              <Search className="w-5 h-5 text-[#00E5FF] ml-2" />
              <input
                type="text"
                placeholder="Search sensors (e.g., AQUA-01), aquifers, rainfall, alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-gray-500"
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050816]/95 backdrop-blur-2xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-8">
          <div className="space-y-3">
            <p className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-2">Navigation Menu</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#00FF9D]/20 text-[#00E5FF] border border-[#00E5FF]/40'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold text-center flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              <span>Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveDashboard } from './components/LiveDashboard';
import { RealTimeGraphs } from './components/RealTimeGraphs';
import { AiPredictionSection } from './components/AiPredictionSection';
import { InteractiveMap } from './components/InteractiveMap';
import { HistoricalAnalytics } from './components/HistoricalAnalytics';
import { AlertsSection } from './components/AlertsSection';
import { IotDevicesSection } from './components/IotDevicesSection';
import { ReportsSection } from './components/ReportsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { WorkflowSection } from './components/WorkflowSection';
import { StatisticsSection } from './components/StatisticsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AiChatbot } from './components/AiChatbot';
import { WeatherWidget } from './components/WeatherWidget';
import { SplashScreen } from './components/SplashScreen';
import { LoginModal } from './components/LoginModal';
import { initialTelemetry, mockAlerts } from './data/mockData';
import { TelemetryMetrics } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [telemetry, setTelemetry] = useState<TelemetryMetrics>(initialTelemetry);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showSplash, setShowSplash] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Simulated real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        groundwaterLevel: Math.min(99, Math.max(20, Math.round((prev.groundwaterLevel + (Math.random() * 0.8 - 0.35)) * 10) / 10)),
        waterUsage: Math.max(1000, Math.min(3000, prev.waterUsage + Math.floor(Math.random() * 20 - 10))),
        rainfallToday: Math.max(0, prev.rainfallToday + (Math.random() < 0.2 ? 1 : 0)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefreshTelemetry = () => {
    setTelemetry((prev) => ({
      ...prev,
      groundwaterLevel: 73.2,
      rainfallToday: 36,
      temperature: 28,
      waterUsage: 1420,
    }));
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullScreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullScreen(false)).catch(() => {});
      }
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#F3F4F6] selection:bg-[#00E5FF] selection:text-[#050816] font-sans antialiased">
      
      {/* Initial Splash Screen */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Portal Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alerts={alerts}
        onOpenLogin={() => setShowLogin(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isFullScreen={isFullScreen}
        toggleFullScreen={toggleFullScreen}
      />

      {/* Application Sections */}
      <main className="space-y-12">
        <HeroSection
          onViewDashboard={() => scrollToSection('dashboard')}
          onLiveDemo={() => scrollToSection('ai-prediction')}
        />

        <LiveDashboard
          metrics={telemetry}
          onRefresh={handleRefreshTelemetry}
          isFullScreen={isFullScreen}
          toggleFullScreen={toggleFullScreen}
        />

        <RealTimeGraphs />

        <AiPredictionSection />

        <InteractiveMap />

        <HistoricalAnalytics />

        <AlertsSection />

        <IotDevicesSection />

        <ReportsSection />

        <FeaturesSection />

        <WorkflowSection />

        <StatisticsSection />

        <TestimonialsSection />

        <FaqSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer setActiveTab={scrollToSection} />

      {/* Floating Utilities */}
      <WeatherWidget />

      <AiChatbot telemetryContext={telemetry} />

    </div>
  );
}

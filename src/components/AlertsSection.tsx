import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BellRing, 
  AlertTriangle, 
  CloudRain, 
  BatteryLow, 
  WifiOff, 
  X, 
  Volume2, 
  VolumeX, 
  CheckCheck,
  ShieldAlert
} from 'lucide-react';
import { AlertNotification } from '../types';
import { mockAlerts } from '../data/mockData';

export const AlertsSection: React.FC = () => {
  const [alertsList, setAlertsList] = useState<AlertNotification[]>(mockAlerts);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [alertFilter, setAlertFilter] = useState<'all' | 'danger' | 'warning' | 'info'>('all');

  const handleDismiss = (id: string) => {
    setAlertsList(prev => prev.filter(a => a.id !== id));
  };

  const handleMarkAllRead = () => {
    setAlertsList(prev => prev.map(a => ({ ...a, read: true })));
  };

  const filteredAlerts = alertsList.filter(a => {
    if (alertFilter === 'all') return true;
    return a.type === alertFilter;
  });

  const getAlertIcon = (title: string, type: string) => {
    if (title.includes('Groundwater')) return <AlertTriangle className="w-5 h-5 text-red-400" />;
    if (title.includes('Rainfall')) return <CloudRain className="w-5 h-5 text-[#4FC3F7]" />;
    if (title.includes('Battery')) return <BatteryLow className="w-5 h-5 text-amber-400" />;
    return <WifiOff className="w-5 h-5 text-red-400" />;
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF5252] uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>Real-Time Sensor Alert Engine</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Active <span className="gradient-text">Alerts & Notifications</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-3.5 py-2 rounded-xl glass-panel border border-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00FF9D]" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
              <span>{soundEnabled ? 'ALERT SOUND ON' : 'MUTED'}</span>
            </button>

            <button
              onClick={handleMarkAllRead}
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>MARK READ</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: `All Alerts (${alertsList.length})` },
            { id: 'danger', label: 'Critical' },
            { id: 'warning', label: 'Warnings' },
            { id: 'info', label: 'Info / Rainfall' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAlertFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                alertFilter === tab.id
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Animated Notifications Cards List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`glass-panel glass-panel-hover rounded-2xl p-5 border flex items-start justify-between gap-4 relative overflow-hidden ${
                    alert.type === 'danger'
                      ? 'border-red-500/40 bg-red-950/20 shadow-red-500/5'
                      : alert.type === 'warning'
                      ? 'border-amber-500/40 bg-amber-950/20 shadow-amber-500/5'
                      : 'border-cyan-500/40 bg-cyan-950/20 shadow-cyan-500/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl border ${
                      alert.type === 'danger'
                        ? 'bg-red-500/20 border-red-500/40'
                        : alert.type === 'warning'
                        ? 'bg-amber-500/20 border-amber-500/40'
                        : 'bg-cyan-500/20 border-cyan-500/40'
                    }`}>
                      {getAlertIcon(alert.title, alert.type)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{alert.title}</h4>
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
                        )}
                      </div>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed font-normal">{alert.message}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-gray-400">
                        <span>{alert.timestamp}</span>
                        {alert.sensorId && <span>• Sensor: <strong className="text-cyan-300">{alert.sensorId}</strong></span>}
                      </div>
                    </div>
                  </div>

                  {/* Dismiss Button */}
                  <button
                    onClick={() => handleDismiss(alert.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all cursor-pointer"
                    title="Dismiss alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="glass-panel rounded-2xl p-8 text-center text-gray-400 font-mono text-xs">
                No active alerts in this category. All monitored aquifers are operating normally.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

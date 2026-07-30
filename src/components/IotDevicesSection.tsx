import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Wifi, 
  Battery, 
  MapPin, 
  Clock, 
  Search, 
  SlidersHorizontal,
  RefreshCw,
  Plus
} from 'lucide-react';
import { mockSensors } from '../data/mockData';
import { SensorData } from '../types';

export const IotDevicesSection: React.FC = () => {
  const [sensorsList] = useState<SensorData[]>(mockSensors);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');

  const filteredSensors = sensorsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.id.toLowerCase().includes(search.toLowerCase()) || 
                          s.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section id="iot-devices-list" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4 animate-pulse" />
              <span>Hardware Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Connected <span className="gradient-text">IoT Sensor Nodes</span>
            </h2>
          </div>

          <button
            onClick={() => alert("Add New IoT Node Dialog: Input ESP32 Node MAC Address or LoRaWAN DevEUI to provision new sensor site.")}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold text-xs tracking-wide hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>PROVISION NEW SENSOR</span>
          </button>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="glass-panel p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, name, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#050816] border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Status:
            </span>
            {(['all', 'online', 'offline'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all ${
                  statusFilter === status
                    ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 font-bold'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* IoT Sensors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSensors.map((sensor, idx) => (
            <motion.div
              key={sensor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Top Row */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#00E5FF]">{sensor.id}</span>
                    <span className="text-[10px] text-gray-400 font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {sensor.type}
                    </span>
                  </div>

                  {/* Status Indicator Badge */}
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                    sensor.status === 'online' 
                      ? 'bg-emerald-500/20 text-[#00E676] border border-emerald-500/40' 
                      : 'bg-red-500/20 text-[#FF5252] border border-red-500/40'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sensor.status === 'online' ? 'bg-[#00E676] animate-ping' : 'bg-[#FF5252]'}`} />
                    {sensor.status.toUpperCase()}
                  </span>
                </div>

                {/* Sensor Name & Location */}
                <h4 className="text-base font-bold text-white mb-1">{sensor.name}</h4>
                <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[#00FF9D]" /> {sensor.location}
                </p>

                {/* Telemetry Metrics Bar */}
                <div className="grid grid-cols-2 gap-3 bg-[#050816] p-3 rounded-2xl border border-white/5 mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase">Water Capacity</span>
                    <div className="text-lg font-bold text-[#00E5FF] font-mono">{sensor.waterLevelPercentage}%</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase">Rainfall</span>
                    <div className="text-lg font-bold text-[#4FC3F7] font-mono">{sensor.rainfallTodayMm} mm</div>
                  </div>
                </div>
              </div>

              {/* Bottom Specs: Battery, Signal, Last Sync */}
              <div className="pt-3 border-t border-white/10 space-y-2 text-xs font-mono text-gray-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Battery className="w-3.5 h-3.5 text-[#00FF9D]" /> Battery Power
                  </span>
                  <span className="text-white font-bold">{sensor.batteryPercentage}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-[#00E5FF]" /> Signal Strength
                  </span>
                  <span className="text-white font-bold">{sensor.signalStrengthDbm} dBm</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> Last Sync
                  </span>
                  <span className="text-gray-300">{sensor.lastSync}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

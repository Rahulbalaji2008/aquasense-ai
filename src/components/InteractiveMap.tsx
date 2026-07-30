import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Wifi, 
  Battery, 
  Droplets, 
  CloudRain, 
  Activity, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { SensorData } from '../types';
import { mockSensors } from '../data/mockData';

// Custom Glowing DivIcon Factory for Leaflet
const createGlowingMarker = (health: 'normal' | 'moderate' | 'critical', status: string) => {
  const isOffline = status === 'offline';
  let colorClass = 'bg-[#00E676] shadow-[0_0_15px_#00E676]';
  if (isOffline || health === 'critical') {
    colorClass = 'bg-[#FF5252] shadow-[0_0_15px_#FF5252] animate-pulse';
  } else if (health === 'moderate') {
    colorClass = 'bg-[#FFC107] shadow-[0_0_15px_#FFC107]';
  }

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div class="relative flex items-center justify-center">
      <div class="w-6 h-6 rounded-full ${colorClass} border-2 border-white/80 flex items-center justify-center text-[#050816]">
        <div class="w-2 h-2 rounded-full bg-white"></div>
      </div>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export const InteractiveMap: React.FC = () => {
  const [sensors] = useState<SensorData[]>(mockSensors);
  const [selectedSensor, setSelectedSensor] = useState<SensorData | null>(mockSensors[0]);
  const [filter, setFilter] = useState<'all' | 'normal' | 'moderate' | 'critical'>('all');

  const filteredSensors = sensors.filter(s => {
    if (filter === 'all') return true;
    return s.healthStatus === filter;
  });

  return (
    <section id="iot-devices" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00FF9D] uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 animate-bounce" />
              <span>GEOSPATIAL IoT NETWORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive <span className="gradient-text">Sensor Map</span>
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 bg-[#050816] p-1.5 rounded-2xl border border-white/10">
            {[
              { id: 'all', label: 'All Sensors (6)', color: 'text-gray-300' },
              { id: 'normal', label: 'Normal (3)', color: 'text-[#00E676]' },
              { id: 'moderate', label: 'Moderate (1)', color: 'text-[#FFC107]' },
              { id: 'critical', label: 'Critical (2)', color: 'text-[#FF5252]' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setFilter(item.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  filter === item.id
                    ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold shadow-md'
                    : `${item.color} hover:bg-white/5`
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Leaflet Map Container */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-3 border border-white/10 shadow-2xl overflow-hidden relative h-[520px]">
            <MapContainer
              center={[36.7783, -119.4179]}
              zoom={6}
              scrollWheelZoom={false}
              className="w-full h-full rounded-2xl"
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {filteredSensors.map((sensor) => (
                <Marker
                  key={sensor.id}
                  position={[sensor.lat, sensor.lng]}
                  icon={createGlowingMarker(sensor.healthStatus, sensor.status)}
                  eventHandlers={{
                    click: () => setSelectedSensor(sensor),
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-2 min-w-[200px]">
                      <div className="flex items-center justify-between border-b border-white/10 pb-1">
                        <span className="font-bold text-xs text-[#00E5FF] font-mono">{sensor.id}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          sensor.status === 'online' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {sensor.status.toUpperCase()}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white">{sensor.name}</h5>
                      <div className="text-[11px] text-gray-300 space-y-1">
                        <div>Water Level: <strong className="text-[#00E5FF]">{sensor.waterLevelPercentage}%</strong></div>
                        <div>Rainfall: <strong className="text-[#4FC3F7]">{sensor.rainfallTodayMm} mm</strong></div>
                        <div>Battery: <strong className="text-[#00FF9D]">{sensor.batteryPercentage}%</strong></div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Right Sensor Detail Inspector */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl relative space-y-6">
            {selectedSensor ? (
              <>
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#00E5FF]">{selectedSensor.id} • {selectedSensor.type}</span>
                    <h4 className="text-lg font-bold text-white mt-1">{selectedSensor.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#00FF9D]" /> {selectedSensor.location}
                    </p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                    selectedSensor.healthStatus === 'critical' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : selectedSensor.healthStatus === 'moderate'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {selectedSensor.healthStatus}
                  </span>
                </div>

                {/* Micro Metric Gauges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#050816] p-3 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-[#00E5FF]" /> Water Level
                    </span>
                    <div className="text-2xl font-bold font-mono text-[#00E5FF] mt-1">{selectedSensor.waterLevelPercentage}%</div>
                    <span className="text-[9px] text-gray-400">Depth: {selectedSensor.waterDepthMeters}m</span>
                  </div>

                  <div className="bg-[#050816] p-3 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1">
                      <CloudRain className="w-3 h-3 text-[#4FC3F7]" /> Rainfall Today
                    </span>
                    <div className="text-2xl font-bold font-mono text-[#4FC3F7] mt-1">{selectedSensor.rainfallTodayMm} mm</div>
                    <span className="text-[9px] text-gray-400">Rain Gauge Sensor</span>
                  </div>

                  <div className="bg-[#050816] p-3 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1">
                      <Battery className="w-3 h-3 text-[#00FF9D]" /> Battery Power
                    </span>
                    <div className="text-2xl font-bold font-mono text-[#00FF9D] mt-1">{selectedSensor.batteryPercentage}%</div>
                    <span className="text-[9px] text-gray-400">Solar Charged</span>
                  </div>

                  <div className="bg-[#050816] p-3 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-[#00E5FF]" /> Signal Strength
                    </span>
                    <div className="text-2xl font-bold font-mono text-white mt-1">{selectedSensor.signalStrengthDbm} <span className="text-xs">dBm</span></div>
                    <span className="text-[9px] text-gray-400">4G / LoRaWAN</span>
                  </div>
                </div>

                {/* Additional Telemetry details */}
                <div className="bg-[#0B1120] p-3 rounded-xl text-xs space-y-1.5 border border-white/5">
                  <div className="flex justify-between text-gray-400">
                    <span>Last Sync:</span>
                    <span className="font-mono text-white flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#00E5FF]" /> {selectedSensor.lastSync}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Ambient Temp:</span>
                    <span className="font-mono text-white">{selectedSensor.tempCelsius}°C</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Humidity:</span>
                    <span className="font-mono text-white">{selectedSensor.humidityPercentage}%</span>
                  </div>
                </div>

                {/* Action Trigger */}
                <button
                  onClick={() => alert(`Initiating manual diagnostics ping to ${selectedSensor.id}... Telemetry handshake OK.`)}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono text-white font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>PING SENSOR TELEMETRY</span>
                </button>
              </>
            ) : (
              <div className="text-center py-12 text-gray-400 text-xs font-mono">
                Click any sensor on the map to inspect live metrics.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

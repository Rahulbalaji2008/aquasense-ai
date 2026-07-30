import { SensorData, TelemetryMetrics, AlertNotification, ReportItem } from '../types';

export const initialTelemetry: TelemetryMetrics = {
  groundwaterLevel: 72,
  rainfallToday: 34,
  temperature: 29,
  humidity: 65,
  waterUsage: 1450,
  predictionAccuracy: 96,
};

export const mockSensors: SensorData[] = [
  {
    id: 'AQUA-01',
    name: 'Valley Aquifer Well #4',
    location: 'Central Agricultural Zone',
    lat: 36.7783,
    lng: -119.4179,
    waterLevelPercentage: 78,
    waterDepthMeters: 14.2,
    rainfallTodayMm: 38,
    batteryPercentage: 94,
    signalStrengthDbm: -62,
    status: 'online',
    healthStatus: 'normal',
    lastSync: '2 mins ago',
    tempCelsius: 28,
    humidityPercentage: 62,
    type: 'Ultrasonic Level'
  },
  {
    id: 'AQUA-02',
    name: 'North Delta Observation Station',
    location: 'Delta Basin Sector B',
    lat: 38.5816,
    lng: -121.4944,
    waterLevelPercentage: 65,
    waterDepthMeters: 18.5,
    rainfallTodayMm: 42,
    batteryPercentage: 88,
    signalStrengthDbm: -68,
    status: 'online',
    healthStatus: 'normal',
    lastSync: '1 min ago',
    tempCelsius: 26,
    humidityPercentage: 68,
    type: 'Multi-Param Probe'
  },
  {
    id: 'AQUA-03',
    name: 'Eastern Foothills Borehole #12',
    location: 'Foothill Reservoir Margin',
    lat: 36.9741,
    lng: -122.0308,
    waterLevelPercentage: 42,
    waterDepthMeters: 28.1,
    rainfallTodayMm: 12,
    batteryPercentage: 64,
    signalStrengthDbm: -82,
    status: 'online',
    healthStatus: 'moderate',
    lastSync: '5 mins ago',
    tempCelsius: 31,
    humidityPercentage: 55,
    type: 'Well Depth Sensor'
  },
  {
    id: 'AQUA-04',
    name: 'South Aquifer Sector 9',
    location: 'Industrial District South',
    lat: 34.0522,
    lng: -118.2437,
    waterLevelPercentage: 24,
    waterDepthMeters: 41.3,
    rainfallTodayMm: 4,
    batteryPercentage: 18,
    signalStrengthDbm: -95,
    status: 'online',
    healthStatus: 'critical',
    lastSync: '12 mins ago',
    tempCelsius: 33,
    humidityPercentage: 48,
    type: 'Ultrasonic Level'
  },
  {
    id: 'AQUA-05',
    name: 'Coastal Plain Rain Gauge #8',
    location: 'Coastal Monitoring Ridge',
    lat: 33.7490,
    lng: -117.8677,
    waterLevelPercentage: 83,
    waterDepthMeters: 9.8,
    rainfallTodayMm: 56,
    batteryPercentage: 98,
    signalStrengthDbm: -58,
    status: 'online',
    healthStatus: 'normal',
    lastSync: 'Just now',
    tempCelsius: 24,
    humidityPercentage: 74,
    type: 'Rain Gauge'
  },
  {
    id: 'AQUA-06',
    name: 'High Plateau Hydro Station',
    location: 'Northern Upland Zone',
    lat: 39.7392,
    lng: -121.8375,
    waterLevelPercentage: 0,
    waterDepthMeters: 0,
    rainfallTodayMm: 0,
    batteryPercentage: 0,
    signalStrengthDbm: -110,
    status: 'offline',
    healthStatus: 'critical',
    lastSync: '4 hours ago',
    tempCelsius: 21,
    humidityPercentage: 50,
    type: 'Well Depth Sensor'
  }
];

export const mockAlerts: AlertNotification[] = [
  {
    id: 'alt-1',
    title: '⚠ Low Groundwater Level Alert',
    message: 'South Aquifer Sector 9 (AQUA-04) reached critical depletion at 24% depth margin.',
    type: 'danger',
    timestamp: '10 minutes ago',
    sensorId: 'AQUA-04',
    read: false
  },
  {
    id: 'alt-2',
    title: '🌧 Heavy Rainfall Detected',
    message: 'Coastal Plain Station recorded 56mm precip in last 3 hours. Rapid recharge initiated.',
    type: 'info',
    timestamp: '35 minutes ago',
    sensorId: 'AQUA-05',
    read: false
  },
  {
    id: 'alt-3',
    title: '🔋 Sensor Battery Low',
    message: 'Device AQUA-04 operating on 18% reserve power. Solar recharge optimal.',
    type: 'warning',
    timestamp: '1 hour ago',
    sensorId: 'AQUA-04',
    read: false
  },
  {
    id: 'alt-4',
    title: '📡 Device Offline Warning',
    message: 'High Plateau Station (AQUA-06) signal interrupted. Tech team dispatched.',
    type: 'danger',
    timestamp: '4 hours ago',
    sensorId: 'AQUA-06',
    read: true
  }
];

export const hourlyGroundwaterTrend = [
  { time: '00:00', level: 71.2, rainfall: 0, usage: 120 },
  { time: '03:00', level: 71.5, rainfall: 2.1, usage: 80 },
  { time: '06:00', level: 72.8, rainfall: 8.4, usage: 210 },
  { time: '09:00', level: 73.6, rainfall: 14.2, usage: 450 },
  { time: '12:00', level: 72.9, rainfall: 6.8, usage: 380 },
  { time: '15:00', level: 72.4, rainfall: 2.5, usage: 290 },
  { time: '18:00', level: 72.1, rainfall: 0.0, usage: 180 },
  { time: '21:00', level: 72.0, rainfall: 0.0, usage: 110 },
];

export const monthlyRainfallvsLevel = [
  { time: 'Jan', level: 62, rainfall: 85, usage: 980 },
  { time: 'Feb', level: 68, rainfall: 112, usage: 920 },
  { time: 'Mar', level: 74, rainfall: 98, usage: 1100 },
  { time: 'Apr', level: 78, rainfall: 64, usage: 1280 },
  { time: 'May', level: 75, rainfall: 32, usage: 1540 },
  { time: 'Jun', level: 70, rainfall: 12, usage: 1820 },
  { time: 'Jul', level: 64, rainfall: 5, usage: 2100 },
  { time: 'Aug', level: 61, rainfall: 8, usage: 2050 },
  { time: 'Sep', level: 65, rainfall: 28, usage: 1680 },
  { time: 'Oct', level: 69, rainfall: 48, usage: 1420 },
  { time: 'Nov', level: 73, rainfall: 78, usage: 1150 },
  { time: 'Dec', level: 76, rainfall: 92, usage: 1020 },
];

export const workflowSteps = [
  { id: 1, title: 'Rainfall', icon: 'CloudRain', desc: 'Precipitation falls across regional catchment zones.' },
  { id: 2, title: 'Rain Gauge Sensor', icon: 'Compass', desc: 'Precision tipping bucket measures mm of rain.' },
  { id: 3, title: 'ESP32 IoT Node', icon: 'Cpu', desc: 'Microcontroller encodes telemetry via LoRa/4G.' },
  { id: 4, title: 'Cloud Database', icon: 'Database', desc: 'Secure real-time encrypted data streaming.' },
  { id: 5, title: 'Analytics Engine', icon: 'Activity', desc: 'Processes historical trends and extraction metrics.' },
  { id: 6, title: 'AI Prediction', icon: 'Sparkles', desc: 'Gemini neural models forecast aquifer recovery.' },
  { id: 7, title: 'Dashboard', icon: 'LayoutDashboard', desc: 'Live visual insights for farmers & authorities.' },
  { id: 8, title: 'User Alerts', icon: 'BellRing', desc: 'Automated SMS & push notifications on critical depletion.' },
];

export const mockReports: ReportItem[] = [
  {
    id: 'rep-1',
    title: 'Daily Groundwater & Rainfall Summary',
    period: 'Daily',
    recordsCount: 1440,
    fileSize: '2.4 MB',
    lastGenerated: 'Today, 06:00 AM'
  },
  {
    id: 'rep-2',
    title: 'Weekly Aquifer Recovery & Extraction Analysis',
    period: 'Weekly',
    recordsCount: 10080,
    fileSize: '8.1 MB',
    lastGenerated: 'Yesterday, 11:59 PM'
  },
  {
    id: 'rep-3',
    title: 'Monthly Hydrogeological & AI Prediction Audit',
    period: 'Monthly',
    recordsCount: 43200,
    fileSize: '24.6 MB',
    lastGenerated: 'Jul 1, 2026'
  }
];

export const mockTestimonials = [
  {
    id: 'test-1',
    name: 'Rajesh Patel',
    role: 'Lead Agriculturalist & Smart Farmer',
    organization: 'Green Valley Organic Farms',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'AquaSense AI transformed our crop irrigation. Seeing precise 7-day groundwater forecasts allows us to prevent over-extraction and save thousands of gallons during dry spells.'
  },
  {
    id: 'test-2',
    name: 'Dr. Elena Rostova',
    role: 'Chief Hydrogeologist',
    organization: 'State Water Resource Authority',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote: 'The automated IoT wireless telemetry and AI prediction accuracy of 96% give our municipal council the exact continuous data required for proactive drought planning.'
  },
  {
    id: 'test-3',
    name: 'Marcus Vance',
    role: 'Municipality Chief Engineer',
    organization: 'Metropolitan Water District',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote: 'Deploying ESP32 nodes with AquaSense AI cut our manual well inspection costs by 80%. The real-time alerts ensure zero critical well failures across 500+ monitored sites.'
  },
  {
    id: 'test-4',
    name: 'Dr. Sophia Chen',
    role: 'Environmental Scientist',
    organization: 'Global Aquifer Institute',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote: 'The glassmorphic dashboard combined with regional heatmap analytics makes complex hydrogeology understandable and actionable for public policy leaders.'
  }
];

export const mockFaqs = [
  {
    q: 'How accurate are the AI groundwater level predictions?',
    a: 'AquaSense AI utilizes multi-layer neural network modeling trained on historical rainfall, local soil permeability, extraction rates, and weather forecasts to achieve an average prediction accuracy of over 96%.'
  },
  {
    q: 'How are IoT sensors connected in remote agricultural areas?',
    a: 'Our hardware nodes utilize ESP32 microcontrollers paired with ultra-long-range LoRaWAN and cellular 4G/NB-IoT radios, backed by high-efficiency solar panels for multi-year uninterrupted operation.'
  },
  {
    q: 'Can multiple wells and catchment zones be monitored simultaneously?',
    a: 'Yes! The AquaSense AI platform scales seamlessly from a single well to thousands of distributed sensors, providing unified centralized maps, alerts, and analytics.'
  },
  {
    q: 'Is cloud storage secure and accessible for compliance reporting?',
    a: 'All telemetry streaming uses end-to-end TLS encryption and compliant cloud databases. You can export detailed CSV, PDF, or Excel reports instantly with full audit trails.'
  },
  {
    q: 'How does the system send automated alerts during critical drop levels?',
    a: 'Alert triggers are customizable per well. When water levels dip below defined safety thresholds or battery levels drop, instant notifications are triggered across the dashboard, SMS, and email.'
  }
];

export interface SensorData {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  waterLevelPercentage: number;
  waterDepthMeters: number;
  rainfallTodayMm: number;
  batteryPercentage: number;
  signalStrengthDbm: number;
  status: 'online' | 'offline' | 'maintenance';
  healthStatus: 'normal' | 'moderate' | 'critical';
  lastSync: string;
  tempCelsius: number;
  humidityPercentage: number;
  type: 'Well Depth Sensor' | 'Rain Gauge' | 'Ultrasonic Level' | 'Multi-Param Probe';
}

export interface TelemetryMetrics {
  groundwaterLevel: number; // e.g. 72%
  rainfallToday: number; // e.g. 34 mm
  temperature: number; // e.g. 29°C
  humidity: number; // e.g. 65%
  waterUsage: number; // e.g. 1450 L/day
  predictionAccuracy: number; // e.g. 96%
}

export interface ChartPoint {
  time: string;
  level: number;
  rainfall?: number;
  usage?: number;
  baseline?: number;
  forecast?: number;
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  timestamp: string;
  sensorId?: string;
  read: boolean;
}

export interface PredictionInput {
  rainfall: number;
  waterUsage: number;
  previousWaterLevel: number;
  region: string;
  soilType: string;
}

export interface PredictionResult {
  predictedLevel: number;
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  confidenceScore: number;
  rechargeRate: string;
  depletionForecast: string;
  recommendation: string;
  analysisSummary: string;
  futureTrend: { day: string; level: number; rainfall: number }[];
  isAiGenerated?: boolean;
}

export interface ReportItem {
  id: string;
  title: string;
  period: 'Daily' | 'Weekly' | 'Monthly' | 'Annual';
  recordsCount: number;
  fileSize: string;
  lastGenerated: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

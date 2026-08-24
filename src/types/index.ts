export type PredictionClass = 'healthy' | 'yellow_leaf_disease';
export type Severity = 'none' | 'low' | 'moderate' | 'high' | 'severe';
export type Language = 'en' | 'kn';

export interface Prediction {
  id: string;
  date: string;
  imageData: string;
  result: PredictionClass;
  confidence: number;
  healthyProb: number;
  diseaseProb: number;
  severity: Severity;
  location: string;
  modelVersion: string;
  isDemo: boolean;
}

export interface FarmerProfile {
  name: string;
  mobile: string;
  village: string;
  taluk: string;
  district: string;
  farmSize: string;
  palms: string;
  language: Language;
}

export interface DiseaseInfo {
  id: string;
  name: string;
  nameKn: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  severityLevels: Severity[];
}

export interface WeatherDay {
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
  rainProb: number;
  humidity: number;
}

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    rainProb: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
    location: string;
  };
  forecast: WeatherDay[];
}

export interface ExpertContact {
  id: string;
  type: 'officer' | 'pathologist' | 'research';
  name: string;
  nameKn: string;
  role: string;
  roleKn: string;
  description: string;
  descriptionKn: string;
  available: boolean;
}

export interface ModelVersion {
  name: string;
  version: string;
  status: 'DEMO' | 'PRODUCTION';
  trainingDate: string | null;
  datasetVersion: string | null;
  accuracy: number | null;
  precision: number | null;
  recall: number | null;
  f1Score: number | null;
}

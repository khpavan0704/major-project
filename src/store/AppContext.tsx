import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Prediction, FarmerProfile } from '@/types';
import { DEMO_PREDICTIONS, DEMO_PROFILE } from '@/data/demoData';

interface AppContextValue {
  predictions: Prediction[];
  addPrediction: (p: Prediction) => void;
  deletePrediction: (id: string) => void;
  getPrediction: (id: string) => Prediction | undefined;
  profile: FarmerProfile;
  updateProfile: (p: FarmerProfile) => void;
  currentPredictionId: string | null;
  setCurrentPredictionId: (id: string | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const PREDICTIONS_KEY = 'arecacare-predictions';
const PROFILE_KEY = 'arecacare-profile';

function loadPredictions(): Prediction[] {
  if (typeof window === 'undefined') return DEMO_PREDICTIONS;
  const stored = localStorage.getItem(PREDICTIONS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Prediction[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // fall through
    }
  }
  return DEMO_PREDICTIONS;
}

function loadProfile(): FarmerProfile {
  if (typeof window === 'undefined') return DEMO_PROFILE;
  const stored = localStorage.getItem(PROFILE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as FarmerProfile;
    } catch {
      // fall through
    }
  }
  return DEMO_PROFILE;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [predictions, setPredictions] = useState<Prediction[]>(loadPredictions);
  const [profile, setProfile] = useState<FarmerProfile>(loadProfile);
  const [currentPredictionId, setCurrentPredictionId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(predictions));
    } catch {
      // storage might be full (images), ignore
    }
  }, [predictions]);

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const addPrediction = (p: Prediction) => setPredictions((prev) => [p, ...prev]);
  const deletePrediction = (id: string) => setPredictions((prev) => prev.filter((p) => p.id !== id));
  const getPrediction = (id: string) => predictions.find((p) => p.id === id);
  const updateProfile = (p: FarmerProfile) => setProfile(p);

  return (
    <AppContext.Provider
      value={{
        predictions,
        addPrediction,
        deletePrediction,
        getPrediction,
        profile,
        updateProfile,
        currentPredictionId,
        setCurrentPredictionId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

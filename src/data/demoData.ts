import type { Prediction, FarmerProfile, DiseaseInfo, WeatherData, ExpertContact, ModelVersion, Severity } from '@/types';

export const DEMO_PROFILE: FarmerProfile = {
  name: 'Ramesh Gowda',
  mobile: '+91 98765 43210',
  village: 'Sullia',
  taluk: 'Sullia',
  district: 'Dakshina Kannada',
  farmSize: '3.5',
  palms: '420',
  language: 'en',
};

export const YELLOW_LEAF_DISEASE: DiseaseInfo = {
  id: 'yellow_leaf_disease',
  name: 'Yellow Leaf Disease',
  nameKn: 'ಹಳದಿ ಎಲೆ ರೋಗ',
  scientificName: 'Phytoplasma-associated disease',
  description:
    'Yellow Leaf Disease (YLD) is a serious condition affecting arecanut palms, characterized by progressive yellowing of leaves, reduced yield, and eventual decline of palm health. It is associated with phytoplasma and can spread through insect vectors.',
  symptoms: [
    'Progressive yellowing of leaves starting from the crown',
    'Reduced leaf size and chlorosis',
    'Premature nut fall and reduced yield',
    'Stunted growth of new leaves',
    'Necrosis of leaf margins in advanced stages',
    'Thinning of the canopy over time',
  ],
  prevention: [
    'Plant disease-free, certified seedlings from reliable nurseries',
    'Maintain proper spacing between palms for good air circulation',
    'Implement integrated nutrient management with balanced fertilization',
    'Control insect vectors through recommended practices',
    'Remove and destroy severely affected palms to prevent spread',
    'Regular monitoring and early detection of symptoms',
    'Ensure proper drainage to avoid waterlogging stress',
  ],
  severityLevels: ['low', 'moderate', 'high', 'severe'],
};

export const HEALTHY_INFO: DiseaseInfo = {
  id: 'healthy',
  name: 'Healthy Arecanut Leaf',
  nameKn: 'ಆರೋಗ್ಯಕರ ಅಡಿಕೆ ಎಲೆ',
  scientificName: '—',
  description:
    'The leaf shows no signs of Yellow Leaf Disease or other detectable conditions. The arecanut palm appears healthy with normal green coloration and leaf structure.',
  symptoms: [],
  prevention: [
    'Continue regular field monitoring every 2-4 weeks',
    'Maintain balanced fertilization and irrigation schedule',
    'Keep the field clean and free of weeds',
    'Monitor for any changes in leaf color or growth pattern',
  ],
  severityLevels: [],
};

export function getAdvisory(severity: Severity, isDiseased: boolean, lang: 'en' | 'kn') {
  if (!isDiseased) {
    return {
      meaning:
        lang === 'kn'
          ? 'ನಿಮ್ಮ ಅಡಿಕೆ ಎಲೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ. ಹಳದಿ ಎಲೆ ರೋಗದ ಯಾವುದೇ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆ ಮುಂದುವರಿಸಿ.'
          : 'Your arecanut leaf is healthy. No symptoms of Yellow Leaf Disease were detected. Continue regular monitoring.',
      symptoms:
        lang === 'kn'
          ? ['ಎಲೆಗಳಲ್ಲಿ ಹಳದಿ ಬಣ್ಣದ ಬದಲಾವಣೆ', 'ಎಲೆ ಗಾತ್ರ ಕಡಿಮೆ', 'ಅಕಾಲಿಕ ಬೀಜ ಉದುರುವಿಕೆ']
          : ['Yellowing of leaves', 'Reduced leaf size', 'Premature nut fall'],
      immediate:
        lang === 'kn'
          ? ['ಪ್ರಸ್ತುತ ಕ್ರಮ ಅಗತ್ಯವಿಲ್ಲ', 'ನಿಯಮಿತ ಕ್ಷೇತ್ರ ಮೇಲ್ವಿಚಾರಣೆ ಮುಂದುವರಿಸಿ']
          : ['No immediate action needed', 'Continue regular field monitoring'],
      fieldMgmt:
        lang === 'kn'
          ? ['ಸಮತೋಲಿತ ಗೊಬ್ಬರ ಅನ್ವಯಿಸಿ', 'ಸರಿಯಾದ ನೀರಾವರಿ ನಿರ್ವಹಿಸಿ', 'ಕಳೆ ನಿಯಂತ್ರಣ ಕಾಯ್ದುಕೊಳ್ಳಿ']
          : ['Apply balanced fertilization', 'Maintain proper irrigation', 'Keep weed growth under control'],
      prevention:
        lang === 'kn'
          ? ['ಪ್ರತಿ 2-4 ವಾರಗಳಿಗೊಮ್ಮೆ ಎಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ', 'ರೋಗ-ಮುಕ್ತ ಸಸಿಗಳನ್ನು ಬಳಸಿ']
          : ['Inspect leaves every 2-4 weeks', 'Use disease-free certified seedlings'],
      monitoring:
        lang === 'kn'
          ? 'ಮುಂದಿನ ಸ್ಕ್ಯಾನ್ 2-4 ವಾರಗಳಲ್ಲಿ ಮಾಡಿ. ಮಳೆಗಾಲದಲ್ಲಿ ಹೆಚ್ಚು ಆಗಾಗ್ಗೆ ಪರಿಶೀಲಿಸಿ.'
          : 'Schedule next scan in 2-4 weeks. Monitor more frequently during monsoon season.',
      expert:
        lang === 'kn'
          ? 'ಎಲೆಗಳಲ್ಲಿ ಹಳದಿ ಬಣ್ಣ ಕಾಣಿಸಿದರೆ ತಕ್ಷಣ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.'
          : 'Contact an agricultural officer immediately if yellowing appears on leaves.',
    };
  }

  const severityText: Record<Severity, { en: string; kn: string }> = {
    none: { en: '', kn: '' },
    low: { en: 'mild', kn: 'ಸೌಮ್ಯ' },
    moderate: { en: 'moderate', kn: 'ಮಧ್ಯಮ' },
    high: { en: 'high', kn: 'ತೀವ್ರ' },
    severe: { en: 'severe', kn: 'ಅತ್ಯಂತ ತೀವ್ರ' },
  };

  return {
    meaning:
      lang === 'kn'
        ? `ನಿಮ್ಮ ಅಡಿಕೆ ಎಲೆಯಲ್ಲಿ ಹಳದಿ ಎಲೆ ರೋಗದ ${severityText[severity].kn} ಲಕ್ಷಣಗಳು ಪತ್ತೆಯಾಗಿವೆ. ಸಕಾಲಿಕ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳುವುದು ಅಗತ್ಯ.`
        : `Your arecanut leaf shows ${severityText[severity].en} symptoms of Yellow Leaf Disease. Timely action is essential.`,
    symptoms:
      lang === 'kn'
        ? ['ಎಲೆಗಳ ಪ್ರಗತಿಶೀಲ ಹಳದಿ ಬಣ್ಣ', 'ಎಲೆ ಗಾತ್ರ ಕಡಿಮೆ ಮತ್ತು ಕ್ಲೋರೋಸಿಸ್', 'ಅಕಾಲಿಕ ಬೀಜ ಉದುರುವಿಕೆ', 'ಹೊಸ ಎಲೆಗಳ ಸ್ಥಗಿತ ಬೆಳವಣಿಗೆ', 'ಎಲೆ ಅಂಚುಗಳ ಸೋಂಕು']
        : ['Progressive yellowing of leaves', 'Reduced leaf size and chlorosis', 'Premature nut fall', 'Stunted growth of new leaves', 'Necrosis of leaf margins'],
    immediate:
      severity === 'high' || severity === 'severe'
        ? lang === 'kn'
          ? ['ಬಾಧಿತ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ಕತ್ತರಿಸಿ ನಾಶಪಡಿಸಿ', 'ಆರೋಗ್ಯಕರ ಸಸಿಗಳಿಂದ ಬೇರ್ಪಡಿಸಿ', 'ಕೃಷಿ ಇಲಾಖೆಯನ್ನು ತಕ್ಷಣ ಸಂಪರ್ಕಿಸಿ']
          : ['Immediately prune and destroy affected leaves', 'Isolate from healthy palms', 'Contact the agricultural department immediately']
        : lang === 'kn'
          ? ['ಬಾಧಿತ ಎಲೆಗಳನ್ನು ಗುರುತಿಸಿ ಮತ್ತು ಟ್ಯಾಗ್ ಮಾಡಿ', 'ಕೀಟ ನಿಯಂತ್ರಣ ಕ್ರಮಗಳನ್ನು ಹೆಚ್ಚಿಸಿ', 'ಕ್ಷೇತ್ರ ನಿರ್ವಹಣೆ ಬಲಪಡಿಸಿ']
          : ['Identify and tag affected leaves', 'Increase insect vector control measures', 'Strengthen field management practices'],
    fieldMgmt:
      lang === 'kn'
        ? ['ಸರಿಯಾದ ಸ್ಥಳಾಂತರ ಖಚಿತಪಡಿಸಿ', 'ಉತ್ತಮ ವಾಯು ಸಂಚಾರ ಕಾಯ್ದುಕೊಳ್ಳಿ', 'ಸಮತೋಲಿತ ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ', 'ಸರಿಯಾದ ಒಳಚರಂಡಿ ಖಚಿತಪಡಿಸಿ']
        : ['Ensure proper spacing between palms', 'Maintain good air circulation', 'Implement balanced nutrient management', 'Ensure proper drainage'],
    prevention:
      lang === 'kn'
        ? ['ರೋಗ-ಮುಕ್ತ ಪರಿಗಣಿತ ಸಸಿಗಳನ್ನು ನೆಡಿ', 'ಕೀಟ ವಾಹಕಗಳ ನಿಯಂತ್ರಣ', 'ತೀವ್ರ ಬಾಧಿತ ಸಸಿಗಳನ್ನು ನಾಶಪಡಿಸಿ', 'ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆ']
        : ['Plant disease-free certified seedlings', 'Control insect vectors', 'Remove and destroy severely affected palms', 'Regular monitoring and early detection'],
    monitoring:
      lang === 'kn'
        ? 'ಪ್ರತಿ ವಾರ ಬಾಧಿತ ಸಸಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ರೋಗ ಹರಡುವಿಕೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು ದಾಖಲಿಸಿ.'
        : 'Inspect affected palms weekly. Document any disease spread for control measures.',
    expert:
      lang === 'kn'
        ? 'ತೀವ್ರತೆ ಹೆಚ್ಚಾದರೆ ಅಥವಾ ರೋಗ ಹರಡಿದರೆ ತಕ್ಷಣ ಸಸ್ಯ ರೋಗಶಾಸ್ತ್ರಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.'
        : 'Contact a plant pathologist immediately if severity increases or the disease spreads.',
  };
}

export const DEMO_WEATHER: WeatherData = {
  current: {
    temp: 28,
    humidity: 78,
    rainProb: 65,
    condition: 'partly-cloudy',
    location: 'Sullia, Dakshina Kannada',
  },
  forecast: [
    { day: 'Mon', tempHigh: 29, tempLow: 22, condition: 'partly-cloudy', rainProb: 40, humidity: 75 },
    { day: 'Tue', tempHigh: 27, tempLow: 21, condition: 'rainy', rainProb: 80, humidity: 85 },
    { day: 'Wed', tempHigh: 26, tempLow: 20, condition: 'rainy', rainProb: 90, humidity: 88 },
    { day: 'Thu', tempHigh: 28, tempLow: 21, condition: 'cloudy', rainProb: 55, humidity: 80 },
    { day: 'Fri', tempHigh: 30, tempLow: 23, condition: 'partly-cloudy', rainProb: 30, humidity: 70 },
    { day: 'Sat', tempHigh: 31, tempLow: 24, condition: 'sunny', rainProb: 15, humidity: 65 },
    { day: 'Sun', tempHigh: 30, tempLow: 23, condition: 'sunny', rainProb: 20, humidity: 68 },
  ],
};

export function getWeatherTips(weather: WeatherData, lang: 'en' | 'kn'): string[] {
  const tips: string[] = [];
  const rainSoon = weather.forecast.slice(0, 3).some((d) => d.rainProb > 60);

  if (rainSoon) {
    tips.push(
      lang === 'kn'
        ? 'ಮಳೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ. ಅನಗತ್ಯ ನೀರಾವರಿ ತಪ್ಪಿಸಿ ಮತ್ತು ಕ್ಷೇತ್ರ ಒಳಚರಂಡಿ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.'
        : 'Rain is expected. Avoid unnecessary irrigation and monitor field drainage.'
    );
  }

  if (weather.current.humidity > 80) {
    tips.push(
      lang === 'kn'
        ? 'ಅಧಿಕ ಆರ್ದ್ರತೆ ರೋಗ ಹರಡುವಿಕೆಗೆ ಕಾರಣವಾಗಬಹುದು. ಸಸಿಗಳನ್ನು ಆಗಾಗ್ಗೆ ಪರಿಶೀಲಿಸಿ.'
        : 'High humidity can promote disease spread. Inspect palms more frequently.'
    );
  }

  if (weather.current.temp > 30) {
    tips.push(
      lang === 'kn'
        ? 'ಉಷ್ಣತೆ ಹೆಚ್ಚು. ಸಸಿಗಳಿಗೆ ಸಾಕಷ್ಟು ನೀರು ಖಚಿತಪಡಿಸಿ, ವಿಶೇಷವಾಗಿ ಬೆಳಗಿನ ಅಥವಾ ಸಂಜೆ.'
        : 'High temperature. Ensure adequate watering, especially during morning or evening.'
    );
  }

  tips.push(
    lang === 'kn'
      ? 'ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳ ಲಕ್ಷಣಗಳಿಗಾಗಿ ವಾರಕ್ಕೊಮ್ಮೆ ಕ್ಷೇತ್ರ ಪರಿಶೀಲಿಸಿ.'
      : 'Inspect your field weekly for signs of pests and disease symptoms.'
  );

  return tips;
}

export const EXPERT_CONTACTS: ExpertContact[] = [
  {
    id: '1',
    type: 'officer',
    name: 'Agricultural Officer',
    nameKn: 'ಕೃಷಿ ಅಧಿಕಾರಿ',
    role: 'Local Krishi Vigyan Kendra',
    roleKn: 'ಸ್ಥಳೀಯ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ',
    description:
      'Your nearest agricultural extension officer can provide field visits, disease confirmation, and guidance on local treatment programs.',
    descriptionKn:
      'ನಿಮ್ಮ ಹತ್ತಿರದ ಕೃಷಿ ವಿಸ್ತರಣಾ ಅಧಿಕಾರಿ ಕ್ಷೇತ್ರ ಭೇಟಿ, ರೋಗ ದೃಢೀಕರಣ, ಮತ್ತು ಸ್ಥಳೀಯ ಚಿಕಿತ್ಸಾ ಕಾರ್ಯಕ್ರಮಗಳ ಮಾರ್ಗದರ್ಶನ ನೀಡಬಲ್ಲರು.',
    available: true,
  },
  {
    id: '2',
    type: 'pathologist',
    name: 'Plant Pathologist',
    nameKn: 'ಸಸ್ಯ ರೋಗಶಾಸ್ತ್ರಜ್ಞ',
    role: 'University Agricultural Sciences',
    roleKn: 'ಕೃಷಿ ವಿಶ್ವವಿದ್ಯಾಲಯ',
    description:
      'A plant pathologist can perform laboratory diagnosis, identify the exact pathogen, and recommend scientifically validated treatment protocols.',
    descriptionKn:
      'ಸಸ್ಯ ರೋಗಶಾಸ್ತ್ರಜ್ಞರು ಪ್ರಯೋಗಾಲಯ ರೋಗನಿರ್ಣಯ, ನಿಖರ ರೋಗಕಾರಕ ಗುರುತಿಸುವಿಕೆ, ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಕಿತ್ಸಾ ಪ್ರೋಟೋಕಾಲ್ ಶಿಫಾರಸು ಮಾಡಬಲ್ಲರು.',
    available: true,
  },
  {
    id: '3',
    type: 'research',
    name: 'Agricultural Research Centre',
    nameKn: 'ಕೃಷಿ ಸಂಶೋಧನಾ ಕೇಂದ್ರ',
    role: 'Central Plantation Crops Research Institute',
    roleKn: 'ಕೇಂದ್ರೀಯ ತೋಟಗಾರಿಕಾ ಬೆಳೆಗಳ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ',
    description:
      'Research centres conduct advanced disease studies, breed resistant varieties, and publish region-specific management guidelines for arecanut farmers.',
    descriptionKn:
      'ಸಂಶೋಧನಾ ಕೇಂದ್ರಗಳು ಸುಧಾರಿತ ರೋಗ ಅಧ್ಯಯನ, ನಿರೋಧಕ ತಳಿಗಳ ಸಂಗೋಪನೆ, ಮತ್ತು ಪ್ರದೇಶ-ನಿರ್ದಿಷ್ಟ ನಿರ್ವಹಣಾ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪ್ರಕಟಿಸುತ್ತವೆ.',
    available: true,
  },
];

export const DEMO_MODEL: ModelVersion = {
  name: 'ArecaCare CNN',
  version: 'v1.0',
  status: 'DEMO',
  trainingDate: null,
  datasetVersion: null,
  accuracy: null,
  precision: null,
  recall: null,
  f1Score: null,
};

function generateDemoPredictions(): Prediction[] {
  const results: Prediction[] = [];
  const now = Date.now();
  const classes: ('healthy' | 'yellow_leaf_disease')[] = [
    'healthy', 'yellow_leaf_disease', 'healthy', 'healthy',
    'yellow_leaf_disease', 'healthy', 'yellow_leaf_disease', 'healthy',
    'yellow_leaf_disease', 'healthy', 'yellow_leaf_disease', 'healthy',
  ];
  const severities: Severity[] = ['none', 'low', 'moderate', 'high', 'severe'];
  const locations = ['Sullia', 'Puttur', 'Bantwal', 'Belthangady', 'Moodbidri'];

  for (let i = 0; i < 12; i++) {
    const result = classes[i];
    const daysAgo = Math.floor(i / 2) + Math.floor(Math.random() * 3);
    const isDiseased = result === 'yellow_leaf_disease';
    const confidence = isDiseased
      ? 0.88 + Math.random() * 0.1
      : 0.92 + Math.random() * 0.07;
    const severity = isDiseased
      ? severities[1 + Math.floor(Math.random() * 4)]
      : 'none';

    results.push({
      id: `pred-${i + 1}`,
      date: new Date(now - daysAgo * 86400000).toISOString(),
      imageData: '',
      result,
      confidence: Math.round(confidence * 1000) / 10,
      healthyProb: Math.round((1 - confidence) * 1000) / 10,
      diseaseProb: Math.round(confidence * 1000) / 10,
      severity,
      location: locations[Math.floor(Math.random() * locations.length)],
      modelVersion: 'ArecaCare AI v1.0',
      isDemo: true,
    });
  }

  return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const DEMO_PREDICTIONS = generateDemoPredictions();
